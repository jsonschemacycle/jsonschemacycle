import _ from 'lodash';
import process from 'process';
const benchmark = require('benchmark');

/**
 * A wrapper to benchmark function as a callback
 * @param {Array} callbacks - an array of objects containing a name as a string and a function.
 */
export default function bench(callbacks){
    const Benchmark = benchmark.runInContext({_, process});
    // window.Benchmark = Benchmark; // Uncomment if you want to run the benchmark in the browser.
    let suite = new Benchmark.Suite;
    callbacks.forEach(function(callback){
        suite.add(callback.name, function() {callback.function()})
    });
    suite.on('cycle', function (event) {console.log(String(event.target));})
        .on('complete', function () {console.log('Fastest is ' + this.filter('fastest').map('name'));})
        .run({'async': true});
}
