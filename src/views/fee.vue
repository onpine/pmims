<template>
  <div class="fee-container">
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
    <a-table :columns="columns" :data-source="filterDate" rowKey="uid">
      <span slot="uid" slot-scope="text">{{ text }}</span>
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span
        slot="PartyFeeSubmitTime"
        slot-scope="time, record"
        @click="click(record.uid)"
      >
        <a-date-picker
          :default-value="moment(time || null, 'YYYY-MM-DD')"
          @change="onChange"
        />
      </span>
      <span slot="action" slot-scope="text, record">
        <a-button :type="record.time > 6 ? 'danger' : 'primary'">
          {{ record.time > 6 ? "未交" : "已交" }}
        </a-button>
      </span>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "身份证号",
    dataIndex: "uid",
  },
  {
    title: "姓名",
    dataIndex: "name",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "党支部",
    dataIndex: "PartyBranch",
  },
  {
    title: "交费时间",
    dataIndex: "PartyFeeSubmitTime",
    scopedSlots: { customRender: "PartyFeeSubmitTime" },
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];
import { getFees, editInfo } from "../api/index.ts";
import moment from "moment";
import { getTimeDifference } from "../utils/day.ts";
import request from "@/utils/request";
export default {
  name: "feeContainer",
  components: {},
  props: {},
  data() {
    return {
      data: [],
      filterDate: [],
      columns,
      clickId: "",
      search: {
        user: "",
        id: "",
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadMembers();
  },
  methods: {
    loadMembers() {
      getFees(1)
        .then((res) => {
          console.log(res);
          this.data = res.data.data;
          const currentTime = Date();
          for (let index = 0; index < this.data.length; index++) {
            const element = this.data[index];
            element.time = getTimeDifference(
              currentTime,
              element.PartyFeeSubmitTime
            );
          }
          this.filterDate = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
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
    onChange(date, dateString) {
      const key = "_edit";
      this.$message.loading({ content: "Loading...", key, duration: 0 });
      editInfo({ id: this.clickId, PartyFeeSubmitTime: dateString })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.$message.success({ content: "修改成功!", key, duration: 2 });
            this.loadMembers();
          } else {
            this.$message.warning({ content: "修改失败了!", key, duration: 2 });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error({ content: "请求失败!", key, duration: 2 });
        });
    },
    click(id) {
      this.clickId = id;
    },
    moment,
  },
};
</script>

<style scoped lang="less"></style>
