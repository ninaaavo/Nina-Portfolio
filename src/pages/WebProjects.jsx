import ProjectSection from "../components/ProjectSection";
export default function WebProjects() {
  return (
    <>
      <div className="divider"></div>

      <section className="main-title">
        <h1>
          WEB DEV <br /> PROJECTS
        </h1>
        <hr />
      </section>

      <ProjectSection
        variantClass="2d-girls"
        title="InvestLog"
        points={[
          "Developed an AI-driven investing journal in React with Firebase Cloud, tracking 30+ customizable financial, technical, and behavioral metrics through user-defined checklists and layouts to strengthen trading discipline.",
          "Integrated OpenAI to generate automated performance analyses and behavioral insights, reducing manual review time by 60% and enabling users to uncover trading patterns in seconds instead of hours.",
          "Implemented state management algorithms for profit/loss calculations using historical snapshots and automated API integrations, ensuring 100% consistency in trade tracking and saving hours of manual data entry per week.",
          "Architected a modular UI system with draggable dashboards, timeline visualizations, and dynamic filters using dnd-kit and Framer Motion, allowing users to tailor layouts to their preferences and improve insight-retrieval speed by 40%.",
        ]}
        linkHref="https://investlog-seven.vercel.app/"
        linkLabel="https://investlog-seven.vercel.app/"
        embedSrc="https://www.youtube.com/embed/MiSSc2lwM9I?si=JRtAWEBgxtWmyeaj"
        embedTitle="InvestLog"
      />

      <ProjectSection
        variantClass="2d-girls"
        title="Let's Play Nonograms!"
        points={[
          "A full-stack web application where players can create pixel arts that the website can convert into nonograms and save to its database.",
          "Built with HTML, CSS, JavaScript, Node.js, Express, PostgresSQL.",
          "The platform enables player interaction, tracks progress, and verifies when puzzles are successfully solved.",
        ]}
        linkHref="https://the-nonogram-project.onrender.com/"
        linkLabel="https://the-nonogram-project.onrender.com/"
        embedSrc="https://www.youtube.com/embed/x3CsiUeYQfo?si=j41CNZqYGAIDUAyB"
        embedTitle="Nonograms"
      />

      <ProjectSection
        variantClass="2d-girls"
        title="Guess 2D Girls' Name"
        points={[
          "A full-stack web application where players guess the names of 2D characters displayed on screen.",
          "Built with HTML, CSS, JavaScript, Node.js, and Express; integrates an existing API to fetch character data dynamically.",
          "The game features interactive gameplay, instant feedback with sound, and score tracking.",
        ]}
        linkHref="https://the-waifu-project.onrender.com"
        linkLabel="https://the-waifu-project.onrender.com"
        embedSrc="https://www.youtube.com/embed/JLwTMe6tnV0?si=0aBV5S9TlE6cwPl4"
        embedTitle="Guess 2D Girls"
      />
    </>
  );
}
