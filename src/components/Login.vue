<!--  -->
<template>
    <div id="building">
        <!-- <div class="logBox"> -->
        <div id="login">
            <h4 v-if="!islogin">繁花阁后台管理系统</h4>
            <h4 v-else>注册会员</h4>
            <el-form :model="loginData" label-width="50px">
                <el-form-item label="账号">
                    <el-input placeholder="请输入账号" v-model="loginData.uname" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="loginData.upassword" type="password" placeholder="请输入密码" show-password />
                </el-form-item>
                <el-form-item>
                    <div class="sub-btn">
                        <el-button v-if="!islogin" @click="submit" class="sub-btn" type="primary">登录</el-button>
                            <el-button v-else @click="subsign" class="sub-btn" type="primary">注册</el-button>
                            <el-button v-if="islogin" @click="back" class="sub-btn" type="primary">返回</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <!-- </div> -->

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { login, sign } from '../http/api.js'
import router from '../router/index.js';

let islogin = ref(false);
let loginData = ref({
    uname: '',
    upassword: ''
})
let submit = () => {
    if (!loginData.value.uname || !loginData.value.upassword) {
        ElMessage.error('账号密码不能为空！')
        return
    }
    login(loginData.value).then(res => {
        if (res.code === 1) {
            router.push('/index')
        } else {
            //登录失败显示到注册页面
            islogin.value = true
            //清空输入框
            loginData.value = {
                uname: '',
                upassword: ''
            }
            ElMessage.error(res.msg)
        }
    })
}
//发送注册请求
let subsign = () => {
    if (!loginData.value.uname || !loginData.value.upassword) {
        ElMessage.error('账号密码不能为空！,请重新输入注册信息')
        return
    }
    sign(loginData.value).then(res => {
        if (res.code === 1) {
            ElMessage.success(res.data)
            //注册成功返回登录
            islogin.value = false
            loginData.value = {
                uname: '',
                upassword: ''
            }
        } else {
            ElMessage.error(res.msg)
        }
    })
}
//返回登录
let back = () => {
    islogin.value = false
}
</script>
<style  scoped>
#building {
    background: url("../assets/img/5.jpg");
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: 100% 100%;
    background-color: rgba(255, 255, 255, 0.5);
}




#login {
    margin: 0 auto;
    text-align: center;

    background-color: rgba(255, 255, 255, 0.8);
    width: 350px;
    padding: 25px 30px 25px 20px;
    border: 1px solid #efefef;
    border-radius: 10px;

}


h4 {
    margin-top: 1px;
    text-align: center;
    color: rgb(74, 146, 218);
    font-size: 30px;
    background-image: -webkit-linear-gradient(left, blue, pink 10%, #65c0e0 20%, skyblue 30%, blue 40%, MediumVioletRed 50%, Purple 60%, Purple 70%, blue 80%, #81c1d9 90%, Purple);
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    background-size: 200% 100%;
    animation: am 5s infinite linear;
}

@keyframes am {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: -100% 0;
    }
}


.sub-btn {
    width: 50%;
    display: flex;
    flex-wrap: nowrap;
    align-items: end;
    flex: 1;
    position: relative;
    min-width: 0;
    flex-direction: row;
    justify-content: space-evenly;

}
</style>