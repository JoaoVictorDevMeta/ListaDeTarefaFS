import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

//routes
//this implementation is to keep the versions
//just changing the path to the version needed
import serverRoutes from "./api/v1/routes/exports/router.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//test server route
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

//all server routes
//notice that all routes are prefixed with /api/v1
serverRoutes(app);

if (process.env.MODE === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no information send to the user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
