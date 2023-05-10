import $http from "./index.js";

// export const getData= $http.get('http://jsonplaceholder.typicode.com/posts')
// export const login=(data)=>{
//     return $http.get('http://jsonplaceholder.typicode.com/posts',data)
// }
//管理员登录
export const login = (loginData) => {
  return $http({
    url: "/login",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    //请求参数 uname:用户名，upassword：密码
    data: {...loginData },
  });
};

//管理员注册
export const sign = (signData) => {
  return $http({
    url: "/sign",
    method: "post",
    //请求参数 uname:用户名，upassword：密码
    data: {...signData },
  });
};
//管理员退出
export const logout = () => {
  return $http({
    url: "/logout",
    method: "post",
 
    data: {},
  });
};


//鲜花列表
export const goodsList = (currentPage, pageSize, query )=> {
  return $http({
    url: "/goods",
    method: "get",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    params: {currentPage,pageSize,query},
  });
};


//新增鲜花
export const addFlower = (flower) => {
  return $http({
    url: '/addflowers',
    method: 'post',
    data: {...flower}
  });
};

//删除鲜花
export const deleteGoods = (id) => {
  return $http({
    url: '/deleteGoods',
    method: 'delete',
    //fid属性的值
    data:id
  });
};


//修改鲜花
export const updateFlower = (id) => {
  return $http({
    url: '/updateFlower',
    method: 'put',
    //fid属性的值
    data:{...id}
  });
};

//会员列表
export const getMember = (currentPage, pageSize, query )=> {
  return $http({
    url: "/getMember",
    method: "get",
    //请求参数，currentPage:当前页,pageSize:显示条数,query:模糊查询条件
    params: {currentPage,pageSize,query},
  });
};




//新增会员
export const addMember = (member) => {
  return $http({
    url: '/addMember',
    method: 'post',
    data: {...member}
  });
};

//修改会员信息
export const updateMember = (id) => {
  return $http({
    url: '/updateMember',
    method: 'put',
    //fid属性的值
    data:{...id}
  });
};


//删除会员
export const deleteMember = (id) => {
  return $http({
    url: '/deleteMember',
    method: 'delete',
    //id属性的值
    data:id
  });
};


//订单列表
export const getOrderOrder = (currentPage, pageSize, query )=> {
  return $http({
    url: "/getOrder",
    method: "get",
    params: {currentPage,pageSize,query},
  });
};


//新增订单
export const addOrder = (member) => {
  return $http({
    url: '/addOrder',
    method: 'post',
    data: {...member}
  });
};

//删除订单
export const deleteOrder = (id) => {
  return $http({
    url: '/deleteOrder',
    method: 'delete',
    //id属性的值
    data:id
  });
};

//修改订单信息
export const updateOrder = (id) => {
  return $http({
    url: '/updateOrder',
    method: 'put',
    data:{...id}
  });
};


