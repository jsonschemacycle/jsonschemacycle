import { GraphCycles } from "../../src/graphCycles.js"

describe("GraphCycle", () => {
    it("can resolve a graph", () => {
        let graph = {
            0: [1, 5],
            1: [2, 3, 4],
            2: [0],
            3: [],
            4: [1],
            5: [4],
            6: [6]
        };
        let resolver = new GraphCycles(graph);
        let results = resolver.getCycles();
        expect(results).toStrictEqual([[0, 1, 2, 0], [0, 1, 4, 1], [6, 6]])
    });
});
