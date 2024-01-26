import express from "express";
// import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./config/mongo";
import router from "./routes/index";
import { swaggerSpec } from "./utils/swaggerSpec";
import swaggerUi from "swagger-ui-express";
const app = express();
// app.use(cors());

//Midlewares
app.use(express.json());

// routes
app.use("/api/v1-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", router);
const PORT: string = process.env.PORT as string;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

dbConnect();
