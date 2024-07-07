import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import kpiRoutes from "./src/routes/kpi.route.js";
import productRoutes from "./src/routes/product.route.js";
import transactionRoute from "./src/routes/transaction.route.js";
/* import Kpi from "./src/models/Kpi.model.js";
import Product from "./src/models/Product.model.js";
import Transaction from "./src/models/Transaction.model.js";
import { kpis, products, transactions } from "./src/data/data.js"; */


/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Routes */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoute);

/* MONGODB SETUP */
const PORT = process.env.PORT || 3030;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL)
    .then(async () => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        /* Add only for the first time or when needed */
        // await mongoose.connection.db.dropDatabase();
        // Product.insertMany(products);
        // Kpi.insertMany(kpis);
        // Transaction.insertMany(transactions);
    })
    .catch(err => console.log(`${err}, failed to connect`));