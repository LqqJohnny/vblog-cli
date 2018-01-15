#! /usr/bin/env node

'use strict';
var fs = require("fs");
const clone = require('git-clone');

var run= function (opt) {
  switch(opt[0]){
    case 'init':
      if(opt[1]){
        console.log("正在下载模板...");
        clone("https://github.com/LqqJohnny/SimpleBlogByVue.git",opt[1],null,function(){
          console.log("模板下载完成. 按照如下顺序执行： \r\n  1. npm install  \r\n  2. npm run dev \r\n 即可在localhost:8000 看到神奇的东西");
        });
      }else{
        console.log("请确定项目名称，如  vblog init 我的博客");
      }
      break;
    case 'add':
      if(opt[1]==="blog"){ // 添加博客
        if( fs.existsSync('./src/articles') ){
          var text = "---\r\ntitle: "+opt[2]+"\r\ndate: "+getTime()+"\r\ntags: [无标签]\r\ncategories: 未分类\r\n--- \r\n <!-- deleteAbove -->"
          fs.writeFileSync('./src/articles/'+opt[2]+'.md',text);
          //  待做  加入新文章到 三个 json  ---------------------

          console.log('新博客 '+ opt[2] +'.md 已生成');
        }else{
          console.log('fail , 这不是vblog项目的根目录。');
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
              console.log("文章已删除，可在回收站 src/recycleBin 查看已删除文章");
            });
            // 删除 三个 json文件的对应信息 ---------------------

         }else{
            console.log('没有这篇文章。')
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
              console.log("文章恢复成功");
            });
            // 加入 三个 json文件的对应信息 ---------------------

         }else{
            console.log('没有这篇文章。')
         }
      }
      break;
    default:
      console.log("您输入的指令未识别，请确认是否正确");
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
