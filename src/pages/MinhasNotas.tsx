import { useState } from "react";
import { CreateNewNotes } from "../components/CreateNewNotes";
import { Modal } from "../components/Modal";
import { SideBar } from "../components/SideBar";
import { useNotes } from "../contexts/NoteContext";
import { SwipeableNote } from "../components/SwipeableNote";

export function MinhasNotas() {
  const { notes, setNotes } = useNotes();
  const [open, setOpen] = useState(false);
  const [quickMode, setQuickMode] = useState(false);

  // --- Lógica de Ações ---
  const handleToggleFavorite = (id: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isFavorited: !note.isFavorited } : note
      )
    );
  };

  const handleMoveToTrash = (id: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, inTrash: true } : note
      )
    );
  };

  // --- Lógica do Modal ---
  const handleOpenNormal = () => {
    setQuickMode(false);
    setOpen(true);
  };

  const handleOpenQuick = () => {
    setQuickMode(true);
    setOpen(true);
  };

  // Filtramos apenas as notas que NÃO estão na lixeira
  const activeNotes = notes.filter((note) => !note.inTrash);

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <SideBar />

      <main className="flex-1 md:ml-64 p-6 md:p-10 pt-20 md:pt-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
              Suas <span className="text-orange-500">Notas</span>
            </h2>
            <p className="text-zinc-500 font-medium mt-1">
              Bem-vindo de volta, Jota! Organize suas ideias abaixo.
            </p>
          </div>

          <button
            onClick={handleOpenNormal}
            className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-[0_10px_20px_rgba(249,115,22,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
          >
            <span className="text-xl">+</span> Nova Nota
          </button>
        </header>

        {/* --- GRID DE NOTAS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mapeamento das Notas Ativas com Swipe */}
          {activeNotes.map((note) => (
            <SwipeableNote
              key={note.id}
              onFavorite={() => handleToggleFavorite(note.id)}
              onDelete={() => handleMoveToTrash(note.id)}
            >
              <CreateNewNotes note={note} setNotes={setNotes} />
            </SwipeableNote>
          ))}

          {/* Card de Adição Rápida Estilizado (Sempre ao final da lista) */}
          <button
            onClick={handleOpenQuick}
            className="p-6 h-40 bg-transparent border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-3 text-zinc-400 hover:border-orange-500/50 hover:text-orange-500 transition-all group"
          >
            <span className="text-3xl group-hover:scale-125 transition-transform">
              +
            </span>
            <span className="text-sm font-bold uppercase tracking-wider">
              Nota rápida
            </span>
          </button>
        </div>

        {/* --- MODAL PARA CRIAÇÃO --- */}
        <Modal
          open={open}
          setOpen={setOpen}
          setNotes={setNotes}
          isQuickNote={quickMode}
        />
      </main>
    </div>
  );
}
