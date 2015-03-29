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

    var matchColors = function(stream, state) {
        if (stream.match(/Blue/)){
            return "atom";
        }
        if (stream.match(/Red/)){
            return "atom";
        }
        if (stream.match(/Green/)){
            return "atom";
        }
        if (stream.match(/Yellow/)){
            return "atom";
        }
        if (stream.match(/orchid/)){
            return "atom";
        }        
        if (stream.match(/#[0-9a-fA-F]{6}/)){
            return "atom";
        }        
        return undefined;
    }

    return {

        startState: function() {
            return {       
                name: "base"                        
                //previousToken: { style: null, state: "base" }
            };
        },
        token: function(stream, state) {
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
                if (stream.match(/abstract/)){
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
                if (stream.match(/repeat/)){
                    return "keyword";
                }
                if (stream.match(/while/)){
                    return "keyword";
                }
                if (stream.match(/endwhile/)){
                    return "keyword";
                }
                if (stream.match(/is/)){
                    return "keyword";
                }
                if (stream.match(/fork/)){
                    return "keyword";
                }               
                if (stream.match(/again/)){
                    return "keyword";
                }               
                if (stream.match(/end/)){
                    return "keyword";
                }                                                                           
                if (stream.match(/\([a-zA-Z _!?]*\)/)){
                    return "string";
                }   
                if (stream.match(/skinparam/)){
                    state.name = "skinparam";
                    return "keyword";
                }
                if (stream.match(/class/)){
                    state.name = "class kw";
                    return "keyword";
                }                       
                if (stream.match(/<\|-down-/)){
                    return "operator";  
                }               
                if (stream.match(/\*-up-/)){
                    return "operator";  
                }
                if (stream.match(/Inheritance/)){
                    return "keyword";
                }
                if (stream.match(/Composition/)){
                    return "keyword";
                }
                if (stream.match(/:/)){
                    return "operator";
                }   
                if (stream.match(/[a-zA-Z][a-zA-Z_0-9]*/)){
                    return "variable";
                }
                if (stream.match(/\"[^\"]*\"*/)){
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
                if (stream.match(/\.\.\.\./)) {
                    return "operator";
                }
                if (stream.match(/----/)) {
                    return "operator";
                }
                if (stream.match(/====/)) {
                    return "operator";
                }
                if (stream.match(/____/)) {
                    return "operator";
                }
                if (stream.match(/\"\"/)) {
                    return "operator";
                }
                if (stream.match(/\*/)) {
                    return "operator";
                }
                if (stream.match(/\/\//)) {
                    return "operator";
                }
                if (stream.match(/[a-zA-Z0-9 \t]+/)) {
                    return "string";
                }
                if (stream.match(/./)) {
                    return "string";
                }                                                                                                                               
                return "string";
            } else if (state.name === "skinparam"){
                if (stream.sol()){
                    state.name = "base"
                    return null;
                }                   
                if (stream.match(/[\t ]+/)) {
                    return null;
                }
                if (stream.match(/backgroundColor/)){
                    return "attribute";
                }
                if (stream.match(/componentStyle/)){
                    return "keyword";
                }
                if (stream.match(/uml2/)){
                    return "keyword";
                }                           
                if (stream.match(/activity/)){
                    return "keyword";
                }               
                if (matchColors(stream, state)){
                    return "atom";
                }
                if (stream.match(/\{/)){
                    state.name = "skinparam block";
                    return "bracket";
                }
                throw "skinparam, blocked on "+stream.peek();
            } else if (state.name === "skinparam block"){
                if (stream.match(/\}/)){
                    state.name = "base"
                    return "bracket";
                }                   
                if (stream.match(/[\t ]+/)) {
                    return null;
                }
                if (stream.match(/StartColor/)){
                    return "attribute";
                }
                if (stream.match(/EndColor/)){
                    return "attribute";
                }
                if (stream.match(/BackgroundColor/)){
                    return "attribute";
                }
                if (stream.match(/BorderColor/)){
                    return "attribute";
                }
                if (matchColors(stream, state)){
                    return "atom";
                }
                throw "skinparam block, blocked on "+stream.peek();
            } else if (state.name === "class kw"){
                if (stream.sol()){
                    state.name = "base"
                    return null;
                }       
                if (stream.match(/[\t ]+/)) {
                    return null;
                }
                if (stream.match(/[A-Za-z_][A-Za-z_0-9]*/)) {
                    return "def";
                }                               
                if (stream.match(/\{/)){
                    state.name = "class def";
                    return "bracket";
                }
                if (stream.match(/<</)) {
                    state.old_state = state.name;
                    state.name = "stereotype";
                    return null;
                }
                if (stream.match(/<[a-zA-Z ]+>/)) {
                    return "string";
                }                                                                   
                throw "class kw, blocked on '"+stream.peek()+"'";
            } else if (state.name === "stereotype"){                
                if (stream.match(/\(/)) {
                    state.name = "stereotype style"
                    return null;
                }
                if (stream.match(/[A-Za-z][A-Za-z_0-9]*/)) {
                    return "variable";
                }
                if (stream.match(/>>/)) {
                    state.name = state.old_state;
                    return null;
                }
                if (stream.match(/[\t ]+/)) {
                    return null;
                }
                if (stream.match(/,/)) { return null; }             
                throw "stereotype, blocked on '"+stream.peek()+"'";
            } else if (state.name === "stereotype style"){
                if (stream.match(/\)/)) {
                    state.name = "stereotype"
                    return null;
                }
                if (stream.match(/[A-Z]/)) {
                    return "string";
                }   
                if (matchColors(stream, state)){
                    return "atom";
                }
                if (stream.match(/[\t, ]+/)) {
                    return null;
                }
                throw "stereotype style, blocked on '"+stream.peek()+"'";           
            } else if (state.name === "class def"){
                if (stream.match(/[\t ]+/)) {
                    return null;
                }               
                if (stream.match(/\}/)) {
                    state.name = "base";
                    return "bracket";
                }
                if (stream.match(/\.\./)) { return "operator"; }                                                                                    
                if (stream.match(/==/)) { return "operator"; }                
                if (stream.match(/--/)) { return "operator"; }
                if (stream.match(/__/)) { return "operator"; }
                if (stream.match(/\+/)) {
                	state.name = "class def attribute";
                    return "attribute";
                }   
                if (stream.match(/-/)) {
                	state.name = "class def attribute";
                    return "attribute";
                }
                if (stream.match(/#/)) {
                    return "operator";
                }
                if (stream.match(/~/)) {
                    return "operator";
                }               
                if (stream.match(/./)) {
                    return null;
                }
                throw "class def, blocked on "+stream.peek();               
            } else if (state.name === "class def attribute"){
                if (stream.sol()){
                    state.name = "class def"
                    return null;
                }            	
                if (stream.match(/[\t ]+/)) {
                    return null;
                }                 	
                if (stream.match(/void/)) {
                    return "keyword";
                }
                if (stream.match(/Int/)) {
                    return "builtin";
                }
                if (stream.match(/Float/)) {
                    return "builtin";
                }
                if (stream.match(/[A-Za-z_]+/)) {
                    return "def";
                }  
                if (stream.match(/\(/)) {
                    return "operator";
                }
                if (stream.match(/\)/)) {
                    return "operator";
                }                
                throw "class def attribute, blocked on "+stream.peek();                                     	
            } else {
                throw "Unknown state "+state.name;
            }
        }
    };
});


});
