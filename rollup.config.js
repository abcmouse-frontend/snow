/**
 * @fileoverview rollup.config
 * @author alawnxu <alawnxu@tencent.com>
 * @date 2020-01-06 11:13:24
 * @version 1.0.0
 */
import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import license from 'rollup-plugin-license';
import path from 'path';
import rollup from 'rollup';

const env = process.env.NODE_ENV;
const packageJson = require('./package.json');

const rollupConfig = {
  input: 'src/index.ts',
  output: {
    file: 'dist/snow.js',
    format: 'umd',
    name: 'Snow'
  },
  plugins: [
    typescript({
      lib: ['es5', 'es6', 'dom'],
      target: 'es5'
    })
  ]
};

/**
 * 统计文件大小
 * @date 2019-11-01 10:51:31
 */
rollupConfig.plugins.push(filesize());

/**
 * 生成版权信息
 * @date 2019-11-01 10:54:34
 */
rollupConfig.plugins.push(
  license({
    banner: {
      content: {
        file: path.join(__dirname, 'FILEHEADER.txt'),
        encoding: 'utf-8'
      },
      data() {
        return {
          sdkname: 'snow',
          version: packageJson.version
        };
      }
    }
  })
);

if (env === 'production') {
  rollupConfig.output.file = `dist/snow.min.js`;
  rollupConfig.plugins.push(
    uglify({
      compress: {
        unsafe: true,
        unsafe_comps: true,
        pure_getters: true
      }
    })
  );
}

const watcher = rollup.watch(rollupConfig);
const startTime = new Date().getTime();
watcher.on('event', event => {
  switch (event.code) {
    case 'START':
      console.log('[ INFO]: 开始构建.');
      break;
    case 'BUNDLE_START':
      console.log('[ INFO]: 开始构建单个任务');
      break;
    case 'BUNDLE_END':
      console.log('[ INFO]: 当前任务构建完成');
      break;
    case 'END':
      console.log('[ INFO]: 构建结束,耗时:', new Date().getTime() - startTime + 'ms');
      setTimeout(function() {
        watcher.close();
      });
      break;
    case 'ERROR':
      console.error('[ERROR]: 构建失败');
      break;
    case 'FATAL':
      console.error('[ERROR]: 出现无法修复的错误.');
  }
});

export default rollupConfig;
