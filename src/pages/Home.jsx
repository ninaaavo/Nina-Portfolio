import NavBar from "../components/NavBar.jsx";

export default function Home() {
  return (
    <>
      <section id="title">
        {/* Hero-specific navbar overlay */}
        <NavBar />

        <div className="container-grid">
          <div className="hello">hello, world!</div>
          <div className="iam">I am</div>
          <div className="nina">Nina Vo</div>
        </div>

        <div className="ani">
          <video
            className="ani-img"
            src="/final-imgs/animate.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </section>
            <div className="divider"></div>


      {/* Web Dev / Programmer */}
      <section className="mid">
        <div className="a-box programmer">
          <p className="tit">WEB DEV // PROGRAMMER</p>
          <p className="sub-tit"> Java // Javascript // Python //<br /> HTML // CSS </p>
          <a href="/web"><button type="button">My Web Dev Projects</button></a>
        </div>
        <img src="/final-imgs/code.png" className="back" />
        <div className="opacity"></div>
      </section>

      <div className="divider"></div>

      {/* Animator */}
      <section className="mid">
        <div className="a-box">
          <p className="tit">ANIMATOR</p>
          <a href="/animation"><button type="button">My Animations</button></a>
        </div>
        <video
          src="/final-imgs/Demo Reel.mp4"
          className="back"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="opacity"></div>
      </section>

      <div className="divider"></div>

      {/* Illustrator */}
      <section className="mid">
        <div className="a-box">
          <p className="tit">ILLUSTRATOR</p>
          <a href="/illustration"><button type="button">My Illustrations</button></a>
        </div>
        <img src="/final-imgs/Feminimity.JPG" className="back" />
        <div className="opacity"></div>
      </section>

      <div className="divider"></div>

      {/* 3D Modeler */}
      <section className="mid">
        <div className="a-box">
          <p className="tit">3D MODELER</p>
          <a href="/model"><button type="button">My 3D Models</button></a>
        </div>
        <img src="/final-imgs/robot.png" className="back" />
        <div className="opacity"></div>
      </section>

      <div className="divider"></div>

      {/* About (anchor #about) */}
      <section id="about" className="flex-container">
        <div className="text">
          <p className="tit">Who's Nina?</p>
          <p className="para">
            Nina Vo is an undergraduate student at the University of Massachusetts Amherst, majoring in Computer Science and Animation.
            Passionate about both fields, she aspires to explore the intersection between them. Her days are filled with creative and technical
            projects, ranging from animation and illustration to web development. She also crochet and knit as a big hobby!
          </p>
        </div>
        <div className="but">
          <a href="/final-imgs/Nina Vo - Art Resume.pdf" target="_blank" rel="noreferrer">
            <button type="button">Art Resume</button>
          </a>
          <br />
          <a href="mailto:baongocvo2007@gmail.com">
            <button type="button">Contact Me</button>
          </a>
        </div>
      </section>

      <div className="divider"></div>
    </>
  );
}
