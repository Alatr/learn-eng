import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router/index.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "./.env") });

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);
app.use(errorMiddleware);

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!!");
});

const start = async () => {
  try {
    console.log(process.env.DB_URL);
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../build")));
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "..", "build", "index.html"));
      });
    } else {
      app.get("*", (req, res) => {
        res.send("api running");
      });
    }

    app.listen(PORT, () =>
      console.log(
        `Server started on PORT: ${PORT} ${process.env.PORT} http://localhost:${PORT}`
      )
    );
  } catch (error) {
    console.log(`Start error: ${error}`);
  }
};

start();
