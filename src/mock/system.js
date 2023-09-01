/* eslint-disable @typescript-eslint/no-var-requires */

const MockJs = require('mockjs')

module.exports = {
  /**
   * 获取角色列表
   */
  'POST /base/api/getRoleList/v1.0': (req, res) => {
    setTimeout(() => {
      const list = []
      const totalNum = 35
      for (let index = 0; index < req.body.pageSize; index++) {
        list.push({
          id: '@id',
          name: '@cname',
          state: index % 2 === 0 ? 1 : 0
        })
      }
      const data = MockJs.mock({
        code: '10000',
        message: 'ok',
        body: {
          totalNum,
          list
        }
      })
      return res.json(data)
    }, 500)
  }
}
