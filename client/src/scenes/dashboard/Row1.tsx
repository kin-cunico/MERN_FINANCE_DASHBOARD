import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useMemo } from "react";
import { useTheme } from "@mui/material";

import {
	ResponsiveContainer,
	AreaChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Area,
	LineChart,
	Line,
	Legend,
	Bar,
	BarChart,
} from "recharts";
import BoxHeader from "@/components/BoxHeader";

const Row1 = () => {
	const { data } = useGetKpisQuery();
	const { palette } = useTheme();
	console.log("🚀 data: ", data);

	const revenueExpenses = useMemo(() => {
		return (
			data &&
			data[0].monthlyData.map(({ month, revenue, expenses }) => {
				return {
					name: month.substring(0, 3),
					revenue: revenue,
					expenses: expenses,
				};
			})
		);
	}, [data]);

	const revenueProfit = useMemo(() => {
		return (
			data &&
			data[0].monthlyData.map(({ month, revenue, expenses }) => {
				return {
					name: month.substring(0, 3),
					revenue: revenue,
					profit: (revenue - expenses).toFixed(2),
				};
			})
		);
	}, [data]);

	const revenue = useMemo(() => {
		return (
			data &&
			data[0].monthlyData.map(({ month, revenue }) => {
				return {
					name: month.substring(0, 3),
					revenue: revenue,
				};
			})
		);
	}, [data]);

	return (
		<>
			<DashboardBox gridArea="a">
				<BoxHeader
					title="Revenue and Expenses"
					sideText="+4%"
					subtitle="purple represents expenses, and yellow represents revenue"
				></BoxHeader>
				<ResponsiveContainer
					width="100%"
					height="100%"
				>
					<AreaChart
						width={500}
						height={400}
						data={revenueExpenses}
						margin={{
							top: 15,
							right: 20,
							left: -10,
							bottom: 60,
						}}
					>
						<CartesianGrid strokeDasharray="1 0" />
						<defs>
							<linearGradient
								id="colorRevenue"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor={palette.secondary[500]}
									stopOpacity={0.5}
								></stop>
								<stop
									offset="95%"
									stopColor={palette.secondary[700]}
									stopOpacity={0}
								></stop>
							</linearGradient>
							<linearGradient
								id="colorExpenses"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor={palette.red[500]}
									stopOpacity={0.5}
								></stop>
								<stop
									offset="95%"
									stopColor={palette.red[700]}
									stopOpacity={0}
								></stop>
							</linearGradient>
						</defs>
						<XAxis
							dataKey="name"
							tickLine={false}
							style={{ fontSize: "12px" }}
						/>
						<YAxis
							tickLine={false}
							style={{ fontSize: "12px" }}
							axisLine={{ strokeWidth: "0" }}
							domain={[10000, 25000]}
						/>
						<Tooltip formatter={(v) => `£${v}`} />
						<Area
							type="monotone"
							dataKey="revenue"
							stroke={palette.secondary[500]}
							fillOpacity={1}
							fill="url(#colorRevenue)"
						/>
						<CartesianGrid strokeDasharray="1 0" />
						<Area
							type="monotone"
							dataKey="expenses"
							stroke={palette.red[500]}
							fillOpacity={1}
							fill="url(#colorExpenses)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</DashboardBox>
			<DashboardBox gridArea="b">
				<BoxHeader
					title="Revenue and Expenses"
					sideText="+4%"
					subtitle="blue represents profit, and yellow represents revenue"
				></BoxHeader>
				<ResponsiveContainer
					width="100%"
					height="100%"
				>
					<LineChart
						width={500}
						height={400}
						data={revenueProfit}
						margin={{
							top: 20,
							right: 0,
							left: -10,
							bottom: 50,
						}}
					>
						<XAxis
							dataKey="name"
							tickLine={false}
							style={{ fontSize: "12px" }}
						/>
						<YAxis
							tickLine={false}
							style={{ fontSize: "12px" }}
							axisLine={false}
							yAxisId="left"
						/>
						<YAxis
							tickLine={false}
							style={{ fontSize: "12px" }}
							axisLine={false}
							orientation="right"
							yAxisId="right"
						/>
						<Tooltip formatter={(v) => `£${v}`} />
						<Legend
							height={20}
							wrapperStyle={{
								margin: "0 0 10px 0",
							}}
						/>
						<Line
							yAxisId="left"
							type="monotone"
							dataKey="profit"
							stroke={palette.tertiary[500]}
						/>
						<linearGradient
							id="colorRevenue"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="5%"
								stopColor={palette.secondary[500]}
								stopOpacity={0.5}
							></stop>
							<stop
								offset="95%"
								stopColor={palette.secondary[700]}
								stopOpacity={0}
							></stop>
						</linearGradient>
						<defs>
							<linearGradient
								id="colorRevenue"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor={palette.secondary[500]}
									stopOpacity={0.9}
								></stop>
								<stop
									offset="95%"
									stopColor={palette.secondary[700]}
									stopOpacity={0}
								></stop>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<Line
							yAxisId="right"
							type="monotone"
							dataKey="revenue"
							stroke={palette.secondary[500]}
						/>
					</LineChart>
				</ResponsiveContainer>
			</DashboardBox>
			<DashboardBox gridArea="c">
				<BoxHeader
					title="Revenue month by month"
					sideText="+4%"
					subtitle="month by month revenue representation"
				></BoxHeader>
				<ResponsiveContainer
					width="100%"
					height="100%"
				>
					<BarChart
						width={500}
						height={300}
						data={revenue}
						margin={{
							top: 20,
							right: 15,
							left: -10,
							bottom: 50,
						}}
					>
						<CartesianGrid
							vertical={false}
							stroke={palette.primary.main}
						/>
						<XAxis
							dataKey="name"
							axisLine={false}
							tickLine={false}
							style={{ fontSize: "10px" }}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							style={{ fontSize: "10px" }}
						/>
						<Tooltip formatter={(v) => `£${v}`} />
						<Bar
							dataKey="revenue"
							fill="url(#colorRevenue)"
						/>
					</BarChart>
				</ResponsiveContainer>
			</DashboardBox>
		</>
	);
};

export default Row1;
