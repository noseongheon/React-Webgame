// const React = require('react');
// const ReactDom = require('react-dom');
// const { hot } = require('react-hot-loader/root');
// const NumberBaseball = require('./NumberBaseball');

// 위에처럼 쓸 수도 있고, import로 쓸수도 있음

import React from 'react';
import ReactDom from 'react-dom';

// import NumberBaseball from './NumberBaseball';
import NumberBaseball from './RenderTest';


// const WordRelay = require('./WordRelay');


ReactDom.render(<NumberBaseball />, document.querySelector('#root'));