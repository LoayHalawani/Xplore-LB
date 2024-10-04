const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "API is running normally." });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/site.routes")(app);
require("./app/routes/bookmark.routes")(app);
require("./app/routes/critique.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});
