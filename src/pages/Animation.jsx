export default function Animation() {
  return (
    <>
      <div className="divider"></div>

      <section className="main-title">
        <h1>ANIMATION</h1>
        <hr />
      </section>

      <section className="works demo-reel">
        <div className="text">
          <p className="tit">Demo Reel</p>
          <p className="sub">Works of 2024</p>
        </div>
        <div className="container-iframe">
          <iframe
            className="responsive-iframe"
            src="https://www.youtube.com/embed/dnFNVCBSSUw?si=x2x7VQgHX7ggKWd4"
            allowFullScreen
            title="Demo Reel"
          />
        </div>
      </section>

      <section className="works another-morning">
        <div className="text">
          <p className="tit">Another Morning (2024)</p>
          <p className="sub">
            A 40-second 2D animated short about a seemingly ordinary morning in Jane&apos;s life.
          </p>
        </div>
        <div className="container-iframe">
          <iframe
            className="responsive-iframe"
            src="https://www.youtube.com/embed/PrXL9Aqhr7E?si=xKlEL_Jd7Ir8xfJm"
            allowFullScreen
            title="Another Morning"
          />
        </div>
      </section>

      <section className="works another-morning">
        <div className="text">
          <p className="tit">Roller Coaster (2025)</p>
          <p className="sub">
            Motion graphics about roller coaster
          </p>
        </div>
        <div className="container-iframe">
          <iframe
            className="responsive-iframe"
            src="https://www.youtube.com/embed/fVAODZrU93I?si=Kke6IuAz4hJW6Bgn"
            allowFullScreen
            title="Roller Coaster"
          />
        </div>
      </section>

      <section className="works walk-cycle">
        <div className="text">
          <p className="tit">Stella&apos;s Walk Cycle (2024)</p>
          <p className="sub">
            A loopable 2D animation showcasing Stella, an energetic witch, walking through a mysterious castle.
          </p>
        </div>
        <div className="container-iframe">
          <iframe
            className="responsive-iframe"
            src="https://www.youtube.com/embed/AIHPp-SMvcs?si=WpZt8htIoHeaStzH"
            allowFullScreen
            title="Stella Walk Cycle"
          />
        </div>
      </section>

      {/* <section className="works lip-sync">
        <div className="text">
          <p className="tit">Good Boy (2024)</p>
          <p className="sub">A short lip sync video</p>
        </div>
        <div className="container-iframe">
          <iframe
            className="responsive-iframe"
            src="https://www.youtube.com/embed/QawXMU2lLbU?si=TxOLkalxuwrIAk5j"
            allowFullScreen
            title="Good Boy"
          />
        </div>
      </section> */}
    </>
  );
}
