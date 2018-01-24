#! /usr/bin/env node

'use strict';
var fs = require("fs");
const clone = require('git-clone');
const prompts = require('../src/prompts.js');
const config = require('../src/config.js');
const log = require('../src/log.js');


var run= function (opt) {
  switch(opt[0]){
    case '-h':
      log(prompts.help , 'yellow');
      break;
    case 'init':
      if(opt[1]){
        log(prompts.downloading);
        clone( config.vblogDownloadUrl ,opt[1],null,function(){
            log(prompts.downloaded,'green');
        });
      }else{
          log(prompts.setBlogName,'red');
      }
      break;
    case '-v':
      const pkg = require('../package.json');
      log("version: "+pkg.version);
      break;
    case 'add':
      if(opt[1]==="blog"){ // 添加博客
        if( fs.existsSync('./articles') ){
          var text = "---\r\ntitle: "+opt[2]+"\r\ndate: "+getTime()+"\r\ntags: [无标签]\r\ncategories: 未分类\r\n--- \r\n <!-- deleteAbove -->"
          fs.writeFileSync('./articles/'+opt[2]+'.md',text);
          //  待做  加入新文章到 三个 json  ---------------------

          log('A new blog called "'+ opt[2] +'.md " has been generated',"green");
        }else{
          log(prompts.notVblog,'red');
        }
      }else if(opt[1]==="theme"){
        var target = './theme/'+opt[2];
         if( fs.existsSync('./theme')  ){
           log(prompts.downloading);
           clone(config.vblogTemplateDownloadUrl,target,null,function(){
             log("OK, theme "+opt[2]+" added successfully! Now you can customize your own theme!","green");
           });
         }else{
            log(prompts.notVblog,'red')
         }
      }
      break;
    case "delete":
      if(opt[1]==="blog"){ // 删除博客 进入回收站
        var sourceFile = './articles/'+opt[2]+'.md';
        var destPath = './res/recycleBin/'+opt[2]+'.md';
         if( fs.existsSync(sourceFile) ){
           // 移动文件
            fs.rename(sourceFile, destPath, function (err) {
              if (err) throw err;
              log(prompts.delSucss,'green');
            });
            // 删除 三个 json文件的对应信息 ---------------------

         }else{
            log(prompts.noBlog,'red')
         }
      }
      break;
    case "restore":
      if(opt[1]==="blog"){ // 恢复博客
        var sourceFile = './res/recycleBin/'+opt[2]+'.md';
        var destPath = './articles/'+opt[2]+'.md';
         if( fs.existsSync(sourceFile) ){
           // 移动文件
            fs.rename(sourceFile, destPath, function (err) {
              if (err) throw err;
              log(prompts.restoreSucss,'green');
            });
            // 加入 三个 json文件的对应信息 ---------------------

         }else{
            log(prompts.noBlog,'red')
         }
      }
      break;
    default:
      log(prompts.unknowCommand,'yellow');
      break;
  }
};
function getTime(){
  var date = new Date();
  // 2018/1/1 11:11:11
  return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}
//获取除第一个命令以后的参数，使用空格拆分
run(process.argv.slice(2));
