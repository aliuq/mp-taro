/** * @param ctx {import('@tarojs/service').IPluginContext} */
module.exports = (ctx) => {
  ctx.onBuildStart(() => {
    console.time('build in ')
  })
  ctx.onBuildFinish(() => {
    console.timeEnd('build in ')
  })
}
