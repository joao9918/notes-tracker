import { useState } from "react";
import { ToggleTheme } from "../ToogleTheme";
import { useNotes } from "../../contexts/NoteContext";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export function SideBar() {
  const navigate = useNavigate();
  const { currentPage, setCurrentPage } = useNotes();
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Controle Mobile

  return (
    <>
      {/* BOTÃO HAMBÚRGUER (apenas no Mobile) */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg text-orange-500"
      >
        <FaBars size={20} />
      </button>

      {/* escurece o fundo quando a sidebar abre no mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
        fixed h-full w-64 border-r border-zinc-400 dark:border-zinc-950 bg-zinc-200 dark:bg-zinc-900 flex flex-col z-50 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
      `}
      >
        {/* Header da Sidebar com botão de fechar no mobile */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
            <span className="text-xl font-bold tracking-tight">
              Notes <span className="text-orange-500">Tracker</span>
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-zinc-500"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Links de Navegação */}
        <nav className="flex flex-col h-full px-4 pb-4 space-y-2">
          {[
            { id: "/", label: "Início", icon: "🏠" },
            { id: "/notes", label: "Minhas Notas", icon: "📝" },
            { id: "/favorites", label: "Favoritos", icon: "⭐" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                navigate(item.id);
                setIsOpen(false); // Fecha ao clicar no mobile
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                currentPage === item.id
                  ? "bg-orange-500/10 text-orange-600 dark:text-orange-500 font-medium"
                  : "text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              <span>{item.icon}</span> {item.label}
            </button>
          ))}

          <div className="flex-1"></div>

          <button
            onClick={() => {
              setCurrentPage("/trash");
              navigate("/trash");
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg border border-transparent transition-all ${
              currentPage === "/trash"
                ? "bg-white dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400"
                : "text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:text-zinc-400"
            }`}
          >
            <span>🗑️</span> Excluídos
          </button>
        </nav>

        <div className="p-4 border-t border-zinc-400 dark:border-zinc-700">
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-full flex items-center justify-between px-3 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg text-sm"
          >
            <ToggleTheme />
          </button>
        </div>
      </aside>
    </>
  );
}
