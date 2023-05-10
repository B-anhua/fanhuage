<!--  -->
<template>
  <div id="building">
    <div class="common-layout">
      <el-container>

        <NavMenu></NavMenu>
        <el-container>
          <el-header>
            <div class="hh">
              须知少时凌云志，曾许人间第一流
            </div>
          </el-header>
          <el-container>
             <el-main>
              <RouterView></RouterView>
            </el-main>
          </el-container>

          <el-footer>
            花有重开日，人无再少年
          </el-footer>
        </el-container>
      </el-container>

    </div>
  </div>
</template>
<script setup>
import NavMenu from './NavMenu.vue';

</script>
<style scoped>
#building {
  background: url("../assets/img/23.png");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
  margin: 0, auto;
  /* background-color: rgba(255, 255, 255, 0.1); */
}


.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 100px;
  height: 100px;
  font-size: 50px;
  text-align: center;
  margin-top: 0px;
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

/* .el-aside { */
/* background-color: rgba(255, 255, 255, 0.5); */
/* background-color: #D3DCE6; */

/* color: #333; */
/* text-align: center; */
/* line-height: 200px; */
/* } */

.el-main {
 

  width: 100%;
  background-color: rgba(255, 255, 255, 0);
  /* background-image: url(../assets/img/5.jpg); */
  background-size: 100%;
  color: #333;
  line-height: 100px;
}

body>.el-container {
  margin-bottom: 40px;

}


* {
  margin: 0;
  padding: 0;
}
</style>