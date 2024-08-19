import Mock from 'mockjs';
import { totalmem } from 'os';
import qs from 'qs'; // 引入 qs

const total = 300;
const data = Mock.mock({
  // 属性 list 的值是一个数组，随机生成 1 到 10 个元素
  [`list|${total}`]: [
    {
      'id|+1': 1,
      name: '@cname',
      // 随机生成1-10个★
      image: "@image('200x100', '#50B347', '#FFF', 'Mock.js')",
      // 随机生成1-100之间的任意整数
      url: '@url',
      // 生成一个浮点数，整数部分大于等于 1、小于等于 100，小数部分保留 1 到 10 位。
      'floatNumber|1-100.1-10': 1,
      // 随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。
      'boolean|1': true,
      // 随机生成一个布尔值，值为 false 的概率是 2 / (2 + 5)，值为 true 的概率是 5 / (2 + 5)。
      'bool|2-5': false,
      // 从属性值 object 中随机选取 2-4 个属性
      'object|2-4': {
        '310000': '上海市',
        '320000': '江苏省',
        '330000': '浙江省',
        '340000': '安徽省',
      },
      // 通过重复属性值 array 生成一个新数组，重复次数为 2
      'array|2': ['AMD', 'CMD', 'UMD'],
      // 执行函数 function，取其返回值作为最终的属性值，函数的上下文为属性 'name' 所在的对象。
      // 根据正则表达式 regexp 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。
      regexp: /\d{5,10}/,
    },
  ],
});

export const userList = Mock.mock('/promotion/list', 'post', options => {
  const { body } = options;
  const { page = 1, size = 10 } = { page: 1, size: 10, ...JSON.parse(body) };
  const start = (page - 1) * size;
  const end = page * size;
  const { list } = data;
  const res = list.slice(start, end);

  return {
    code: 200,
    message: 'ok',
    data: {
      total,
      page,
      size,
      list: res,
    },
  };
});

export const updateUserList = Mock.mock(
  '/promotion/update',
  'post',
  options => {
    // 解析传入的 JSON 数据
    const updateInfo = JSON.parse(options.body);
    console.log(updateInfo);

    // 根据传入的 ID 找到列表中相应的数据并更新
    const index = data.list.findIndex((item: any) => item.id === updateInfo.id);
    if (index !== -1) {
      // 更新对应的数据字段
      data.list[index] = { ...data.list[index], ...updateInfo };
      return {
        code: 200,
        message: '数据更新成功',
      };
    } else {
      return {
        code: 404,
        message: '找不到对应的数据',
      };
    }
  }
);

// 模拟分页数据
Mock.mock('/api/items', 'get', options => {
  // 解析请求中的 URL 参数
  console.log(1);

  const params = new URLSearchParams(options.url.split('?')[1]);
  const page = parseInt(params.get('page'), 10) || 1; // 获取当前页码，默认为第1页
  const size = parseInt(params.get('size'), 10) || 10; // 获取每页条数，默认10条

  // 模拟数据生成
  const data = Mock.mock({
    // 根据分页参数生成相应数量的数据
    [`items|${size}`]: [
      {
        'id|+1': (page - 1) * size + 1, // 使得每页的 ID 连续，但不重复
        name: '@cname', // 随机生成中文名字
        date: '@date', // 随机生成日期
        description: '@cparagraph', // 随机生成一段中文文本
      },
    ],
    total: 100, // 假设总数据量为100条
    page: page,
    size: size,
  });

  return {
    code: 200,
    message: '获取数据成功',
    data: data,
  };
});

// 使用 axios 或其他方式发起请求来测试模拟数据
// axios.get('/api/items?page=2&size=10').then(response => console.log(response.data));
