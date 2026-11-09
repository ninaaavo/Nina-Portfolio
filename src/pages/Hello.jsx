export default function Hello() {
  return (
    <section id="hello">
      <iframe
        className="pixel-sketch"
        src={`${import.meta.env.BASE_URL}pixel_p5/index.html`}
        title="Pixel p5 — animated lines and sparkles"
      />
    </section>
  );
}
