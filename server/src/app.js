import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

//routes
//this implementation is to keep the versions
//just changing the path to the version needed
import serverRoutes from "./api/v1/routes/exports/router.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.set("view engine", "html");
app.use(express.urlencoded({ extended: true }));

//test server route
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

//all server routes
//notice that all routes are prefixed with /api/v1
serverRoutes(app);

app.use( ( error, req, res, next ) => {
	const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});

export default app;