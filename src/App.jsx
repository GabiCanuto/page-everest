import React, { useRef } from "react";
import "./App.css";

export default function App() {
  const cardRef = useRef(null);

  const stores = [
    { name: "Loja Vale Sul", url: "https://wa.me/551239394855" },
    { name: "Loja Jd Oriente", url: "https://wa.me/551220121412" },
    { name: "Loja Aparecida", url: "https://wa.me/551231051213" },
    { name: "Loja Guará Centro", url: "https://wa.me/551231224789" },
    { name: "Loja Buriti", url: "https://wa.me/551230137146" },
    { name: "Loja Lorena Centro", url: "https://wa.me/551231575504" },
    { name: "Loja Ecovalle", url: "https://wa.me/551231995688" },
  ];

  function handleMove(e) {
    const root = document.documentElement;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const px = (x - 0.5) * 18;
    const py = (y - 0.5) * 18;

    root.style.setProperty("--bgx", `${px}px`);
    root.style.setProperty("--bgy", `${py}px`);
    const tiltX = (y - 0.5) * -4;
    const tiltY = (x - 0.5) * 4;
    root.style.setProperty("--tiltX", `${tiltX}deg`);
    root.style.setProperty("--tiltY", `${tiltY}deg`);
  }

  function handleLeave() {
    const root = document.documentElement;
    root.style.setProperty("--bgx", `0px`);
    root.style.setProperty("--bgy", `0px`);
    root.style.setProperty("--tiltX", `0deg`);
    root.style.setProperty("--tiltY", `0deg`);
  }

  // ripple center for all buttons
  function handleButtonMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  return (
    <>
      <header className="header" role="banner">
        <div className="brand">
          <img src="/logo.png" alt="Everest Logo" className="brand-logo" />
          EVEREST
        </div>
      </header>

      <main
        className="hero"
        role="main"
        aria-label="Seleção de lojas"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <section className="card" aria-live="polite" ref={cardRef}>
          <h1 className="headline">Compre com a loja de sua preferência</h1>
          <p className="sub">Escolha a unidade — você será direcionado ao WhatsApp</p>

          <div className="ctas">
            {stores.map((s, idx) => (
              <a
                key={s.url}
                className="btn btn-neutral btn-animate"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${s.name} no WhatsApp`}
                onMouseMove={handleButtonMouseMove}
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                {s.name}
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}