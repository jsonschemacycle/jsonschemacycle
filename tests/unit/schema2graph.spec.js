import { Schema2graph } from "../../src/schema2graph"
import mainSchema from "../fixtures/mainSchema.json"
const axios = require("axios");
const sinon = require("sinon");

let schema;
let resolver;
let getStub;

describe("schema2Graph", () => {

    beforeAll(() => {
        schema = "https://w3id.org/dats/schema/dataset_schema.json";
        resolver = new Schema2graph(schema);
    });

    it("can be instantiated", () => {
        expect(resolver.mainSchema).toBe(schema);
        expect(resolver.network).toBe(null);
    });

    it("can set a graph", () => {
        const graph = {abc: "def"};
        resolver.setNetwork(graph);
        expect(resolver.network).toBe(graph)
    });

    /*it("can resolve a network", async() => {
        getStub = sinon.stub(axios, 'get');
        getStub.returns({
            data: mainSchema.data
        });
        resolver.setMainUrl('https://baseurl.com/repo/main.json');
        await resolver.resolveNetwork();
        expect(resolver.graph).toStrictEqual({"https://baseurl.com/repo/main.json": ["https://baseurl.com/repo/aRef"]});
        getStub.restore();
    });*/

    it("can get all refs in a schema", () => {
        let schema = mainSchema.data;
        let refs = resolver.getRefs(schema, []);
        expect(refs).toStrictEqual(["https://w3id.org/dats/schema/aRef"])
    });

    it("can deal with errors", async() => {
        jest.spyOn(console, 'error');
        console.error.mockImplementation(() => {});
        getStub = sinon.stub(axios, 'get');
        getStub.returns({
            data: {error: "error"}
        });
        await resolver.resolveNetwork();
        expect(resolver.error).toStrictEqual(Error('error'));
        getStub.restore();

        resolver.setMainUrl("http://schema.org");
        await resolver.resolveNetwork();
        expect(resolver.error.message).toBe("Network Error");

    });
});
