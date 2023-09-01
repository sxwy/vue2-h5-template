/** 登录参数 */
export interface LoginQuery {
  /** 账号 */
  account: string
  /** 密码 */
  password: string
}

/** 会话信息 */
export interface Session {
  /** token */
  token: string
}

/** 用户信息 */
export interface User {
  /** id */
  id: string
  /** 头像 */
  avatar: string
  /** 名称 */
  name: string
}
