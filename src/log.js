const chalk = require('chalk')
function log(  words, color){
  if(typeof(color)=='undefined'){
    console.log(words);
  }else{
    console.log(chalk[color](words));
  }
}

module.exports=log;
