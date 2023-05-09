
<template>
  <div class="form-center">
    <div class="form-dialog">
      <el-form ref="orderForm" :model="order" :rules="rules" label-width="100px">
        <div id="isEdit">
          <span v-if="!order.isUpdate">添加订单</span>
          <span v-else>修改订单</span>
        </div>
        <!-- <el-form-item label="订单号" prop="orderId" v-show="!order.isUpdate">
          <el-input v-model.trim="order.orderId" placeholder="请输入订单号" label-width="50px"></el-input>
        </el-form-item> -->
        <el-form-item label="客户名称" prop="customerName">
          <el-input v-model.trim="order.customerName" placeholder="请输入客户名称" label-width="50px"></el-input>
        </el-form-item>

        <el-form-item label="订单名称" prop="orderName">
          <el-input v-model.trim="order.orderName" placeholder="请输入订单名称" label-width="50px"></el-input>
        </el-form-item>
        <el-form-item label="订单地址" prop="orderAddress">
          <el-input v-model.trim="order.orderAddress" placeholder="请输入地址" label-width="50px"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="orderPhone">
          <el-input v-model.trim="order.orderPhone" placeholder="请输入手机号" label-width="50px"></el-input>
        </el-form-item>
        <el-form-item label="订单数量" prop="orderNum">
          <el-input v-model.trim="order.orderNum" placeholder="请输入订单数量" label-width="50px"></el-input>
        </el-form-item>
        <el-form-item label="总价" prop="orderAmount">
          <el-input v-model.trim="order.orderAmount" placeholder="请输入总价" label-width="50px"></el-input>
        </el-form-item>
        <el-form-item label="用户状态" prop="orderStatus">
          <el-radio-group v-model="order.orderStatus">
            <el-radio label="1">已发货</el-radio>
            <el-radio label="0">未发货</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <div class="savebtn">
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button @click="resetForm">重置</el-button>
            <!-- <ElButton @click="resetForm">重置</ElButton> -->
          </div>

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup >
import { inject, ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { addOrder, updateOrder} from "../http/api.js";
import router from "../router/index.js";

import { useRoute } from 'vue-router';
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElRadioGroup,
  ElRadio,
  ElButton,
} from "element-plus";

let orderForm = ref(null);
let order = ref({
  orderId: "",
  customerName: "",
  orderName:"",
  orderAddress: "",
  orderPhone:"",
  orderNum: "",
  orderAmount: "",
  orderStatus: 0,
  isUpdate: false
});

//验证输入的参数
let rules = ref({
  customerName: [{ required: true, message: "请输入客户名称", trigger: "blur" }],
  orderName: [{ required: true, message: "请输入订单", trigger: "blur" }],
  orderAddress: [{ required: true, message: "请输入订单地址", trigger: "blur" }],
  orderPhone: [{ required: true, message: "请输入联系方式", trigger: "blur" },
  { pattern: /^1[3456789]\d{9}$/, message: "手机号码格式不正确", trigger: "blur" }],
  orderNum: [{ required: true, message: "请输入订单数量", trigger: "blur" }],
  orderAmount: [{ required: true, message: "请输入总价", trigger: "blur" }],
  orderStatus: [{ required: true, message: "请输入发货状态", trigger: "blur" }]

});

//接受路由传的参数
order.value = { ...(useRoute().query) }
//点击判断输入参数合法发送请求
const submitForm = () => {
  orderForm.value.validate(async (valid) => {
    if (valid) {
      if (order.value.isUpdate) {
        // 编辑状态下保存
        await updateOrder(order.value).then((res) => {
            ElMessage.success(res.data);
            resetForm();
            router.push("/order")
        });
      } else {
        //新增状态下保存发送请求地址
        await addOrder(order.value).then((res) => {
            ElMessage.success("新增订单成功");
            resetForm();
            router.push("/order")
        })
      }
    }
  })
}


//重置按钮重置表单
const resetForm = () => {
  //修改页面重置表单
  if (order.value.isUpdate) {
    order.value = {
      orderId: order.value.orderId,
      customerName: "",
      orderName:"",
      orderAddress: "",
      oderPhone:"",
      orderNum: "",
      orderAmount: "",
      orderStatus: "",
      isUpdate: true
    };
  } else {
    //添加页面重置表单
    order.value = {
      orderId: "",
      customerName: "",
      orderName:"",
      orderAddress: "",
      oderPhone:"",
      orderNum: "",
      orderAmount: "",
      orderStatus: 0,
      isUpdate: false
    };
  }


};


</script>
<style scoped>
#isEdit {
  height: 70px;
  /* inline-size: 100px; */
}

.form-center {

  height: 500px;
  position: relative;
}

.form-dialog {
  /* display: flex; */
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  /* 水平垂直居中 */
  /* justify-content: center; */
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  /* margin: 0px, auto; */
  width: 30%;
  text-align: center;

  /* margin: 20px; */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* .savebtn{
margin: 0,auto;
  justify-content: center;  display: flex;
  

} */
</style>
