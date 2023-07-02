import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const daySchema = new Schema(
	{
		date: String,
		revenue: {
			type: mongoose.Types.Currency,
			currency: "GBP",
			// divide by 100 because by default our type will be multiplied by 100 by the currency
			get: (v) => v / 100,
		},
		expenses: {
			type: mongoose.Types.Currency,
			currency: "GBP",
			// divide by 100 because by default our type will be multiplied by 100 by the currency
			get: (v) => v / 100,
		},
	},
	{ toJSON: { getters: true } }
);

const monthSchema = new Schema(
	{
		month: String,
		revenue: {
			type: mongoose.Types.Currency,
			currency: "GBP",
			// divide by 100 because by default our type will be multiplied by 100 by the currency
			get: (v) => v / 100,
		},
		expenses: {
			type: mongoose.Types.Currency,
			currency: "GBP",
			// divide by 100 because by default our type will be multiplied by 100 by the currency
			get: (v) => v / 100,
		},
		operationalExpenses: {
			type: mongoose.Types.Currency,
			currency: "GBP",
			// divide by 100 because by default our type will be multiplied by 100 by the currency
			get: (v) => v / 100,
		},
		nonOperationalExpenses: {
			type: mongoose.Types.Currency,
			currency: "GBP",
			// divide by 100 because by default our type will be multiplied by 100 by the currency
			get: (v) => v / 100,
		},
	},

	//to set the get to true
	{ toJSON: { getters: true } }
);

// the schema must be equivalent to our db structure
const KPISchema = new Schema(
	{
		totalProfit: {
			type: mongoose.Types.Currency,
			currency: "GBP",
			// divide by 100 because by default our type will be multiplied by 100 by the currency
			get: (v) => v / 100,
		},
		totalRevenue: {
			type: mongoose.Types.Currency,
			currency: "GBP",
			// divide by 100 because by default our type will be multiplied by 100 by the currency
			get: (v) => v / 100,
		},
		totalExpenses: {
			type: mongoose.Types.Currency,
			currency: "GBP",
			// divide by 100 because by default our type will be multiplied by 100 by the currency
			get: (v) => v / 100,
		},
		expenseByCategory: {
			type: Map,
			of: {
				type: mongoose.Types.Currency,
				currency: "GBP",
				get: (v) => v / 100,
			},
		},
		monthlyData: [monthSchema],
		dailyData: [daySchema],
	},
	{ timestamps: true, toJSON: { getters: true } }
);

const KPI = mongoose.model("KPI", KPISchema);

export default KPI;
