<template>
    <div>
        <div class="top-bar">
            <BreadcrumbNavigation></BreadcrumbNavigation>
            <div class="button-zone">
                <el-input size="small" maxlength='20' placeholder="请输入组织名" prefix-icon="el-icon-search" style="margin-right: 10px" ></el-input>
                <el-button type="success" size="small" @click="searchList">搜索</el-button>
                <el-button type="primary" size="small" @click="addOrganization(selections)" >
                    新增
                </el-button>
                <el-button type="danger" size="small"  @click="deleteOrganization(selections,'Array')" >
                    删除
                </el-button>
            </div>
        </div>
        <div class="content-container">
            <el-table
                :data="tableData"
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    :selectable="selectable"
                    width="55">
                </el-table-column>
                <!--<el-table-column-->
                    <!--prop="organizationId"-->
                    <!--label="组织ID"-->
                    <!--align='center'-->
                <!--&gt;-->
                <!--</el-table-column>-->
                <el-table-column
                    prop="organizationCNName"
                    label="组织名称"
                    align='center'
                >
                </el-table-column>
                <el-table-column
                        prop="organizationENName"
                        label="英文名称"
                        align='center'
                >
                </el-table-column>
                <!--<el-table-column-->
                    <!--prop="organizationCreatorId"-->
                    <!--align='center'-->
                    <!--label="组织创建人"-->
                <!--&gt;-->
                <!--</el-table-column>-->
                <el-table-column
                    prop="createTime"
                    label="组织创建时间"
                    align='center'
                >        
                    <template slot-scope="scope">
                        {{time(scope.row.createTime)}}
                        <!--{{scope.row.createTime}}-->
                    </template>
                </el-table-column>
                <!--<el-table-column-->
                    <!--prop="parentId"-->
                    <!--label="父组织ID"-->
                    <!--align='center'-->
                <!--&gt;-->
                    <!--<template slot-scope="scope">-->
                        <!--<span v-if="scope.row.parentId">{{scope.row.parentId}}</span>-->
                        <!--<span v-else>无</span>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column
                    label="操作"
                    align='center'
                >
                    <template slot-scope="scope">
                        <el-button
                            @click="editOrganization([scope.row].map(i => i),scope.$index)"
                            type="primary"
                            size="small"
                        >
                            编辑
                        </el-button>
                        <el-button
                            @click="deleteOrganization(scope,'obj')"
                            type="danger"
                            size="small"
                        >
                            删除
                        </el-button>
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
            :title="organizationNameTitle"
            :visible="addOrganizationName"
            :before-close="handleClose"
            width="35%">
            <el-form :model="ruleFormAdd" :rules="rules" ref="ruleFormAdd" label-width="100px" class="demo-ruleForm">
                <!--<el-form-item label="组织ID" prop="OrganizationId">-->
                    <!--<el-input v-model="ruleFormAdd.organizationId"  autocomplete="off" placeholder="请输入组织ID"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="组织名称" prop="organizationCNName">
                    <el-input v-model="ruleFormAdd.organizationCNName"  autocomplete="off" placeholder="请输入组织名称"></el-input>
                </el-form-item>
                <el-form-item label="英文名称" prop="organizationENName">
                    <el-input v-model="ruleFormAdd.organizationENName"  autocomplete="off" placeholder="请输入组织英文名称"></el-input>
                </el-form-item>
                <!--<el-form-item label="组织创建人" prop="organizationCreatorId">-->
                    <!--<el-input v-model="ruleFormAdd.organizationCreatorId"  autocomplete="off" placeholder="请输入组织创建人" :disabled="this.organizationNameTitle!=='编辑组织'"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="父组织ID" prop="parentId" v-if="this.organizationNameTitle==='编辑组织'">-->
                    <!--<el-input v-model="ruleFormAdd.parentId"  autocomplete="off" placeholder="请输入父组织ID"></el-input>-->
                <!--</el-form-item>        -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addOrganizationName = false">取 消</el-button>
                <el-button type="primary" @click="organizationBtn('ruleFormAdd',organizationNameTitle)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation.vue'
