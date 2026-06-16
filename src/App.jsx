import AppRouter from "../src/routes/AppRouter";
import Navbar from "./components/Navbar/index";

export default function App() {
  return (
    <main className="app">
      <Navbar />
      <AppRouter />
    </main>
  );
}
