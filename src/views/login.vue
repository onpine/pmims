<template>
  <div class="login-container">
    <div class="content">
      <h2>登录</h2>
      <a-form-model
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        v-bind="layout"
      >
        <a-form-model-item has-feedback label="ID" prop="id">
          <a-input v-model="ruleForm.id" type="text" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="密码" prop="password">
          <a-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 10 }">
          <a-button type="primary" @click="submitForm('ruleForm')">
            登录
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { login } from "../api/index.ts";
export default {
  name: "loginContainer",
  components: {},
  props: {},
  data() {
    let checkPending;
    let checkPending2;
    const validateId = (rule, value, callback) => {
      clearTimeout(checkPending);
      checkPending = setTimeout(() => {
        if (value === "") {
          callback(new Error("ID不能为空"));
        } else {
          callback();
        }
      }, 500);
    };
    const validatePass = (rule, value, callback) => {
      clearTimeout(checkPending2);
      checkPending2 = setTimeout(() => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      ruleForm: {
        id: "123456",
        password: "000000"
      },
      rules: {
        id: [{ validator: validateId, trigger: "change" }],
        password: [{ validator: validatePass, trigger: "change" }]
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    login() {
      const key = "_login";
      this.$message.loading({ content: "Loading...", key, duration: 0 });
      login(this.ruleForm)
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.$message.success({ content: "登陆成功!", key, duration: 2 });
            this.$router.push({ path: "/" });
          } else {
            this.$message.warning({ content: "失败了!", key, duration: 2 });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error({ content: "请求失败!", key, duration: 2 });
        });
    }
  }
};
</script>

<style scoped lang="less">
.login-container {
  background-image: url("../images/bg.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
}
.content {
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 10px 0px #ccc;
  opacity: 1;
  width: 400px;
  // height: 300px;
  margin: 0 auto;
  position: relative;
  top: calc(50% - 200px);
  padding: 30px;
  h2 {
    text-align: center;
  }
}
</style>
