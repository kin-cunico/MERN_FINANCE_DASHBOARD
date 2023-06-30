import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponsive } from "./types";

export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
	reducerPath: "main",
	tagTypes: ["Kpis"], //tag to save our KPIs from our endpoints

	// create API CALLS ENDPOINT to get KPIS
	endpoints: (build) => ({
		// passing "void" arguments to remove typescript error until we set the correct arguments to pass

		getKpis: build.query<Array<GetKpisResponsive>, void>({
			query: () => "kpi/kpis/",
			providesTags: ["Kpis"],
		}),
	}),
});

//note useGetKpisQuery is using the getKpis > query, with the "use" method from redux
export const { useGetKpisQuery } = api;
