import { Schema2graph } from "./schema2graph.js";

/**
 * The main function to use to resolve a network a find it's cycles
 * @param {String} URL - the url of the entry point of the network.
 * @returns {Promise}
 */
async function findCycles(URL) {
    let resolver = new Schema2graph(URL);
    await resolver.resolveNetwork();
    return await resolver.deserializeCycles();
}

export default findCycles;

function example() {
    document.getElementById("cycles").innerHTML = "LOADING";
    findCycles("https://w3id.org/dats/schema/dataset_schema.json").then((cycles) => {
        document.getElementById("cycles").innerHTML =
            "<pre>"
            + JSON.stringify(cycles, null, 2)
            + "</pre>";
    });
}
