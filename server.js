const express = require("express");
const app = express();

app.get("/api/hello", (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT || 5000;
const ENV = process.env.ENV;

app.listen(PORT, () => {
  console.log(`Server runing mode ${ENV} on port ${PORT}`);
});
