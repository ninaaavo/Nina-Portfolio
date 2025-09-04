export default function ProjectSection({
  variantClass = "",
  title,
  points = [],
  linkHref,
  linkLabel,
  embedSrc,
  embedTitle,
  imgSrc,
  imgAlt,
}) {
  return (
    <section className={`works ${variantClass}`.trim()}>
      <div className="text">
        {title && <p className="tit">{title}</p>}

        {/* BULLET POINTS INSTEAD OF <br/> LINES */}
        {points.length > 0 && (
          <ul className="sub" style={{ listStyle: "disc", paddingLeft: "1.25rem", marginBottom: "1rem" }}>
            {points.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        )}

        {linkHref && (
          <p className="sub">
            Check it out here:{" "}
            <a target="_blank" rel="noreferrer" href={linkHref}>
              {linkLabel || linkHref}
            </a>
          </p>
        )}
      </div>

      <div className="container-iframe">
        {embedSrc ? (
          <iframe
            className="responsive-iframe"
            src={embedSrc}
            title={embedTitle || title || "Project video"}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : imgSrc ? (
          <img src={imgSrc} alt={imgAlt || title || "Project image"} />
        ) : null}
      </div>
    </section>
  );
}
