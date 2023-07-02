import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useState, useMemo } from "react";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import regression, { DataPoint } from "regression";
import {
	CartesianGrid,
	Label,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
// eslint-disable-next-line
type Props = {};

// eslint-disable-next-line
const Predictions = (props: Props) => {
	const { palette } = useTheme();
	const [isPredictions, setIsPredictions] = useState(false);
	const { data: kpiData } = useGetKpisQuery();

	const formattedData = useMemo(() => {
		if (!kpiData) return [];
		const monthData = kpiData[0].monthlyData;
		const formatted: Array<DataPoint> = monthData.map(
			({ revenue }, i: number) => {
				return [i, revenue];
			}
		);
		const regressionLine = regression.linear(formatted);
		return monthData.map(({ month, revenue }, i: number) => {
			return {
				name: month,
				"Actual Revenue": revenue,
				"Regression Line": regressionLine.points[i][1],
				"Predicted Revenue": regressionLine.predict(i + 12)[1],
			};
		});
	}, [kpiData]);

	return (
		<DashboardBox
			width="100%"
			height="100%"
			p="1rem"
			overflow="hidden"
		>
			<FlexBetween
				m="1rem 2rem"
				gap=".5rem"
			>
				<Box>
					<Typography
						variant="h2"
						color={palette.secondary.main}
					>
						Revenue and Predictions
					</Typography>
					<Typography variant="h6">
						Predicted revenue based on linear regression model
					</Typography>
				</Box>
				<Button
					onClick={() => setIsPredictions(!isPredictions)}
					sx={{
						color: palette.secondary.main,
						bgcolor: palette.primary[900],
						boxShadow: ".1rem .1rem .1rem .05rem black",
					}}
				>
					See predictions for next year
				</Button>
			</FlexBetween>
			<ResponsiveContainer
				width="100%"
				height="100%"
			>
				<LineChart
					data={formattedData}
					margin={{
						top: 20,
						right: 20,
						left: 20,
						bottom: 70,
					}}
				>
					<XAxis
						dataKey="name"
						tickLine={false}
						style={{ fontSize: "12px" }}
					>
						<Label
							value="month"
							offset={-5}
							position="insideBottom"
							stroke={palette.secondary.main}
						></Label>
					</XAxis>
					<YAxis
						tickLine={false}
						style={{ fontSize: "12px" }}
						axisLine={false}
						tickFormatter={(v) => `£${v}`}
						domain={[8500, 30000]}
					>
						<Label
							value="revenue in GBP"
							angle={-90}
							offset={-5}
							position="insideLeft"
							stroke={palette.secondary.main}
						></Label>
					</YAxis>
					<Tooltip formatter={(v) => `£${v}`} />
					<Legend
						height={20}
						verticalAlign="top"
						wrapperStyle={{
							margin: "0 0 10px 0",
						}}
					/>
					<Line
						type="monotone"
						dataKey="Actual Revenue"
						stroke={palette.secondary.light}
						strokeWidth={0}
						dot={{ strokeWidth: 5 }}
					/>
					<CartesianGrid
						vertical={false}
						strokeDasharray="1 0"
					/>
					<Line
						type="monotone"
						dataKey="Regression Line"
						stroke={palette.tertiary[500]}
						dot={false}
					/>
					{isPredictions && (
						<Line
							type="monotone"
							dataKey="Predicted Revenue"
							stroke={palette.primary.light}
						/>
					)}
				</LineChart>
			</ResponsiveContainer>
		</DashboardBox>
	);
};

export default Predictions;
