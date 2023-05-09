<!--  -->
<template>
    <el-aside width="200px">
        <el-menu default-active="2" active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
            text-color="#fff" router>
            <el-col>
                <div id="ys">繁花阁</div>
                <el-menu-item index="/index">
                    <el-icon>
                        <HomeFilled />
                    </el-icon>
                    <span>首页</span>
                </el-menu-item>
                <el-menu-item index="/Goods">
                    <el-icon>
                        <Female />
                    </el-icon>
                    <span>商品管理</span>
                </el-menu-item>

                <el-sub-menu index="">
                    <template #title>
                        <!-- 图标 -->
                        <el-icon>
                            <user></user>
                        </el-icon>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/Member">
                            <el-icon>
                                <User />
                            </el-icon>
                            <span>会员管理</span></el-menu-item>
                        <el-menu-item index="/Order">
                            <el-icon>
                                <ShoppingTrolley />
                            </el-icon>
                            <span>订单管理</span></el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>

                <el-menu-item  @click="logOut" index="">
                    <el-icon>
                        <CircleCloseFilled />
                    </el-icon>
                    <span>退出系統</span>
                </el-menu-item>
            </el-col>
        </el-menu>
    </el-aside>
</template>
  
<script  setup>
import { reactive, ref } from 'vue'

import { logout } from '../http/api.js'
import router from '../router/index.js';
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'

const logOut = () => {
    logout().then(res => {
        router.push('/')

    })

}

</script>
<style  scoped>
#ys {
    background-color: #0a1a30;
    color: #333;
    text-align: center;
    line-height: 100px;
    height: 100px;
    font-size: 45px;
    text-align: center;
    margin-top: 0px;
    background-image: -webkit-linear-gradient(left, blue, pink 10%, #65c0e0 20%, skyblue 30%, blue 40%, MediumVioletRed 50%, Purple 60%, Purple 70%, blue 80%, #81c1d9 90%, Purple);
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    background-size: 200% 100%;
    animation: am 5s infinite linear;
}

.el-menu-vertical-demo {
    background-color: rgb(44, 39, 39, 0.6);
}
</style>

