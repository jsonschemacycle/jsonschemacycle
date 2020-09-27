import { GraphCycles } from "./graphCycles.js"
const axios = require("axios");

export class Schema2graph {

    /**
     * Class to resolves the network from the given URL and transforms it into a network
     * @param main_schema
     */
    constructor(main_schema){
        this.mainSchema = main_schema;
        this.baseURL = main_schema.substring(0, main_schema.lastIndexOf('/')+1);
        this.network = null;
        this.error = null;
        this.serializedGraph = null;
    }

    /**
     * Resolves the network
     * @returns {Promise}
     */
    async resolveNetwork(){
        this.network = {};
        let network = {};
        this.error = null;
        let schema = await this.getSchema(this.mainSchema);
        if (!this.error && Object.keys(this.network).indexOf(schema.id) === -1) {
            this.network[schema.id] = this.getRefs(schema, []);
            network[schema.id] = this.getRefs(schema, []);
            await this.resolveSubSchemas(network[schema.id], network);
        }
    }

    /**
     * Resolves all the given references
     * @param {Array} refs - an array of references
     * @param {Object} network - the resolved items
     * @returns {Promise}
     */
    async resolveSubSchemas(refs, network){
        let resolver = this;
        await asyncForEach(refs, async (ref) => {
            if (Object.keys(network).indexOf(ref) === -1){
                let schema = await resolver.getSchema(ref);
                if (!resolver.error && Object.keys(network).indexOf(ref) === -1) {
                    let subRefs = resolver.getRefs(schema, []);
                    if (subRefs.length > 0) {
                        resolver.network[schema.id] = subRefs;
                        network[schema.id] = subRefs;
                        await resolver.resolveSubSchemas(subRefs, network);
                    }
                    else {
                        resolver.network[schema.id] = [];
                        network[schema.id] = [];
                    }
                }
            }
        });
    }

    /**
     * Recursively (and blindly) parse the JSON looking for $ref and returns all references in an array
     * @param {Object} schema - the schema to parse
     * @param {Array} refs - the array of already obtained refs
     * @returns {Array} refs - the fully filled up array of refs
     */
    getRefs(schema, refs){
        let resolver = this;
        Object.keys(schema).forEach((fieldName) => {
            const field = schema[fieldName];
            if (fieldName === "$ref" && field[field.length-1] === "#"){
                // TODO: process $ref !!!
                refs.push(this.baseURL + field.replace('#', ""));
            }
            else if (typeof field === 'object'){
                resolver.getRefs(field, refs);
            }
        });
        return refs;
    }

    /**
     * Get the current schema from the given URL
     * @param {String} schemaURL - format: URL
     * @returns {Promise}
     */
    async getSchema(schemaURL){
        try {
            let schema = await axios.get(schemaURL);
            if (schema.data.error) {
              this.setError(new Error(schema.data.error));
            }
            return schema.data
        }
        catch(e){
            this.setError(e);
        }
    }

    /**
     * Set the main schema URL
     * @param {String} url - format: URI
     */
    setMainUrl(url){
        this.mainSchema = url;
        this.baseURL = url.substring(0, url.lastIndexOf('/')+1);
        this.network = null;
    }

    /**
     * Set the network in case you resolved it manually
     * @param {Object} network - contains the list of schemas names as keys and their children as values in an array
     */
    setNetwork(network){ this.network = network }

    /**
     * Set an error
     * @param {Error} error
     */
    setError(error){ this.error = error }

    /**
     * Serialize the network into a numerical table
     * */
    serializeGraph(){
        let graph = {};
        let i = 0;
        for (let schemaName of Object.keys(this.network)){
            let refs = this.network[schemaName];
            graph[i] = [];
            for (let ref of refs){
                graph[i].push(Object.keys(this.network).indexOf(ref))
            }
            i++;
        }
        this.serializedGraph = graph;
    }

    /**
     * Find the cycles into the given numerical graph using the GraphCycle class
     * @returns {Array} - a list of serialized cycles
     */
    findCycles(){
        this.serializeGraph();
        let runner = new GraphCycles(this.serializedGraph);
        return runner.getCycles();
    }

    /**
     * Deserialize back the numerical indices into schema names in the cycle object.
     * @returns {Array} - the list of cycles with resolved names
     */
    deserializeCycles(){
        let cycles = this.findCycles();
        let output = [];
        for (let cycle of Object.keys(cycles)){
            let localOutput = [];
            let elements = cycles[cycle];
            for (let elem of elements){
                localOutput.push(Object.keys(this.network)[elem]);
            }
            output.push(localOutput);
        }
        return output;
    }
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
