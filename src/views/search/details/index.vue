<template>
  <div>
    <Header :navTitle="navtitle" headerType="details"></Header>
    <div class="tabs">
      <van-tabs v-model="activeName" animated color="#15c5ce" @click="tabClick">
        <van-tab
          v-for="item in tabList"
          :title="item.name"
          :key="item.type"
          :name="item.type"
        >
        </van-tab>
      </van-tabs>
    </div>
    <div class="dateTabs">
      <van-tabs v-model="activeName" color="#15c5ce" @click="dadetabClick">
        <van-tab title="近24小时" name="1"></van-tab>
        <van-tab title="近一周" name="7"></van-tab>
        <van-tab title="近一个月" name="30"></van-tab>
        <van-tab title="近一年" name="365"></van-tab>
      </van-tabs>
    </div>
    <!-- <van-empty
      description="暂无数据"
      v-if="xAxisData.length == 0 && yData.length == 0"
    /> -->
    <div id="myChart" :style="{ width: '100%', height: '350px' }" v-if="isShow"></div>
  </div>
</template>
<script>
import Header from "../../../components/header/index.vue";
import { postTypeList, getQueryData } from "../../../httpClient/index";

export default {
   inject: ["reload"], //注入reload方法
  data() {
    return {
      navtitle: this.$route.query.name,
      tabList: [],
      activeName: "热卖榜",
      xAxisData: [],
      yData: [],
      echartsName: "",
      taskType: this.$route.query.taskType,
      isShow: false,
      dateType: 1,
      title: [],
    };
  },
  components: {
    Header,
  },
  created() {
    
      this.isShow=true;
   
  },
  mounted() {
   
    this.getTypeList();
    this.getQueryData(this.taskType);     
    this.drawLine();  
    this.echartsName = this.$route.query.taskName;
    this.title.push(this.echartsName);
    window.onresize = function () {
      //自适应大小
      this.myChart.resize();
    };
  },
  methods: {

    // tab切换
    tabClick(name, title) {
      console.log(name, title);

      this.xAxisData = [];
      this.yData = [];
      this.getQueryData(name);
      this.echartsName = title;
      this.taskType = name;
      this.title.push(this.echartsName);
      this.drawLine();
    },
    // 时间tab切换
    dadetabClick(name) {
      this.dateType = name;
      this.getQueryData(this.taskType);
      this.xAxisData = [];
      this.yData = [];
      this.drawLine();
    },
    // 获取榜单列表
    async getTypeList() {
      let { data } = await postTypeList();
      if (data.code == 200) {
        this.tabList = data.data.slice(-5);
        this.tabList.forEach((item) => {
          item.name = item.name.substr(4);
        });
        console.log(this.tabList);
      } else {
        // Toast(msg);
      }
    },
    // 详情
    async getQueryData(taskType) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      let obj = {
        name: this.$route.query.name,
        taskType: taskType,
        dateType: this.dateType,
      };
      let { data } = await getQueryData(obj);
      if (
        (data.data.dataList != null || data.data.dateList != null) &&
        (data.data.dataList.length != 0 || data.data.dateList.length != 0)
      ) {
        this.yData = data.data.dataList;
        this.yData.forEach((item) => {
          item.value = item.rank.toString();
        });
        let array = [];
        if (this.dateType == 1) {
          data.data.dateList.forEach((item) => {
            let str = "";
            str = item.substring(6, 9);
            array.push(str);
          });
          this.xAxisData = array;
          console.log(this.xAxisData);
        } else if (
          this.dateType == 7 ||
          this.dateType == 30 ||
          this.dateType == 90
        ) {
          data.data.dateList.forEach((item) => {
            let str = "";
            str = item.substring(5, 10);
            array.push(str);
          });
          this.xAxisData = array;
        } else {
          this.xAxisData = data.data.dateList;
        }

        this.drawLine();
      }
    },
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    },
    drawLine() {
      var self = this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          show: true,
          formatter: function (params) {
            var tipText = "";
            params.forEach(function (item) {
              tipText +=
                item.axisValue +
                "<br>" +
                "排名：" +
                item.data.rank +
                "<br>" +
                "下载量：" +
                item.data.downCn +
                "<br>" +
                "关注量：" +
                item.data.focusCn +
                "<br>" +
                "评分：" +
                item.data.start;
            });
            return tipText;
          },
        },
        legend: {
          data: self.title,
        },
        grid: {
          left: "9%",
          right: "5%",
          //   containLabel: true
        },
        //工具框，可以选择
        toolbox: {
          feature: {
            saveAsImage: {
              show: false, //控制保存按钮显示隐
            },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          scale: true,
        
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            interval: 2,
            // rotate:47,
            margin: 15,
        //     formatter:function(value,index){
        //     if(index == 0||index == 2||index==4||index==6||index==8||index==10){
        //         return value
        //     }
        // }
          },
          data: self.xAxisData,
        },
        yAxis: {
          type: "value",
          inverse: true,
          scale: true,
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
            },
          },
        },
        series: [
          {
            name: this.echartsName,
            type: "line",
            symbolSize: 7, //拐点圆的大小
            color: "#2d8cf0",
            symbol: "circle",
            itemStyle: {
              normal: {
                // 拐点上显示数值
                label: {
                  show: false,
                },
                lineStyle: {
                  width: 1, // 设置线宽
                  color: "#33c2a1",
                },
              },
            },

            data: self.yData,
          },
        ],
      });
    },
  },
};
</script>
<style scoped>
html {
  width: 100%;
  height: 100vh;
}
#myChart {
  margin-top: 0.3rem;
}
</style>
