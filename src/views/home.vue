<template>
  
  <div class="home-container">
    <!-- 头部 -->
    <div class="home-header" >
  
      <!-- 内容区域 -->
      <div class="home-wapper">
       <activity></activity>
      </div>
    </div>
      <Footer :actives="3"></Footer>
  </div>
</template>
<script>
import activity from "../components/activity/index";
// import Loading from "../components/loading/index";
import Footer from "../components/footer/index";
// import { postMockDemo,postSwiper } from "../httpClient/index";
export default {
  components: {
    Footer,
    activity
  },

  data() {
    return {
      list: [],
      swiperList:[],
      loading: true,
      loadingShow:true,

      finished: true,
      skeletonShow: true,

      textList: [],
    };
  },
  created() {},

  mounted() {
 
  },
  methods: {


  },
};
</script>
<style scoped>
.home-swiper {
  width: 100%;
  border-radius: 0.12rem;
}
.home-wapper {
  /* margin-top: 0.1rem; */
}
.my-swipe .van-swipe-item {
}
.home-list {
  width: 100%;
  height: 4rem;
  border: solid 1px red;
}
.home-header {
  width: 100%;
  position: fixed;
  top: 0;
}
.home-list-conten {
  margin-top: 0.3rem;
}
.home-swiper {
  width: 6.72rem;
  margin: 0 auto;
}
.home-swiper img {
  width: 100%;
  height: 100%;
}
.home-nav {
  width: 6.72rem;
  margin: 0.2rem auto;
}
.home-nav img {
  width: 100%;
  height: 100%;
}
.tack-list {
  width: 6.72rem;
  margin: 0 auto;
}

.tack-list ul{
   max-height: 7rem;
   overflow: auto;
}
.tack-list ul li {
  width: 100%;
  display: flex;
  align-items: center;
}
.list-img {
  width: 1rem;
  height: 1rem;
}
.list-log {
  width: 100%;
  height: 100%;
  border-radius:0.1rem;
}
.list-text {
  margin-left: 0.3rem;
   max-width: 3rem;
  display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
}
.list-text h3 {
  font-size: 0.25rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 600;
  color: #333333;
 
}

.list-text p {
  font-size: 0.26rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.list-money{
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
color: #FD5177;
}

</style>