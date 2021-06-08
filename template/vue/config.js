module.exports = {
    
    /**
     * 资源cdn地址
     * 文件资源打包后的最终路径为：cdnPath + fileType + fileName;
     * 对于图片：fileType = /images/
     * 对于视频：fileType = /media/
     * 对于字体：fileType = /font/
     */
    cdnPath: 'https://sytest-cdnres.unionsy.com/media/web/activity/lyzxyuyue/',

    /**
     * 服务器部署路径
     * 如部署在 http://4399.com.com/h5/index.html
     * 那么serverPath为：/h5/
     */
    serverPath: '/dist/',

}