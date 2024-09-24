const path = require('path');
module.exports = {
    entry:{
        index : './src/main/resources/static/js/index.js',
        indexBoardPage : './src/main/resources/static/js/Index/indexBoardPage.js',
        indexTraceWrite : './src/main/resources/static/js/Index/indexTraceWrite.js',
        indexFollowInfo : './src/main/resources/static/js/Index/indexFollowInfo.js',

    },
    output: {
        path: path.resolve(__dirname, 'src/main/resources/static/js/bundle'),
        filename: '[name].bundle.js'
    }
};