import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { MinhasNotas } from "./pages/MinhasNotas";
import { NotePage } from "./pages/NotePage";
import { NoteProvider } from "./contexts/NoteContext";
import { Favorites } from "./pages/Favorites";
import { Trash } from "./pages/Trash";

export function App() {
  return (
    <NoteProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<MinhasNotas />} />
        <Route path="/note/:id" element={<NotePage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
    </NoteProvider>
  );
}
