//  所有提示语

const prompts = {
  help: '\r\n  Usage: vblog <command> [options]\r\n \r\n'+
                '  Commands:\r\n\r\n'+
                '     init        generate a new project from a template\r\n'+
                '     add         add a blog or theme by name\r\n'+
                '     delete      delete a blog\r\n'+
                '     restore     restore a blog\r\n'+
                '\r\n  Options: \r\n\r\n'+
                '     -h          output usage information\r\n'+
                '     -v          output the version number\r\n \r\n',
  downloading: '\r\n--- Downloading template... please wait a minute.',
  notVblog: '\r\nFailed : this is not a vblog project directory.',
  delSucss: '\r\nBlog has been deleted,you can see it at this directory: \r\n src/recycleBin.',
  noBlog: '\r\nThere is no such blog here,Please confirm the blog\'s name first.',
  restoreSucss: '\r\nThe article has been restored successfully.',
  unknowCommand: '\r\nunknow command: "+ opt[0] +". \r\ncheck the command you have input .it must be one of the options below : \r\n  1. init \r\n  2.add  \r\n  3.delete  \r\n  4.restore    ......  \r\nmore command or info about vblog-cli ? please check out this website : \r\n**https://github.com/LqqJohnny/vblog-cli**',
  setBlogName: '\r\nPlease confirm the project name, for  example: vblog init MyBlog',
  downloaded: '\r\nTemplate download completed, Follow the sequence below: \r\n  1.cd yourBlogName  \r\n  2. npm install  \r\n  3. npm run dev \r\n then you can see something wonderful at :  localhost:8000',


}

module.exports = prompts;
