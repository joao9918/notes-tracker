import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaStar, FaTrash } from "react-icons/fa"; // Ícones padrão
import { type ReactNode, useEffect, useState } from "react";

interface SwipeableNoteProps {
  children: ReactNode;
  onLeftAction: () => void; //arrastar para a esquerda
  onRightAction: () => void; //arrastar para a direita
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftBgColor?: string;
  rightBgColor?: string;
}

export function SwipeableNote({
  children,
  onLeftAction,
  onRightAction,
  leftIcon = <FaTrash />, // padrão
  rightIcon = <FaStar />, //  padrão
  leftBgColor = "#ef4444", // Vermelho
  rightBgColor = "#f97316", // Laranja
}: SwipeableNoteProps) {
  const x = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Cores dinâmicas pelas props
  const background = useTransform(
    x,
    [-100, 0, 100],
    [leftBgColor, "transparent", rightBgColor]
  );

  const opacityLeft = useTransform(x, [-100, -50], [1, 0]);
  const opacityRight = useTransform(x, [50, 100], [0, 1]);

  return (
    <div className="relative overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800 group">
      <motion.div
        style={{ background }}
        className="absolute inset-0 flex items-center justify-between px-8 text-white text-2xl"
      >
        <motion.div style={{ opacity: opacityRight }}>{rightIcon}</motion.div>
        <motion.div style={{ opacity: opacityLeft }}>{leftIcon}</motion.div>
      </motion.div>

      <motion.div
        drag={isMobile ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        style={{ x, touchAction: isMobile ? "pan-y" : "auto" }}
        onDragEnd={(_, info) => {
          if (info.offset.x > 80) onRightAction();
          else if (info.offset.x < -80) onLeftAction();
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
