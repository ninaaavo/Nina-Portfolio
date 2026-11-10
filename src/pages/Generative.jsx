
export default function Generative() {
  return (
    <>
      <div className="divider"></div>

      <section className="main-title">
        <h1>GENERATIVE ARTIST</h1>
        <hr />
      </section>

      <section className="works">
        <div className="text">
          <p className="tit">Pixel (2026)</p>
          <br/>
          {/* <p className="sub">explaining explaining</p> */}
        </div>
        <div className="container-iframe">
           <iframe
            className="pixel-sketch"
            src={"/pixel_p5/index.html"}
            title="Pixel p5"
          />
        </div>
      </section>

      <section className="works" >
        <div className="text">
          <p className="tit">Grid (2026)</p>
          {/* <p className="sub">explaining explaining</p> */}
          <br/>
        </div>
        <div className="container-iframe-grid">
           <iframe
            className="grid-sketch"
            src={"/grid_p5/index.html"}
            title="Grid p5"
             id="grid-section"
          />
        </div>
      </section>

      <section className="works" >
        <div className="text">
          <p className="tit">Instrument (2026)</p>
          <br/>
          {/* <p className="sub">explaining explaining</p> */}
        </div>
        <div className="container-iframe-instrument">
           <iframe
            className="grid-sketch"
            src={"/instrument_p5/index.html"}
            title="Grid p5"
             id="instrument-section"
          />
        </div>
      </section>
     
    </>
  );
}
