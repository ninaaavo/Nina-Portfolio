export default function Model3D() {
  return (
    <>
      <div className="divider"></div>

      <section className="main-title">
        <h1>3D MODELS</h1>
        <hr />
      </section>

      <section className="works robot">
        <div className="text">
          <p className="tit">Robot</p>
          <a href="https://www.artstation.com/artwork/3ELK3D">
            <p className="sub">See full project</p>
          </a>
        </div>
        <div className="container-iframe">
          <img src="/final-imgs/robot.png" alt="a 3d model of a robot" />
        </div>
      </section>

      <section className="works armor">
        <div className="text">
          <p className="tit">Armor</p>
          <a href="https://www.artstation.com/artwork/a0aAP8">
            <p className="sub">See full project</p>
          </a>
        </div>
        <div className="container-iframe">
          <img src="/final-imgs/armor.jpg" alt="a 3d armor" />
        </div>
      </section>

      <section className="works car">
        <div className="text">
          <p className="tit">Car</p>
          <a href="https://www.artstation.com/artwork/RK5AwW">
            <p className="sub">See full project</p>
          </a>
        </div>
        <div className="container-iframe">
          <img src="/final-imgs/car.jpg" alt="a 3d car" />
        </div>
      </section>
    </>
  );
}
