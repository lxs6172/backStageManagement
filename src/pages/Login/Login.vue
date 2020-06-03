<template>
    <div class="main">
        <div class="container">
            <div class="login">
                <h1 class="login-title">后台管理</h1>
                <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                    <el-row>
                        <el-col>
                            <el-form-item label="用户名" prop='userName'>
                                <el-input v-model="form.userName" placeholder="手机号码/邮箱"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col>
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="form.password" type="Password" placeholder="密码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="btnTips">
                        <div >{{tips}}</div>
                    </el-row>
                    <el-row>
                         <el-button type="primary" @click="onSubmit('form')" class="btn">登陆</el-button>
                    </el-row>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
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
            form:{
                userName:'',
                password:'',
            },
            tips:'',
            rules:{
                userName:[
                    { required: true, validator: validateUser, trigger: 'blur' },
                ],
                password:[
                    {required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        console.log("store",this.$store.state)
    },
    methods:{
        onSubmit(){
            this.$refs['form'].validate((valid) => {
                let that=this;
                if(valid){
                    if(this.form.userName==='admin@qq.com'&&this.form.password==='123qwe'){
                        console.log("123")
                        this.$router.push({
                            path: '/account/accountlist'
                        })
                        this.$store.commit("setuser",'qasweiuy7800jdsgdgdvhd')
                    }else{
                        that.tips='用户名不正确';
                        that.form={}
                        setTimeout(function(){
                            that.tips='';
                        },2000)
                        that.$message({
                            message: '登录失败',
                            type: 'fail',
                        });
                    }  
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.main{
    width: 100%;
    height:100vh ;
    background:#409EFF;
    .container{
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        .login{
            width:350px;
            height:350px;
            border-radius: 20px;
            background:#fff;
            box-shadow: 0px 0px 20px #409EFF;
            .login-title{
                width: 100%;
                padding:30px 0px 40px 0px;
                color:#409EFF;
                text-align: center;
                font-size: 24px;
            }
            .el-form{
                width:90%;
                .el-form-item__content{
                    padding-right: 20px;
                }
                .btn{
                    width:100%;
                    margin-top:10px;
                    margin-left: 20px;
                }
                .btnTips{
                    color: red;
                    font-size: 16px;
                    padding-left: 20px;
                }
                .tips{
                    font-size: 13px;
                    text-align: right;
                    padding:10px 0 0 0;
                    a{
                        color: #409EFF;
                    }
                }
            }
        }
    }
}


</style>