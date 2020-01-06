const path = require('path');
const rootPath = process.cwd();

exports.name = '【本地调试】snow';
exports.rules = `
# 静态资源CDN代理
https://h5.abcmouse.qq.com/snow/index.html file://${rootPath}/test/snow.html
`;