import Utils from '@/assets/js/Utils.js'
export default {
    components: {BreadcrumbNavigation},
    data(){
        return{
            tableData:[],
            addOrganizationName:false,
            ruleFormAdd:{
                organizationId:'',
                organizationCNName:'',
                organizationCreatorId:'',
                parentId:'',
                organizationENName:''
            },
            selections:[],
            organizationNameTitle:'',
            rules: {       
                organizationId: [
                    {required: true, message: '请输入组织ID', trigger: 'blur' }
                ],
                organizationCNName: [
                    { required: true,message: '请输入组织名称',trigger: 'blur' }
                ],
            },
            selected:'',
            total:0,
            pagesize:10,
            currentPage:1,
        }
    },
    methods:{
        handleClose(){
            this.ruleFormAdd = {}
        },
        time(date){
            return Utils.time(date)
        },
        handleSelectionChange(val) {
            this.selections = val;
        },
        selectable(row,index){
            return index !==this.index1;
        },
        // 搜索用户
        searchList(){

        },
        // 新增组织
        addOrganization(){
             this.ruleFormAdd={
                 // organizationCreatorId:localStorage.getItem('userId')
                 organizationCreatorId:10
             };
            // this.ruleFormAdd.organizationCreatorId = localStorage.getItem('userId')
            this.organizationNameTitle='新增组织';
            this.addOrganizationName=true;
        },
        // 编辑组织
        editOrganization(row,index){
            // console.log("row",row,index)
            this.organizationNameTitle='编辑组织';
            this.addOrganizationName=true;
            this.selected = index;
            this.ruleFormAdd=JSON.parse( JSON.stringify(row[0]) );
        },
        // 删除组织
        deleteOrganization(scope,type){
            if(type==='Array'&&scope.length!==0){
                // 批量删除
                let numberData=[];
                scope.map(item=>{
                    numberData.push(item.organizationId)
                })
                this.$http({
                    method: "get",
                    url: "/api/organization/batchDelete/"+numberData.join(),
                    data: {},
                }).then((res)=>{
                    if(res.status===200){
                        this.getOrganizationList();
                        this.$message({
                            message: '组织删除成功',
                            type: 'success',
                        });
                    }
                });
            }else if(type==='obj'){
                // console.log("scope:",scope.row)
                let organizationId=scope.row.organizationId;
                let url=`/api/organization/delete/${organizationId}`;
                // let that=this;
                this.$http.get(url).then((res=>{
                    if (res.data.retVal==0){
                        this.getOrganizationList()
                        this.$message({
                            message: '组织删除成功',
                            type: 'success',
                        });
                    }
                }))
            } else{
                if (document.getElementsByClassName('el-message').length==0) {
                    this.$message({
                        message:'请选择要删除的组织',
                        type:'error'
                    })
                }
            }


            // console.log(selectionArr.length)
            // if (selectionArr.length===0&&document.getElementsByClassName('el-message').length==0) {
            //     this.$message({
            //         message:'请选择要删除的组织',
            //         type:'error'
            //     })
            // }else {
            //     selectionArr.map(item=>{
            //         this.$http.get('/organization/delete/'+item.organizationId).then((res=>{
            //             if (res.data.retVal==0){
            //                 this.getOrganizationList()
            //             }
            //             console.log("删除组织：",res)
            //         }))
            //     })
            // }
        },
        // 确认新增/编辑组织
        organizationBtn(ruleFormAdd,organizationNameTitle){
            // console.log("新增组织信息",this.ruleFormAdd)
            this.$refs['ruleFormAdd'].validate((valid) => {
                if(valid){
                    if (organizationNameTitle==='编辑组织'){
                    this.$http.post('/api/organization/update',this.ruleFormAdd).then((res)=>{
                        // console.log("编辑组织res++++++++:",res)
                        if (res.data.retVal==0){
                            this.getOrganizationList()
                        }
                    })
                    } else {
                        this.$http.post('/api/organization/save',this.ruleFormAdd).then((res)=>{
                            // console.log("创建组织res=======:",res)
                            if (res.data.retVal==0){
                                this.getOrganizationList()
                            }
                        })
                    }
                    this.addOrganizationName=false;
                    }else {
                    console.log("aaa")
                }
            })
            // this.$set(this.tableData,this.selected,this.ruleFormAdd);
        },
        getOrganizationList(){
            this.$http.get('/api/organization/getOrganizationList').then((res)=> {
                console.log("获取组织res:",res)
                if (res.data.retBean){
                    this.total=res.data.retBean.length;
                    // console.log("total",this.total,this.currentPage,this.pagesize)
                    // this.tableData = res.data.retBean
                    this.tableData=res.data.retBean.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)

                }
            })
        },
        changePage(currentPage){
            this.currentPage = currentPage;
            this.getOrganizationList();
        },
    },
    created() {
        this.getOrganizationList()
    }
}
</script>
<style lang="scss" scoped>

</style>