import React, { createContext, useContext, useState, useEffect } from "react";
import type { Note } from "../types/notes";
import { useLocation } from "react-router-dom";

interface NoteContextType {
  notes: Note[];
  currentPage: string;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  onChangeFavorited: (id: string) => void;
  onUpdateNote: (id: string, title: string, description: string) => void;
  updateNote: (id: string, updatedData: Partial<Note>) => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

// ALTERE AQUI: O nome que aparecerá no seu LocalStorage
const STORAGE_NAME = "notes";

export function NoteProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation().pathname;

  // 1. Inicialização: Tenta ler do banco antes de definir o estado
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem(STORAGE_NAME);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return []; // Se o JSON estiver corrompido, evita quebrar o app
      }
    }
    return []; // Se não existir, começa vazio
  });

  const [currentPage, setCurrentPage] = useState<string>(location);

  // 2. Persistência: Sempre que o array de notas mudar, ele salva
  useEffect(() => {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(notes));
  }, [notes]);

  const onChangeFavorited = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isFavorited: !n.isFavorited } : n))
    );
  };

  const onUpdateNote = (id: string, title: string, description: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, title, description } : n))
    );
  };

  const updateNote = (id: string, updatedData: Partial<Note>) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        // Agora o TS entende que updatedData é um objeto que contém campos da Note
        String(note.id) === String(id) ? { ...note, ...updatedData } : note
      )
    );
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        currentPage,
        setNotes,
        setCurrentPage,
        onChangeFavorited,
        onUpdateNote,
        updateNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context)
    throw new Error("useNotes deve ser usado dentro de um NoteProvider");
  return context;
};
