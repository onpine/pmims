<template>
  <div class="pmim-container">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="党员信息">
        <a-form-model layout="inline" :model="search">
          <a-form-model-item>
            <a-input v-model="search.user" placeholder="Username"> </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-input v-model="search.id" type="text" placeholder="身份证">
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-button
              type="primary"
              html-type="button"
              :disabled="search.user === '' || search.id === ''"
              @click="handleSearch"
            >
              搜索
            </a-button>
          </a-form-model-item>
        </a-form-model>

        <a-table :data-source="filterDate" :columns="columns" rowKey="uid">
          <a
            slot="uid"
            slot-scope="text, record"
            @click="showModal(record.uid)"
            >{{ text }}</a
          >
          <span slot="IdentityCategory" slot-scope="text, record">
            <a-tag :color="record.IdentityCategory == '0' ? 'blue' : 'green'">
              {{ record.IdentityCategory == "0" ? "正式" : "预备" }}
            </a-tag>
          </span>
          <span slot="sex" slot-scope="text, record">{{
            record.sex == "1" ? "男" : "女"
          }}</span>
          <span slot="select" slot-scope="text, record">
            <a-button
              type="primary"
              shape="circle"
              icon="edit"
              @click="showEditModal(record.uid)"
            />
            <a-popconfirm
              :title="'确认删除' + record.uid"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirm(record.uid)"
              @cancel="cancel"
            >
              <a-button type="danger" shape="circle" icon="delete" />
            </a-popconfirm>
          </span>
        </a-table>

        <a-modal
          v-model="visible"
          width="600px"
          :centered="true"
          title="详细信息"
          @ok="handleOk"
        >
          <a-descriptions
            :title="'身份证号：' + userInfo.uid"
            layout="vertical"
          >
            <a-descriptions-item label="姓名">
              {{ userInfo.name }}
            </a-descriptions-item>
            <a-descriptions-item label="单位">
              {{ userInfo.company }}
            </a-descriptions-item>
            <a-descriptions-item label="党支部">
              {{ userInfo.PartyBranch }}
            </a-descriptions-item>
            <a-descriptions-item label="注册时间">
              {{ userInfo.registTime }}
            </a-descriptions-item>
            <a-descriptions-item label="手机号">
              {{ userInfo.phone }}
            </a-descriptions-item>
            <a-descriptions-item label="邮箱">
              {{ userInfo.email }}
            </a-descriptions-item>
            <a-descriptions-item label="入党时间">
              {{ userInfo.joinDate }}
            </a-descriptions-item>
            <a-descriptions-item label="转正时间">
              {{ userInfo.regularDate }}
            </a-descriptions-item>
            <a-descriptions-item label="交党费时间">
              {{ userInfo.PartyFeeSubmitTime }}
            </a-descriptions-item>
            <a-descriptions-item label="户籍地址">
              {{ userInfo.household }}
            </a-descriptions-item>
            <a-descriptions-item label="民族">
              {{ userInfo.nation }}
            </a-descriptions-item>
          </a-descriptions>
        </a-modal>
        <div>
          <a-modal
            title="修改信息"
            width="700px"
            :centered="true"
            :destroyOnClose="true"
            :visible="editVisible"
            :confirm-loading="confirmLoading"
            :footer="null"
            @ok="handleEditOk"
            @cancel="handleEditCancel"
          >
            <edit :uid="editUid" />
          </a-modal></div
      ></a-tab-pane>
      <a-tab-pane key="2" tab="添加党员信息" force-render>
        <add />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
const columns = [
  {
    title: "身份证号",
    dataIndex: "uid",
    scopedSlots: { customRender: "uid" },
  },
  {
    title: "姓名",
    dataIndex: "name",
  },
  {
    title: "性别",
    dataIndex: "sex",
    scopedSlots: { customRender: "sex" },
  },
  {
    title: "入党时间",
    dataIndex: "joinDate",
  },
  {
    title: "单位",
    dataIndex: "company",
  },
  {
    title: "党支部",
    dataIndex: "PartyBranch",
  },
  {
    title: "身份类型",
    dataIndex: "IdentityCategory",
    scopedSlots: { customRender: "IdentityCategory" },
  },
  {
    title: "选择",
    dataIndex: "select",
    scopedSlots: { customRender: "select" },
  },
];
import { getMembers, deleteMember, getMemberInfo } from "../api/index.ts";
import Add from "./add.vue";
import Edit from "./edit.vue";
export default {
  name: "pmimContainer",
  components: {
    Edit,
    Add,
  },
  props: ["branch"],
  data() {
    return {
      data: [],
      filterDate: [],
      searchText: "",
      searchInput: null,
      searchedColumn: "",
      search: {
        user: "",
        id: "",
      },
      columns,
      visible: false,
      userInfo: {},
      ModalText: "Content of the modal",
      editVisible: false,
      confirmLoading: false,
      editUid: "",
    };
  },
  computed: {},
  watch: {
    branch(newV, oldV) {
      this.loadMembers();
    },
  },
  created() {
    this.loadMembers();
  },
  mounted() {},
  methods: {
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },

    handleReset(clearFilters) {
      clearFilters();
      this.searchText = "";
    },
    loadMembers() {
      getMembers()
        .then((res) => {
          console.log(res);
          this.data = res.data.data;

          if (this.branch != "all") {
            this.filterDate = [
              ...this.data.filter((item) => {
                return item.PartyBranch.includes(this.branch);
              }),
            ];
          } else {
            this.filterDate = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    confirm(e) {
      console.log(e);
      this.deleteMember(e);
    },
    cancel(e) {
      console.log(e);
      this.$message.error("Click on No");
    },
    deleteMember(uid) {
      const _this = this;
      const key = "_delete";
      this.$message.loading({ content: "Loading...", key, duration: 0 });
      deleteMember(uid)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.$message.success({ content: "删除成功!", key, duration: 2 });
            for (let index = 0; index < _this.data.length; index++) {
              if (_this.data[index].uid == uid) {
                _this.data.splice(index, 1);
              }
            }
          } else {
            this.$message.warning({ content: "添加失败!", key, duration: 2 });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error({ content: "请求失败!", key, duration: 2 });
        });
    },
    getMember(uid) {
      const _this = this;
      getMemberInfo(uid)
        .then((res) => {
          console.log(res);
          _this.userInfo = res.data.data[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showModal(uid) {
      this.userInfo = {};
      this.getMember(uid);
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    showEditModal(uid) {
      this.editUid = uid;
      this.editVisible = true;
    },
    handleEditOk() {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleEditCancel() {
      console.log("Clicked cancel button");
      this.editVisible = false;
    },
    handleSearch() {
      console.log(this.search);
      this.filterDate = [
        ...this.filterDate.filter((item) => {
          return (
            item.name.includes(this.search.user) &&
            item.uid.includes(this.search.id)
          );
        }),
      ];
      console.log(this.filterDate);
    },
    callback(key) {
      console.log(key);
    },
  },
};
</script>

<style scoped lang="less">
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
/deep/.ant-descriptions-item-label {
  font-weight: bold;
}
</style>
