
<template>
  <div class="form-center">
    <div class="form-dialog">
      <el-form ref="flowerForm" :model="flower" :rules="rules" label-width="100px">
        <div id="isEdit">
          <span v-if="!flower.isUpdate">新增商品</span>
          <span v-else>修改商品</span>
        </div>
        <el-form-item label="鲜花编号" prop="fid" v-show="!flower.isUpdate">
          <el-input v-model.number="flower.fid" placeholder="请输入鲜花编号" label-width="50px"></el-input>
        </el-form-item>
        <el-form-item label="鲜花名称" prop="fname">
          <el-input v-model.trim="flower.fname" placeholder="请输入鲜花名称" label-width="50px"></el-input>
        </el-form-item>
        <el-form-item label="鲜花数量" prop="fnum">
          <el-input-number v-model.number="flower.fnum" :min="0" :max="9999"></el-input-number>
        </el-form-item>
        <el-form-item label="鲜花价格" prop="fprice">
          <el-input-number v-model.number="flower.fprice" :min="0" :max="99999" :precision="2"></el-input-number>
        </el-form-item>
        <el-form-item label="鲜花状态" prop="fstatus">
          <el-radio-group v-model="flower.fstatus">
            <el-radio label="1">上架</el-radio>
            <el-radio label="0">下架</el-radio>
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
import { addFlower, goodsList, updateFlower } from "../http/api.js";
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

let flowerForm = ref(null);


let flower = ref({
  fid: "",
  fname: "",
  fnum: 0,
  fprice: 0,
  fstatus: 1,
  isUpdate: false
});
// console.log(flower.value.isUpdate);

// let flower = ref({});
//判断输入的参数。
let rules = ref({
  fid: [{ required: true, message: "请输入鲜花ID", trigger: "blur" },
  { pattern: /^\d+$/, message: "只能输入数字", trigger: "blur" }],
  fname: [{ required: true, message: "请输入鲜花名称", trigger: "blur" }],
  fnum: [{ required: true, message: "请输入鲜花数量", trigger: "blur" }],
  fprice: [{ required: true, message: "请输入鲜花价格", trigger: "blur" }],
  fstatus: [{ required: true, message: "请选择鲜花状态", trigger: "change" }],
});
// console.log(router.query)
// console.log(flower)
// let route = useRoute()
// const goods = (useRoute().query)
// console.log("goods",goods,'原丝',(useRoute().query));

// flower=route.query
// flower = reactive((useRoute().query))

// flower = ref((useRoute().query))

flower.value = { ...(useRoute().query) }
// console.log('复制：',flower)

// if(isUpdate){goodsList(currentPage.value, pageSize.value, query.value).then(res => {

//                 flower.splice(0, flower.length, ...res.data);
//             console.log(res.data)
//             // total.value = res.total;
//           })
// }



const submitForm = () => {
  // console.log(flowerForm.value);
  flowerForm.value.validate(async (valid) => {
    if (valid) {
      // try {
        if (flower.value.isUpdate) { 
          // 编辑状态下保存发送修改请求
          await updateFlower(flower.value).then((res) => {
            if (res.code === 0) {
              ElMessage.error('鲜花编号已存在');
            } else {
              ElMessage.success(res.data);
              resetForm();
              router.push("/Goods")
              // console.log(res.status)
            }
          });
        } else {
          // 新增状态下保存发送新增请求

          await addFlower(flower.value).then((res) => {
            if (res.code === 0) {
              ElMessage.error('鲜花编号已存在');
            } else {
              ElMessage.success('鲜花信息已保存');
              resetForm();
              router.push("/Goods")
              // console.log(res.status)
            }
          });
        }
      // } catch (error) {
      //   ElMessage.error('网络异常，请稍后再试');
      
      // }  
    }

  });
};
//新增修改重置输入的内容
const resetForm = () => {
  if (flower.value.isUpdate) {
    flower.value = {
      fid: flower.value.fid,
      fname: "",
      fnum: "",
      fprice: "",
      fstatus: "",
      isUpdate: true
    };
  } else {
    flower.value = {
      fid: "",
      fname: "",
      fnum: "",
      fprice: "",
      fstatus: "",
      isUpdate: false
    };
  }

  // const form = flowerForm.value;
  // flowerForm.value.resetFields();
  // this.$ref.flowerForm.resetFields();
  // flower=ref('');
  //   flower = {
  //   // fid: "",
  //   fname: "",
  //   fnum: 0,
  //   fprice: 0,
  //   fstatus: 1,
  //   isUpdate: false
  // };
  // console.log(flower);

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
