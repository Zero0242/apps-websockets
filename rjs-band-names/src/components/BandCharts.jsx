import { useContext, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { IOEvent } from "../config";
import { SocketContext } from "../context";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../shad/components/ui/chart";
const chartConfig = {
  votes: {
    label: "Votos",
    color: "#2563eb",
  },
};

export const BandCharts = () => {
  const { socket } = useContext(SocketContext);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    socket.on(IOEvent.bands, (vals) => setBands(vals));

    return () => {
      socket.off(IOEvent.bands);
    };
  }, [socket]);

  return (
    <>
      <ChartContainer
        config={chartConfig}
        className="min-h-[150px]  max-h-[400px] overflow-y-scroll w-full"
      >
        <BarChart accessibilityLayer layout="vertical" data={bands}>
          <CartesianGrid vertical />
          <XAxis type="number" dataKey="votes" />
          <YAxis type="category" dataKey="name" />
          <Bar
            layout="horizontal"
            dataKey="votes"
            fill="var(--color-votes)"
            radius={2}
          />
          <ChartTooltip content={<ChartTooltipContent />}></ChartTooltip>
          <ChartLegend content={<ChartLegendContent />}></ChartLegend>
        </BarChart>
      </ChartContainer>
    </>
  );
};
