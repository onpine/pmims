<template>
  <div class="add-container">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        v-bind="layout"
        :labelCol="{ span: 6, offset: 2 }"
        :wrapperCol="{ span: 14, offset: 2 }"
        style="width: '100%'"
      >
        <a-row style="width: '100%'">
          <a-col :span="12">
            <a-form-model-item has-feedback label="身份证号" prop="uid">
              <a-input v-model="ruleForm.uid" /> </a-form-model-item
          ></a-col>
          <a-col :span="12">
            <a-form-model-item has-feedback label="姓名" prop="name">
              <a-input v-model="ruleForm.name" type="text" autocomplete="off" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item has-feedback label="sex" prop="sex">
              <a-radio-group v-model="ruleForm.sex">
                <a-radio value="1"> 男 </a-radio>
                <a-radio value="2"> 女 </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item has-feedback label="单位" prop="company">
              <a-input v-model="ruleForm.company" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="党支部" prop="PartyBranch">
              <a-input v-model="ruleForm.PartyBranch" /> </a-form-model-item
          ></a-col>
          <a-col :span="12">
            <a-form-model-item has-feedback label="手机" prop="phone">
              <a-input v-model="ruleForm.phone" /> </a-form-model-item
          ></a-col>
          <a-col :span="12">
            <a-form-model-item has-feedback label="邮箱" prop="email">
              <a-input v-model="ruleForm.email" /> </a-form-model-item
          ></a-col>
          <a-col :span="12">
            <a-form-model-item has-feedback label="民族" required prop="nation">
              <a-input v-model="ruleForm.nation" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item has-feedback label="出生日期">
              <a-date-picker @change="birthdayChange" placeholder="选择日期" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item has-feedback label="入党日期" required>
              <a-date-picker @change="joinDateChange" placeholder="选择日期" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item has-feedback label="转正日期" required>
              <a-date-picker
                @change="regularDateChange"
                placeholder="选择日期"
              /> </a-form-model-item
          ></a-col>
          <a-col :span="12">
            <a-form-model-item has-feedback label="人员类别" required>
              <a-select
                default-value="0"
                style="width: 120px"
                @change="categoryChange"
              >
                <a-select-option value="0"> 正式 </a-select-option>
                <a-select-option value="1"> 预备 </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item has-feedback label="学历">
              <a-input v-model="ruleForm.education" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item has-feedback label="现住址">
              <a-input v-model="ruleForm.address" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item has-feedback label="户籍所在地">
              <a-input v-model="ruleForm.household" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item has-feedback label="添加类型">
              <a-select
                default-value="0"
                style="width: 120px"
                @change="addTypeChange"
              >
                <a-select-option value="0"> 补录 </a-select-option>
                <a-select-option value="1"> 新发展 </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
          <a-button type="primary" @click="submitForm('ruleForm')">
            添加
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
import { addMember } from "../api/index.ts";
export default {
  name: "addContainer",
  components: {},
  props: {},
  data() {
    const validateId = (rule, value, callback) => {
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
        uid: "343334444444444445",
        company: "信工",
        name: "onpine",
        sex: "1",
        PartyBranch: "信工党支部",
        phone: "",
        email: "",
        nation: "",
        joinDate: "",
        regularDate: "",
        IdentityCategory: "0",
        education: "",
        address: "",
        birthday: "",
        household: "",
        addType: "0",
      },
      rules: {
        uid: [{ required: true, validator: validateId, trigger: "change" }],
        name: [{ required: true, validator: validateName, trigger: "change" }],
        sex: [{ required: true, trigger: "change" }],
        nation: [{ required: true, trigger: "change" }],
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addPartyMember();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addPartyMember() {
      const key = "_register";
      this.$message.loading({ content: "Loading...", key, duration: 0 });
      addMember(this.ruleForm)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.$message.success({ content: "添加成功!", key, duration: 2 });
          } else {
            this.$message.warning({ content: "添加失败了!", key, duration: 2 });
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
    birthdayChange(date, dateString) {
      console.log(date, dateString);
      this.ruleForm.birthday = dateString;
    },
    joinDateChange(date, dateString) {
      console.log(date, dateString);
      this.ruleForm.joinDate = dateString;
    },
    regularDateChange(date, dateString) {
      console.log(date, dateString);
      this.ruleForm.joinDate = dateString;
    },
    categoryChange(value) {
      console.log(`categoryChange ${value}`);
      this.ruleForm.IdentityCategory = value;
    },
    addTypeChange(value) {
      console.log(`addTypeChange ${value}`);
      this.ruleForm.category = value;
    },
  },
};
</script>

<style scoped lang="less">
.content {
  width: 800px;
}
</style>
