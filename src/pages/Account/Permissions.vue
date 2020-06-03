<template>
    <div>
        <div class="top-bar">
            <BreadcrumbNavigation></BreadcrumbNavigation>
            <div class="button-zone">
                <el-input
                        size="small"
                        maxlength='20'
                        placeholder="请输入名称"
                        prefix-icon="el-icon-search"
                        style="margin-right: 10px"
                >
                </el-input>
                <el-button type="success" size="small" @click="searchList">搜索</el-button>
                <el-button
                        @click="handleAdd"
                        type="primary"
                        size="small"
                >新增</el-button>
                <el-button
                        @click="deleteConfirm(selections,'Array')"
                        type="danger"
                        size="small"
                >删除</el-button>
            </div>
        </div>
        <div class="content-container">
            <el-table
                :data="tableData"
                style="width: 100%"
                row-key="menuId"
                :tree-props="{children: 'children'}"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                :selectable="selectable"
                width="55">
                </el-table-column>
                <el-table-column
                prop="menuName"
                label="菜单名称"
                sortable
                align='center'
                >
                </el-table-column>
                <el-table-column
                prop="menuId"
                label="排序"
                align='center'
                >
                </el-table-column>
                <el-table-column
                prop="url"
                align='center'
                label="路由地址"
                >
                </el-table-column>
                <el-table-column
                label="操作"
                align='center'
                width="300">
                <template slot-scope="scope">
                    <el-button
                    @click="userEdit([scope.row].map(i => i),scope.$index)"
                    type="primary"
                    size="small">编辑</el-button>
                    <el-button
                    @click="deleteConfirm(scope,'obj')"
                    type="danger"
                    size="small">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="paging"
                background
                layout="prev, pager, next"
                @current-change="changePage"
                :total="total">
            </el-pagination>
        </div>
        <el-dialog
            :show-close=false
            :title="userTitle"
            :visible="dialogUserAdd"
            width="30%"
            @closed="dialogClosed" >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="菜单名称" prop="menuName">
                    <el-input v-model="ruleForm.menuName" ></el-input>
                </el-form-item>
                <el-form-item label="路由地址" prop="url">
                    <el-input v-model="ruleForm.url"></el-input>
                </el-form-item>
                <el-form-item label="上级类目" prop="parentId">
                    
                    <el-tooltip class="item" effect="dark" content="上级类目为空，则创建的是一级菜单" placement="top-end">
                        <treeselect 
                        v-model="ruleForm.parentId" 
                        :multiple="false"  
                        :normalizer="normalizer"
                        :options="options"  
                        
                        placeholder="请选择上级类目"
                    />
                    </el-tooltip>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogUserAdd = false">取 消</el-button>
                <el-button type="primary" @click="AddBtn('ruleForm',userTitle)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation.vue'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
    components: {BreadcrumbNavigation,Treeselect},
    data(){
        return{
            tableData:[],
            options:[],
            normalizer(node) {
                if(node.children == null || node.children.length==0){
                    delete node.children;
                }
                return {
                    id: node.menuId,
                    label: node.menuName,
                    children: node.children,
                }
            },
            userTitle:'',
            dialogPassword:false,
            dialogUserAdd:false,
            selections: [],
            ruleForm: {
                menuName:'',
                url: '',
                // parentMenu:null,
                parentId:null,
            },
            selected:'',//编辑/修改的位置坐标
            rules: {       
                menuName: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '请输入菜单路径', trigger: 'blur' }
                ],
                // parentId: [
                //     { required: true, message: '请选中上级目录' }
                // ],
            },
            total:0,
            pagesize:10,
            currentPage:1,
        }
    },
    created(){
        this.getMenuList()
    },
    methods:{
        getMenuList(){
            this.options=[];
            this.$http.get('/api/menu/getMenuList').then(res=>{
                // console.log("res",res);
                if(res.status===200&&res.data.retVal===0){
                    this.total=res.data.retBean.length;
                    // this.tableData=res.data.retBean;
                    this.tableData=res.data.retBean.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
                    this.options=res.data.retBean;
                    // console.log("this.options",this.options)
                }
            })
        },
        changePage(currentPage){
            this.currentPage = currentPage;
            this.getMenuList();
        },
        handleSelectionChange(val) {
            this.selections = val;
        },
        selectable(row,index){
            return index !==this.index1;
        },
        // 新增用户
        handleAdd(){
            this.ruleForm={};
            this.distip=false;
            this.userTitle='新增菜单';
            this.dialogUserAdd=true;
        },
        // 支持批量删除，单个删除
        menuDelete(scope,type) {
            if(type==='Array'&&scope.length!==0){
                // 批量删除
                let numberData=[];
                scope.map(item=>{
                    numberData.push(item.menuId)
                })
                this.$http.post('/api/menu/delete',numberData).then(res=>{
                    if(res.status===200){
                        this.getMenuList();
                        this.$message({
                            message: '角色删除成功',
                            type: 'success',
                        });
                    }
                })
            }else if(type==='obj'){
                let menuId=scope.row.menuId;
                let url=`/api/menu/delete/${menuId}`;
                this.$http.get(url).then(res=>{
                    if(res.status===200){
                        this.getMenuList();
                        this.$message({
                            message: '角色删除成功',
                            type: 'success',
                        });
                    }
                });
            } else{
                this.$message({
                    message:'请选择要删除的组织',
                    type:'error'
                })
            }  
        },
        deleteConfirm(scope,type){
            this.$confirm('此操作会将父菜单包含的子菜单删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.menuDelete(scope,type) 
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 搜索用户
        searchList(){

        },
        // 编辑菜单信息
        userEdit(row,index){
            console.log("row",row,index)
            this.userTitle='编辑菜单';
            this.dialogUserAdd=true;
            this.selected = index; 
            this.ruleForm=JSON.parse( JSON.stringify(row[0]) );
        },
        // 成功新增/编辑菜单
        AddBtn(ruleForm,type){
            // console.log("数据",this.ruleForm)
            this.$refs['ruleForm'].validate((valid) => {
                if(valid){
                    if(type==='新增菜单'){
                        this.$http.post('/api/menu/save',this.ruleForm).then(res=>{
                            // console.log(res,res);
                            if(res.status===200){
                                this.dialogUserAdd=false;
                                this.$message({
                                    message: '新增菜单成功',
                                    type: 'success',
                                });
                                this.getMenuList()
                            }
                        })
                    }else if(type==='编辑菜单'){
                        this.$http.post('/api/menu/update',this.ruleForm).then(res=>{
                            // console.log("编辑菜单res",res)
                            if(res.status===200){
                                this.dialogUserAdd=false;
                                this.$message({
                                    message: '编辑菜单成功',
                                    type: 'success',
                                });
                                this.getMenuList()
                            }
                        })
                    }
                }
            })
        },
        dialogClosed(){
            this.$refs['ruleForm'].resetFields();
            this.menusData=[];
        },
    }
}
</script>
<style lang="scss" scoped>
    .paging{
        text-align: right;
        padding:30px 0px 10px 10px;
    }
    .el-select{
        width: 100%;
    }
    .el-form-item .el-form-item__content .vue-treeselect__control .vue-treeselect__placeholder{
        line-height: inherit !important;
    }
</style>
