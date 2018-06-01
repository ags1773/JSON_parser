"use strict";

let whatToHighlight = 3;
document.getElementById("btn2").addEventListener("click", function(){
  console.clear();
  document.getElementById('in1').value = "";
  for(let i=0; i<6; i++){
    document.getElementById(i).classList.remove("highlight");
  }
});
document.getElementById("btn1").addEventListener('click', function(){
  let tc = document.getElementById('in1').value;
  console.log("Input JSON -->");
  console.log(tc);
  console.log("-----------------------------------");
  console.log("Output ->");
  console.log(jsonParser(tc));
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
  let endOfObject = false;
  str = removeWhiteSpaces(str);

  if(str.charAt(0) === '{'){
    str = str.slice(1);

    while(str.charAt(0) !== '}'){
      str = removeWhiteSpaces(str);
      let temp = stringParser(str);

      if(!temp) return null;

      let key = temp[0];
      str = removeWhiteSpaces(temp[1]);
      temp = colonParser(str);

      if(!temp) return null;

      str = removeWhiteSpaces(temp[1]);
      temp = jsonParser(str);

      if(!temp) return null;

      output[key] = temp[0];
      str = removeWhiteSpaces(temp[1]);

      if(str.charAt(0) === '}'){
        str = str.slice(1);
        endOfObject = true;
        break;
      } else if(str.charAt(0) === ','){
        temp = commaParser(str);
        str = removeWhiteSpaces(temp[1]);
        if(str.charAt(0) === '}'){
          endOfObject = true;
          break;
        }
      } else return null;
    }
  } else return null;

  if(endOfObject){
    whatToHighlight = 5;
    return [output,str];
  }
}

function arrayParser(str){
  let output = [];
  let endOfArray = false;
  str = removeWhiteSpaces(str);
  if(str.charAt(0) === '['){
    str = str.slice(1);

    while(str.charAt(0) !== ']'){
      str = removeWhiteSpaces(str);
      let temp = jsonParser(str);

      if(!temp) return null;

      output.push(temp[0]);
      str = removeWhiteSpaces(temp[1]);

      if(str.charAt(0) === ']'){
        //will return [1,2,3] for arrayParser('[1,2,3,]kdgdf');
        str = str.slice(1);
        endOfArray = true;
        break;
      }

      else if(str.charAt(0) === ','){
        temp = commaParser(str);
        str = removeWhiteSpaces(temp[1]);

        if(str.charAt(0) === ']'){
          endOfArray = true;
          break;
        }
      }

      else return null;
      //The above else will return null for case [1,2    "c"  "b",true]
    }
  } else return null;

  if(endOfArray){
    whatToHighlight = 4;
    return [output,str];
  }
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
  let reTest = /^"(|[^\"]*| *\\["\\/bfnrt] *| *(\\u[\dA-Fa-f]{4} )*)"/.exec(str);
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
  let reTest = /^(-|\+)?\d+(\.\d+)?([eE][+-]?\d+)?/.exec(str);
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
  return [(reTest[0]==="true")?(true):(false),str.slice(reTest[0].length)];
}

function nullParser(str){
  let reTest = /^null/.exec(str);
  if(!reTest){
    return null;
  }
  whatToHighlight = 0;
  return [null,str.slice(reTest[0].length)];
}
