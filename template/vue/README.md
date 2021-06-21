# 目录介绍

- **dist文件夹：** 代码产出目录，也就是最终开完完毕打包出来的结果（代码已经经过转换压缩等处理，已不具有可读性）

- **node_modules(可不管)：** 存放所有通过npm安装的包依赖
  
- **src文件夹：** 开发目录，代码开发阶段都是在src目录下进行。根目录下，除了dist，node_modules，src之外，其余的大都是工程项目的配置文件，不可删除

- **.browserslistrc(可不管)：** 配置浏览器支持情况的配置文件，Babel等插件在处理代码时会根据目录下的 .browserslistrc 文件去处理js代码

- **.gitignore(可不管)：** 配置git提交时忽略的文件

- **babel.config.js(可不管)：** Babel处理js代码的配置文件

- **build.js(可不管)：** 执行npm命令时，输出打印信息的执行文件

- **config.js：** 项目打包时在此读取资源文件的公共路径，执行打包前需要根据项目部署情况进行相应的更改 

- **package.json(可不管)：** npm包管理器记录的各种信息，package-lock.json一样

- **webpack.config.js(可不管)：** webpack的配置文件，执行打包时，webpack会读取该文件进行相应的打包操作

# 开发阶段

### 1. 首先安装工程依赖
```
npm install
```
或者使用国内镜像
```
npm install --registry=https://registry.npm.taobao.org
```

### 2. 运行项目
```
npm run serve
```
项目默认运行于本地的4399端口，当代码改动时，浏览器会自动刷新更新页面。

### 3. 安装其他依赖
```
npm i 依赖名称
```
例如安装 axios：控制台执行 `npm i axios`，并在/src/main.js主文件（或者其他需要的文件）中引入即可使用
```javascript
import Axios from 'axios'
```

# 上线阶段

### 1. 修改根目录下的 config.js 文件
webpack打包时，会给各个资源文件加上路径。详见`config.js`文件

### 2. 修改后，执行打包
```
npm run build
```
build命令是针对上线的打包，会对代码做转换/压缩，图片压缩，样式文件编译/提取等优化操作，最终将输出的所有文件放到 /dist目录下。<br>

部署上线时以 /dist目录下的文件为准，images上传完cdn后可删除。


# 打包过程可能遇到的问题

- ### 压缩图片报错
    如打包时遇到：找不到 `image-webpack-loader` 模块等等压缩图片时产生的错误，可尝试如下解决方法：</br>

    卸载 `image-webpack-loader` 包

    ```
    npm uninstall image-webpack-loader
    ```
    使用cnpm再此安装此包

    ```
    cnpm install image-webpack-loader --save-dev
    ```


