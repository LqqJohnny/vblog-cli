#! /usr/bin/env node

'use strict';
var fs = require("fs");
const clone = require('git-clone');
const pkg = require('../package.json');
var run= function (opt) {
  switch(opt[0]){
    case '-h':
      var helpStr = '\r\n  Usage: vblog <command> [options]\r\n \r\n'+
                    '  Commands:\r\n\r\n'+
                    '     init        generate a new project from a template\r\n'+
                    '     add         add a blog by name\r\n'+
                    '     delete      delete a blog\r\n'+
                    '     restore     restore a blog\r\n'+

                    '\r\n  Options: \r\n\r\n'+

                    '     -h          output usage information\r\n'+
                    '     -v          output the version number\r\n \r\n';
      console.log(helpStr);
      break;
    case 'init':
      if(opt[1]){
        console.log("downloading template...");
        clone("https://github.com/LqqJohnny/SimpleBlogByVue.git",opt[1],null,function(){
          console.log("Template download completed, Follow the sequence below: \r\n  1. npm install  \r\n  2. npm run dev \r\n then you can see something wonderful at : \r\n localhost:8000");
        });
      }else{
        console.log("Please confirm the project name, for  example: vblog init MyBlog");
      }
      break;
    case '-v':
      console.log("version: "+pkg.version);
      break;
    case 'add':
      if(opt[1]==="blog"){ // 添加博客
        if( fs.existsSync('./src/articles') ){
          var text = "---\r\ntitle: "+opt[2]+"\r\ndate: "+getTime()+"\r\ntags: [无标签]\r\ncategories: 未分类\r\n--- \r\n <!-- deleteAbove -->"
          fs.writeFileSync('./src/articles/'+opt[2]+'.md',text);
          //  待做  加入新文章到 三个 json  ---------------------

          console.log('a new blog called "'+ opt[2] +'.md " has been generated');
        }else{
          console.log('failed : this is not a vblog project directory.');
        }
      }else if(opt[1]==="theme"){
        var target = './theme/'+opt[2];
         if( fs.existsSync('./theme')  ){
           console.log('downloading template... please wait a minute.');
           clone("https://github.com/LqqJohnny/vblog_theme_template.git",target,null,function(){
             console.log("OK, theme "+opt[2]+" added successfully!");
           });
         }else{
            console.log('failed : this is not a vblog project directory.')
         }
      }
      break;
    case "delete":
      if(opt[1]==="blog"){ // 删除博客 进入回收站
        var sourceFile = './src/articles/'+opt[2]+'.md';
        var destPath = './src/recycleBin/'+opt[2]+'.md';
         if( fs.existsSync(sourceFile) ){
           // 移动文件
            fs.rename(sourceFile, destPath, function (err) {
              if (err) throw err;
              console.log("blog has been deleted,you can see it at this directory: \r\n src/recycleBin.");
            });
            // 删除 三个 json文件的对应信息 ---------------------

         }else{
            console.log('There is no such blog here,Please confirm the blog\'s name first.')
         }
      }
      break;
    case "restore":
      if(opt[1]==="blog"){ // 恢复博客
        var sourceFile = './src/recycleBin/'+opt[2]+'.md';
        var destPath = './src/articles/'+opt[2]+'.md';
         if( fs.existsSync(sourceFile) ){
           // 移动文件
            fs.rename(sourceFile, destPath, function (err) {
              if (err) throw err;
              console.log("the article has been restored successfully.");
            });
            // 加入 三个 json文件的对应信息 ---------------------

         }else{
            console.log('There is no such blog here,Please confirm the blog\'s name first.')
         }
      }
      break;
    default:
      console.log("unknow command: "+ opt[0] +". \r\ncheck the command you have input .it must be one of the options below : \r\n  1. init \r\n  2.add  \r\n  3.delete  \r\n  4.restore    ......  \r\nmore command or info about vblog-cli ? please check out this website : \r\n**https://github.com/LqqJohnny/vblog-cli**");
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
