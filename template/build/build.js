'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const fse = require('fs-extra')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('./config')
const utils = require('./utils')
const webpackConfig = require('./webpack.prod.conf')
const dynamicEntries = utils.getDynamicEntries()

const spinner = ora('building for production...')
spinner.start()

rm(config.build.assetsRoot, err => {
  if (err) throw err
  webpackConfig.entry = (dynamicEntries && dynamicEntries.multiEntries) || webpackConfig.entry;
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      const info = stats.toJson()
      console.error('\n');
      console.error(chalk.magenta('编译打包出错了 ~~~~(>_<)~~~~ \n'))
      console.error(chalk.magenta('具体错误信息如下 \n'))
      console.error(chalk.red(`${info.errors}.\n`))
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    // 为dist目录下${page}.html引用的config.js添加hash,去除缓存
    Object.keys(webpackConfig.entry).forEach((page) => {
      fse.readFile(path.join(config.build.assetsRoot, `${page}.html`), 'utf-8', function(err, html) {
        if (err) return console.error(`[webpack:build]: read ${page}.html failed`)

        const hash = stats.toJson('normal').hash || Date.now();
        const content = html.replace('config.js', `config.js?${hash}`)

        fse.writeFileSync(path.join(config.build.assetsRoot, `${page}.html`), content, 'utf-8')
      })
    })

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
