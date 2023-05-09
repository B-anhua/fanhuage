
<template>
  <div class="form-center">
    <div class="form-dialog">
      <el-form ref="memberForm" :model="member" :rules="rules" label-width="100px">
        <div id="isEdit">
          <span v-if="!member.isUpdate">添加用户</span>
          <span v-else>修改用户</span>
        </div>
        <el-form-item label="用户名" prop="name">
          <!-- <el-form-item label="用户名" prop="name" v-show="!member.isUpdate"> -->

          <el-input v-model.trim="member.name" placeholder="请输入用户名" label-width="50px"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="member.password" placeholder="请输入密码" label-width="50px"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.trim="member.phone" placeholder="请输入手机号" label-width="50px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="member.email" placeholder="请输入邮箱" label-width="50px"></el-input>
        </el-form-item>
        <el-form-item label="用户状态" prop="fstatus">
          <el-radio-group v-model="member.status">
            <el-radio label="1">正常</el-radio>
            <el-radio label="0">禁用</el-radio>
            <!-- <ElRadio v-if="flower.fstatus" >上架</ElRadio>
            <ElRadio v-else>下架</ElRadio> -->

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
import { addMember, updateMember, updateFlower } from "../http/api.js";
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

let memberForm = ref(null);
let member = ref({
  id: "",
  name: "",
  password: "",
  email: "",
  phone: "",
  status: 1,
  isUpdate: false
});

//验证输入的参数
let rules = ref({
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  status: [{ required: true, message: "请输入用户状态", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" },
  { type: 'email', message: '邮箱地址格式不正确', trigger: 'blur' }],
  phone: [{ required: true, message: "请输入手机号码", trigger: "blur" },
  { pattern: /^1[3456789]\d{9}$/, message: "手机号码格式不正确", trigger: "blur" },]

});

//接受路由传的参数
member.value = { ...(useRoute().query) }
//点击判断输入参数合法发送请求
const submitForm = () => {
  memberForm.value.validate(async (valid) => {
    if (valid) {
      if (member.value.isUpdate) {
        // 编辑状态下保存
        await updateMember(member.value).then((res) => {
          if (res.code === 0) {
            ElMessage.error('用户已存在');
          } else {
            ElMessage.success(res.data);
            resetForm();
            router.push("/Member")
          }
        });
      } else {
        //新增状态下保存发送请求地址
        await addMember(member.value).then((res) => {
          if (res.code === 0) {
            ElMessage.error(res.msg);
          } else {
            ElMessage.success('用户已保存');
            resetForm();
            router.push("/Member")
          }
        })
      }
    }
  })
}


//重置按钮重置表单
const resetForm = () => {
  //修改页面重置表单
  if (member.value.isUpdate) {
    member.value = {
      id: member.value.id,
      name: "",
      password: "",
      phone: "",
      status: "",
      isUpdate: true
    };
  } else {
    //添加页面重置表单
    member.value = {
      id: "",
      name: "",
      password: "",
      phone: "",
      status: "",
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

  height: 380px;
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
