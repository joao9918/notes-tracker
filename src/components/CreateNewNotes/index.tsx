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
      className={`group p-6 h-40 border transition-all cursor-pointer relative overflow-hidden rounded-xl
        ${
          note.isFavorited
            ? "bg-orange-50/50 dark:bg-orange-500/5 border-orange-200 dark:border-orange-500/30 shadow-sm"
            : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800/50"
        } 
        hover:border-orange-500/60 hover:shadow-lg`}
    >
      {/* 1. Indicador de Favorito (Sempre visível se favoritado) */}
      {note.isFavorited && (
        <div className="absolute -top-1 -left-1 z-20">
          <div className="bg-orange-500 text-white p-1.5 rounded-br-xl shadow-md">
            <FaStar size={12} />
          </div>
        </div>
      )}

      {/* 2. Linha no topo decorativa */}
      <div
        className={`absolute top-0 left-0 w-full h-1 transition-transform origin-left
        ${
          note.isFavorited
            ? "bg-orange-500 scale-x-100"
            : "bg-orange-500 scale-x-0 group-hover:scale-x-100"
        }
      `}
      />

      <div className="flex flex-col h-full">
        <h3
          className={`font-bold text-xl mb-2 transition-colors
          ${
            note.isFavorited
              ? "text-orange-600 dark:text-orange-400"
              : "text-zinc-800 dark:text-zinc-100"
          }
        `}
        >
          {note.title}
        </h3>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
          {note.description}
        </p>

        {/* --- BOTÕES PARA DESKTOP --- */}
        {/* max-md:hidden faz sumir no celular | group-hover:opacity-100 faz aparecer no hover do PC */}
        <div className="absolute top-4 right-4 hidden md:flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-30">
          <button
            title="Favoritar"
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={(e) => {
              e.stopPropagation(); // Importante para não abrir a nota ao clicar aqui
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
              e.stopPropagation(); // Importante para não abrir a nota ao clicar aqui
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
