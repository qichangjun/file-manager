# file-manger
管理文档，文件夹的shell命令工具

## Features
- [x] search file,folder
- [x] delete file,folder



## Installation
```shell
$ git@github.com:qichangjun/file-manager.git
$ cd file-manager
$ npm install && npm link
```


## Usage
```shell
▶ fm -h

  Usage: fm [options] [command]


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    find [name,type,path]                   find the files,folder with the name you input
    delete [name,type,path]                 delete the files
    
```


### find some file
```shell
$ fm find test 
        test/xx
        test.js
        
```

### find some file with configuration
```shell
$ fm find test -P ~/User/myC/Desktop/...
> test.js
```

### delete the files 
```shell
$ fm delete test -P ~/User/myC/Desktop/... -T file
> are you sure you want to delete ~/User/myC/Desktop/test.js? (y/n)
> y
> delete success
```
