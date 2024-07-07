import mongoose from "mongoose";
import { createCurrencyField } from "../utilities/createCurrencyField.js";

const { Schema } = mongoose;

// Define the schema for KPIs
const productSchema = new Schema(
    {
        price: createCurrencyField(),
        expense: createCurrencyField(),
        transactions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction"
        }]
    },
    {
        timestamps: true,
        toJSON: { getters: true },
    }
);

const Product = mongoose.model("Product", productSchema);
export default Product; 
