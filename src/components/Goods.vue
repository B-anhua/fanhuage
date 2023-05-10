<template>
    <div id="tab">
        <div>
        <div class="toolbar">
            <div class="search">
                <el-input placeholder="请输入关键字" v-model.trim="page.query"></el-input>
                <el-button type="primary" @click="search">搜索</el-button>
            </div>
            <el-button class="add-btn" type="success" @click="addGoods">添加商品</el-button>
        </div>
        <el-table fixed stripe :data="tableData" height="400" style="width: 100%" row-key="id">
            <el-table-column prop="fid" label="编号" width="200" />
            <el-table-column prop="fname" label="花名" width="200" />
            <el-table-column prop="fnum" label="数量" width="200" />
            <el-table-column prop="fprice" label="价格" width="200" />
            <el-table-column prop="fstatus" label="状态" width="200">
                <template #default="{ row }">
                    <span :style="{ color: row.fstatus === 1 ? 'green' : 'red' }">
                        {{ row.fstatus === 1 ? '上架' : '下架' }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column class="el-upbtn" label="操作" align="center" width="200">
                <template #default="scope">
                    <el-button size="small" @click="updetaData(scope.$index, scope.row)">修改</el-button>
                    <el-button size="small" type="danger" @click="Delete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <div class="demo-pagination-block">
            <div id="pag">
                <el-pagination v-model:current-page="page.currentPage" v-model:page-size="page.pageSize"
                    :page-sizes="[5, 10, 20, 100]"  layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                </el-pagination>
            </div>

        </div>

    </div>
    </div>
</template>

<script setup>
import { provide, inject, reactive, ref, onMounted } from 'vue'
import { goodsList, deleteGoods } from '../http/api.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '../router/index.js';


let tableData = reactive([])

let page = reactive({
    query: "",
    currentPage: 1,
    pageSize: 10,
    total: 10,
});


let isUpdate = false;
/* const updetaData = (index, row) => {
    isUpdate = true;
    const { fid } = row
    goodsList(currentPage.value, pageSize.value,fid).then(res => {
        console.log(res.data)
        initialData.splice(0, initialData.length, ...res.data);
        console.log(res.data)
        // total.value = res.total;
    })
    router.push('/AddGoods')
} */

//修改数据
const updetaData = (index, row,) => {
    // initialData = row

    let isUpdate = true
    router.push({
        name: "AddGoods",
        query: { ...row, isUpdate }
    })
    // params:row})
    // return { row }
    //   console.log({data})
    // console.log(row)
    //  return provide('data', row);
}

// return{provide}

const Delete = (index, row) => {
    //属性名必须与字段fid一致
    const { fid } = row
    ElMessageBox.confirm(
        '确认删除吗?',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        console.log()
        // async (row) => {
        deleteGoods(fid).then(res => {
            try {
                if (res.code === 1) {
                    fetchData();
                    ElMessage.success('删除成功');
                } else {
                    ElMessage.error(res.msg || '操作失败')
                }
            } catch (error) {
                console.error(error);
                ElMessage.error('删除失败');
            }
        }
        )
        // }
    })
}

let addGoods = () => {
    router.push("/AddGoods")
}


/* 发送请求获取数据 */
const fetchData = () => {
    goodsList(page.currentPage, page.pageSize, page.query).then(res => {
        // tableData = [];
        // alert(page.query)
        //   tableData = res.data.records
        //  console.log(res.data)
        // total.value = res.total; 
        // tableData.push(...res.data);
        tableData.splice(0, tableData.length, ...res.data.records);
        //    alert(tableData.length) 
        page.total = res.data.total;

    })
}
const search = () => {

    fetchData();
};
const handleCurrentChange = (currentPage) => {
    // alert(page.currentPage)
    page.currentPage = currentPage
    // currentPage = page;
    fetchData();
};
onMounted(() => {
    fetchData();
})
        // return {  Delete,addGoods, updetaData,fetchData,tableData}

</script>

<style  scoped>
#tab {
    /* display: flex; */
    /* justify-content: center; */
    /* width: 100%; */
    margin: 20px 60px;
}



.toolbar {

    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.search {
    display: flex;
    align-items: center;
}

.add-btn {
    display: flex;
    margin-left: auto;
    align-self: flex-end;
}



.demo-pagination-block {
    display: flex;
    justify-content: center
}
</style>