<!--  -->
<template>
    <div id="building">
        <!-- <div class="logBox"> -->
            <div id="login">
                <h4>繁花阁后台管理系统</h4>
                <el-form label-width="50px" :model="loginData">
                    <el-form-item label="账号">
                        <el-input placeholder="请输入账号" v-model="loginData.uname" />
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="loginData.upassword" type="password" placeholder="请输入密码" show-password />
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="submit" class="sub-btn" type="primary">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        <!-- </div> -->

    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { login } from '../http/api.js'
import router from '../router/index.js';
let loginData = reactive({
    uname: '',
    upassword: ''
})
let submit = () => {
    if (!loginData.uname || !loginData.upassword) {
        ElMessage.error('账号密码不能为空！')
        return
    }
    login(loginData).then(res => {
        console.log(res.code)
        if (res.code === 1) {
            router.push('/index')
        } else {
            ElMessage.error(res.msg)
        }
    })
}
</script>
<style  scoped>
/* *{
    margin: 0;
    padding: 0;
} */
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
    width: 100%;
}
</style>