export type Note = {
  id: string;
  title: string;
  description: string;
  date?: string; // opcional
  isFavorited: boolean;
  inTrash: boolean;
};
