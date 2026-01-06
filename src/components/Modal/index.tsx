import { useState } from "react";
import { v4 } from "uuid";
import type { Note } from "../../types/notes";

type modalChildren = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNotes?: React.Dispatch<React.SetStateAction<Note[]>>;
  isQuickNote?: boolean;
};

export function Modal({ open, setOpen, setNotes, isQuickNote }: modalChildren) {
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const handleClose = () => {
    setInputDescription("");
    setInputTitle("");
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl w-100 shadow-2xl border border-zinc-200 dark:border-zinc-800 transition-all">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-orange-500 mb-6 dark:drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">
              {isQuickNote ? "⚡ Nota Rápida" : "Criar Nova Nota"}
            </h1>

            <div className="space-y-5">
              {/* esconde o campo de título se for nota rápida */}
              {!isQuickNote && (
                <div>
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                    Título da Tarefa
                  </label>
                  <input
                    required
                    autoFocus
                    onChange={(event) =>
                      setInputTitle(event.currentTarget.value)
                    }
                    value={inputTitle}
                    type="text"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white 
                               border border-zinc-200 dark:border-zinc-700 outline-none 
                               focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                    placeholder="Ex: Estudar React"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Descrição da Tarefa
                </label>
                <textarea
                  required
                  // somente descrição se for nota rápida
                  autoFocus={isQuickNote}
                  onChange={(e) => setInputDescription(e.currentTarget.value)}
                  value={inputDescription}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white 
                               border border-zinc-200 dark:border-zinc-700 outline-none 
                               focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all h-32 resize-none"
                  placeholder="O que você está pensando?"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 
                             hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors font-medium"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  // se for nota rapida, usa titulo pre-definido
                  const finalTitle = isQuickNote ? "Nota Rápida" : inputTitle;

                  // nao deixa criar nota sem descrição
                  if (!inputDescription.trim()) return;

                  const newNote = {
                    id: v4(),
                    title: finalTitle,
                    description: inputDescription,
                    date: new Date().toLocaleDateString("pt-BR"),
                    isFavorited: false,
                    inTrash: false,
                  };

                  if (setNotes) {
                    setNotes((prev) => [...prev, newNote]);
                  }
                  handleClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-orange-500 text-white dark:text-black 
                             font-bold hover:bg-zinc-800 dark:hover:bg-orange-400 transition-all 
                             dark:shadow-[0_0_20px_rgba(249,115,22,0.3)] active:scale-95"
              >
                Criar nota
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
