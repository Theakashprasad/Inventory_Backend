import express from "express";
import dotenv from "dotenv";

import cors from "cors";
const app = express();
import authRoute from "./router/userRouter.js";
import mongoDB from "./db/mongoDB.js";

dotenv.config();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://inventory-frontend-kappa-liart.vercel.app",
      "https://inventory-frontend-4kqb7knr4-akashs-projects-848d32a6.vercel.app",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // If you're sending cookies or authorization headers
  })
);

app.use(express.json());
app.get("/", (req, res) => res.send("hello my friend"));
app.use("/api", authRoute);

app.listen(3000, () => {
  mongoDB();
  console.log("server is running ...");
});
