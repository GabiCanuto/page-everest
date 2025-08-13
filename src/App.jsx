import { useRef, useState } from "react";
import "./Index.css";

function App() {
  const PUBLIC_WHATSAPP_URL = import.meta.env.VITE_PUBLIC_WHATSAPP_URL || "#";
  const TEAM_WHATSAPP_URL = import.meta.env.VITE_TEAM_WHATSAPP_URL || "#";

  const cardRef = useRef(null);
  const bannerRef = useRef(null);

  const [imageFile, setImageFile] = useState(null);

  function handleMove(e) {
    const root = document.documentElement;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const px = (x - 0.5) * 40;
    const py = (y - 0.5) * 40;

    root.style.setProperty("--bgx", `${px}px`);
    root.style.setProperty("--bgy", `${py}px`);

    const tiltX = (y - 0.5) * -6;
    const tiltY = (x - 0.5) * 6;
    root.style.setProperty("--tiltX", `${tiltX}deg`);
    root.style.setProperty("--tiltY", `${tiltY}deg`);

    if (bannerRef.current) {
      bannerRef.current.style.transform = `translate3d(${px * 0.6}px, ${py * 0.6}px, 0) scale(1.02)`;
    }

    // 💧 Efeito “água” nos círculos de fundo
    const dx = x - 0.5;
    const dy = y - 0.5;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const scale = 1 + dist * 0.4; // intensidade ajustável

    root.style.setProperty("--scaleBefore", scale);
    root.style.setProperty("--scaleAfter", scale);
    root.style.setProperty("--scaleHeroBefore", scale);
    root.style.setProperty("--scaleHeroAfter", scale);
  }

  function handleLeave() {
    const root = document.documentElement;
    root.style.setProperty("--bgx", `0px`);
    root.style.setProperty("--bgy", `0px`);
    root.style.setProperty("--tiltX", `0deg`);
    root.style.setProperty("--tiltY", `0deg`);
    root.style.setProperty("--scaleBefore", 1);
    root.style.setProperty("--scaleAfter", 1);
    root.style.setProperty("--scaleHeroBefore", 1);
    root.style.setProperty("--scaleHeroAfter", 1);
    if (bannerRef.current) {
      bannerRef.current.style.transform = `translate3d(0,0,0)`;
    }
  }

  function handlePrimaryMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  function handleFileChange(e) {
    setImageFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!imageFile) {
      alert("Por favor, selecione uma imagem para enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch("/api/cadastrar", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erro ao enviar o formulário");

      const data = await response.json();
      alert("Cadastro realizado com sucesso!");
      console.log(data);
      setImageFile(null);
      e.target.reset();
    } catch (error) {
      alert("Erro no cadastro: " + error.message);
    }
  }

  return (
    <>
      <header className="header" role="banner">
        <div className="brand" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo.png"
            alt="Everest Logo"
            style={{ height: "40px", marginRight: "8px" }}
          />
          EVEREST
        </div>
      </header>

      <main
        className="hero"
        role="main"
        aria-label="Seleção de acesso"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <section className="card" aria-live="polite" ref={cardRef}>
          <div
            className="banner"
            role="img"
            aria-label="Banner Caixa Fort"
            ref={bannerRef}
            style={{ backgroundImage: `url('/banner.png')` }}
          ></div>
          <h1 className="headline">Escolha seu acesso</h1>
          <p className="sub">Escolha seu grupo Everest e conquiste o topo!</p>

          <div className="ctas">
            <div className="btn-wrapper">
              <p className="btn-label">Unidade São José Dos Campos</p>
              <a
                className="btn btn-primary btn-pulse"
                href="https://chat.whatsapp.com/HwOetEOjXzf6r9F5TfJwYQ?mode=ac_t "
                target="_blank"
                rel="noopener"
                aria-label="Acesso 1"
                onMouseMove={handlePrimaryMouseMove}
              >
                Acesso
              </a>
            </div>
            <div className="btn-wrapper">
              <p className="btn-label">Demais unidades</p>
              <a
                className="btn btn-secondary"
                href="https://chat.whatsapp.com/I9phdPnk7lKF6GaMN0BXz6?mode=ac_t"
                target="_blank"
                rel="noopener"
                aria-label="Acesso 2"
              >
                Acesso
              </a>
            </div>
          </div>

          <p className="legal">
            Link oficial. Sem spam. Você pode sair quando quiser.
          </p>
        </section>
      </main>
    </>
  );
}

export default App;