const express = require("express");
const path = require("path");
const app = express();
const routes = require("./routes/index.js");
const port = process.env.PORT || 7000;
app.use(express.json());
require("dotenv").config();

app.use(express.static(path.join(__dirname, "../build")));
app.use("/api/", routes);

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(port, () => console.log(`app is now listening on port ${port}`));
