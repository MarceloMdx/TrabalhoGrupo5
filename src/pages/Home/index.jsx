import "./home.css";

export default function Home() {
  return (
    <section className="home">
      <h1>Diário de Avistamentos</h1>
      <img
        className="home-ufo-image"
        src="https://i.pinimg.com/736x/d4/39/9a/d4399a856ece545d2e037cf4af740b0d.jpg"
        alt="OVNI sobrevoando o céu"
      />
      <p>Use o menu para acessar o cadastro e a lista de aliens.</p>
    </section>
  );
}
