import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />

      <div className="container-page">
        <h1>👽 Diário de Avistamentos ET</h1>

      <ErrorMessage
        titulo="🚨 Falha na transmissão"
        mensagem="Não conseguimos obter os registros dos avistamentos."
      />
      </div>
    </>
  );
}

export default App;