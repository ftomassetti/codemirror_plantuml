(function() {
  var mode = CodeMirror.getMode({tabSize: 4}, "plantuml");
  function MT(name) { test.mode(name, mode, Array.prototype.slice.call(arguments, 1)); }
  var modeHighlightFormatting = CodeMirror.getMode({tabSize: 4}, {name: "plantuml", highlightFormatting: true});
  function FT(name) { 
  	//console.log("FT name="+name);
  	//console.log("FT mode="+mode);
  	//console.log("FT mode.startState="+mode.startState);
  	//console.log("FT arguments="+arguments);
  	//console.log("A="+modeHighlightFormatting);
  	//console.log("test.mode="+test.mode);
  	//console.log("FT Array.prototype.slice="+Array.prototype.slice.call(arguments, 1));
  	
  	test.mode(name, modeHighlightFormatting, Array.prototype.slice.call(arguments, 1)); 
  }

  MT("activityDiagram_example1",
     "[keyword @startuml]",
     "",
     "[keyword title][string  Activity Diagram ]",
     "",
     "",
     "[keyword start]",
     "",
     "[def :Eat Hot Wings;]",
     "",
     "[keyword note] [keyword left]",
     "[string This is a Note...]",
     "[string Activity diagrams can begin with a Start]",
     "[string An activity is colon, some words, and a semicolon]",
     "[string Activity diagrams can end with a stop]",
     "[keyword end note]",
     "",
     "[def :Drink Homebrew;]",
     "",
     "[keyword stop]",
     "",
     "[keyword @enduml]"
  );

  MT("activityDiagram_example2",
     "[keyword @startuml]",
     "",
     "[keyword title][string  Conditional - Activity Diagram]",
     "",
     "",
     "[keyword start]",
     "",
     "[def :Eat Hot Wings;]",
     "[keyword note] [keyword right][operator :][string  This is a note to the right]",
     "",
     "[def :Drink Homebrew;]",
     "[keyword note] [keyword left][operator :][string  This is a note to the left]",
     "",
     "[keyword if] [string (Turn On The Game?)] [keyword then] [string (yes)]",
     "  [def :__Having Fun__!!!;]",
     "[keyword else] [string (no)]",
     "  [def :Not Having Fun;]",
     "[keyword endif]",
     "",
     "[def :Go To Bed;]",
     "",
     "[keyword stop]",
     "",
     "[keyword @enduml]"
  );  

})();