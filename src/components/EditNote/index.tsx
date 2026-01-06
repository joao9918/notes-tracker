import { useState } from "react";
import { useNotes } from "../../contexts/NoteContext";

type EditNoteProps = {
  id: string;
  onClose: () => void;
};

export function EditNote({ id, onClose }: EditNoteProps) {
  const { notes, setNotes } = useNotes();
  const note = notes.find((n) => n.id === id);

  const [title, setTitle] = useState(note?.title || "");
  const [description, setDescription] = useState(note?.description || "");

  if (!note) return null;

  const handleSave = () => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, title, description } : n))
    );
    onClose();
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">
          Título da Nota
        </label>
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Dê um título para sua ideia..."
          className="w-full p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all font-bold text-lg"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">
          Conteúdo
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva os detalhes..."
          className="w-full p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all h-40 resize-none leading-relaxed"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-3 rounded-xl font-bold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
        >
          Cancelar
        </button>

        <button
          onClick={handleSave}
          className="flex-2 bg-orange-500 hover:bg-orange-600 text-white dark:text-black px-4 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all active:scale-[0.98]"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
