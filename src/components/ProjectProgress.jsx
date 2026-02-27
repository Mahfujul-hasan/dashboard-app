import { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";

const ProjectProgress = () => {
  const [chartData, setChartData] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          "https://task-api-eight-flax.vercel.app/api/dashboard",
        );

        if (!res.ok) throw new Error("Failed to fetch data");

        const result = await res.json();
        const { totalUsers, activeUsers, growth } = result.overview;

        if (!totalUsers) {
          setLoading(false);
          return;
        }

        // Safe percentage calculation
        const completedVal = Math.min(
          100,
          Math.round((activeUsers / totalUsers) * 100),
        );

        const inProgressVal = Math.min(growth, 100 - completedVal);
        const pendingVal = Math.max(0, 100 - completedVal - inProgressVal);

        setCompleted(completedVal);

        setChartData([
          { id: "Completed", value: completedVal, color: "#166534" },
          { id: "In Progress", value: inProgressVal, color: "#4ADE80" },
          { id: "Pending", value: pendingVal, color: "url(#hatchPattern)" },
        ]);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading)
    return (
      <div className="bg-white p-4 rounded-2xl shadow-sm">
        <p className="text-sm text-gray-500">Loading project progress...</p>
      </div>
    );

  if (error)
    return (
      <div className="bg-white p-4 rounded-2xl shadow-sm">
        <p className="text-sm text-red-500">Error: {error}</p>
      </div>
    );

  // Custom Center Label
  const CenterLabel = ({ centerX, centerY }) => (
    <>
      <text
        x={centerX}
        y={centerY - 10}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: 30,
          fontWeight: 700,
          fill: "#111827",
        }}
      >
        {completed}%
      </text>
      <text
        x={centerX}
        y={centerY + 18}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: 12,
          fill: "#6B7280",
          letterSpacing: 1,
        }}
      >
        PROJECT COMPLETED
      </text>
    </>
  );

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm w-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Project Progress
      </h2>

      <div className="w-full h-56 relative">
        {/* SVG Pattern for Pending */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <pattern
              id="hatchPattern"
              patternUnits="userSpaceOnUse"
              width="6"
              height="6"
              patternTransform="rotate(45)"
            >
              <rect width="3" height="6" fill="#D1D5DB" />
              <rect x="3" width="3" height="6" fill="white" />
            </pattern>
          </defs>
        </svg>

        <ResponsivePie
          data={chartData}
          startAngle={-90}
          endAngle={90}
          innerRadius={0.75} // Thicker modern look
          // padAngle={2}
          cornerRadius={8}
          activeOuterRadiusOffset={10}
          colors={({ data }) => data.color}
          enableArcLinkLabels={false}
          enableArcLabels={false}
          isInteractive={true}
          animate={true}
          motionConfig="gentle"
          tooltip={({ datum }) => (
            <div className="bg-white shadow-lg rounded-xl px-3 py-2 text-xs font-medium text-gray-700 border">
              {datum.id}: {datum.value}%
            </div>
          )}
          layers={["arcs", CenterLabel]}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        />
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <LegendItem color="#166534" label="Completed" />
        <LegendItem color="#4ADE80" label="In Progress" />
        <LegendItem isHatch label="Pending" />
      </div>
    </div>
  );
};

function LegendItem({ color, label, isHatch }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      {isHatch ? (
        <svg width="14" height="14" viewBox="0 0 14 14">
          <defs>
            <pattern
              id="legendHatch"
              patternUnits="userSpaceOnUse"
              width="4"
              height="4"
              patternTransform="rotate(45)"
            >
              <rect width="2" height="4" fill="#D1D5DB" />
              <rect x="2" width="2" height="4" fill="white" />
            </pattern>
          </defs>
          <circle
            cx="7"
            cy="7"
            r="6"
            fill="url(#legendHatch)"
            stroke="#D1D5DB"
            strokeWidth="0.5"
          />
        </svg>
      ) : (
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
      {label}
    </div>
  );
}

export default ProjectProgress;
