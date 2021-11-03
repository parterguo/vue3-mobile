<template>
  <div>
    <van-tabbar v-model="active" @change="onChange" style="z-index: 999">
      <van-tabbar-item icon="search">TapTap</van-tabbar-item>
      <van-tabbar-item icon="friends-o" badge="5">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o" badge="20">标签</van-tabbar-item>
      <van-tabbar-item icon="point-gift">抽奖</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  props: ["actives"],
  data() {
    return {
      active: this.actives,
    };
  },
  methods: {
    onChange(index) {
      if (index == 0) {
        this.$router.push("/");
      }
       if (index == 1) {
        this.$router.push("/signin");
      }
      if (index == 3) {
        this.$router.push("/home");
      }
      console.log(index);
    },
  },
};
</script>
