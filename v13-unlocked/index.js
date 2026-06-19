import { v9 } from "./systems/Vein.js/init.js";
import "./systems/setup.js"; 

// modules, scripts, subclass

let myScript = 
new v9.script({
    signal: v9.utilities.ssc("hello")
    ,fired(){
        console.log("i was called");
        return {
            active: false
        };
    }
})

class final_module extends v9.arrays.extends(v9.tags.extends(v9.stream.extends())){}

new final_module(
    {
        hello: new final_module({
            hello: [4, 5]
        })
    },
    [
       myScript 
       , 7
       , 8
    ],
    function(){
        this.set("hello/hello", 5);
        this.ta("push", ["hello/hello"], [30]);
        console.log(this.tget("hello/hello"));
    }
);