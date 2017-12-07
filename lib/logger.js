'use strict'

const chalk = require('chalk');

module.exports = {
    info(message) {
        console.log(message);
    },
    error(message) {
        console.log(chalk.red(message));        
    },
    success(message){
        console.log(chalk.green(message));
    }
}