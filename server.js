const express = require("express");
const path = require("path");
const morgan = require("morgan");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const app = express();
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");

require("dotenv").config();
app.use(morgan("tiny"));
app.use(express.json());

//route
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

// db:migrate adn db:seed
app.get("/reset/db/table", async (req, res) => {
  try {
    await require("./resetTable")();
    res.send("reset table success");
  } catch (e) {
    res.status(500);
    console.log(e);
  }
});

// static file
app.use("/static", express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("server is running...."));
}

// Error Handle
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(`Server is runing mode ${ENV} on port ${PORT}`);
});
