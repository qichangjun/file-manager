'use strict'

const fs = require('fs');
const path = require('path');
const util = require('util');

const readline = require('readline');

class Manager {
    constructor(config,logger){
        this.config = config
        this.logger = logger;
    }

    async find(name,options){
        let searchPath = options.path ? options.path : this.config.path
        let searchType = options.type ? options.type : this.config.type
        if (!fs.existsSync(searchPath)){
            this.logger.error(`${searchPath} is not exist`);
            return
        }
        let results = await this.findFile(name,searchPath,searchType)     
    }

    async delete(name,options){
        let searchPath = options.path ? options.path : this.config.path
        let searchType = options.type ? options.type : this.config.type
        if (!fs.existsSync(searchPath)){
            this.logger.error(`${searchPath} is not exist`);
            return
        }
        let results = await this.findFile(name,searchPath,searchType)  
        if (results.length == 0) {
            console.log('not file match');
            return 
        }
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        let unlink = util.promisify(fs.unlink)
        let askToDelete = (i) =>{
            rl.question(`Are you sure that you want delete ${results[i]}?  (y/n) `, async (answer) => {            
                if (answer.match(/^y(es)?$/i)){ 
                    await unlink(results[i])
                    this.logger.success('delete success')    
                }                   
                if (i == results.length - 1) {
                    rl.close();
                    return 
                }
                i++
                askToDelete(i)
            });
        }   
        askToDelete(0)                 
    }

    async findFile(name,filePath,searchType) {
        let manage = this
        var files = [];
        const isPathExists = fs.existsSync(filePath)
        if (!isPathExists){
            this.logger.error(`${filePath} is not exist`)
            return 
        }                
        return new Promise(async (resolved,reject)=>{
            let readDirection = util.promisify(fs.readdir);
            let fsStat = util.promisify(fs.stat);
            let files = await readDirection(filePath);
            let results = []
            for (let i =0;i<files.length;i++){
                let curPath = path.join(filePath,files[i]);
                let stat = await fsStat(curPath)    
                if(stat.isDirectory()) {
                    let resPath = await manage.findFile(name,curPath,searchType);
                    results = results.concat(resPath);
                    if (searchType == 'all' || searchType == 'dir'){                                                                
                        if (files[i].indexOf(name) >= 0){
                            manage.logger.info(`${curPath} : `);
                            manage.logger.success(`${files[i]}`);
                            results.push(curPath);
                        }
                    }                  
                }else{
                    if (files[i].indexOf(name) >= 0){
                        manage.logger.info(`${curPath} : `);
                        manage.logger.success(`${files[i]}`);
                        results.push(curPath);
                    }
                }                  
            }   
            resolved(results) 
        })                     
    }
}

module.exports = Manager;