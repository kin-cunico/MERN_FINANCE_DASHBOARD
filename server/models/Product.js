import mongoose from "mongoose";
import { loadType } from "mongoose-currency";
const Schema = mongoose.Schema;
loadType(mongoose);

// the schema must be equivalent to our db structure
const ProductSchema = new Schema(
	{
		price: {
			type: mongoose.Types.Currency,
			currency: "GBP",
			// divide by 100 because by default our type will be multiplied by 100 by the currency
			get: (v) => v / 100,
		},
		expense: {
			type: mongoose.Types.Currency,
			currency: "GBP",
			// divide by 100 because by default our type will be multiplied by 100 by the currency
			get: (v) => v / 100,
		},
		transactions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Transaction",
			},
		],
	},
	{ timestamps: true, toJSON: { getters: true } }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
