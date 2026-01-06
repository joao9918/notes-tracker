import type { Note } from "../../types/notes";
import { FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

type CreateNewNotesProps = {
  note: Note;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

export function CreateNewNotes({ note, setNotes }: CreateNewNotesProps) {
  const navigate = useNavigate();

  function onSeeDetailsClick(id: string) {
    navigate(`/note/${id}`);
  }

  function onChangeFavorited(id: string) {
    setNotes((prevNotes) =>
      prevNotes.map((n) =>
        n.id === id ? { ...n, isFavorited: !n.isFavorited } : n
      )
    );
  }

  function moveToTrash(id: string) {
    setNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === id ? { ...n, inTrash: true } : n))
    );
  }

  return (
    <div
      onClick={() => onSeeDetailsClick(note.id)}
      className="group p-6 h-40 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 rounded-xl hover:border-orange-500/60 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
    >
      {/* 1. Barra Laranja no Topo: Sempre visível se for favorita, aparece no hover se não for */}
      <div
        className={`absolute top-0 left-0 w-full h-1 transition-transform origin-left duration-300
        ${
          note.isFavorited
            ? "scale-x-100 bg-orange-500"
            : "scale-x-0 group-hover:scale-x-100 bg-orange-500/50"
        }
      `}
      />

      {/* 2. Estrela sutil no canto superior (Opcional: apenas se você quiser um ícone extra) */}
      {note.isFavorited && (
        <div className="absolute top-3 right-3 text-orange-500">
          <FaStar size={14} className="drop-shadow-sm" />
        </div>
      )}

      <div className="flex flex-col h-full">
        {/* Título: Apenas muda a cor se for favorito */}
        <h3
          className={`font-bold text-xl mb-2 transition-colors duration-300
          ${
            note.isFavorited
              ? "text-orange-600 dark:text-orange-500"
              : "text-zinc-800 dark:text-zinc-100"
          }
        `}
        >
          {note.title}
        </h3>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
          {note.description}
        </p>

        {/* BOTÕES PARA DESKTOP */}
        <div className="absolute bottom-4 right-4 hidden md:flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-30">
          <button
            title="Favoritar"
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onChangeFavorited(note.id);
            }}
          >
            <FaStar
              className={`transition-all ${
                note.isFavorited
                  ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                  : "text-zinc-300 dark:text-zinc-600"
              }`}
              size={18}
            />
          </button>

          <button
            title="Mover para lixeira"
            className="p-1.5 rounded-full hover:bg-red-500/10 text-zinc-300 dark:text-zinc-600 hover:text-red-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              moveToTrash(note.id);
            }}
          >
            <IoMdClose size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
