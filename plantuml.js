/*
 * CodeMirror mode for PlantUML
 *
 * Written by Federico Tomassetti (https://github.com/ftomassetti, http://tomassetti.me)
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

    var debug = function() {
        return false;
    }

    var parseType = function(stream) {
        if (stream.match(/void/)) {
            return "keyword";
        }
        if (stream.match(/Int/)) {
            return "builtin";
        }
        if (stream.match(/int/)) {
            return "builtin";
        }                
        if (stream.match(/Float/)) {
            return "builtin";
        }
        if (stream.match(/float/)) {
            return "builtin";
        }              
        return null;
    }

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
    };

    var isMethod = function(stream) {
        var i = 0;
        var readSoFar = "";
        while (true) {
            if (stream.eol()){
                stream.backUp(i);
                return false;
            };
            if (stream.peek() === '(') {
                stream.backUp(i);                
                return true;                
            }
            i += 1;
            readSoFar = readSoFar + stream.next();
        };
    };

    var restOfLine = function(stream) {
        var i = 0;
        var readSoFar = "";
        while (true) {
            if (stream.eol()){
                stream.backUp(i);
                return readSoFar;
            };            
            i += 1;
            readSoFar = readSoFar + stream.next();
        };
    };    

    var hasTypeAfter = function(stream) {
        var i = 0;
        var readSoFar = "";
        while (true) {
            if (stream.eol()){
                stream.backUp(i);
                return false;
            };
            if (stream.peek() === ':') {
                stream.backUp(i);
                return true;                
            }
            i += 1;
            readSoFar = readSoFar + stream.next();
        };
    };    

    return {

        startState: function() {
            return {       
                name: "base",
                space_preserving : false,
                state_stack : []                   
            };
        },
        token: function(stream, state) {
            if (state.name === "base"){
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
                if (stream.match(/\(\)--/)){
                    return "operator";  
                }
                if (stream.match(/\(\)-/)){
                    return "operator";  
                }
                if (stream.match(/--\(\)/)){
                    return "operator";  
                }
                if (stream.match(/-\(\)/)){
                    return "operator";  
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
                if (stream.match(/enum/)){
                    state.name = "enum kw";
                    return "keyword";
                }
                if (stream.match(/interface/)){
                    state.name = "class kw";
                    return "keyword";
                } 
                if (stream.match(/annotation/)){
                    state.name = "class kw";
                    return "keyword";
                }                                              
                if (stream.match(/<\|-down-/)){
                    return "operator";  
                }               
                if (stream.match(/\*-up-/)){
                    return "operator";  
                }
                if (stream.match(/<\|---/)){
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
                if (stream.match(/package/)){
                    state.name = "WaitingForPackageName";
                    return "keyword";
                }                
                if (stream.match(/[a-zA-Z][a-zA-Z_0-9]*/)){
                    return "variable";
                }
                if (stream.match(/\"[^\"]*\"*/)){
                    return "string";
                }                                                                                       
                if (stream.match(/\}/)) {
                    state.name = state.state_stack.pop();
                    if (!state) state.name = "base";
                    return "bracket";
                }                  
            } else if (state.name === "title"){                              
                state.name = "base";
                stream.skipToEnd();
                return "string";    
            } else if (state.name === "note init"){
                if (stream.sol()){
                    state.name = "note body"
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
                if (stream.match(/backgroundColor/)){
                    return "attribute";
                }
                if (stream.match(/componentStyle|uml2|activity/)){
                    return "keyword";
                }
                if (matchColors(stream, state)){
                    return "atom";
                }
                if (stream.match(/\{/)){
                    state.name = "skinparam block";
                    return "bracket";
                }
            } else if (state.name === "skinparam block"){
                if (stream.match(/\}/)){
                    state.name = "base"
                    return "bracket";
                }                   
                if (stream.match(/StartColor|EndColor|BackgroundColor|BorderColor/)){
                    return "attribute";
                }
                if (matchColors(stream, state)){
                    return "atom";
                }
            } else if (state.name === "class kw"){
                if (stream.sol()){
                    state.name = "base"
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
            } else if (state.name === "enum kw"){
                if (stream.sol()){
                    state.name = "base"
                    return null;
                }       
                if (stream.match(/[A-Za-z_][A-Za-z_0-9]*/)) {
                    return "def";
                }                               
                if (stream.match(/\{/)){
                    state.name = "enum def";
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
                if (stream.match(/[,]+/)) {
                    return null;
                }      
            } else if (state.name === "class def"){
                if (stream.match(/[\t ]+/)) {
                    return null;
                }               
                if (stream.match(/\}/)) {
                    state.name = "base";
                    return "bracket";
                }
                if (stream.match(/\.\./)) { 
                    state.name = "class def section";
                    return "operator"; 
                }                                                                                    
                if (stream.match(/==/)) { 
                    state.name = "class def section";
                    return "operator"; 
                }      
                if (stream.match(/--/)) { 
                    state.name = "class def section";
                    return "operator"; 
                }
                if (stream.match(/__/)) { 
                    state.name = "class def section";
                    return "operator"; 
                }
                if (stream.match(/\+|-|#|~/)) {
                    if (isMethod(stream)) {                  
                	   state.name = "class def method";
                    } else {
                        if (hasTypeAfter(stream)) {
                            state.name = "class def attribute (type after)";
                        } else {
                            state.name = "class def attribute";
                        }
                    }
                    return "attribute";
                }                  
            } else if (state.name === "class def section") {
                if (stream.sol()){
                    state.name = "class def"
                    return null;
                }                      
                if (stream.match(/\.\./)) { 
                    state.name = "class def"
                    return "operator"; 
                }                                                                                    
                if (stream.match(/==/)) { 
                    state.name = "class def"
                    return "operator"; 
                }                
                if (stream.match(/--/)) { 
                    state.name = "class def"
                    return "operator"; 
                }
                if (stream.match(/__/)) { 
                    state.name = "class def"
                    return "operator"; 
                }        
                if (stream.match(/[a-zA-Z0-9 \t]+/)) {
                    return "string";
                }                        
            } else if (state.name === "enum def"){             
                if (stream.match(/\}/)) {
                    state.name = "base";
                    return "bracket";
                }
                if (stream.match(/\.\./)) { return "operator"; }                                                                                    
                if (stream.match(/==/)) { return "operator"; }                
                if (stream.match(/--/)) { return "operator"; }
                if (stream.match(/__/)) { return "operator"; }                
                if (stream.match(/[A-Za-z_]+/)) {
                    return "def";
                }                  
                if (stream.match(/./)) {
                    return null;
                }                                      
            } else if (state.name === "class def attribute"){
                if (stream.sol()){
                    state.name = "class def"
                    return null;
                }    
                var pt = parseType(stream);
                if (pt){
                    state.name = "class def attribute after type";
                    return pt;
                }        	             	
                if (stream.match(/[A-Za-z_]+/)) {
                    state.name = "class def attribute after type";
                    return "variable";
                }                                 
            } else if (state.name === "class def attribute (type after)"){
                if (stream.sol()){
                    state.name = "class def"
                    return null;
                }                                 
                if (stream.match(/[A-Za-z_]+/)) {
                    return "def";
                }            
                if (stream.match(/:/)) {
                    state.name = "class def attribute var type";
                    return "operator";
                }                                       
            } else if (state.name === "class def attribute after type"){
                if (stream.sol()){
                    state.name = "class def"
                    return null;
                }                                
                if (stream.match(/[A-Za-z_]+/)) {
                    return "def";
                }            
            } else if (state.name === "class def attribute var type"){
                if (stream.sol()){
                    state.name = "class def"
                    return null;
                }                           
                if (stream.match(/[A-Za-z_][A-Za-z_1-9]+/)) {
                    return "variable";
                }   
                if (stream.match(/\{/)) {
                    state.name = "class def attribute return type arg list";
                    return "bracket";
                }                  
            } else if (state.name === "class def attribute return type arg list"){
                if (stream.sol()){
                    state.name = "class def"
                    return null;
                }                           
                if (stream.match(/\}/)) {
                    state.name = "class def attribute (type after)";
                    return "bracket";
                }                
                if (stream.match(/[A-Za-z_][A-Za-z_1-9]+/)) {
                    return "variable";
                }
                if (stream.match(/,/)) {
                    return null;
                }                                                         
            } else if (state.name === "class def method"){
                if (stream.sol()){
                    state.name = "class def"
                    return null;
                }
                var pt = parseType(stream);
                if (pt){
                    return pt;
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
                if (stream.match(/:/)) {
                    state.name = "class def return type";
                    return "operator";
                }                
                if (stream.match(/\{static\}/)) {
                    return "keyword";
                }
                if (stream.match(/{abstract}/)) {
                    return "keyword";
                }                                                   
            } else if (state.name === "class def return type"){
                if (stream.sol()){
                    state.name = "class def"
                    return null;
                }                             
                var pt = parseType(stream);
                if (pt){
                    return pt;
                } 
                if (stream.match(/[A-Za-z_]+/)) {
                    return "variable";
                }
                if (stream.match(/\{/)) {
                    state.name = "class def return type, type parameters";
                    return "bracket";
                }            

            //
            // Example: +Name(): Type { arg1, arg2, argn }
            //          this is the state between brackets
            // 

            } else if (state.name === "class def return type, type parameters"){
                if (stream.sol()){
                    state.name = "class def"
                    return null;
                }               
                if (stream.match(/,/)) {
                    return null;
                }                    
                var pt = parseType(stream);
                if (pt){
                    return pt;
                } 
                if (stream.match(/[A-Za-z_][A-Za-z_0-9]+/)) {
                    return "variable";
                }
                if (stream.match(/\}/)) {
                    state.name = "class def return type";
                    return "bracket";
                } 

            //
            // Example: package Node <<Database>>
            //          this is the state after package, waiting for Node
            //

            } else if (state.name === "WaitingForPackageName"){
                if (stream.match(/[A-Za-z_][A-Za-z_0-9]+/)) {
                    return "def";
                }                                              
                if (stream.match(/<</)) {
                    state.state_stack.push("WaitingForPackageName");
                    state.name = "InStereotype"
                    return null;                    
                }
                if (stream.match(/\{/)) {
                    state.state_stack.push("base");
                    state.name = "base"
                    return "bracket";
                }         

            //
            // Example: package Node <<Database>>
            //          this is the state between << and >>
            //                 

            } else if (state.name === "InStereotype"){
                if (stream.match(/Node/)) {
                    return "builtin";
                } 
                if (stream.match(/Frame/)) {
                    return "builtin";
                }
                if (stream.match(/Database/)) {
                    return "builtin";
                } 
                if (stream.match(/Cloud/)) {
                    return "builtin";
                }
                if (stream.match(/Rect/)) {
                    return "builtin";
                } 
                if (stream.match(/Folder/)) {
                    return "builtin";
                }                                                             
                if (stream.match(/[A-Za-z_][A-Za-z_0-9]+/)) {
                    console.log("GOTCHA");
                    return "variable";
                }    
                if (stream.match(/>>/)){
                    state.name = state.state_stack.pop();
                    if (!state.name) state.name = "base";
                    return null;
                }
            } else {
                throw "Unknown state "+state.name;
            }

            if (!state.space_preserving && stream.match(/[\t ]+/)){
                return null;
            }

            if (debug()){
                throw "["+state.name+"] blocked on '"+stream.peek()+"'. Rest of line '"+restOfLine(stream)+"'";            
            } else {
                while (stream.next() && !stream.eol()){             
                }                
            }
        }
    };
});


});
