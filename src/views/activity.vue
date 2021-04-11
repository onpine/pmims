<template>
  <div class="activity">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="活动信息">
        <a-form-model layout="inline" :model="search">
          <a-form-model-item>
            <a-input v-model="search.organizer" placeholder="党支部"> </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-button
              type="primary"
              html-type="button"
              :disabled="search.user === '' || search.id === ''"
              @click="handleSearch"
              >搜索
            </a-button>
          </a-form-model-item>
        </a-form-model>
        <a-table :columns="columns" :data-source="filterDate" rowKey="time">
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
      </a-tab-pane>
      <a-tab-pane key="2" tab="添加活动" force-render>
        <a-form-model :model="form" v-bind="layout">
          <a-form-model-item label="党支部">
            <a-input v-model="form.organizer" placeholder="党支部"
          /></a-form-model-item>
          <a-form-model-item label="时间">
            <a-date-picker
              placeholder="选择时间"
              format="YYYY-MM-DD HH:mm:ss"
              :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
              @change="onTimeChange"
            />
          </a-form-model-item>
          <a-form-model-item label="地点">
            <a-input v-model="form.area" placeholder="地点" />
          </a-form-model-item>
          <a-form-model-item label="类型">
            <a-select
              default-value="党员大会"
              style="width: 120px"
              @change="handleChange"
            >
              <a-select-option value="党员大会"> 党员大会 </a-select-option>
              <a-select-option value="支部委员会"> 支部委员会 </a-select-option>
              <a-select-option value="党小组会"> 党小组会 </a-select-option>
              <a-select-option value="党课"> 党课 </a-select-option>
              <a-select-option value="组织生活会"> 组织生活会 </a-select-option>
              <a-select-option value="党支部活动"> 党支部活动 </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="主题">
            <a-input v-model="form.subject" placeholder="主题" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="handleSubmit"> 添加 </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
const columns = [
  {
    title: "党支部",
    dataIndex: "organizer",

    scopedSlots: { customRender: "name" },
  },
  {
    title: "活动时间",
    dataIndex: "time",
  },
  {
    title: "地点",
    dataIndex: "area",
  },
  {
    title: "类型",
    dataIndex: "type",
  },
  {
    title: "主题",
    dataIndex: "subject",
  },
];
import { getActivitys, addActivity } from "@/api/index.ts";
import moment from "moment";
export default {
  name: "activity",
  components: {},
  props: {},
  data() {
    return {
      data: [],
      filterDate: [],
      search: {
        organizer: "",
      },
      columns,
      form: {
        organizer: "第三党支部",
        time: "2018-2-3 12:56:00",
        area: "1000",
        type: "党员大会",
        subject: "00",
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.loadActivitys();
  },
  methods: {
    moment,
    loadActivitys() {
      getActivitys()
        .then((res) => {
          this.data = [...res.data.data];
          this.filterDate = [...res.data.data];
          // console.log(this.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSearch() {
      // console.log(this.search);
      this.filterDate = [
        ...this.filterDate.filter((item) => {
          return item.organizer.includes(this.search.organizer);
        }),
      ];
      // console.log(this.filterDate);
    },
    handleChange(value) {
      console.log(`selected ${value}`);
      this.type = value;
    },
    handleSubmit() {
      const key = "_addActivity";
      addActivity(this.form)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.$message.success({ content: "添加成功!", key, duration: 2 });
            // this.resetForm();
          } else {
            this.$message.warning({ content: "添加失败了!", key, duration: 2 });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message.error({ content: "请求失败!", key, duration: 2 });
        });
    },
    onTimeChange(date, dateString) {
      this.form.time = dateString;
    },
    callback(key) {
      console.log(key);
    },
    // disabledDate(current) {
    //   // Can not select days before today and today
    //   return current && current < moment().endOf("day");
    // },
    // disabledDateTime() {
    //   return {
    //     disabledHours: () => this.range(0, 24).splice(4, 20),
    //     disabledMinutes: () => this.range(30, 60),
    //     disabledSeconds: () => [55, 56],
    //   };
    // },
    // range(start, end) {
    //   const result = [];
    //   for (let i = start; i < end; i++) {
    //     result.push(i);
    //   }
    //   return result;
    // },
    // disabledRangeTime(_, type) {
    //   if (type === "start") {
    //     return {
    //       disabledHours: () => this.range(0, 60).splice(4, 20),
    //       disabledMinutes: () => this.range(30, 60),
    //       disabledSeconds: () => [55, 56],
    //     };
    //   }
    //   return {
    //     disabledHours: () => this.range(0, 60).splice(20, 4),
    //     disabledMinutes: () => this.range(0, 31),
    //     disabledSeconds: () => [55, 56],
    //   };
    // },
  },
};
</script>

<style scoped lang="less"></style>
