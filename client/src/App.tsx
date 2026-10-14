import Home from "./pages/Home";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    document.body.classList.toggle("light-mode", savedTheme === "light");
  }, []);

  return <Home />;
}

export default App;