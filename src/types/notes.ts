export type Note = {
  id: string;
  title: string;
  description: string;
  date?: string;
  isFavorited: boolean;
  inTrash: boolean;
};
