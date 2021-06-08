# 修改配置
打开项目根目录下的 `config.js`，修改对应的配置信息

<br>

# 开始

### 安装依赖
```
npm install
```
或者使用国内镜像
```
npm install --registry=https://registry.npm.taobao.org
```

### 启动开发（热更新）
默认于 http://localhost:4399
```
npm run serve
```

### 构建生产发布
产生于dist目录下
```
npm run build 
```

<br>

# 问题
## 1. 打包压缩报错
如打包时遇到：找不到 `image-webpack-loader` 模块等等压缩时产生的错误时，可尝试如下解决方法：</br>

卸载 `image-webpack-loader` 包

```
npm uninstall image-webpack-loader
```
使用cnpm再此安装此包

```
cnpm install image-webpack-loader --save-dev
```
