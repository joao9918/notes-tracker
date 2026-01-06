import { useState } from "react";
import { CreateNewNotes } from "../components/CreateNewNotes";
import { Modal } from "../components/Modal";
import { SideBar } from "../components/SideBar";
import { useNotes } from "../contexts/NoteContext";

export function MinhasNotas() {
  const { notes, setNotes } = useNotes();
  const [open, setOpen] = useState(false);
  const [quickMode, setQuickMode] = useState(false);

  const handleOpenNormal = () => {
    setQuickMode(false);
    setOpen(true);
  };

  const handleOpenQuick = () => {
    setQuickMode(true);
    setOpen(true);
  };

  return (
    // Fundo mais escuro (zinc-950) para maior contraste com os cards
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <SideBar />

      <main className="flex-1 md:ml-64 p-6 md:p-10 pt-20 md:pt-10">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
              Suas <span className="text-orange-500">Notas</span>
            </h2>
            <p className="text-zinc-500 font-medium mt-1">
              Bem-vindo de volta, Jota!
            </p>
          </div>
          <button
            onClick={handleOpenNormal}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-[0_10px_20px_rgba(249,115,22,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            + Nova Nota
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CreateNewNotes
            notes={notes.filter((note) => !note.inTrash)}
            setNotes={setNotes}
          />

          {/* Card de Adição Rápida Estilizado */}
          <button
            onClick={handleOpenQuick}
            className="p-6 h-40 bg-transparent border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center gap-3 text-zinc-400 hover:border-orange-500/50 hover:text-orange-500 transition-all group"
          >
            <span className="text-2xl group-hover:scale-125 transition-transform">
              +
            </span>
            <span className="text-sm font-medium">Adicionar nota rápida</span>
          </button>
        </div>

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
