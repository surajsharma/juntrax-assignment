import React from "react";
import "./styles.css";
import { Graph } from "react-d3-graph";

// graph object to data
// graph is like this: {1:[2,3,4,5], 2:[6], 3:[6,7], 4:[7,8], 5:[8]}

// const data = {
//   nodes: [
//     { id: "1" },
//     { id: "2" },
//     { id: "3" },
//     { id: "4" },
//     { id: "5" },
//     { id: "6" },
//     { id: "7" },
//     { id: "8" }
//   ],
//   links: [
//     { source: "1", target: "2" },
//     { source: "1", target: "3" },
//     { source: "1", target: "4" },
//     { source: "1", target: "5" },
//     { source: "2", target: "6" },
//     { source: "3", target: "6" },
//     { source: "3", target: "7" },
//     { source: "4", target: "7" },
//     { source: "4", target: "8" },
//     { source: "5", target: "8" }
//   ]
// };

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

  console.log({ nodes, links });
  return { nodes, links };
};

const graph = graphToData({
  1: [2, 3, 4, 5],
  2: [6],
  3: [6, 7],
  4: [7, 8],
  5: [8]
});

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgreen",
    size: 500,
    highlightStrokeColor: "blue"
  },
  link: {
    highlightColor: "lightblue"
  },
  directed: true,
  automaticRearrangeAfterDropNode: true,
  collapsible: true
};

const onNodePositionChange = function (nodeId, x, y) {
  window.alert(
    `Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`
  );
};

export default function App() {
  return (
    <div className="App">
      <Graph id="graph-id" data={graph} config={myConfig} />
    </div>
  );
}
