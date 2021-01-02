#!/usr/bin/env node

//Node CLI 应用入口文件必须要有这样的文件头
//如果是Linux或者是MacOS系统下还需要修改此文件的读写权限为 755
//具体就是通过 chmod 755 cli.js 实现修改

//console.log('cli working!')

//脚手架的工作原理
//1.通过命令行交互询问用户问题
//2.根据用户回答的结果生成文件

const ejs=require('ejs')   //模板引擎
const fs=require('fs')
const path=require('path')
const inquirer = require('inquirer')

//inquirer发起命令行交互询问
inquirer.prompt([
  {
    type:'input',
    name:'name',
    message:'Project name?'
  }
])
.then(answers=>{
  // console.log(answers)
  //根据用户回答的结果生成文件

  //模板目录(绝对路径)
  const tmplDir=path.join(__dirname,'templates')

  //目标目录 命令行在哪个目录执行，就是目标目录,及cwd目录
  const destDir=process.cwd();

  //fs读取文件，将模板下的文件全部转换到目标目录
 fs.readdir(tmplDir,(err,files)=>{
    if(err) throw err
    files.forEach(file=>{
      // console.log(file)  //打印出文件的相对路径
      //通过模板引擎渲染该路径下的文件
      ejs.renderFile(path.join(tmplDir,file),answers,(err,result)=>{
        if(err) throw err
        // console.log(result)  //经过模板引擎工作后的结果
        //将结果写入目标文件路径
        fs.writeFileSync(path.join(destDir,file),result)
      })
    })
 })
})
