import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

// Load the Currency type into Mongoose
loadType(mongoose);

// Helper function to create a Currency type field
export const createCurrencyField = () => ({
    type: mongoose.Types.Currency,
    currency: "USD",
    get: (v) => v / 100,
});
