export class GraphCycles {

    /**
     * The Graph class will run the searches and hold the results in self.results
     * @param {Object} graph - the number of vertices in the graph
     */
    constructor(graph) {
        this.graph = graph;
        this.vertices = Object.keys(graph).length;
        this.results = [];
    }

    /**
     * Identify all the circularity of a given graph
     * @returns {Array} results - an array of results
     */
    getCycles() {
        const self = this;
        let visited = [...Array(self.vertices)].fill(false);
        let recStack = [...Array(self.vertices)].fill(false);
        [...Array(self.vertices).keys()].forEach((node) => {
            let currentPath = [node];
            if (!visited[node]) self::getCycle(node, visited, recStack, currentPath);
        });
        return self.results;
    }
}

/**
 *  Looks through the graph starting with node v. This is a private method. Do not use !
 * @param {Number} v - the node to start with
 * @param {Array} visited - the stack of visited nodes
 * @param {Array} recStack - the recursive stack
 * @param {Array} path - the path of the main node leading to that circularity
 */
function getCycle(v, visited, recStack, path) {
    const self = this;
    visited[v] = recStack[v] = true;
    let found = [];
    self.graph[v].forEach((neighbour) => {
        let localPath = [...path];
        localPath.push(neighbour);
        if (!visited[neighbour]) self::getCycle(neighbour, visited, recStack, localPath);
        else if (recStack[neighbour]) found = localPath;
    });
    recStack[v] = false;
    if (found.length > 0) self.results.push(found)
}
