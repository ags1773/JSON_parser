"use strict";

function jsonParser(str){
  return nullParser(str) || booleanParser(str) || stringParser(str) || numberParser(str) || arrayParser(str) || objectParser(str);
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
        str = str.slice(1);
        endOfArray = true;
        break;
      } else if(str.charAt(0) === ','){
        temp = commaParser(str);
        str = removeWhiteSpaces(temp[1]);
        if(str.charAt(0) === ']'){
          endOfArray = true;
          break;
        }
      } else {
        console.log("some problem..");
        return null;
      }
      //console.log(`str => ${str}`);
      //console.log(`output => ${output}`);
    }
  } else return null;
  if(endOfArray){
    return [output,str];
  }
}

let testData1 = '[{"0":"101","member_id":"101","1":"3k.png","image_nm":"3k.png","2":"\/images\/phones\/","image_path":"\/images\/phones\/"},{"0":"102","member_id":"102","1":"mirchi.png","image_nm":"mirchi.png","2":"images\/phones\/","image_path":"images\/phones\/"},{"0":"103","member_id":"103","1":"masti.png","image_nm":"masti.png","2":"images\/phones\/","image_path":"images\/phones\/"}]';

function objectParser(str){
  return;
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
  return [Number(reTest[0]),str.slice(reTest[0].length)];
}

function booleanParser(str){
  let reTest = /(^true|false)/.exec(str);
  if(!reTest){
    return null;
  }
  return [(reTest[0]==="true")?(true):(false),str.slice(reTest[0].length)];
}

function nullParser(str){
  let reTest = /^null/.exec(str);
  if(!reTest){
    return null;
  }
  return [null,str.slice(reTest[0].length)];
}
