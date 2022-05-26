const express = require("express");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const app = express();
const productRouter = require("./routes/productRouter");

app.get("/", (req, res) => {
  res.send("server is runing ....");
});

app.use("/api/products", productRouter);

// Error Handle
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(`Server is runing mode ${ENV} on port ${PORT}`);
});
