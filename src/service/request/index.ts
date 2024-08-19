import axios from 'axios';
import type { AxiosInstance } from 'axios';

class Request {
  instance!: AxiosInstance;
  constructor(config: any) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(
      config => {
        return config;
      },
      (err: any) => err
    );
    this.instance.interceptors.response.use(
      res => {
        return res.data;
      },
      err => {
        return err;
      }
    );
  }

  request(config: any) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  get(config: any) {
    return this.request({ ...config, method: 'get' });
  }
  post(config: any) {
    return this.request({ ...config, method: 'post' });
  }
}

export default new Request({ timeout: 10000 });
