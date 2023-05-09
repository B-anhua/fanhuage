
<template>
  <div id="building">
    <!-- 添加为中文 -->
    <el-config-provider :locale="locale">
      <router-view></router-view>
  </el-config-provider>
  </div>
 
  

 
</template>

<script setup>

	import { ElConfigProvider } from 'element-plus'
	import zhCn from 'element-plus/lib/locale/lang/zh-cn'
	const locale = zhCn

</script>
<style scoped >


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

body{
  margin:0;
  padding:0;
  border:0
}
/* 
html{

  background-image: url(./assets/img/23);
  background-size:cover;
  /* background-repeat: no-repeat; */
  /* background-size: 100%; */
  /* background-color:rgba(255, 255, 255,0.3); */
  /* background-position: center center; */
  
/* background-repeat:repeat; */
/* background-size:contain; */
/* } */ 
</style>


