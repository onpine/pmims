<template>
  <div class="register-container">
    <div class="content">
      <h2>注册</h2>
      <a-form-model
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        v-bind="layout"
      >
        <a-form-model-item has-feedback label="账号" prop="id">
          <a-input v-model="ruleForm.id" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="密码" prop="password">
          <a-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item has-feedback label="重复密码" prop="pass2">
          <a-input
            v-model="ruleForm.pass2"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>

        <a-form-model-item has-feedback label="单位" prop="company">
          <a-input v-model="ruleForm.company" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="党组织名称" prop="PartyBranch">
          <a-input v-model="ruleForm.PartyBranch" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="党组织联系人" prop="PartyBranch">
          <a-input v-model="ruleForm.PartyBranchContacts" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="手机" prop="phone">
          <a-input v-model="ruleForm.phone" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="邮箱" prop="email">
          <a-input v-model="ruleForm.email" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="submitForm('ruleForm')">
            注册
          </a-button>
          <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
            重置
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { register } from "../api/index.ts";
export default {
  name: "registerContainer",
  components: {},
  props: {},
  data() {
    let checkPending;

    const validateId = (rule, value, callback) => {
      if (value.length <= 6) {
        callback(new Error("账号不少于6位"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      clearTimeout(checkPending);
      checkPending = setTimeout(() => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.password) {
          callback(new Error("两次密码不一致"));
        } else {
          callback();
        }
      }, 500);
    };

    const validateCompany = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("单位不能为空"));
      } else {
        callback();
      }
    };
    const validatePartyBranch = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("党支部不能为空"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        id: "",
        password: "",
        pass2: "",
        company: "",

        PartyBranch: "",
        phone: "",
        email: "",
        PartyBranchContacts: "",
      },
      rules: {
        id: [{ required: true, validator: validateId, trigger: "change" }],
        password: [
          { required: true, validator: validatePass, trigger: "change" },
        ],
        pass2: [
          { required: true, validator: validatePass2, trigger: "change" },
        ],
        company: [
          { required: true, validator: validateCompany, trigger: "change" },
        ],
        PartyBranch: [
          { required: true, validator: validatePartyBranch, trigger: "change" },
        ],
        phone: [{ required: false, trigger: "change" }],
        email: [{ required: false, trigger: "change" }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    register() {
      const key = "_register";
      this.$message.loading({ content: "Loading...", key, duration: 0 });
      register(this.ruleForm)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.$message.success({ content: "登陆成功!", key, duration: 2 });
            this.$router.push({ path: "/pmim" });
          } else {
            this.$message.warning({ content: "失败了!", key, duration: 2 });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error({ content: "请求失败!", key, duration: 2 });
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="less">
.register-container {
  background-color: #fff;
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
  // box-shadow: 0 0 10px 0px #ccc;
  width: 600px;
  height: 400px;
  margin: 0 auto;
  position: relative;
  padding: 30px 0;
  text-align: center;
  h2 {
    text-align: center;
  }
}
</style>
