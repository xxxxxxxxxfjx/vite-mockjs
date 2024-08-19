import request from '../request/index.ts';
import axios from 'axios';

export function getData(data: any) {
  return request.post({
    url: '/promotion/list',
    data,
  });
}

export function updateData(data: any) {
  return request.post({
    url: '/promotion/update',
    data,
  });
}

export function fetchItems({ page = 1, size = 10 }) {
  // 构建请求的 URL 和参数
  const url = '/api/items';
  const params = {
    page: page,
    size: size,
  };
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
