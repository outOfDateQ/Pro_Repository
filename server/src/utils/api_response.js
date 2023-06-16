module.exports = {
  success(ctx, data) {
    return ctx.body = {
      code: 200,
      msg: 'OK',
      data
    }
  },
  fail(ctx, msg) {
    return ctx.body = {
      code: 400,
      msg,
      data: null
    }
  }
}