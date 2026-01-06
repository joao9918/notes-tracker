import { App } from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "next-themes";
import { BrowserRouter } from "react-router";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
