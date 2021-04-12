<template>
  <div class="edit-container">
    <a-form-model
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="身份证号" prop="uid">
        <a-input disabled v-model="ruleForm.uid" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="姓名" prop="name">
        <a-input v-model="ruleForm.name" type="text" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="sex" prop="sex">
        <a-radio-group v-model="ruleForm.sex">
          <a-radio value="1"> 男 </a-radio>
          <a-radio value="2"> 女 </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item has-feedback label="单位" prop="company">
        <a-input v-model="ruleForm.company" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="党支部">
        <a-input v-model="ruleForm.PartyBranch" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="民族">
        <a-input v-model="ruleForm.nation" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="学历">
        <a-input v-model="ruleForm.education" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="地址">
        <a-input v-model="ruleForm.address" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="户籍">
        <a-input v-model="ruleForm.householdRegister" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="手机" prop="phone">
        <a-input v-model="ruleForm.phone" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="ruleForm.email" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('ruleForm')">
          修改
        </a-button>
        <!-- <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
          取消
        </a-button> -->
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { editInfo, getMemberInfo } from "../api/index.ts";
export default {
  name: "editContainer",
  components: {},
  props: {
    uid: String,
  },
  data() {
    const validateId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("ID不能为空"));
      } else {
        callback();
      }
    };
    const validateIdCardNum = (rule, value, callback) => {
      if (value.length !== 18) {
        callback(new Error("身份证号格式不正确"));
      } else {
        callback();
      }
    };

    const validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("姓名不能为空"));
      } else {
        callback();
      }
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
        uid: "",
        IdCardNum: "",
        company: "",
        name: "",
        sex: "",
        PartyBranch: "",
        phone: "",
        email: "",
        nation: "",
        education: "",
        address: "",
        householdRegister: "",
      },
      rules: {
        uid: [{ required: true, validator: validateId, trigger: "change" }],
        IdCardNum: [
          { required: true, validator: validateIdCardNum, trigger: "change" },
        ],

        name: [{ required: true, validator: validateName, trigger: "change" }],
        sex: [{ required: true, trigger: "change" }],
        company: [
          { required: true, validator: validateCompany, trigger: "change" },
        ],
        PartyBranch: [
          { required: true, validator: validatePartyBranch, trigger: "change" },
        ],
        phone: [
          { required: false, trigger: "change" },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的号码格式",
            trigger: "change",
          },
        ],
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
  created() {
    getMemberInfo(this.uid)
      .then((res) => {
        console.log(res);
        this.ruleForm = { ...res.data.data[0] };
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editMemberInfo();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    editMemberInfo() {
      const key = "_edit";
      this.$message.loading({ content: "Loading...", key, duration: 0 });
      editInfo(this.ruleForm)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.$message.success({ content: "修改成功!", key, duration: 2 });
            // this.resetForm();
          } else {
            this.$message.warning({ content: "修改失败了!", key, duration: 2 });
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

<style scoped lang="less"></style>
