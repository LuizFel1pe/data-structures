import Graph from '../../graph/graph.js';
import { GraphColors } from '../../utils/index.js';

const initializeColor = vertices => {
  const color = {};
  vertices.forEach(vertex => {
    color[vertex] = GraphColors.WHITE;
  });
  return color;
};

const graph = new Graph();
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
myVertices.forEach(vertex => {
  graph.addVertex(vertex);
});

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

const directedVertex = ['A', 'B', 'C', 'D', 'E', 'F'];
const directedGraph = new Graph(true);
directedVertex.forEach(vertex => {
  graph.addVertex(vertex);
});

directedGraph.addEdge('A', 'C');
directedGraph.addEdge('A', 'D');
directedGraph.addEdge('B', 'D');
directedGraph.addEdge('B', 'E');
directedGraph.addEdge('C', 'F');
directedGraph.addEdge('F', 'E');

export { graph, directedGraph, myVertices, directedVertex, initializeColor };
