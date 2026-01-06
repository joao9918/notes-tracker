import type { Note } from "../../types/notes";
import { FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

type CreateNewNotesProps = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

export function CreateNewNotes({ notes, setNotes }: CreateNewNotesProps) {
  const navigate = useNavigate();

  function onSeeDetailsClick(id: string) {
    navigate(`/note/${id}`);
  }

  function onChangeFavorited(id: string) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isFavorited: !note.isFavorited } : note
      )
    );
  }

  // Função para mover para lixeira ao invés de deletar
  function moveToTrash(id: string) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, inTrash: true } : note
      )
    );
  }

  return (
    <>
      {notes.map((note: Note) => (
        <div
          onClick={() => onSeeDetailsClick(note.id)}
          key={note.id}
          // bg-white no modo claro, bg-zinc-900 no escuro com efeito de brilho na borda
          className="group p-6 h-40 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 rounded-xl hover:border-orange-500/60 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all cursor-pointer relative overflow-hidden"
        >
          {/* Detalhe visual: Uma linha laranja sutil no topo que aparece no hover */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

          <div className="flex flex-col h-full">
            <h3 className="font-bold text-xl mb-2 text-zinc-800 dark:text-orange-500 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              {note.title}
            </h3>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
              {note.description}
            </p>

            {/* Container de Ações Flutuantes - Só aparecem ou ganham cor no hover do card */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                  moveToTrash(note.id); // Usando a lógica de lixeira agora!
                }}
              >
                <IoMdClose size={22} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
