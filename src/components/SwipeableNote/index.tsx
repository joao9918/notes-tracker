import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaStar, FaTrash } from "react-icons/fa";
import { type ReactNode } from "react";

interface SwipeableNoteProps {
  children: ReactNode;
  onFavorite: () => void;
  onDelete: () => void;
}

export function SwipeableNote({
  children,
  onFavorite,
  onDelete,
}: SwipeableNoteProps) {
  const x = useMotionValue(0);

  // Cores de fundo (Laranja para Favorito, Vermelho para Lixeira)
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ef4444", "transparent", "#f97316"]
  );
  const opacityTrash = useTransform(x, [-100, -50], [1, 0]);
  const opacityStar = useTransform(x, [50, 100], [0, 1]);

  return (
    <div className="relative overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800">
      {/* Camada de Fundo (Ações) */}
      <motion.div
        style={{ background }}
        className="absolute inset-0 flex items-center justify-between px-8"
      >
        <motion.div style={{ opacity: opacityStar }}>
          <FaStar className="text-white text-2xl" />
        </motion.div>
        <motion.div style={{ opacity: opacityTrash }}>
          <FaTrash className="text-white text-2xl" />
        </motion.div>
      </motion.div>

      {/* O Card da Nota */}
      <motion.div
        drag={
          typeof window !== "undefined" && window.innerWidth < 768 ? "x" : false
        } // Ativado por padrão
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        // No PC, o arrasto lateral é "travado" pela sensibilidade do clique
        // Mas no celular o touchAction libera o movimento
        style={{
          x,
          touchAction: "pan-y",
        }}
        onDragEnd={(_, info) => {
          // Se o arrasto for real (mais de 80px) dispara a função
          if (info.offset.x > 80) onFavorite();
          else if (info.offset.x < -80) onDelete();
        }}
        // A mágica: md:pointer-events-none faria o card ignorar o mouse,
        // mas queremos apenas que ele não arraste no PC.
        // Vamos usar uma estratégia de "Drag Listener" condicional.
        dragListener={true}
        className="relative z-10 bg-white dark:bg-zinc-900 touch-pan-y"
      >
        {children}
      </motion.div>
    </div>
  );
}
