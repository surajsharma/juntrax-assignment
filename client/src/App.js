import React, { useState, useEffect } from "react";
import "./styles.css";
import { Graph } from "react-d3-graph";
import axios from "axios";

export default function App() {
    const getAllPaths = (data) => {
        (async () => {
            const rawResponse = await axios
                .post("/getpaths", {
                    params: {},
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    data: {
                        graph: data,
                    },
                })
                .then(function (response) {
                    console.log(response);
                    setPaths(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        })();
    };

    const graphToData = (graph) => {
        let k = [],
            kv = [],
            v = [],
            nodes = [],
            links = [];
        Object.keys(graph).forEach((key) => k.push(parseInt(key)));
        Object.values(graph).forEach((val) => v.push(val));
        Object.values(graph).forEach((val) => val.forEach((vv) => kv.push(vv)));
        let n = [...new Set(k.concat(kv))];

        n.forEach((node, i) => {
            nodes.push({ id: node });
        });

        v.forEach((val) =>
            val.forEach((vv, i) =>
                links.push({ source: nodes[i].id, target: vv })
            )
        );

        return { nodes, links };
    };

    const [paths, setPaths] = useState(null);

    const [input, setInput] = useState({
        1: [2, 3, 4, 5],
        2: [6],
        3: [6, 7],
        4: [7, 8],
        5: [8],
    });

    useEffect(() => {
        // setPaths(getAllPaths(input));
    }, []);

    // the graph configuration, you only need to pass down properties
    // that you want to override, otherwise default ones will be used
    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
            color: "lightgreen",
            size: 500,
            highlightStrokeColor: "blue",
        },
        link: {
            highlightColor: "lightblue",
        },
        directed: true,
        automaticRearrangeAfterDropNode: true,
        collapsible: true,
    };

    return (
        <div className="App">
            <div style={{ display: "flex" }}>
                INPUT HERE
                <textarea
                    onChange={(e) => setInput(e.target.value)}
                    value={JSON.stringify(input)}
                />{" "}
                &nbsp;
                <br />
                <br />{" "}
                <button onClick={() => getAllPaths(input)}>
                    Get All Paths / Redraw Graph
                </button>
                {"OUTPUT/PATHS HERE ->"}
                <textarea value={JSON.stringify(paths)} />
                <br />
                <br />
            </div>
            <Graph
                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                data={graphToData(input)}
                config={myConfig}
            />
        </div>
    );
}
