export default function Illustration() {
  return (
    <>
      <div className="divider"></div>

      <section className="main-title">
        <h1>ILLUSTRATION</h1>
        <hr />
      </section>

      <section className="works femi">
        <div className="text">
          <p className="tit">Femininity? (2023)</p>
          <p className="sub">The artist&apos;s exploration of her gender.</p>
        </div>
        <div className="container-iframe">
          <img
            src="/final-imgs/Feminimity.JPG"
            alt="a girl taking off her blindfold and reaching for a pomegranate."
          />
        </div>
      </section>

      <section className="works nidihoc">
        <div className="text">
          <p className="tit">NiDiHoc (2024)</p>
          <p className="sub">
            A 2D game concept featuring Ni, a student navigating challenges to reach school on time.
          </p>
          <a href="https://www.artstation.com/artwork/Ez93Xq">
            <p className="sub">See full project</p>
          </a>
        </div>
        <div className="container-iframe">
          {/* Bootstrap carousel markup can stay; Bootstrap JS is loaded in index.html */}
          <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/final-imgs/nidihoc/nina-vo-1.jpg" className="d-block w-100" alt="Nidihoc title art" />
              </div>
              <div className="carousel-item">
                <img src="/final-imgs/nidihoc/nina-vo-6.jpg" className="d-block w-100" alt="Character design" />
              </div>
              <div className="carousel-item">
                <img src="/final-imgs/nidihoc/nina-vo-8.jpg" className="d-block w-100" alt="Character in street" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      <section className="works unblended">
        <div className="text">
          <p className="tit">Unblended (2023)</p>
          <p className="sub">
            A series inspired by the ideal beauty of marble statues, intentionally left unblended to emphasize their unnatural qualities.
          </p>
          <a href="https://www.artstation.com/artwork/QKEOZ4">
            <p className="sub">View in detail</p>
          </a>
        </div>
        <div className="container-iframe">
          <img src="/final-imgs/unblended.jpg" alt="ear, eye, and nose of marble statue." />
        </div>
      </section>
    </>
  );
}
