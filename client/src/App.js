import React from "react";
import "./styles.css";
import { Graph } from "react-d3-graph";

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
        val.forEach((vv, i) => links.push({ source: nodes[i].id, target: vv }))
    );

    return { nodes, links };
};

const newgraph = graphToData({
    1: [2, 3, 4, 5],
    2: [6],
    3: [6, 7],
    4: [7, 8],
    5: [8],
});

const graph = {
    1: [2, 3, 4, 5],
    2: [6],
    3: [6, 7],
    4: [7, 8],
    5: [8],
};
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

// graph event callbacks
const onClickGraph = function () {
    console.log(`Clicked the graph background`);
};

const onClickNode = function (nodeId) {
    console.log(`Clicked node ${nodeId}`);
};

const onDoubleClickNode = function (nodeId) {
    console.log(`Double clicked node ${nodeId}`);
};

const onRightClickNode = function (event, nodeId) {
    console.log(`Right clicked node ${nodeId}`);
};

const onMouseOverNode = function (nodeId) {
    console.log(`Mouse over node ${nodeId}`);
};

const onMouseOutNode = function (nodeId) {
    console.log(`Mouse out node ${nodeId}`);
};

const onClickLink = function (source, target) {
    console.log(`Clicked link between ${source} and ${target}`);
};

const onRightClickLink = function (event, source, target) {
    console.log(`Right clicked link between ${source} and ${target}`);
};

const onMouseOverLink = function (source, target) {
    console.log(`Mouse over in link between ${source} and ${target}`);
};

const onMouseOutLink = function (source, target) {
    console.log(`Mouse out link between ${source} and ${target}`);
};

const onNodePositionChange = function (nodeId, x, y) {
    console.log(
        `Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`
    );
};

export default function App() {
    return (
        <div className="App">
            <textarea value={JSON.stringify(graph)} /> &nbsp;
            <textarea value={JSON.stringify(graph)} />
            <br />
            <button>Get All Paths / Redraw Graph</button>
            <Graph
                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                data={newgraph}
                config={myConfig}
                onNodePositionChange={onNodePositionChange}
            />
            ;
        </div>
    );
}
