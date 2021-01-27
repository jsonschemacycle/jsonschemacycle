# JSON SCHEMA CYCLE
A JS library to identify cycles in complex networks of interconnected JSON Schemas.


### Getting Started
Note: The library is still in alpha. Anyone welcome to participate.

If your network is not already resolved, you can pass the URL of its entry point to the ``findCycles()``
function. It will return a promise that you can ``await``.
```
import { findCycles } from "jsonschemacycle"
let cycles = findCycles("https://w3id.org/dats/schema/dataset_schema.json").then(()=>{
    console.log(cycles);
});
```

### Build, test and benchmark
The library is provided to you already bundled and compiled with all it's dependency
using webpack. However, it can also be compiled, tested and benchmarked manually from the source.

To do that, download the code from this repository: ``npm clone xxx``. Then, install all the dependencies: ``npm install``.  
The commands available are:
- compile and minify the code: ``npm run build``
- unit test the source: ``npm run test:unit``
- benchmark the source: ``npm run test:bench``
- deploy (run the unit and benchmark tests and then compile): ``npm run deploy``

### TODO 

- Finish unit testing
- Write an integration test (optional)
- Generate the code documentation
- Write README file
- Write the pipelines and generate the badges:
    - [ ] CI
    - [ ] Coverage report
    - [ ] Doc gen
    - [ ] Codacy report
    - [ ] Improve resolver performances
    - [ ] Optimize bundle size

### Author
Batista Dominique<batstadominique@hotmail.com>, Research Software & Knowledge Engineer, 
Oxford e-research center.

ORCID: 
