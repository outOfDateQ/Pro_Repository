// import request from "../utils/request/index.js"
import request from "../js/utilsRequest.js"

export const getArticleList = (params) => {
  return request({
    url: '/getIndexArticle',
    method: 'GET',
    params: {
      ...params
    }
  })
}

export const searchArticle = ({ keyWord, type }) => {
  return request({
    url: '/article-search',
    method: 'GET',
    params: {
      keyWord,
      type
    }
  })
}


export const getArticle = ({ id }) => {
  return request({
    url: '/getIndexArticle',
    method: 'GET',
    params: {
      id
    }
  })
}

export const publishArticle = (article) => {
  return request({
    url: '/publishArticle',
    method: 'POST',
    data: {
      ...article
    }
  })
}

export const getUserInfo = () => {
  return request({
    url: '/getUser',
    method: 'GET',
  })
}