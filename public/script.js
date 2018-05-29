"use strict";

function jsonParser(str){
  let output = [];

  //number, boolean, null, whitespace
  if(RegExp(/^(-|\+)?\d+(\.\d+)?([eE][+-]?\d+)?/).exec(str) !== null){
    let temp = RegExp(/^(-|\+)?\d+(\.\d+)?([eE][+-]?\d+)?/).exec(str);
    output.push((Number(temp[0]) == -0)?(0):(Number(temp[0])));
    if(str.slice(temp[0].length)){
      output.push(str.slice(temp[0].length));
    }
  } else if(str.slice(0,4) === "true"){
    output.push(true);
    if(str.slice(4)){
      output.push(str.slice(4));
    }
  } else if(str.slice(0,5) === "false"){
    output.push(false);
    if(str.slice(5)){
      output.push(str.slice(5));
    }
  } else if(str.slice(0,4) === "null"){
    output.push(null);
    if(str.slice(4)){
      output.push(str.slice(4));
    }
  } else if(RegExp(/^\s/).exec(str) !== null){
    let temp = RegExp(/^\s/).exec(str);
    output.push(temp[0]);
    if(str.slice(temp[0].length)){
      output.push(str.slice(temp[0].length));
    }
  } else return null;
  return output;
}

//------------------------------------------------------------------------------
function objectParser(str){
  
}

function whiteSpaceParser(str){
  let output = [];
  if(RegExp(/^\s/).exec(str) !== null){
    let temp = RegExp(/^\s/).exec(str);
    output.push(temp[0]);
    if(str.slice(temp[0].length)){
      output.push(str.slice(temp[0].length));
    }
  } else return null;
  return output;
}

function numberParser(str){
  let output = [];
  if(RegExp(/^(-|\+)?\d+(\.\d+)?([eE][+-]?\d+)?/).exec(str) !== null){
    let temp = RegExp(/^(-|\+)?\d+(\.\d+)?([eE][+-]?\d+)?/).exec(str);
    output.push((Number(temp[0]) == -0)?(0):(Number(temp[0])));
    if(str.slice(temp[0].length)){
      output.push(str.slice(temp[0].length));
    }
  } else return null;
  return output;
}

//INCOMPLETE
function stringParser(str){
  let output = [];
  if(str.charAt(0) === '"' && str.slice(1).indexOf('"') !== -1){
    let idx = str.slice(1).indexOf('"');
    let temp = RegExp(/[^\\]/).exec(str.slice(1,idx+1));
    if(temp !== null){
      console.log(temp[0]);
    } else return null;
  } else return null;
}

// function stringParser(str){
//   let output = [];
//   if(str.charAt(0) === '"'){
//     let idx = str.slice(1).indexOf('"');
//     output.push(str.slice(1,idx+1));
//     if(str.slice(idx+2)){
//       output.push(str.slice(idx+2));
//     }
//   } else if(str.charAt(0) === "'"){
//     let idx = str.slice(1).indexOf("'");
//     output.push(str.slice(1,idx+1));
//     if(str.slice(idx+2)){
//       output.push(str.slice(idx+2));
//     }
//   } else return null;
//   return output;
// }

function booleanParser(str){
  let output = [];
  if(str.slice(0,4) === "true"){
    output.push(true);
    if(str.slice(4)){
      output.push(str.slice(4));
    }
  } else if(str.slice(0,5) === "false"){
    output.push(false);
    if(str.slice(5)){
      output.push(str.slice(5));
    }
  } else return null;
  return output;
}

function nullParser(str){
  let output = [];
  if(str.slice(0,4) === "null"){
    output.push(null);
    if(str.slice(4)){
      output.push(str.slice(4));
    }
  } else return null;
  return output;
}
