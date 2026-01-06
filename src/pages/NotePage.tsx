import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditNote } from "../components/EditNote";
import { useNotes } from "../contexts/NoteContext";
import { IoMdArrowBack } from "react-icons/io";

export function NotePage() {
  const navigate = useNavigate();
  const { notes } = useNotes();
  const { id } = useParams();

  const note = notes.find((n) => String(n.id) === String(id));
  const [open, setOpen] = useState(false);

  // 1. ESTADO DE ERRO (AJUSTADO PARA LIGHT/DARK)
  if (!note) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white flex-col gap-6 p-4 text-center">
        <div className="text-6xl opacity-20">🔍</div>
        <p className="text-xl font-bold italic opacity-50">
          Ops! Nota não encontrada.
        </p>
        <button
          onClick={() => navigate("/notes")}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white dark:text-black font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all"
        >
          Voltar para a biblioteca
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <main className="max-w-4xl mx-auto w-full p-6 md:p-16">
        {/* BOTÃO VOLTAR REFINADO */}
        <button
          onClick={() => navigate(-1)}
          className="mb-10 text-zinc-500 hover:text-orange-500 transition-colors flex items-center gap-2 group font-medium"
        >
          <IoMdArrowBack className="group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        <header className="space-y-10">
          <div className="pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white leading-tight">
              {note.title}
            </h2>
            <div className="flex items-center gap-4 mt-6">
              <span className="text-xs bg-orange-500/10 text-orange-600 dark:text-orange-500 px-3 py-1 rounded-full font-bold uppercase tracking-tighter">
                Detalhes da Nota
              </span>
              <span className="text-zinc-400 text-xs">ID: {note.id}</span>
            </div>
          </div>

          {/* ÁREA DO CONTEÚDO */}
          <div className="bg-white dark:bg-zinc-900/40 p-8 md:p-12 rounded-4xl border border-zinc-200 dark:border-zinc-800/50 shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-xl whitespace-pre-wrap font-medium">
              {note.description}
            </p>
          </div>
        </header>

        <footer className="mt-12 flex justify-end">
          <button
            onClick={() => setOpen(true)}
            className="px-8 py-4 bg-zinc-900 dark:bg-orange-500 hover:scale-105 text-white dark:text-black font-black rounded-2xl transition-all shadow-xl shadow-black/10 dark:shadow-orange-500/20"
          >
            Editar Conteúdo
          </button>
        </footer>

        {/* MODAL DE EDIÇÃO (AJUSTADO PARA LIGHT/DARK) */}
        {open && (
          <div className="fixed inset-0 bg-zinc-950/40 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
            <div className="bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 w-full max-w-xl shadow-2xl transition-all">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
                  Editar <span className="text-orange-500">Nota</span>
                </h2>
                <p className="text-zinc-500 text-sm mt-1">
                  Atualize suas informações abaixo
                </p>
              </div>

              <EditNote id={note.id} onClose={() => setOpen(false)} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
