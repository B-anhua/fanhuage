<template>
    <div id="tab">
        <div class="toolbar">
            <div class="search">
                <el-input placeholder="请输入关键字" v-model.trim="page.query"></el-input>
                <el-button type="primary" @click="search">搜索</el-button>
            </div>
               <el-button class="add-btn" type="success" @click="addOrder">添加订单</el-button>
        </div>
        <el-table fixed :data="tableData" height="400" style="width: 100%" row-key="id">
            <el-table-column prop="orderId" label="订单号" width="200" />
            <el-table-column prop="customerName" label="客户名称" width="100" />  
            <el-table-column prop="orderName" label="订单名称" width="120" />
            <el-table-column prop="orderAddress" label="下单地址" width="200" />
            <el-table-column prop="orderPhone" label="联系方式" width="150" />
            <el-table-column prop="createTime" label="下单时间" width="180" />
            <el-table-column prop="orderNum" label="下单数量" width="100" />
            <el-table-column prop="orderAmount" label="总金额" width="100" />
            <el-table-column prop="orderStatus" label="订单状态" width="100">
                <template #default="{ row }">
                    <span :style="{ color: row.orderStatus === 1 ? 'green' : 'red' }">
                        {{ row.orderStatus === 1 ? '已发货' : '未发货' }}
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

            <el-pagination v-model:current-page="page.currentPage" v-model:page-size="page.pageSize"
                :page-sizes="[5, 10, 20, 100]" :small="small" layout="total, sizes, prev, pager, next, jumper"
                :total="page.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { getOrderOrder, deleteOrder } from '../http/api.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '../router/index.js';


let tableData = reactive([])

let page = reactive({
    query: "",
    currentPage: 1,
    pageSize: 10,
    total: 10,
});
const small = ref(false)

//点击修改传送点击行的数据传送到修改页面显示
const updetaData = (index, row,) => {
    let isUpdate = true
    router.push({
        name: "AddOrder",
        query: { ...row, isUpdate }
    })
}
const Delete = (index, row) => {
    //属性名必须与字段id一致
    const { orderId } = row
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
        deleteOrder(orderId).then(res => {
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

let addOrder = () => {
    router.push("/AddOrder")
}


/* 发送请求获取数据 */
const fetchData = () => {
    getOrderOrder(page.currentPage, page.pageSize, page.query).then(res => {
        tableData.splice(0, tableData.length, ...res.data.records);
        page.total = res.data.total;
    })
}
const search = () => {
    fetchData();
};
const handleCurrentChange = (currentPage) => {
    page.currentPage = currentPage
    fetchData();
};
onMounted(() => {
    fetchData();
})

</script>

<style  scoped>
#tab {
    width: 80%;
    margin: 30px;
}

.demo-pagination-block {
    display: flex;
    justify-content: center
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
    margin-left: auto;
    align-self: flex-end;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

.demo-pagination-block {
    margin-top: 10px;
    margin-left: auto;
}

.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}
</style>