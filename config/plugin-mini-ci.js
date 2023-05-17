async function CIPluginFn() {
  // 可以在这里做一些异步事情， 比如请求接口获取配置
  /**
   * @typedef { import("@tarojs/plugin-mini-ci").CIOptions } CIOptions
   * @type {CIOptions}
   */
  return {
    weapp: {
      appid: 'touristappid',
      privateKeyPath: '',
      // privateKeyPath: '密钥文件相对项目根目录的相对路径，例如 key/private.appid.key',
    },
    tt: {
      email: '字节小程序邮箱',
      password: '字节小程序密码',
    },
    alipay: {
      appid: '支付宝小程序appid',
      toolId: '工具id',
      privateKeyPath: '密钥文件相对项目根目录的相对路径，例如 key/pkcs8-private-pem',
    },
    dd: {
      appid: '钉钉小程序appid,即钉钉开放平台后台应用管理的 MiniAppId 选项',
      token: '令牌，从钉钉后台获取',
    },
    swan: {
      token: '鉴权需要的token令牌',
    },
    // 版本号
    version: '1.0.0',
    // 版本发布描述
    desc: '版本描述',
  }
}

export default ['@tarojs/plugin-mini-ci', CIPluginFn]
