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
	return {

		startState: function() {
        	return {       
        	    name: "base",   		        		
          		previousToken: { style: null, state: "base" }
        	};
      	},
		token: function(stream, state) {
			console.log("state "+state.name+ " '"+stream.peek()+"'");
			if (state.name === "base"){
				if (stream.match(/[\t ]+/)) {
					return null;
				}
				if (stream.match(/@startuml/)) {
					return "keyword";
				}
				if (stream.match(/@enduml/)) {
					return "keyword";
				}			
				if (stream.match(/title/)) {
					state.name = "title";
					return "keyword";
				}
				if (stream.match(/start/)) {
					return "keyword";
				}
				if (stream.match(/stop/)) {
					return "keyword";
				}						
				// a state
				if (stream.match(/:[a-zA-Z _!?]*;/)) {
					return "def";
				}	
				if (stream.match(/note/)) {
					state.name = "note init";
					return "keyword";
				}	
				if (stream.match(/if/)){
					return "keyword";
				}					
				if (stream.match(/then/)){
					return "keyword";
				}					
				if (stream.match(/else/)){
					return "keyword";
				}
				if (stream.match(/endif/)){
					return "keyword";
				}			
				if (stream.match(/\([a-zA-Z _!?]*\)/)){
					return "string";
				}																
				while (stream.next() && !stream.eol()){				
				}
				return null;
			} else if (state.name === "title"){
				while (stream.next() && !stream.eol()){				
				}
				state.name = "base";
				return "string";	
			} else if (state.name === "note init"){
				if (stream.sol()){
					state.name = "note body"
					return null;
				}			
				if (stream.match(/[\t ]+/)) {
					return null;
				}
				if (stream.match(/left/)) {
					return "keyword";
				}
				if (stream.match(/right/)) {
					return "keyword";
				}
				if (stream.match(/:/)){
					state.name = "note body inline";
					return "operator";
				}				
				throw "Note init, blocked on "+stream.peek();
			} else if (state.name === "note body inline"){
				state.name = "base";
				stream.skipToEnd();
				return "string";
			} else if (state.name === "note body"){
				if (stream.match(/end note/)) {
					state.name = "base";
					return "keyword";
				}
				stream.skipToEnd();
				return "string";
			} else {
				throw "Unknown state "+state.name;
			}
		}
	};
});


});
