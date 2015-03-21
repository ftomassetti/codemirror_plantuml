/*
 * CodeMirror mode for PlantUML
 * Written by Federico Tomassetti (http://tomassetti.me)
 */

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("CodeMirror/lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["CodeMirror/lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode("plantuml", function(config, parserConfig) {
	console.log("Defining method");
	return {

		startState: function() {
        	return {          		
          		previousToken: { style: null },          	
        	};
      	},
		token: function(stream, state) {
			if (stream.eatSpace()) {
				return null;
			}
			if (stream.match(/@startuml/)) {
				return "keyword";
			}
			if (stream.match(/@enduml/)) {
				return "keyword";
			}			
			while (stream.next() && !stream.eol()){				
			}
			return null;
		}
	};
});


});
