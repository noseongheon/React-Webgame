const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'eval', // hidden-source-map
    resolve: {
        extensions: ['.jsx','.js'],
    },

    entry: {
        app: './client',
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env',{
                        targets: {
                            browsers: ['> 5% in KR'], // 앞에껀 KR에서 점유율 5%이상 browerslist 사이트 들어가면 옵션 더 볼 수 있음
                        },
                        debug: true,
                    }],
                    '@babel/preset-react',
            ],
            }
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }), // 위에 loader 안에 options에 싹다 debug:true를 추가해주는 플러그인
    ], // 플러그인: 확장프로그램
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'), 
    },

}