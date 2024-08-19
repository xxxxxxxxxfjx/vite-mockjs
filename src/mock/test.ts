import Mock from 'mockjs';

// 初始模拟数据列表
let items = Mock.mock({
  'items|100': [
    {
      // 生成100条数据
      'id|+1': 1,
      name: '@cname',
      date: '@date',
      description: '@cparagraph',
    },
  ],
}).items;

// 分页查询数据
Mock.mock(/^\/api\/items\?.+$/, 'get', options => {
  const params = new URLSearchParams(options.url.split('?')[1]);
  const page = parseInt(params.get('page'), 10) || 1;
  const size = parseInt(params.get('size'), 10) || 10;

  const filteredItems = items.slice((page - 1) * size, page * size);
  return {
    code: 200,
    message: '获取数据成功',
    data: filteredItems,
    total: items.length,
  };
});

// 添加数据
Mock.mock('/api/items', 'post', options => {
  const item = JSON.parse(options.body);
  item.id = items.length + 1; // 简单生成一个新的 ID
  items.push(item);
  return {
    code: 200,
    message: '添加数据成功',
    data: item,
  };
});

// 更新数据
Mock.mock('/api/items', 'put', options => {
  const item = JSON.parse(options.body);
  const index = items.findIndex(x => x.id === item.id);
  if (index > -1) {
    items[index] = item;
    return {
      code: 200,
      message: '更新数据成功',
      data: item,
    };
  }
  return {
    code: 404,
    message: '未找到数据',
  };
});

// 删除数据
Mock.mock(/\/api\/items\/\d+/, 'delete', options => {
  const id = parseInt(options.url.match(/\/api\/items\/(\d+)/)[1]);
  const index = items.findIndex(x => x.id === id);
  if (index > -1) {
    items.splice(index, 1);
    return {
      code: 200,
      message: '删除数据成功',
    };
  }
  return {
    code: 404,
    message: '未找到数据',
  };
});
