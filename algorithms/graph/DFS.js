import { GraphColors } from '../../utils/index.js';
import {
  graph,
  directedGraph,
  myVertices,
  directedVertex,
  initializeColor,
} from './helper.js';

const DFSVisit = (u, color, d, f, p, time, adjList) => {
  color[u] = GraphColors.GREY;
  d[u] = ++time.count;

  const neighbors = adjList.get(u);
  neighbors.forEach(neighbor => {
    const w = neighbor;
    if (color[w] === GraphColors.WHITE) {
      p[w] = u;
      DFSVisit(w, color, d, f, p, time, adjList);
    }
  });
  color[u] = GraphColors.BLACK;
  f[u] = ++time.count;
};

const DFS = graph => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const d = {};
  const f = {};
  const p = {};
  const time = { count: 0 };

  vertices.forEach(vertex => {
    d[vertex] = 0;
    f[vertex] = 0;
    p[vertex] = null;
  });

  vertices.forEach(vertex => {
    if (color[vertex] === GraphColors.WHITE) {
      DFSVisit(vertex, color, d, f, p, time, adjList);
    }
  });

  return {
    discovery: d,
    finished: f,
    predecessors: p,
  };
};

const { discovery, finished, predecessors } = DFS(graph);

myVertices.forEach(vertex => {
  console.log(
    `Vertex: ${vertex}
    discovery at: ${discovery[vertex]}
    finished at: ${finished[vertex]}
    predecessor = ${predecessors[vertex]}\n`
  );
});

const { finished: fTimes } = DFS(directedGraph);
let s = '';
for (let count = 0; count < directedVertex.length; count++) {
  let max = 0;
  let maxName = null;
  for (let i = 0; i < directedVertex.length; i++) {
    if (fTimes[directedVertex[i]] > max) {
      max = fTimes[directedVertex[i]];
      maxName = directedVertex[i];
    }
  }
  if (s === '') s += `${maxName}`;
  else s += ' - ' + maxName;
  delete fTimes[maxName];
}

console.log(s);
