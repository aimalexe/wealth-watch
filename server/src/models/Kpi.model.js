import mongoose from "mongoose";
import { createCurrencyField } from "../utilities/createCurrencyField.js";

const { Schema } = mongoose;

// Schema for days
const daySchema = new Schema(
    {
        date: String,
        revenue: createCurrencyField(),
        expenses: createCurrencyField(),
    },
    { toJSON: { getters: true } } // Enable getters in the JSON output
);

// Schema for months
const monthSchema = new Schema(
    {
        month: String,
        revenue: createCurrencyField(),
        expenses: createCurrencyField(),
        operationalExpenses: createCurrencyField(),
        nonOperationalExpenses: createCurrencyField(),
    },
    { toJSON: { getters: true } }
);

// Define the schema for KPIs
const kpiSchema = new Schema(
    {
        totalProfit: createCurrencyField(),
        totalRevenue: createCurrencyField(),
        totalExpenses: createCurrencyField(),
        expensesByCategory: {
            type: Map,
            of: createCurrencyField(),
        },
        monthlyData: [monthSchema],
        dailyData: [daySchema],
    },
    {
        timestamps: true,
        toJSON: { getters: true },
    }
);

const Kpi = mongoose.model("KPI", kpiSchema);
export default Kpi; 
