// 二次封装axios, 暴露给页面使用, 因为使用script标签引入, 所以不需要手动去暴露
export function sendPostAjax(method, path, data, id, token) {
  return axios({
    method,
    // 此处的id应该是登录的时候保存到某个地方, 然后从那个地方获取
    url: `http://localhost:4000/api/${path}/${id}`,
    data,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`
    }
  })
}

export function sendGetAjax(method, path, id, token) {
  return axios({
    method,
    // 此处的id应该是登录的时候保存到某个地方, 然后从那个地方获取
    url: `http://localhost:4000/api/${path}/${id}`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`
    }
  })
}