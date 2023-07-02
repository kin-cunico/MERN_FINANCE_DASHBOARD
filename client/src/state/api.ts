import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	GetKpisResponse,
	GetProductsResponse,
	GetTransactionsResponse,
} from "./types";

export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
	reducerPath: "main",
	tagTypes: ["Kpis", "Products", "Transactions"], //tag to save our KPIs from our endpoints

	// create API CALLS ENDPOINT to get KPIS
	endpoints: (build) => ({
		getKpis: build.query<Array<GetKpisResponse>, void>({
			query: () => "kpi/kpis/",
			providesTags: ["Kpis"],
		}),
		getProducts: build.query<Array<GetProductsResponse>, void>({
			query: () => "product/products/",
			providesTags: ["Products"],
		}),
		getTransactions: build.query<Array<GetTransactionsResponse>, void>({
			query: () => "transaction/transactions/",
			providesTags: ["Transactions"],
		}),
	}),
});

//note useGetKpisQuery is using the getKpis > query, with the "use" method from redux
export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } =
	api;
