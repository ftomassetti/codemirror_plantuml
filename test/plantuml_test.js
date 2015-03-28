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

  MT("note_with_formatting",
    "[keyword note] [keyword right]",
    "[string This note is on several lines]",
    "[string ....]",
    "[string //This line is in italics//]",
    "[string ----]",
    "[string This one contains som <b>HTML</b>]",
    "[string ====]",
    "[string * This line contains a bullet]",
    "[string ____]",
    "[string \"\" This line is in code block\"\"]",
    "[keyword end note]"
  );

  MT("repeat_block",
    "[keyword repeat]",
    "[def :Eat Hot Wings;]",
    "[def :Drink Homebrew;]",
    "[keyword repeat] [keyword while] [string (Still Hungry?)]"
  );

  MT("while_loop",
    "[keyword while] [string (Hungry?)]  [keyword is] [string (Yes)]",
    "    [def :Eat Hot Wings;]",
    "    [def :Drink Homebrew;]",
    "[keyword endwhile] [string (No)]"
  );

  MT("fork_join",
    "[keyword if] [string (Turn On The Game?)] [keyword then] [string (yes)]",
    "    [keyword fork]",
    "        [def :__Having Fun__!!!;]",
    "    [keyword fork] [keyword again]",
    "        [def :Scream At TV!!;]",
    "    [keyword end] [keyword fork]",
    "[keyword else] [string (no)]",
    "    [def :Not Having Fun;]",
    "    [def :Eat Poptart;]",
    "[keyword endif]"
  );

  MT("colors",
    "[keyword skinparam] [keyword backgroundColor] [string #AAAAAA]",
    "[keyword skinparam] [keyword activity] [operator {]",
    "  [keyword StartColor] [string Blue]",
    "  [keyword EndColor] [string Red]",
    "  [keyword BackgroundColor] [string Green]",
    "  [keyword BorderColor] [string Yellow]",
    "[operator }]"
  );

})();