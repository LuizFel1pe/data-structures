import { graph, initializeColor, myVertices } from './helper.js';
import { GraphColors } from '../../utils/index.js';
import Queue from '../../queue/queue.js';

export const breadthFirstSearch = (graph, startVertex, cb) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const distances = {};
  const predecessors = {};
  const queue = new Queue();
  queue.enqueue(startVertex);

  vertices.forEach(vertex => {
    distances[vertex] = 0;
    predecessors[vertex] = null;
  });

  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    const neighbors = adjList.get(u);
    color[u] = GraphColors.GREY;
    neighbors.forEach(neighbor => {
      const w = neighbor;
      if (color[w] === GraphColors.WHITE) {
        color[w] = GraphColors.GREY;
        distances[w] = distances[u] + 1;
        predecessors[w] = u;
        queue.enqueue(w);
      }
    });

    color[u] = GraphColors.BLACK;
    if (cb) {
      cb(u);
    }
  }

  return {
    distances,
    predecessors,
  };
};

const print = value => console.log(`Visited vertex: ${value}`);
const { predecessors } = breadthFirstSearch(graph, myVertices[0], print);

const fromVertex = myVertices[0];

let paths = [];
for (let vertex of myVertices) {
  const toVertex = vertex;
  const path = [];
  for (let v = toVertex; v !== fromVertex; v = predecessors[v]) {
    path.push(v);
  }
  path.push(fromVertex);
  let s = `${path.pop()}`;

  while (path.length > 0) {
    s += ` - ${path.pop()}`;
  }

  paths.push(s);
}

console.log(paths);
