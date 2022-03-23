// 소스들이 결국 html 파일의 <script src="./dist/app.js"></script> 안에 들어가야하는데
// 여러 소스들을 이 app.js 파일 하나로 합치는걸 도와주는 게 webpack!!

const path = require('path'); // Node에서 경로 조작할 수 있게 해주는건데 그냥 외우자!!
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin'); // 이건 개발할 때 매번 빌드하지 않아도 알아서 새로고침 해주는 플러그인

module.exports = {
    name: 'wordrelay-setting', // 이름 원하는걸로
    mode : 'development', // 개발용. 실서비스: production
    devtool : 'eval', // 빠르게
    resolve: {
        extensions: ['.js','.jsx'] // entry에 확장자 다 써주기 많고 귀찮으니까 이렇게 넣어주면 webpack이 알아서 해당 이름의 js나 jsx등 확장자 파일 검색해준다.
    },

    // entry, output 제일 중요 ★
    entry : {
        app: ['./client.jsx'], // 이런식으로 계속 합치기 원하는 파일들 넣어주면 됨  './WordRelay.jsx'는 이미 client.jsx가 불러오고 있으므로 안불러와도 됨
    }, // 입력

    module: {
       rules: [{
        test: /\.jsx?/, // js나 jsx 파일에 적용. 정규식 공부
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
        plugins: [
            'react-refresh/babel',
            'react-hot-loader/babel'
        ]
        }
       }] ,
    }, // entry 파일을 읽고 module 적용 후 output에 뺀다..
    plugins: [
        new RefreshWebpackPlugin()
    ],
    output : {
        path: path.join(__dirname, 'dist'), // __dirname은 현재 디렉토리이고, 현 디렉토리 안에있는 dist라는 폴더와 경로 합치는 명령어 (path.join)
        filename: 'app.js', // 출력 원하는 파일 
        publicPath: '/dist/',
    }, // 출력
    devServer: { // 이 부분이 webpack 버전 올라갈수록 바뀌네..
        devMiddleware: {publicPath: '/dist/'},
        static: { directory: path.resolve(__dirname) },
        hot: true,
    }

};