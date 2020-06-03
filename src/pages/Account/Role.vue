<template>
    <div>
        <div class="top-bar">
            <BreadcrumbNavigation></BreadcrumbNavigation>
            <div class="button-zone">
                <el-input
                        size="small"
                        maxlength='20'
                        placeholder="请输入角色名"
                        prefix-icon="el-icon-search"
                        style="margin-right: 10px"
                        v-model="serchName"
                >
                </el-input>
                <el-button type="success" size="small" @click="searchList">搜索</el-button>
                <el-button
                        @click="roleAdd"
                        type="primary"
                        size="small"
                >新增</el-button>
                <el-button
                        @click="roleDelete(selections,'Array')"
                        type="danger"
                        size="small"
                >删除</el-button>
            </div>
        </div>
        <div class="content-container" >
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    v-if="tableData.length">
                <el-table-column
                        type="selection"
                        align='center'
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="roleId"
                        label="角色ID"
                        align='center'
                >
                </el-table-column>
                <el-table-column
                        prop="roleName"
                        label="英文名称"
                        align='center'
                >
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="角色名称"
                        align='center'
                >
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        align='center'
                        label="创建时间">
                        <template scope="scope">
                            <span>{{time(scope.row.createTime)}}</span>
                        </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        align='center'
                        width="150">
                    <template slot-scope="scope">
                        <el-button @click="roleEdit(scope,'编辑')"  type="primary" size="small">
                            编辑
                        </el-button>
                        <el-button @click="roleDelete(scope,'obj')"  type="danger" size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="paging"
                background
                layout="prev, pager, next"
                :hide-on-single-page="value"
                @current-change="changePage"
                :total="total">
            </el-pagination>
        </div>
        <el-dialog
                :show-close=false
                :title="this.dashtitle"
                :visible="roleDialog"
                width="30%"
                @closed="dialogClosed"
        >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="英文名称" prop="roleName">
                    <!-- :disabled='distip' -->
                    <el-input v-model="ruleForm.roleName" ></el-input>
                </el-form-item>
                <el-form-item label="中文名称" prop="description">
                    <el-input v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item label="角色权限">
                    <el-tree
                            :data="menusData"
                            ref="tree"
                            show-checkbox
                            node-key="menuId"
                            :accordion='true'
                            :default-checked-keys="resourceCheckedKey"
                            :props="defaultProps"       
                    >
                    </el-tree>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="roleDialog = false">取 消</el-button>
                <el-button type="primary" @click="roleBtn('ruleForm',dashtitle)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import BreadcrumbNavigation from '@/components/BreadcrumbNavigation.vue'
    import Utils from "@/assets/js/Utils.js"
    export default {
        components: {BreadcrumbNavigation},
        data(){
            return{
                tableData:[],
                selections:[],
                serchName:'',
                dashtitle:'',
                value:true,
                roleDialog:false,
                ruleForm: {
                    roleName:'',
                    description:'',
                    roleId: '',
                    menus: []
                },
                rules: {
                    roleName: [
                        { required: true, message: '请输入英文名称', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '请输入中文名称', trigger: 'blur' }
                    ],
                },
                treeData:[],
                defaultProps: {
                    children: 'children',
                    label: 'menuName'
                },
                selected:'',
                distip:true,
                menusData:[],
                resourceCheckedKey: [],
                total:0,
                pagesize:10,
                currentPage:1
            }
        },
        created(){
            this.getRoleList();
        },
        methods:{
            getRoleList(type){
                let that=this;
                this.$http.post('/api/role/roleList',{description:type}).then(function(res){
                    if(res.data.retBean){
                        that.total=res.data.retBean.length;
                        if(res.data.retBean.length<=10&&res.data.retBean.length!==0){
                            that.value=false;
                            that.tableData=res.data.retBean;
                        }else if(res.data.retBean.length===0&&type){
                                that.$message({
                                    message:'请输入正确的查询条件',
                                    type:'error'
                                })
                        }else{
                            console.log("fenye")
                            // that.tableData=res.data.retBean;
                            that.tableData=res.data.retBean.slice((that.currentPage-1)*that.pagesize,that.currentPage*that.pagesize)
                        }
                    }
                });
            },
            changePage(currentPage){
                this.currentPage = currentPage;
                this.getRoleList();
            },
            handleSelectionChange(val) {
                this.selections = val;
            },
            selectable(row,index){
                return index !==this.index1;
            },
            // 搜索用户
            searchList(){
                    console.log("this.serchName",this.serchName)
                    this.getRoleList(this.serchName)
            },
            // 新增角色
            roleAdd(){
                let that=this;
                this.resourceCheckedKey=[];
                this.$http.get('/api/menu/getMenuList').then(function(res){
                    if(res.data.retBean){
                        // console.log("res.data.retBean",res.data.retBean)
                        that.menusData=res.data.retBean;
                        that.ruleForm={};
                        that.dashtitle='新增角色';
                        that.roleDialog=true;
                        that.distip=false;
                    }
                });  
            },
            // 删除用户
            roleDelete(scope,type){
                console.log("scope",scope);
                if(type==='Array'&&scope.length!==0){
                    // 批量删除
                    let numberData=[];
                    let that=this;
                    scope.map(item=>{
                        numberData.push(item.roleId)
                    })
                    this.$http({
                        method: "post",
                        url: "/api/role/deleteRoleMenuList",
                        data: numberData,
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    }).then(function(res){
                        if(res.status===200){
                            that.getRoleList();
                            that.$message({
                                message: '角色删除成功',
                                type: 'success',
                            });
                        }
                    });
                }else if(type==='obj'){
                    let roleId=scope.row.roleId;
                    let url=`/api/role/delete/${roleId}`;
                    let that=this;
                    this.$http.get(url).then(function(res){
                        if(res.status===200){
                            that.getRoleList();
                            that.$message({
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
            dialogClosed(){
                this.$refs['ruleForm'].resetFields();
                this.menusData=[];
            },
            // 编辑用户
            roleEdit(scope){
                // 获取角色对应的菜单
                this.resourceCheckedKey=[];
                // console.log("scope",scope)
                let url=`/api/role/roleMenuList/${scope.row.roleId}`;
                let that=this;
                this.$http.get(url).then(function(res){
                        // console.log("res",res)
                        if(res.status===200){
                            that.menusData=res.data.retBean;
                            that.menusData.map(item=>{
                                if(item.checked===true){
                                    that.resourceCheckedKey.push(item.menuId)
                                }else if(item.children!==null){
                                    item.children.map(i=>{
                                        if(i.checked===true){
                                            that.resourceCheckedKey.push(i.menuId);
                                        }
                                    })
                                }
                            })
                            that.dashtitle='编辑角色';
                            that.roleDialog=true;
                            that.selected = scope.$index;
                            that.ruleForm=JSON.parse( JSON.stringify(scope.row) );
                        }
                })     
            },
            // 新增/编辑成功按钮
            roleBtn(ruleForm,type){
                var keys = this.$refs.tree.getCheckedKeys(true)
               var  treeNodes = this.$refs.tree.getCheckedNodes(true);
               console.log("treeNodes",treeNodes)
               let ids=[];
               for(var i = 0; i < treeNodes.length; i++) {
                   if(treeNodes[i].parentId!==null){
                        ids.push(treeNodes[i].parentId);
                        ids=[...new Set(ids)]
                   }
               }
                console.log("ids",ids); 
                keys=keys.concat(ids)
                console.log("key",keys)
                let obj ={
                    role:{
                        roleId:this.ruleForm.roleId,
                        roleName:this.ruleForm.roleName,
                        description:this.ruleForm.description,
                        roleStatus:'Y',
                    },
                    menus:keys
                }
                // console.log("修改后this.ruleForm",this.ruleForm,obj)
                this.$refs['ruleForm'].validate((valid) => {
                    let that=this;
                    if(valid){
                        if(type==='新增角色'){
                            this.saveRole(obj)
                        }else if(type==='编辑角色'){
                            this.editRole(obj);
                        } 
                    }
                })
            },
            editRole(obj){
                // console.log("编辑this.ruleForm",this.ruleForm)
                let that=this;
                this.$http({
                    method: "post",
                    url: "/api/role/updateRoleMenu",
                    data: JSON.stringify(obj),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }).then(function(res){
                    // console.log("res",res);
                    if(res.status===200){
                        that.roleDialog=false;
                        that.getRoleList();
                        that.$message({
                            message: '编辑角色成功',
                            type: 'success',
                        });
                    }
                });
            },
            saveRole(obj){
                let that=this;
                this.$http({
                    method: "post",
                    url: "/api/role/saveRoleMenu",
                    data: JSON.stringify(obj),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }).then(function(res){
                    // console.log("res",res);
                    if(res.status===200){
                        that.roleDialog=false;
                        that.getRoleList();
                        that.$message({
                            message: '新增角色成功',
                            type: 'success',
                        });
                    }
                });
            },
            time(scope){
                return Utils.time(scope)
            },
        }
    }
</script>
<style lang="scss" scoped>

</style>