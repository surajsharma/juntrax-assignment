const g = require("./graph");

const bodyParser = require("body-parser");
const path = require("path");

const express = require("express");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.post("/getpaths", (req, res) => {
    console.log("here", req.body.data.graph);
    const data = req.body.data.graph;
    const x = g.getAllPaths(data, [1]);
    res.send(x);
});

if (process.env.NODE_ENV === "production") {
    // Exprees will serve up production assets
    app.use(express.static("client/build"));

    // Express serve up index.html file if it doesn't recognize route
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(port, () =>
    console.log(`🍒 🥒 🍒  Server running on port ${port}  🍒 🥒 🍒`)
);
