import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

// the schema must be equivalent to our db structure
const TransactionSchema = new Schema(
	{
		buyer: {
			type: mongoose.Types.Currency,
			currency: "GBP",
			// divide by 100 because by default our type will be multiplied by 100 by the currency
			get: (v) => v / 100,
		},
		amount: {
			type: mongoose.Types.Currency,
			currency: "GBP",
			// divide by 100 because by default our type will be multiplied by 100 by the currency
			get: (v) => v / 100,
		},
		productIds: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		],
	},
	{ timestamps: true, toJSON: { getters: true } }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
