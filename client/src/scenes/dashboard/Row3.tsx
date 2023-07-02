import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
	useGetKpisQuery,
	useGetProductsQuery,
	useGetTransactionsQuery,
} from "@/state/api";

import { Box, Typography, useTheme } from "@mui/material";

import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
	const { data: kpiData } = useGetKpisQuery();
	const { data: productData } = useGetProductsQuery();
	const { data: transactionsData } = useGetTransactionsQuery();

	const productColumns = [
		{
			field: "_id",
			headerName: "id",
			flex: 1,
		},
		{
			field: "expense",
			headerName: "Expense",
			flex: 0.5,
			renderCell: (params: GridCellParams) => `£${params.value}`,
		},
		{
			field: "price",
			headerName: "Price",
			flex: 0.5,
			renderCell: (params: GridCellParams) => `£${params.value}`,
		},
	];

	const transactionsColumns = [
		{
			field: "_id",
			headerName: "id",
			flex: 1.2,
		},
		{
			field: "buyer",
			headerName: "Buyer",
			flex: 1,
		},
		{
			field: "amount",
			headerName: "Amount",
			flex: 0.4,
			renderCell: (params: GridCellParams) => `£${params.value}`,
		},
		{
			field: "productIds",
			headerName: "Count",
			flex: 0.1,
			renderCell: (params: GridCellParams) =>
				(params.value as Array<string>).length,
		},
	];
	const { palette } = useTheme();

	return (
		<>
			<DashboardBox gridArea="g">
				<BoxHeader
					title="List of Products"
					sideText={`${productData?.length} products`}
				/>
				<Box
					mt=".5rem"
					p="0 0.5rem"
					height="75%"
					sx={{
						"& .MuiDataGrid-root": {
							color: palette.grey[300],
							border: "none",
						},
						"& .MuiDataGrid-cell": {
							borderBottom: `1px solid ${palette.grey[700]} !important`,
						},
						"& .MuiDataGrid-columnHeaders": {
							borderBottom: `1px solid ${palette.grey[500]} !important`,
							color: palette.primary.main,
						},
						"& .MuiDataGrid-columnSeparator": {
							visibility: "hidden",
						},
					}}
				>
					<DataGrid
						columnHeaderHeight={25}
						rowHeight={35}
						hideFooter={true}
						rows={productData || []}
						columns={productColumns}
					/>
				</Box>
			</DashboardBox>
			<DashboardBox gridArea="h">
				<BoxHeader
					title="Latest Orders"
					sideText={`${transactionsData?.length} latest transactions`}
				/>
				<Box
					mt="1rem"
					p="0 0.5rem"
					height="80%"
					sx={{
						"& .MuiDataGrid-root": {
							color: palette.grey[300],
							border: "none",
						},
						"& .MuiDataGrid-cell": {
							borderBottom: `1px solid ${palette.grey[700]} !important`,
						},
						"& .MuiDataGrid-columnHeaders": {
							borderBottom: `1px solid ${palette.grey[500]} !important`,
							color: palette.primary.main,
						},
						"& .MuiDataGrid-columnSeparator": {
							visibility: "hidden",
						},
					}}
				>
					<DataGrid
						columnHeaderHeight={25}
						rowHeight={35}
						hideFooter={true}
						rows={transactionsData || []}
						columns={transactionsColumns}
					/>
				</Box>
			</DashboardBox>
			<DashboardBox gridArea="i">
				<BoxHeader
					title="We grow together"
					sideText="+2% staff monthly"
				/>

				<Typography
					m="0 1rem"
					variant="h6"
					color={palette.primary[400]}
				>
					Over the last 4 years, we have managed to grow our sales by nearly
					40%. With this, we have increased every year at least 24% new
					employees.
					<br />
					This year, again thanks to you, we have managed to hit our targets,
					resulting in our best year so far. <br />
					We are proud to announce that every employee will have their salaries
					matched with inflation, as well as reduced hours from 34.5 hours
					weekly, to 30.
				</Typography>
			</DashboardBox>
			<DashboardBox gridArea="j">
				<BoxHeader
					title="Summary"
					sideText="What to expect?"
				/>
				<Typography
					m="0 1rem"
					variant="h6"
					color={palette.primary[400]}
				>
					We have many plans for our next year. We are pleased to announce that
					we will keep increasing personnel both in office and WFH. With this,
					we plan on reducing the hours worked by current staff, whilst keeping
					current salaries. <br></br>Also, we will have a new division: HQ
					Milan. This new division will be expanding our current products to
					Italy. We have posted our current open vacancies for this new HQ, so
					if you're interested in working and living in Milan,{" "}
					<a href="/">apply here.</a>
				</Typography>
			</DashboardBox>
		</>
	);
};

export default Row3;
