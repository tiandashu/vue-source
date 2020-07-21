import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
  input: './src/core/index.js',
  output: {
    file: 'dist/umd/vue.js', // 输出目录
    name: 'Vue', // 全局变量, 此处的命名决定了挂载到全局的变量 global.Vue
    format: 'umd', // 统一模块规范
    sourcemap: true // 开启源码调试es6 - es5
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    process.env.NODE_ENV === 'development' ? serve({
      open: true,
      openPage: '/public/index.html',
      port: 3000,
      contentBase: ''
    }): null
  ]
}