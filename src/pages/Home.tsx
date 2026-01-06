import { SideBar } from "../components/SideBar";
import { useNotes } from "../contexts/NoteContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { FaStickyNote, FaStar, FaTrash, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { notes, setCurrentPage } = useNotes();
  const navigate = useNavigate();

  // Lógica para estatísticas
  const totalNotes = notes.filter((n) => !n.inTrash).length;
  const favoriteNotes = notes.filter((n) => n.isFavorited && !n.inTrash).length;
  const trashNotes = notes.filter((n) => n.inTrash).length;

  // Dados
  const chartData = [
    { name: "Normais", value: totalNotes - favoriteNotes },
    { name: "Favoritas", value: favoriteNotes },
  ];

  const COLORS = ["#27272a", "#f97316"]; // zinc-800 e orange-500

  return (
    <div className="flex min-h-dvh bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <SideBar />

      <main className="flex-1 md:ml-64 p-6 pt-20 pb-12 md:p-10 md:pt-10 md:pb-0">
        <header className="mb-10">
          <h1 className="text-4xl font-black tracking-tight">
            Dashboard <span className="text-orange-500">Overview</span>
          </h1>
          <p className="text-zinc-500 mt-2">
            Veja o resumo de todas as suas atividades.
          </p>
        </header>

        {/* CARDS DE RESUMO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div
            onClick={() => {
              setCurrentPage("/notes");
              navigate("/notes");
            }}
          >
            <StatCard
              title="Total de Notas"
              value={totalNotes}
              icon={<FaStickyNote className="text-orange-500" />}
            />
          </div>
          <div
            onClick={() => {
              setCurrentPage("/favorites");
              navigate("/favorites");
            }}
          >
            <StatCard
              title="Favoritas"
              value={favoriteNotes}
              icon={<FaStar className="text-yellow-500" />}
            />
          </div>
          <div
            onClick={() => {
              setCurrentPage("/trash");
              navigate("/trash");
            }}
          >
            <StatCard
              title="Na Lixeira"
              value={trashNotes}
              icon={<FaTrash className="text-red-500" />}
            />
          </div>
        </div>

        {/* GRÁFICOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-w-0">
          {/* Card do Gráfico 1 */}
          <div className="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <FaChartLine className="text-orange-500" /> Distribuição de Notas
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b", // zinc-900 para combinar com o card
                      border: "1px solid #27272a", // zinc-800
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <div className="w-3 h-3 rounded-full bg-zinc-800"></div> Normais
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>{" "}
                Favoritas
              </div>
            </div>
          </div>

          {/* Card de Boas-vindas */}
          <div className="hidden lg:block p-8 bg-orange-500 rounded-3xl justify-center text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">
                Produtividade em alta!
              </h2>
              <p className="opacity-90 max-w-70">
                Você já criou {totalNotes} notas até agora. Continue organizando
                suas ideias.
              </p>
              <button
                onClick={() => {
                  setCurrentPage("/notes");
                  navigate("/notes");
                }}
                className="mt-6 bg-black text-white px-6 py-2 rounded-xl font-bold hover:bg-zinc-900 transition-colors"
              >
                Ver todas as notas
              </button>
            </div>
            {/* Elemento decorativo de fundo */}
            <FaStickyNote className="absolute -right-10 -bottom-10 text-white/10 text-[200px] rotate-12 group-hover:rotate-0 transition-transform duration-500" />
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-componente para os cards de estatística
function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center gap-5 hover:border-orange-500/50 transition-all group">
      <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-zinc-500 text-sm font-medium">{title}</p>
        <p className="text-3xl font-black">{value}</p>
      </div>
    </div>
  );
}
