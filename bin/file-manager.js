#!/usr/bin/env node  
'use strict'
const program = require('commander');
const PackageProperty = require('../package.json');
const Manager = require('../lib/manager')
const logger = require('../lib/logger');
const config = require('../lib/config');

const manager = new Manager(config,logger)
program
    .version(PackageProperty.version);
program
    .command('find [name]')
    .description('find files filter with the specified name')
    .option('-T,--type [type]')
    .option('-P,--path [path]')
    .action(function(name,options){
        manager.find(name,options)
    })

program
    .command('delete [name]')
    .description('find files filter with the specified name')
    .option('-T,--type [type]')
    .option('-P,--path [path]')
    .action(function(name,options){
        manager.delete(name,options)
    })

program.parse(process.argv);