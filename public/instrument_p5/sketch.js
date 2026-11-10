
let groups = [];
let circles;

let statusMessage = "Click Connect ESP32";
// let connectButton;
let connecting = false;

let bluetoothDevice;
let touchCharacteristic;

const SERVICE_UUID = "19b10000-e8f2-537e-4f6c-d104768a1214";
const DATA_UUID = "19b10001-e8f2-537e-4f6c-d104768a1214";

// Must match the order in the ESP32 code.
const sensorNames = ["T0", "T3", "T4", "T8", "T6", "T7", "T9"];

const sensorRange = [
  [400, 630],
  [360, 540],
  [320, 460],
  [340, 500],
  [320, 480],
  [370, 540],
  [350, 560],
];

const backgroundColor = 26;
const center = [1233, 468];

// -----------------------------------------
// AUDIO SETTINGS
// Audio setup credit to https://github.com/sophiekoonin/virtualpiano
// -----------------------------------------

// One note per sensor: C major scale
const noteFrequencies = [
  261.63, // T0 - C4
  293.66, // T3 - D4
  329.63, // T4 - E4
  349.23, // T5 - F4
  392.00, // T6 - G4
  440.00, // T7 - A4
  493.88, // T9 - B4
];

const maxVolume = 0.2;
const soundSmoothing = 0.04;

let audioContext;
let oscillators = [];
let gainNodes = [];

// -----------------------------------------
// SETUP
// -----------------------------------------

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  circles = new CircleGroup();

  groups = [
    new RectangleGroup(),
    circles,
    new LinesGroup(),
    new CircleCurveGroup(),
    new DisappearCircleGroup(),
    new UpperRightGroup(),
    new PointingGroup(),
  ];

  circles.loadAssets().catch(console.error);

  //connectButton = createButton("Connect ESP32");
  //connectButton.mousePressed(connectESP32);
}

// -----------------------------------------
// AUDIO SETUP
// -----------------------------------------

async function setupAudio() {
  if (!audioContext) {
    audioContext = new AudioContext();

    for (let i = 0; i < sensorNames.length; i++) {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = noteFrequencies[i];

      // Start completely silent.
      gain.gain.value = 0;

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();

      oscillators.push(oscillator);
      gainNodes.push(gain);
    }
  }

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
}

// -----------------------------------------
// UPDATE NOTE VOLUME
// -----------------------------------------

function updateNote(index, strength) {
  if (!audioContext || !gainNodes[index]) return;

  // Exponential curve to make light touch smaller, increase exponentially
  const volume =
   pow(strength, 2) * maxVolume;

  // Smooth volume transitions.
  gainNodes[index].gain.setTargetAtTime(
    volume,
    audioContext.currentTime,
    soundSmoothing
  );
}

// -----------------------------------------
// STOP ALL NOTES
// -----------------------------------------

function stopAllNotes() {
  if (!audioContext) return;

  for (const gain of gainNodes) {
    gain.gain.setTargetAtTime(
      0,
      audioContext.currentTime,
      0.02
    );
  }
}

// -----------------------------------------
// RESET TOUCH INPUTS
// -----------------------------------------

function resetTouchInputs() {
  for (const group of groups) {
    if (typeof group?.setTouchStrength === "function") {
      group.setTouchStrength(0);
    }
  }

  stopAllNotes();
}

// -----------------------------------------
// CONNECT BLUETOOTH
// -----------------------------------------

async function connectESP32() {
  if (connecting || bluetoothDevice?.gatt?.connected) return;

  if (!navigator.bluetooth) {
    statusMessage = "Use desktop Chrome with Bluetooth enabled";
    return;
  }

  connecting = true;
  //connectButton.attribute("disabled", "");
  resetTouchInputs();

  try {
    // Initialize audio after button click.
    await setupAudio();

    statusMessage = "Select Nina-ESP32";

    bluetoothDevice = await navigator.bluetooth.requestDevice({
      filters: [{ services: [SERVICE_UUID] }],
    });

    bluetoothDevice.addEventListener(
      "gattserverdisconnected",
      onBluetoothDisconnected
    );

    statusMessage = "Connecting...";

    const server = await bluetoothDevice.gatt.connect();
    const service = await server.getPrimaryService(SERVICE_UUID);

    touchCharacteristic = await service.getCharacteristic(DATA_UUID);

    touchCharacteristic.addEventListener(
      "characteristicvaluechanged",
      processBluetoothData
    );

    await touchCharacteristic.startNotifications();

    statusMessage = "Connected — waiting for data";
  } catch (error) {
    console.error(error);

    cleanUpBluetooth();

    if (bluetoothDevice?.gatt?.connected) {
      bluetoothDevice.gatt.disconnect();
    }

    resetTouchInputs();

    statusMessage =
      error.name === "NotFoundError"
        ? "No device selected. Try again."
        : `Bluetooth error: ${error.message}`;

    //connectButton.removeAttribute("disabled");
  } finally {
    connecting = false;
  }
}

// -----------------------------------------
// BLUETOOTH CLEANUP
// -----------------------------------------

function cleanUpBluetooth() {
  if (touchCharacteristic) {
    touchCharacteristic.removeEventListener(
      "characteristicvaluechanged",
      processBluetoothData
    );

    touchCharacteristic = null;
  }

  if (bluetoothDevice) {
    bluetoothDevice.removeEventListener(
      "gattserverdisconnected",
      onBluetoothDisconnected
    );
  }
}

function onBluetoothDisconnected() {
  cleanUpBluetooth();
  resetTouchInputs();

  statusMessage = "ESP32 disconnected — click Connect ESP32";
  //connectButton.removeAttribute("disabled");
}

// -----------------------------------------
// PROCESS BLUETOOTH DATA
// -----------------------------------------

function processBluetoothData(event) {
  const data = event.target.value;

  // Seven sensors, two bytes each.
  if (data.byteLength !== sensorNames.length * 2) return;

  for (let index = 0; index < sensorNames.length; index++) {
    const sensorValue = data.getUint16(index * 2, true);
    const group = groups[index];
    // console.log(index + ": " + sensorValue)
    // Smaller raw sensor value = stronger touch.
    const strength = constrain(
      map(
        sensorValue,
        sensorRange[index][0],
        sensorRange[index][1],
        1,
        0
      ),
      0,
      1
    );

    // Update animation.
    if (typeof group?.setTouchStrength === "function") {
      group.setTouchStrength(strength);
    }

    // Update corresponding musical note.
    updateNote(index, strength);
  }

  statusMessage = "Connected — receiving touch data";
}

// -----------------------------------------
// DRAW
// -----------------------------------------

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(backgroundColor);

  push();
  scale(width / 1920, height / 1080);
  fill(160);

  const now = millis();

  for (const group of groups) {
    group.draw(now);
  }

  pop();

  push();
  noStroke();
  fill(255);
  textSize(14);
  // text(statusMessage, 15, 25);
  pop();
}

// -----------------------------------------
// KEYBOARD CONTROLS
// -----------------------------------------

function keyPressed() {
  const pressedKey = key.toLowerCase();

  for (const group of groups) {
    if (
      pressedKey === group.key &&
      typeof group.trigger === "function"
    ) {
      group.trigger();
    }
  }
}
