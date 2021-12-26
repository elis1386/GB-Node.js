#!/usr/local/bin/node
const fs = require('fs')
const path = require('path')
const yargs = require('yargs');
const inquirer = require('inquirer');

const executionDir = process.cwd()
const isFile = (path) => fs.lstatSync(path).isFile()
const list = fs.readdirSync(executionDir).filter(isFile)

inquirer.prompt([
    {
        name: 'fileName',
        type: 'list', //input, number, list. cofirm, checkbox, password
        message: ' Choose file: ',
        // choices: ['q','w','e','r','t','y']
        choices: list,
    }
]).then(({fileName}) => {
    const fullPath = path.join(__dirname, fileName)
    const data = fs.readFileSync(fullPath, 'utf-8')
    console.log(data)
});



