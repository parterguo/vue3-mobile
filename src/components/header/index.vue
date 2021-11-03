<template>
  <div>
    <!-- home头部 -->
    <div class=""  v-if="headerType=='home'">
      <div class="headers">
        <div class="headers-left">
          <img src="../../assets/images/logo.png" alt="">
        </div>
         <div class="headers-right">
           <h2>￥6.80</h2>
            <p>立即提现<van-icon name="play" /></p>
         </div>
      </div>
      <div class="header-botm"></div>
    </div>
    <!-- taptap头部 -->
    <div v-if="headerType=='tap'">
        <van-search v-model="value" placeholder="请输入搜索关键词" />
    </div>
    <!-- 其他页面头部 -->
    <div class="" v-if="headerType=='details'">
        <van-nav-bar
       :title="navTitle"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"  />
    </div>
    
  </div>
</template>
<script>
export default {
  props: ["headerType","navTitle"],
  data() {
    return {};
  },
   methods:{
     onClickLeft(){
         this.$router.go(-1);//返回上一层
     }
   }
};
</script>
<style scoped>
.headers{
  width: 100%;
  display: flex;
  height: 0.8rem;
  align-items: center;
}
.headers-left{
  width: 1.5rem;
  margin-right:auto;
  margin-left: 0.2rem;
}
.headers-left img{
  width: 100%;
  height: 100%;
}
.headers-right{
  display: flex;
  align-items: center;
  margin-right: 0.1rem;
}
.headers-right h2{
  font-size: 0.25rem;
  font-family: Oswald-Regular, Oswald;
  font-weight: 600;
  color: #FD5177;
  line-height: 0.3rem;
  margin-right: 0.15rem;
}
.headers-right p{
  font-size: 0.25rem;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #666666;
line-height: 0.2rem;
}
.header-botm{
  height: 0.01rem;
  background: #E5E5E5;
}
</style>