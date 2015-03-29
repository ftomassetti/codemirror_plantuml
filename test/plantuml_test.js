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
    "[operator ....]",
    "[operator //][string This line is in italics][operator //]",
    "[operator ----]",
    "[string This one contains som <b>HTML</b>]",
    "[operator ====]",
    "[operator *][string This line contains a bullet]",
    "[operator ____]",
    "[operator \"\"][string This line is in code block][operator \"\"]",
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
    "[keyword skinparam] [attribute backgroundColor] [atom #AAAAAA]",
    "[keyword skinparam] [keyword activity] [bracket {]",
    "  [attribute StartColor] [atom Blue]",
    "  [attribute EndColor] [atom Red]",
    "  [attribute BackgroundColor] [atom Green]",
    "  [attribute BorderColor] [atom Yellow]",
    "[bracket }]"
  );

  MT("classes_firstExample",
    "[keyword class] [def Dwelling] [bracket {]",
    "  [attribute +][builtin Int] [def Windows]",
    "  [attribute +][keyword void] [def Lock][operator ()]",
    "[bracket }]",
    "",
    "[keyword class] [def Apartment]",
    "[keyword class] [def House]",
    "[keyword class] [def Commune]"
  );

  MT("classdiagram_relationships",
    "[variable Dwelling] [operator <|-down-] [variable Apartment][operator :] [keyword Inheritance]",
    "[variable Dwelling] [operator <|-down-] [variable Commune][operator :] [keyword Inheritance]",
    "[variable Dwelling] [operator <|-down-] [variable House][operator :] [keyword Inheritance]",
    "[variable Dwelling] [string \"1\"] [operator *-up-] [string \"many\"] [variable Window][operator :] [keyword Composition]",
    "[variable Dwelling] [string \"1\"] [operator *-up-] [string \"many\"] [variable Door][operator :] [keyword Composition]"
  );

  MT("style_for_class",
    "[keyword skinparam] [keyword componentStyle] [keyword uml2]"
  );

  MT("abstract_class", 
    "[keyword abstract] [keyword class] [def AbstractList] [bracket {]",
    "",
    "[bracket }]"
  );

  MT("class_with_stereotype",
    "[keyword class] [def Test] << [variable general] >> [bracket {]",
    "[bracket }]"
  );

  MT("style_on_stereotype",
    "[keyword class] [def System] << ([string S],[atom #FF7700]) [variable Singleton] >>"
  );

  MT("multiple_stereotypes",
    "[keyword class] [def Date] << ([string D],[atom orchid]) >>"
  );

  MT("content_of_class",
    "[keyword class] [def Foo1][string <Generics tag>] [bracket {]",
    "You can use",
    "several lines",
    "[operator ..]",
    "as you want",
    "and group",
    "[operator ==]",
    "things together.",
    "[operator __]",
    "You can have as many groups",
    "as you want",
    "[operator --]",
    "End of class",
    "[bracket }]"
  );

  MT("class_with_methods",
    "[keyword class] [def User] [bracket {]",
    "[operator ..][string  Simple Getter ][operator ..]",
    "[attribute +] [def getName][operator ()] [operator :] [variable String]",
    "[attribute +] [def getAddress][operator ()] [operator :] [variable Address]",
    "[operator ..][string  Some setter ][operator ..]",
    "[attribute +] [def setName][operator ()] [operator :] [variable String]",
    "[operator __][string  private data ][operator __]",
    "[attribute -][builtin int] [def age]",
    "[operator --][string  crypted ][operator --]",
    "[attribute -][variable String] [def password]",
    "[bracket }]"
  );

  MT("enum", 
    "[keyword enum] [def TimeUnit] [bracket {]",
    "  [def DAYS]",
    "  [def HOURS]",
    "  [def MINUTES]",
    "[bracket }]"
  );

  MT("interface",
    "[keyword interface] [def List] [bracket {]",
    "[bracket }]"
  );

  MT("annotation",
    "[keyword annotation] [def SuppressWarnings]"
  );  

  MT("class_inline_with_stereotype",
    "[keyword class] [def Object] << [variable general] >>"
  );

  MT("extension_relation",
    "[variable Object] [operator <|---] [variable ArrayList]"
  );

  MT("title with a slash",
    "[keyword title][string Properties / Methods - Class Diagram]"
  );

  MT("advanced class fields",
    "[keyword class] [def Car] [bracket {]",
    "  [operator ..][string Field Examples ][operator ..]",
    "  [attribute -][def Name][operator :] [variable Type] [bracket {] [variable arg1], [variable arg2], [variable argn] [bracket }]",
    "  [attribute +][def Name][operator :] [variable Type] [bracket {] [variable arg1], [variable arg2], [variable argn] [bracket }]",
    "  [attribute #][def Name][operator :] [variable Type] [bracket {] [variable arg1], [variable arg2], [variable argn] [bracket }]",
    "  [attribute ~][def Name][operator :] [variable Type] [bracket {] [variable arg1], [variable arg2], [variable argn] [bracket }]"
  );

  MT("advanced class methods",
    "[keyword class] [def Car] [bracket {]",
    "  [operator ..][string Method Examples ][operator ..]",
    "  [attribute -][def Name][operator ():] [variable Type] [bracket {] [variable arg1], [variable arg2], [variable argn] [bracket }]",
    "  [attribute +][def Name][operator ():] [variable Type] [bracket {] [variable arg1], [variable arg2], [variable argn] [bracket }]",
    "  [attribute #][def Name][operator ():] [variable Type] [bracket {] [variable arg1], [variable arg2], [variable argn] [bracket }]",
    "  [attribute ~][def Name][operator ():] [variable Type] [bracket {] [variable arg1], [variable arg2], [variable argn] [bracket }]"
  );

  MT("static class methods",
    "[keyword class] [def Car] [bracket {]",
    "  [operator ..][string Method Examples ][operator ..]",
    "  [attribute +][keyword {static}] [def Name][operator ():] [variable Type] [bracket {] [variable arg1], [variable arg2], [variable argn] [bracket }]"
  );     

  MT("abstract class methods",
    "[keyword class] [def Car] [bracket {]",
    "  [operator ..][string Method Examples ][operator ..]",
    "  [attribute +][keyword {abstract}] [def Name][operator ():] [variable Type] [bracket {] [variable arg1], [variable arg2], [variable argn] [bracket }]"
  );      
/*

/*

class Car
ICar ()- Car
ICar2 ()-- Car
Car -() ICar3

@enduml
*/

/*
@startuml

title Interfaces - Class Diagram


class Car
ICar ()- Car
ICar2 ()-- Car
Car -() ICar3

@enduml
*/


/*
@startuml

title Packages - Class Diagram


package Node <<[builtin Node]>> {
  class Worker1
}

package Rectangle <<[builtin Rect]>> {
  class Worker2
}

package Folder <<[builtin Folder]>> {
  class Worker3
}

package Frame <<[builtin Frame]>> {
  class Worker4
}

package Internet <<[builtin Cloud]>> {
  class Worker5
}

package Database <<[builtin Database]>> {
  class Worker6
}

@enduml
*/

})();