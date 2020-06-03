<template>
    <div>
        <div class="top-bar">
            <BreadcrumbNavigation></BreadcrumbNavigation>
            <div class="button-zone">
                <el-input
                        size="small"
                        maxlength='20'
                        placeholder="请输入用户名"
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
                        @click="userDelete(selections,'Array')"
                        type="danger"
                        size="small"
                >删除</el-button>
            </div>
        </div>
        <div class="content-container" >
            <el-table
                    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        :selectable="selectable"
                        width="55"
                >
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="用户名"
                        align='center'
                >
                </el-table-column>
                <el-table-column
                        prop="roles"
                        label="角色名称"
                        align='center'
                >
                    <template slot-scope="scope">
                        <span v-for="(item,index) in scope.row.roles" :key="index">
                            {{item.description}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="organization"
                        align='center'
                        label="公司名称"
                >
                    <template slot-scope="scope">
                    {{scope.row.organization ? scope.row.organization.organizationCNName : "-" }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="cellPhone"
                        label="手机号码"
                        align='center'
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
                                @click="userDelete(scope,'obj')"
                                type="danger"
                                size="small">删除</el-button>
                        <el-button
                                @click="handlepassword([scope.row].map(i => i))"
                                type="warning"
                                size="small">修改密码</el-button>
                        <!-- <el-button
                        @click="handleForbid(scope.row)"
                        :type="scope.row.Forbid ? 'info' : 'danger'"
                        size="small">{{scope.row.Forbid ? "启用" : "禁用"}}</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <!--<el-pagination-->
                    <!--background-->
                    <!--layout="prev, pager, next"-->
                    <!--:total="50">-->
            <!--</el-pagination>-->
            <el-pagination
                    class="paging"
                    background
                    :current-page.sync="currentPage"
                    :page-size="pageSize" 　　　　
                    layout="prev, pager, next"
                    :total="tableData.length">
                　　</el-pagination>
        </div>
        <el-dialog
                :show-close=false
                :title="userTitle"
                :visible="dialogUserAdd"
                width="35%"
        >
            <el-form :model="ruleFormAdd"  ref="ruleFormAdd" :rules="rules" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input autocomplete="new-password" v-model="ruleFormAdd.userName" :disabled="userTitle==='新增用户'?false:true"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password" v-if="userTitle==='新增用户'">
                    <el-input autocomplete="new-password" v-model="ruleFormAdd.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="passwords" v-if="userTitle==='新增用户'">
                    <el-input autocomplete="new-password" v-model="ruleFormAdd.passwords" type="password"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="roles">
                    <el-select value-key="roleId" multiple v-model="ruleFormAdd.roles"  placeholder="请选择角色" @change="roleChange">
                        <el-option
                                v-for="role in Roles"
                                :key="role.roleId"
                                :label="role.description"
                                :value="role"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公司名" prop="organization">
                    <el-select v-model="ruleFormAdd.organization.organizationId" placeholder="请选择公司" @change="changeOrganization">
                            <el-option
                                    v-for="organization in organizations"
                                    :key="organization.organizationId"
                                    :label="organization.organizationCNName"
                                    :value="organization.organizationId"
                            >
                            </el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="部门名" prop="departmentId">-->
                    <!--&lt;!&ndash; @change="departmentChange(ruleForm.DepartmentId)" &ndash;&gt;-->
                    <!--<el-select v-model="ruleFormAdd.departmentId"  placeholder="请选择部门名称">-->
                        <!--<el-option-->
                                <!--v-for="(department, index) in departmentArr"-->
                                <!--:key="index"-->
                                <!--:label="department.CNName"-->
                                <!--:value="department.DepartmentId">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="手机号码" prop="cellPhone">
                    <el-input v-model="ruleFormAdd.cellPhone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogUserAdd = false">取 消</el-button>
                <el-button type="primary" @click="AddBtn('ruleFormAdd')">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                :show-close=false
                title="修改密码"
                :visible="dialogPassword"
                width="35%">
            <el-form :model="ruleFormAdd" :rules="rules" ref="ruleFormAdd" label-width="100px" class="demo-ruleForm">
                <el-form-item label="新密码" prop="password">
                    <el-input v-model="ruleFormAdd.password" type="password" autocomplete="new-password"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="passwords">
                    <el-input v-model="ruleFormAdd.passwords" type="password" autocomplete="new-password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogPassword = false">取 消</el-button>
                <el-button type="primary" @click="passwordBtn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import BreadcrumbNavigation from '@/components/BreadcrumbNavigation.vue'
    export default {
        components: {BreadcrumbNavigation},
        data(){
            var validatePass = (rules, value, callback) => {
                var regExp=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if(!regExp.test(value)){
                    callback(new Error('密码由6-21位英文字母和数字组成，不能是纯数字或纯英文'));
                }else{
                    if (this.ruleFormAdd.Passwords !== '') {
                        this.$refs.ruleFormAdd.validateField('Passwords');
                    }
                    callback();
                }
            };
            var validatePass2 = (rules, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleFormAdd.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var checkRole = (rules, value, callback) => {
              if (value.length === 0) {
                  callback(new Error('一名用户至少需要一个角色'));
              } else {
                  callback()
              }
            };
            var checkOrganization = (rules, value, callback) => {
                if (value.organizationId === '') {
                    callback(new Error('请选择公司'))
                } else {
                    callback()
                }
            };
            var checkCellPhone = (rules, value, callback) => {
                var regExp = /^[1]([3-9])[0-9]{9}$/
                if (value === '') {
                    callback(new Error('请输入手机号'))
                } else if (!regExp.test(value)) {
                    callback(new Error('请输入正确格式的手机号'))
                } else {
                    callback()
                }
            }
            let validateUser= (rules, value, callback) => {
                var reg = /^1[34578][0-9]{9}/;
                var regExp = /[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/; 
                if (value === '') {
                    callback(new Error('请输入用户名'));
                }else if(!regExp.test(value)&&!reg.test(value)){
                    callback(new Error('请正确填写手机号码和邮箱！'));
                }
                setTimeout(() => {
                    callback();
                }, 1000);
            };
            return{
                pageSize: 10,
                currentPage: 1,
                tableData:[],
                userTitle:'',
                dialogPassword:false,
                dialogUserAdd:false,
                selections: [],
                ruleFormAdd: {
                    userName: '',
                    password: '',
                    email: '111@qq.com',
                    roles: [],
                    organization: {
                        organizationId: '',
                        organizationCNName:'',
                    },
                    cellPhone: '',
                    // Forbid: false
                },
                organizations:[],
                Roles:[],
                selected:'',//编辑/修改的位置坐标
                rules: {
                    userName: [
                        { required: true, validator:validateUser, trigger: 'blur' },
                    ],
                    password: [
                        {required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    passwords: [
                        { required: true,validator: validatePass2, trigger: 'blur' }
                    ],
                    cellPhone: [
                        { required: true,validator: checkCellPhone, message: '请输入手机号码', trigger: 'blur' },
                    ],
                    roles: [
                        {required: true, validator: checkRole, trigger: 'blur'}
                    ],
                    organization: [
                        {required: true, validator: checkOrganization, trigger: 'blur'}
                    ]
                },
                currentUserInfo: {

                }
            }
        },
        created() {
            this.userInfo = this.$store.state.user;
            // console.log("this.userInfo",this.userInfo)
            let obj = {
                userId: this.userInfo.userId,
                userName: this.userInfo.userName,
                email: this.userInfo.email,
                cellPhone: this.userInfo.cellPhone,
                status: this.userInfo.status
            }
            this.getUserList();
        },
        methods:{
            getUserList(val = {}) {
                this.tableData=[{
                        userId:1,
                        userName:"lin@qq.com",
                        password:"******",
                        email:"lin@qq.com",
                        cellPhone:12000000000,
                        status:"REGISTER",
                        salt:"743shI08TNrP4duyPTTh",
                        organization:{
                            organizationId:100,
                            organizationCNName:"中国银行11",
                            parentId:null,
                            organizationCreatorId:130000000000,
                            createTime:"2020-04-16T08:08:14.000+0000",
                            organizationENName:"BANKOFCHINA",
                            children:null,
                            users:null
                        },
                        roles:[
                            {
                                roleId:134,
                                roleName:"ceshi",
                                description:"测试管理员",
                                roleStatus:"Y",
                                createTime:"2020-04-22T11:55:05.000+0000",
                                updateTime:"2020-05-06T06:47:48.000+0000",
                                menus:null
                            }
                        ],
                        roleIds:null,
                        roleId:null,
                        orgId:null,
                        platform:null
                    }]
                // this.$http.get("/api/user/getUserList",val).then(res => {
                //     if (res.data.retVal === 0) {
                //         this.tableData = res.data.retBean
                //     }
                // })
            },
            handleSelectionChange(val) {
                this.selections = val;
            },
            selectable(row,index){
                return index !==this.index1;
            },
            // 新增用户
            handleAdd(){
                this.ruleFormAdd = {
                    organization: {
                        organizationId: ''
                    }
                }
                this.userTitle='新增用户';
                this.dialogUserAdd=true;
                // this.ruleFormAdd.DepartmentId=101,
                this.$http.post("/api/role/roleList",{description:""}).then(res => {
                    if (res.data.retVal === 0) {
                        this.Roles = res.data.retBean
                        // this.ruleFormAdd.roles = this.Roles[0].roleId
                    }
                })
                // 获取组织
                this.$http.get("/api/organization/getOrganizationList").then(res => {
                    if (res.data.retVal === 0) {
                        console.log(res.data.retBean)
                        this.organizations = res.data.retBean
                        // this.ruleFormAdd.OrganizationId=this.organizations[0].organizationId
                        console.log("this.organizations",this.organizations)
                    }
                })
            },
            // 支持批量删除，单个删除
            userDelete(selections,type) {
                if (type==='Array'&&selections.length !== 0) {
                    let UserNameArr = selections.map(item => item.userId)
                    this.batchDelete(UserNameArr)
                }else if(type==='obj'){
                    let userId=selections.row.userId;
                    let UserNameArr=[];
                    UserNameArr.push(userId)
                    this.batchDelete(UserNameArr)
                    // let url=`/api/user/delete/${userId}`;
                    // this.$http.get(url).then(res=>{
                    //     if(res.status===200){
                    //         this.getUserList();
                    //         this.$message({
                    //             message: '用户删除成功',
                    //             type: 'success',
                    //         });
                    //     }
                    // });
                } else {
                    this.$message({
                        type: 'warning',
                        message: "未选择用户"
                    });
                    return;
                }
            },
            batchDelete(UserNameArr){
                this.$http.get("/api/user/batchDelete/" + UserNameArr.join()).then(res => {
                    if (res.data.retVal === 0) {
                        this.$message({
                            type: 'success',
                            message: res.data.retMsg
                        });
                        this.getUserList()
                    }
                })
            },
            // 搜索用户
            searchList(){

            },
            // 编辑用户信息
            userEdit(row,index){
                console.log("row",row);
                this.userTitle='编辑用户';
                this.dialogUserAdd=true;
                this.selected = index;
                if(row[0].organization===null){
                    // console.log("123")
                    this.ruleFormAdd=JSON.parse(JSON.stringify(row[0]));
                    let obj={
                        organizationId:'',
                    }
                    this.ruleFormAdd.organization=obj;
                }else{
                    this.ruleFormAdd=JSON.parse(JSON.stringify(row[0]));
                }
                this.$http.post("/api/role/roleList",{description:""}).then(res => {
                    if (res.data.retVal === 0) {
                        console.log("res",res);
                        this.Roles = res.data.retBean
                    }
                })
                // 获取组织
                this.$http.get("/api/organization/getOrganizationList").then(res => {
                    if (res.data.retVal === 0) {
                        console.log("res",res);
                        this.organizations = res.data.retBean
                    }
                })
            },
            roleChange(id){
                this.Roles.map(item=>{
                    if(item.roleId==id){
                        this.ruleFormAdd.roles.roleName=item.roleName;
                        this.ruleFormAdd.roles.description=item.description;
                    }
                })
            },
            changeOrganization(id) {
                console.log(id)
                this.organizations.map(item=>{
                    if(item.organizationId===id){
                        this.ruleFormAdd.organization.organizationId = id;
                        this.ruleFormAdd.organization.organizationCNName=item.organizationCNName;
                        this.ruleFormAdd.organization.organizationENName=item.organizationENName;
                    }
                })
            },
            // 成功新增/编辑用户
            AddBtn(ruleFormAdd){
                this.$refs['ruleFormAdd'].validate((valid) => {
                    if(valid){
                        let requestObj = JSON.parse(JSON.stringify(this.ruleFormAdd))
                        if (this.userTitle === '新增用户') {
                            delete requestObj.passwords
                            // console.log(JSON.stringify(requestObj))
                            this.$http.post("/api/user/register",requestObj).then(res => {
                                if (res.data.retVal === 0) {
                                    this.$set(this.tableData,this.selected,this.ruleFormAdd);
                                    this.getUserList()
                                    this.$message({
                                        type: 'success',
                                        message: '新增用户成功'
                                    });
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: res.data.retMsg
                                    });
                                }
                                this.dialogUserAdd=false;
                            })
                        } else {
                            requestObj.roleIds = requestObj.roles.map(val => val.roleId).join()
                            requestObj.orgId = requestObj.organization.organizationId
                            console.log("requestObj",requestObj);
                            delete requestObj.password
                            delete requestObj.organization
                            this.$http.post("/api/user/update",requestObj).then(res => {
                                if (res.status === 200) {
                                    this.$set(this.tableData,this.selected,this.ruleFormAdd);
                                    this.getUserList()
                                    this.$message({
                                        type: 'success',
                                        message: '修改成功'
                                    });
                                    this.dialogUserAdd=false;
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: '修改失败，请检查网络或联系管理员'
                                    });
                                }
                            })
                        }
                    }
                })
            },
            // 修改密码
            handlepassword(row){
                this.dialogPassword=true;
                let obj = JSON.parse(JSON.stringify(row[0]))
                this.currentUserInfo = JSON.parse(JSON.stringify(row[0]));
            },
            // 确定修改密码
            passwordBtn(){

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
</style>