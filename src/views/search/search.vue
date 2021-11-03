<template>
  <div>
    <van-sticky >
      <Header headerType=""></Header>
      <div class="navHeader">
        <div class="navtitle">TapTap</div>
        <van-field
          v-model="dateValue"
          readonly
          name="datehour"
          style="border: none"
          input-align="right"
          type="datehour"
          placeholder="点击选择要搜索的日期"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-datetime-picker
            type="datehour"
            v-model="currentDate"
            @confirm="onConfirm"
            :min-date="minDate"
            :formatter="formatter"
            :max-date="maxDate"
            @cancel="showPicker = false"
          />
        </van-popup>
      </div>
      <div></div>
    </van-sticky>
    <div class="search">
      <div class="search-list">
        <van-sticky :offset-top="50">
          <van-tabs @click="tabClick" color="#15c5ce">
            <van-tab
              v-for="item in tabList"
              :title="item.name"
              :key="item.type"
              :name="item.type"
            >
              <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list
                  v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad"
                >
                  <div class="list">
                    <ul>
                      <li v-for="(item, index) in list" :key="index">
                        <p class="rank">{{ item.rank }}</p>
                        <div class="list-img">
                          <van-image class="list-log" :src="item.icon" />
                        </div>
                        <div class="list-text">
                          <h3>{{ item.name }}</h3>
                          <p>
                            <van-icon
                              name="star"
                              color="#15C5CE"
                              style="margin-right: 0.1rem"
                            />
                            <span>{{ item.start }}</span>
                            <van-icon
                              name="like"
                              color="#15C5CE"
                              style="margin-left: 0.2rem; margin-right: 0.2rem"
                            />
                            <span>{{ item.focusCn }}</span>
                          </p>
                        </div>
                        <div class="list-money">
                          <div class="btns" @click="details(item)">详情</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <van-empty
                    image="search"
                    description="暂无数据"
                    v-if="list.length == 0"
                  />
                </van-list>
              </van-pull-refresh>
            </van-tab>
          </van-tabs>
        </van-sticky>
      </div>
    </div>
    <Footer :actives="0"></Footer>
  </div>
</template>

<script>
import Header from "../../components/header/index.vue";
import { postTypeList, postRankList } from "../../httpClient/index";
// import Loading from "../../components/loading/index";
import Footer from "../../components/footer/index";
export default {  
  components: {
    Header,
    Footer
    // Loading,
  },
  data() {
    return {
      dateValue: "",
      minDate: new Date(2021, 5, 1, 24),
      maxDate: new Date(2022, 10, 1),
      showPicker: false,
      loadingShow: true,
      tabList: [],
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      taskType: 31,
      taskName: "",
      currentDate: new Date(), // 默认选中当天日期
    };
  },
  created() {
    var time = new Date();
    this.dateValue =
      time.getFullYear() +
      "-" +
      this.p(time.getMonth() + 1) +
      "-" +
      this.p(time.getDate()) +
      " " +
      this.p(time.getHours()) +
      ":" +
      this.p(time.getMinutes()) +
      ":" +
      this.p(time.getSeconds());
    this.getTypeList();
    this.getrankList();
  },
  methods: {
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      } else if (type === "hour") {
        return `${val}时`;
      }
      return val;
    },
    onConfirm(time) {
      time =
        time.getFullYear() +
        "-" +
        this.p(time.getMonth() + 1) +
        "-" +
        this.p(time.getDate()) +
        " " +
        this.p(time.getHours()) +
        ":" +
        "00" +
        ":" +
        "00";
      this.dateValue = time;
      this.showPicker = false;
      this.getrankList();
    },
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    async getTypeList() {
      let { data } = await postTypeList();
      if (data.code == 200) {
        this.loadingShow = false;
        this.tabList = data.data.slice(-5);
        this.tabList.forEach((item) => {
          item.name = item.name.substr(4);
        });
        this.taskName = this.tabList[0].name;
      } else {
        // Toast(msg);
      }
    },
    // tab切换
    tabClick(name, title) {
      console.log(name);
      this.taskName = title;
      this.taskType = name;

      this.getrankList();
    },
    // 字符串替换
    replacepos(text, start, stop, replacetext) {
      let mystr = "";
      mystr =
        text.substring(0, stop - 1) + replacetext + text.substring(stop + 1);
      return mystr;
    },
    // 获取列表接口
    async getrankList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      console.log(this.dateValue);
      var dateTime = "";
      dateTime = this.replacepos(this.dateValue, 14, 15, "00");
      let { data } = await postRankList(this.taskType, dateTime);
      if (data.code == 200) {
        this.$toast.loading({
          message: "加载中...",
          forbidClick: false,
        });
        this.list = data.data;
      }
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.refreshing = false;
        }

        // this.getrankList()    
        this.loading = false;


        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    // 跳转详情
    details(item) {
      console.log(item);
      this.$router.push({
        name: "details",
        query: {
          name: item.name,
          taskType: this.taskType,
          taskName: this.taskName,
        },
      });
    },
  },
};
</script>

<style>
html {
  width: 100%;
  height: 100vh;
}
* {
  margin: 0;
  padding: 0;
}
.search {
  width: 100%;
}
.list {
  margin-top: 0.3rem;
  /* height: 90vh;
  overflow: auto; */
}

.list ul {
  height: 100%;
  overflow: auto;
}
.list ul li {
  width: 100%;
  display: flex;
  align-items: center;
  height: 1rem;
  margin-bottom: 0.05rem;
}
.list-img {
  width: 0.8rem;
  height: 0.8rem;
}
.list-img img {
  width: 100%;
  height: 100%;
}
.list-log {
  width: 100%;
  height: 100%;
  border-radius: 0.1rem;
}
.list-text {
  margin-left: 0.3rem;
  max-width: 4.5rem;
  align-items: center;
  margin-top: 0.1rem;
}
.list-text h3 {
  font-size: 0.25rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 600;
  color: #333333;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.list-text p {
  width: 100%;
  font-size: 0.25rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #15c5ce;
  margin-top: 0.1rem;
}
.list-money {
  margin-left: auto;
}
.list-money p {
  font-size: 20px;
  font-family: Oswald-Regular, Oswald;
  font-weight: 400;
  color: #fd5177;
}
.list-money span {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;

  color: #fd5177;
}
.rank {
  font-size: 0.3rem;
  font-weight: 600;
  width: 0.7rem;
  text-align: center;
}
.btns {
  height: 0.4rem;
  line-height: 0.4rem;
  margin-right: 0.2rem;
  width: 1rem;
  text-align: center;
  border: solid 1px #15c5ce;
  font-size: 0.23rem;
  border-radius: 0.5rem;
  background: #ecfafb;
  color: #15c5ce;
}
.grid {
  width: 100%;
  /* height: 3.3rem;  */
  z-index: 99;
  background: #fff;
}
.navHeader {
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #ebedf0;
}
.navtitle {
  width: 2rem;
  font-size: 0.38rem;
  text-align: center;
  font-weight: 700;
  background: #fff;
  color: #15c5ce;
  height: 0.88rem;
  line-height: 0.88rem;
}
.van-cell::after {
  border-bottom: none !important;
}
.van-pull-refresh {
  height: calc(100vh - 100px) !important;
  overflow: auto !important;
}
.van-list{ 
  height: auto !important
  }
</style>