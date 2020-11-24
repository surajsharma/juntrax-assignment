const g = require("./graph");

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const data = {
        1: [2, 3, 4, 5],
        2: [6],
        3: [6, 7],
        4: [7, 8],
        5: [8],
    };

    const x = g.getAllPaths(data, [1]);
    res.send(x);
});

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
