import { useState } from "react";
import { CreateNewNotes } from "../components/CreateNewNotes";
import { Modal } from "../components/Modal";
import { SideBar } from "../components/SideBar";
import { useNotes } from "../contexts/NoteContext";
import { SwipeableNote } from "../components/SwipeableNote";

export function Favorites() {
  const { notes, setNotes } = useNotes();
  const [open, setOpen] = useState(false);
  const [quickMode, setQuickMode] = useState(false);

  // Funções de Ação
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

  const handleOpenNormal = () => {
    setQuickMode(false);
    setOpen(true);
  };

  const handleOpenQuick = () => {
    setQuickMode(true);
    setOpen(true);
  };

  // Filtro de Favoritas (que não estão na lixeira)
  const favoriteNotes = notes.filter((n) => n.isFavorited && !n.inTrash);

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <SideBar />

      <main className="flex-1 md:ml-64 p-6 md:p-10 pt-24 md:pt-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
              Notas <span className="text-orange-500">Favoritas</span>
            </h2>
            <p className="text-zinc-500 font-medium mt-2 text-sm md:text-base">
              Suas ideias mais importantes guardadas em um só lugar.
            </p>
          </div>

          <button
            onClick={handleOpenNormal}
            className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-[0_10px_20px_rgba(249,115,22,0.3)] transition-all active:scale-95"
          >
            + Nova Nota
          </button>
        </header>

        {favoriteNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 md:py-32 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-4xl md:rounded-[2.5rem] bg-white/50 dark:bg-zinc-900/20 text-center px-4">
            <span className="text-5xl mb-4 grayscale opacity-30">⭐</span>
            <p className="text-zinc-500 font-medium">
              Você ainda não favoritou nenhuma nota.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Renderizando as favoritas com Swipe */}
            {favoriteNotes.map((note) => (
              <SwipeableNote
                onRightAction={() => handleToggleFavorite(note.id)}
                onLeftAction={() => handleMoveToTrash(note.id)}
              >
                <CreateNewNotes note={note} setNotes={setNotes} />
              </SwipeableNote>
            ))}

            <button
              onClick={handleOpenQuick}
              className="p-6 h-40 bg-transparent border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-3 text-zinc-400 hover:border-orange-500/50 hover:text-orange-500 transition-all group"
            >
              <span className="text-2xl group-hover:scale-125 transition-transform">
                +
              </span>
              <span className="text-sm font-medium">Adicionar nota rápida</span>
            </button>
          </div>
        )}

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
