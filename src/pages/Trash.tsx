import { useNotes } from "../contexts/NoteContext";
import { IoMdRefresh, IoMdTrash } from "react-icons/io";
import { SideBar } from "../components/SideBar";

export function Trash() {
  const { notes, setNotes } = useNotes();
  const trashNotes = notes.filter((note) => note.inTrash);

  function handleRestore(id: string) {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, inTrash: false } : n))
    );
  }

  function handleDeletePermanent(id: string) {
    if (confirm("Deseja excluir permanentemente?")) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <SideBar />

      <main className="flex-1 md:ml-64 p-6 md:p-10 pt-24 md:pt-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
              Notas <span className="text-orange-500">Excluídas</span>
            </h1>
            <p className="text-zinc-500 mt-2 text-sm md:text-base">
              Gerencie os itens que foram movidos para a lixeira.
            </p>
          </div>

          {trashNotes.length > 0 && (
            <button
              onClick={() => {
                if (confirm("Limpar toda a lixeira?")) {
                  setNotes((prev) => prev.filter((n) => !n.inTrash));
                }
              }}
              className="text-xs font-bold text-zinc-400 hover:text-red-500 transition-colors uppercase tracking-widest self-start md:self-center"
            >
              Esvaziar Lixeira
            </button>
          )}
        </header>

        {trashNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 md:py-24 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-900/20 rounded-3xl text-center px-4">
            <span className="text-5xl mb-4 opacity-20">🗑️</span>
            <p className="text-zinc-400 dark:text-zinc-500 font-medium">
              Nenhuma nota na lixeira.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trashNotes.map((note) => (
              <div
                key={note.id}
                // Trocamos 'h-44 md:h-40' por 'h-auto min-h-[160px]'
                className="p-6 h-auto min-h-40 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col justify-between hover:border-orange-500/30 transition-all shadow-sm dark:shadow-none"
              >
                <div className="overflow-hidden">
                  <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-200 mb-1 wrap-break-word">
                    {note.title}
                  </h3>
                  {/* Trocamos 'line-clamp-2' por 'line-clamp-none' ou apenas removemos a classe */}
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed wrap-break-words">
                    {note.description}
                  </p>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => handleRestore(note.id)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-orange-500 hover:text-white dark:hover:text-black transition-all font-bold text-xs shrink-0"
                  >
                    <IoMdRefresh size={16} />
                    Restaurar
                  </button>

                  <button
                    onClick={() => handleDeletePermanent(note.id)}
                    className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:bg-red-500/10 hover:text-red-500 transition-all shrink-0"
                  >
                    <IoMdTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
