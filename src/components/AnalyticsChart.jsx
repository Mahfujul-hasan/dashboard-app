import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
  Tooltip,
} from "recharts";

// --- Move CustomTooltip outside of component ---
const CustomTooltip = ({ active, payload, growth }) => {
  if (active && payload && payload.length) {
    const { views, isHighest, isLowest } = payload[0].payload;
    return (
      <div className="bg-white shadow-md p-2 rounded-md border border-gray-200 text-sm">
        <p className="font-semibold text-gray-700">Views: {views}</p>
        {isHighest && growth && (
          <p className="text-green-600 font-semibold">Growth: {growth}%</p>
        )}
        {isLowest && <p className="text-red-500 font-semibold">Lowest</p>}
      </div>
    );
  }
  return null;
};

const ProjectAnalyticsChart = () => {
  const [data, setData] = useState([]);
  const [growth, setGrowth] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          "https://task-api-eight-flax.vercel.app/api/dashboard",
        );
        const result = await res.json();

        const analyticsData = result.analytics;
        const maxViews = Math.max(...analyticsData.map((d) => d.views));
        const minViews = Math.min(...analyticsData.map((d) => d.views));

        const formattedData = analyticsData.map((item) => ({
          day: new Date(item.date).toLocaleDateString("en-US", {
            weekday: "short",
          })[0],
          views: item.views,
          isHighest: item.views === maxViews,
          isLowest: item.views === minViews,
        }));

        setData(formattedData);
        setGrowth(result.overview.growth);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="bg-white p-3 sm:p-4 rounded-2xl w-full shadow-sm h-full min-h-50">
      <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">
        Project Analytics
      </h2>

      <div className="h-48 sm:h-56 md:h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 25, right: 0, left: 0, bottom: 15 }}
          >
            <defs>
              <pattern
                id="stripedPattern"
                patternUnits="userSpaceOnUse"
                width="6"
                height="6"
                patternTransform="rotate(45)"
              >
                <rect width="3" height="6" fill="#CBD5E1" />
              </pattern>
            </defs>

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />

            {/* Pass tooltip component reference and growth as prop */}
            <Tooltip
              content={(props) => <CustomTooltip {...props} growth={growth} />}
              cursor={{ fill: "transparent" }}
            />

            <Bar
              dataKey="views"
              radius={[20, 20, 20, 20]}
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => {
                let fillColor = "url(#stripedPattern)";
                if (entry.isHighest) fillColor = "#064E3B";
                if (entry.isLowest) fillColor = "#6EE7B7";
                return <Cell key={index} fill={fillColor} />;
              })}

              <LabelList
                position="top"
                content={({ x, y, index }) =>
                  data[index]?.isHighest && growth ? (
                    <g>
                      <rect
                        x={x - 22}
                        y={y - 30}
                        width="55"
                        height="22"
                        rx="12"
                        fill="#BBF7D0"
                      />
                      <text
                        x={x + 5}
                        y={y - 15}
                        fill="#065F46"
                        fontSize="12"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        {growth}%
                      </text>
                    </g>
                  ) : null
                }
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectAnalyticsChart;
