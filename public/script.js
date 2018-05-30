"use strict";

function jsonParser(str){

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
