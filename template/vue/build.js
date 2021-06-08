const chalk = require('chalk');
const webpackConfig = require('./webpack.config');
const env = process.env.NODE_ENV;

if(env  === 'development'){
    const dev = webpackConfig.devServer;
    console.log(chalk.bgGreen.rgb(30, 30, 30)(' successful! '));
    console.log('Run on');
    console.log(chalk.hex('#0e81e0')(`http://${dev.host}:${dev.port}/`))
}else{
    console.log('');
    console.log(' ˄---˄');
    console.log('❬.◕‿‿◕.❭');
    console.log('-- w w');
    console.log(chalk.bgGreen.rgb(30, 30, 30)(' successful! '), ' => ', chalk.hex('#FFA500')(webpackConfig.output.path));
    console.log('');
}