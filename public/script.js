"use strict";

let whatToHighlight = 0;
document.getElementById("btn2").addEventListener("click", function(){
  console.clear();
  document.getElementById('in1').value = "";
  for(let i=0; i<6; i++){
    document.getElementById(i).classList.remove("highlight");
  }
});
document.getElementById("btn1").addEventListener('click', function(){
  let tc = document.getElementById('in1').value;
  console.log("-------------Start--------------------");
  console.log("Input JSON -->");
  console.log(tc);
  console.log("Output ->");
  console.log(jsonParser(tc));
  console.log("-------------End----------------------");
  for(let i=0; i<6; i++){
    document.getElementById(i).classList.remove("highlight");
  }
  document.getElementById(whatToHighlight).classList.add("highlight");
});

function jsonParser(str){
  return nullParser(str) || booleanParser(str) || stringParser(str) || numberParser(str) || arrayParser(str) || objectParser(str);
}

function objectParser(str){
  let output = {};
  let returnVal = function(exp){
    whatToHighlight = 5;
    switch(exp) {
      case 0:
        return null;
      case 1:
          str = str.slice(1);
          return [output,str];
      case 2:
        console.error("Syntax error");
        return;
    }
  }

  str = removeWhiteSpaces(str);
  if(str.charAt(0) === '{'){
    str = str.slice(1);
    str = removeWhiteSpaces(str);
    if(str.charAt(0) === '}') return returnVal(1);

    while(str.charAt(0) !== '}'){
      let temp = stringParser(str);

      if(!temp) return returnVal(0);

      let key = temp[0];
      str = removeWhiteSpaces(temp[1]);
      temp = colonParser(str);

      if(!temp) return returnVal(0);

      str = removeWhiteSpaces(temp[1]);
      temp = jsonParser(str);

      if(!temp) return returnVal(0);

      output[key] = temp[0];
      str = removeWhiteSpaces(temp[1]);

      if(str.charAt(0) === '}'){
        return returnVal(1);
      } else if(str.charAt(0) === ','){
        temp = commaParser(str);
        str = removeWhiteSpaces(temp[1]);
        if(str.charAt(0) === '}'){
          return returnVal(2);
        }
      } else return returnVal(0);
    }
  } else return returnVal(0);
}

function arrayParser(str){
  let output = [];
  let returnVal = function(exp){
    whatToHighlight = 4;
    switch(exp) {
      case 0:
        return null;
      case 1:
          str = str.slice(1);
          return [output,str];
      case 2:
        console.error("Syntax error");
        return;
    }
  }
  str = removeWhiteSpaces(str);

  if(str.charAt(0) === '['){
    str = str.slice(1);
    str = removeWhiteSpaces(str);

    if(str.charAt(0) === ']') return returnVal(1);

    while(str.charAt(0) !== ']'){
      let temp = jsonParser(str);

      if(!temp) return returnVal(0);
      output.push(temp[0]);
      str = removeWhiteSpaces(temp[1]);

      if(str.charAt(0) === ']') return returnVal(1);

      else if(str.charAt(0) === ','){
        temp = commaParser(str);
        str = removeWhiteSpaces(temp[1]);

        if(str.charAt(0) === ']' || str.charAt(0) === ',')  return returnVal(2);
      } else return returnVal(2);
    }
  } else return returnVal(0);
}

function colonParser(data){
  let reTest = /^:/.exec(data);
  if(!reTest){
    return null;
  }
  return [reTest[0],data.slice(1)];
}

function commaParser(data){
  let reTest = /^,/.exec(data);
  if(!reTest){
    return null;
  }
  return [reTest[0],data.slice(1)];
}

function removeWhiteSpaces(data){
  let temp = whiteSpaceParser(data);
  if(temp){
    return temp[1];
  }
  return data;
}

function stringParser(str){
  let reTest = /^"([^\\"]|\\"|\\\\|\\\/|\\b|\\f|\\n|\\r|\\t|\\u[\dA-Fa-f]{4})*"/.exec(str);
  if(!reTest){
    return null;
  }
  whatToHighlight = 2;
  return [reTest[0].slice(1,-1),str.slice(reTest[0].length)];
}

function whiteSpaceParser(str){
  let reTest = /^\s+/.exec(str);
  if(!reTest){
    return null;
  }
  return [reTest[0],str.slice(reTest[0].length)];
}

function numberParser(str){
  let reTest = /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/.exec(str);
  if(!reTest){
    return null;
  }
  whatToHighlight = 3;
  return [Number(reTest[0]),str.slice(reTest[0].length)];
}

function booleanParser(str){
  let reTest = /^true|^false/.exec(str);
  if(!reTest){
    return null;
  }
  whatToHighlight = 1;
  return [reTest[0] === "true" ? true : false, str.slice(reTest[0].length)];
}

function nullParser(str){
  let reTest = /^null/.exec(str);
  if(!reTest){
    return null;
  }
  whatToHighlight = 0;
  return [null,str.slice(reTest[0].length)];
}
