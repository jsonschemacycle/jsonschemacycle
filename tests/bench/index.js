/**
 * The benchmark script
 */

require("regenerator-runtime/runtime");
import bench from "./bench.js";
import {GraphCycles} from "../../src/graphCycles";
import {Schema2graph} from "../../src/schema2graph"
console.log("STARTING BENCHMARK PROCESS");

/**
 * The function to benchmark
 * @returns {Function}
 */
function benchmarkCycles(){
    const graph = {
        0: [1, 5],
        1: [2, 3, 4],
        2: [0],
        3: [],
        4: [1],
        5: [7],
        6: [6],
        7: [0]
    };
    const cycles = new GraphCycles(graph);
    return cycles.getCycles()
}

function benchmarkResolver(){
    let resolver = new Schema2graph("https://w3id.org/dats/schema/dataset_schema.json");
    return resolver.resolveNetwork();
}

/**
 * Run the benchmark with as many functions as desired
 */
bench([
    {name: "GraphCycles", function: benchmarkCycles},
    {name: "Resolver", function: benchmarkResolver}
]);
