<template>
  <div class="pmim-container">
    <a-table :data-source="data" :columns="columns" rowKey="uid">
      <a slot="uid" slot-scope="text, record" @click="showModal(record.uid)">{{
        text
      }}</a>
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
      <a-descriptions :title="'UID：' + userInfo.uid" layout="vertical">
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
      </a-modal>
    </div>
  </div>
</template>

<script>
import { getMembers, deleteMember, getMemberInfo } from "../api/index.ts";
import Edit from "./edit.vue";
export default {
  name: "pmimContainer",
  components: {
    Edit
  },
  props: {},
  data() {
    return {
      data: [],
      searchText: "",
      searchInput: null,
      searchedColumn: "",
      columns: [
        {
          title: "UID",
          dataIndex: "uid",
          scopedSlots: { customRender: "uid" }
        },
        {
          title: "姓名",
          dataIndex: "name"
        },
        {
          title: "单位",
          dataIndex: "company"
        },
        {
          title: "党支部",
          dataIndex: "PartyBranch"
        },
        {
          title: "选择",
          dataIndex: "select",
          scopedSlots: { customRender: "select" }
        }
      ],
      visible: false,
      userInfo: {},
      ModalText: "Content of the modal",
      editVisible: false,
      confirmLoading: false,
      editUid: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadMembers();
  },
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
        .then(res => {
          console.log(res);
          this.data = res.data.data;
        })
        .catch(err => {
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
        .then(res => {
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
        .catch(err => {
          console.log(err);
          this.$message.error({ content: "请求失败!", key, duration: 2 });
        });
    },
    getMember(uid) {
      const _this = this;
      getMemberInfo(uid)
        .then(res => {
          console.log(res);
          _this.userInfo = res.data.data[0];
        })
        .catch(err => {
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
    }
  }
};
</script>

<style scoped lang="less">
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
