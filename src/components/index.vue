<!--  -->
<template>
  <div class="xh">
    <el-carousel :interval="2000" type="card" height="350px" >
      <el-carousel-item v-for="item in imgList" :key="item">
        <img :src="item">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
    
<script setup >
const imgList = [
  ("src/assets/img/1.jpeg"),
  ("src/assets/img/2.jpeg"),
  ("src/assets/img/3.jpeg"),
  ("src/assets/img/4.jpeg"),
  ("src/assets/img/10.png"),
  ("src/assets/img/22.jpg"),
]
</script>
<style  scoped>




.xh{
  background-color: rgb(255, 255, 255,0);
  /* background-size:10% */
}
.el-carousel__item img {
  background-size: 100%,100%;
  /* /* height: 100%; */
  width: 100%; 
  color: #475669;
  opacity: 0.75;
  line-height: 10px;
  margin: 1px;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}</style>