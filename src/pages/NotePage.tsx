import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotes } from "../contexts/NoteContext";
import { IoMdArrowBack } from "react-icons/io";

export function NotePage() {
  const navigate = useNavigate();
  const { notes, updateNote } = useNotes();
  const { id } = useParams();

  const note = notes.find((n) => String(n.id) === String(id));

  // Estados locais para controlar o texto nos inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Sincroniza o estado local quando a nota carrega ou muda
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
    }
  }, [note?.id]);

  // Salvar no Context (salva no LocalStorage por meio do useEffect)
  const handleAutoSave = (fields: { title?: string; description?: string }) => {
    if (id) {
      updateNote(id, fields);
    }
  };

  if (!note) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white flex-col gap-6 p-4 text-center">
        <div className="text-6xl opacity-20">🔍</div>
        <p className="text-xl font-bold italic opacity-50">
          Ops! Nota não encontrada.
        </p>
        <button
          onClick={() => navigate("/notes")}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all"
        >
          Voltar para a biblioteca
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <main className="max-w-4xl mx-auto w-full p-6 md:p-16">
        {/* BOTÃO VOLTAR */}
        <button
          onClick={() => navigate(-1)}
          className="mb-10 text-zinc-500 hover:text-orange-500 transition-colors flex items-center gap-2 group font-medium"
        >
          <IoMdArrowBack className="group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        <header className="space-y-8">
          {/* TÍTULO */}
          <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                handleAutoSave({ title: e.target.value });
              }}
              placeholder="Título da nota"
              className="w-full bg-transparent text-4xl md:text-6xl font-black text-zinc-900 dark:text-white leading-tight focus:outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-800"
            />
          </div>

          {/* DESCRIÇÃO */}
          <div className="min-h-125">
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                handleAutoSave({ description: e.target.value });
              }}
              placeholder="Comece a escrever sua nota..."
              className="w-full bg-transparent text-zinc-700 dark:text-zinc-300 leading-relaxed text-xl font-medium focus:outline-none resize-none min-h-125 placeholder:text-zinc-300 dark:placeholder:text-zinc-800"
            />
          </div>
        </header>
      </main>
    </div>
  );
}
