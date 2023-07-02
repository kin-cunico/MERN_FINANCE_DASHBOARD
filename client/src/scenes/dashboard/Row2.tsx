import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";

import {
	ResponsiveContainer,
	AreaChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Area,
	PieChart,
	Pie,
	Cell,
	Scatter,
	ScatterChart,
	ZAxis,
} from "recharts";
import BoxHeader from "@/components/BoxHeader";
import FlexBetween from "@/components/FlexBetween";

const Row2 = () => {
	const { data: productData } = useGetProductsQuery();
	const { data: operationalData } = useGetKpisQuery();
	const { palette } = useTheme();

	const pieColor = [palette.primary[600], palette.secondary.main];
	const pieData = [
		{
			name: "Group A",
			value: 4520,
		},
		{
			name: "Group B",
			value: 5198,
		},
	];

	const operationalExpenses = useMemo(() => {
		return (
			operationalData &&
			operationalData[0].monthlyData.map(
				({ month, operationalExpenses, nonOperationalExpenses }) => {
					return {
						name: month.substring(0, 3),
						"Operational Expenses": operationalExpenses,
						"Non Operational Expenses": nonOperationalExpenses,
					};
				}
			)
		);
	}, [operationalData]);

	const productExpenseData = useMemo(() => {
		return (
			productData &&
			productData.map(({ _id, price, expense }) => {
				return {
					id: _id,
					price: price,
					expense: expense,
				};
			})
		);
	}, [productData]);

	return (
		<>
			<DashboardBox gridArea="d">
				<BoxHeader
					title="Operational vs Non-operational expenses"
					sideText="+4%"
					subtitle="red represents non operational expenses, yellow represents operational expenses"
				></BoxHeader>
				<ResponsiveContainer
					width="100%"
					height="100%"
				>
					<AreaChart
						width={500}
						height={400}
						data={operationalExpenses}
						margin={{
							top: 15,
							right: 20,
							left: 10,
							bottom: 60,
						}}
					>
						<CartesianGrid strokeDasharray="0 1" />
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
									// eslint-disable-next-line
									stopColor={palette.red[500]}
									stopOpacity={0.5}
								></stop>
								<stop
									offset="95%"
									// eslint-disable-next-line
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
							domain={[0, 12000]}
							tickFormatter={(v) => `£${v}`}
						/>
						<Tooltip />
						<Area
							type="monotone"
							dataKey="Operational Expenses"
							stroke={palette.secondary[500]}
							fillOpacity={1}
							fill="url(#colorRevenue)"
						/>
						<CartesianGrid strokeDasharray="1 0" />
						<Area
							type="monotone"
							dataKey="Non Operational Expenses"
							// eslint-disable-next-line
							stroke={palette.red[500]}
							fillOpacity={1}
							fill="url(#colorExpenses)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</DashboardBox>
			<DashboardBox gridArea="e">
				<BoxHeader
					title="Sale Campaign for newest product:"
					sideText="+15%"
				></BoxHeader>
				<FlexBetween
					mt="0.2rem"
					gap="1rem"
					pr="1rem"
				>
					<PieChart
						width={110}
						height={100}
						margin={{
							top: 0,
							right: -10,
							left: 10,
							bottom: 0,
						}}
					>
						<Pie
							dataKey="value"
							startAngle={180}
							endAngle={0}
							data={pieData}
							innerRadius={20}
							outerRadius={40}
							fill="#8884d8"
							stroke="none"
						>
							{pieData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={pieColor[index]}
								/>
							))}
						</Pie>
					</PieChart>
					<Box
						ml="-1rem"
						flexBasis="50%"
						textAlign="center"
					>
						<Typography variant="h5">Target sales:</Typography>
						<Typography
							m=".5rem"
							variant="h3"
							color={palette.primary[600]}
						>
							4520
						</Typography>
						<Typography variant="h6">Goal of the campaign</Typography>
					</Box>
					<Box
						mr="-1rem"
						flexBasis="50%"
						textAlign="center"
					>
						<Typography variant="h5">Sales achieved:</Typography>
						<Typography
							m=".5rem"
							variant="h3"
							color={palette.secondary.main}
						>
							5198
						</Typography>
						<Typography variant="h6">Result of the campaign</Typography>
					</Box>
				</FlexBetween>
			</DashboardBox>
			<DashboardBox gridArea="f">
				<BoxHeader
					title="Product prices vs expenses:"
					sideText="+4%"
				></BoxHeader>
				<ResponsiveContainer
					width="100%"
					height={230}
				>
					<ScatterChart
						margin={{
							top: 20,
							right: 40,
							bottom: 40,
							left: -10,
						}}
					>
						<CartesianGrid stroke={palette.grey[300]} />
						<XAxis
							type="number"
							dataKey="price"
							name="price"
							tickFormatter={(v) => `£${v}`}
							axisLine={false}
							tickLine={false}
						/>
						<YAxis
							type="number"
							dataKey="expense"
							name="expense"
							tickFormatter={(v) => `£${v}`}
							axisLine={false}
							tickLine={false}
						/>
						<ZAxis
							type="number"
							range={[20]}
						/>
						<Tooltip formatter={(v) => `£${v}`} />

						<Scatter
							name="Product Expense Ratio"
							data={productExpenseData}
							fill={palette.secondary[500]}
						/>
					</ScatterChart>
				</ResponsiveContainer>
			</DashboardBox>
		</>
	);
};

export default Row2;
