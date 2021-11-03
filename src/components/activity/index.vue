<template>
  <div class='container'>
    <div class="conApp">
        <!-- 幸运大转盘背景图 -->
      <img class="banner-bj" src="../../assets/images/zp-1.jpg" alt="">
      <!--  -->
      <div class="activity">
        <img class="title-img" src="../../assets/images/xingyun.png" alt="">
        <div class="wheel">
          <img class="bj-img" src="../../assets/images/zhuanpan.png" alt="">
          <div class="wheel-pan">
            <div class="wheel-bg" :class="{freeze: freeze}" :style="`transform: rotate(${wheelDeg}deg)`">
                <div class="prize-list">
                    <div class="prize-item-wrapper" v-for="(item,index) in prizeList" :key="index">
                        <div class="prize-item" :style="`transform: rotate(${(360/ prizeList.length) * index}deg)`">
                            <div class="prize-name"></div>
                            <div class="prize-icon">
                              <span v-show="!item.icon">{{ item.name }}</span>
                              <img v-show="!item.name" :src="item.icon">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wheel-pointer" @click="onClickRotate"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script  scoped>
export default {
  name: 'index',
  data() {
    return {
      active: '',
      freeze: false,
      clickType: true,
      wheelDeg: 0,
      prizeNumber: 100,
      prizeListOrigin:[
          
       
        {
            "icon": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190521%2F21%2F1558446927-pZeMRQWdNt.jpg&refer=http%3A%2F%2Fimage.biaobaiju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1629962276&t=6a9b8f7a849dd7af1baf69515301e4b8",
            "title": "奖励奥利给一坨"
        },
         {
            "icon":"http://img.duoziwang.com/2018/18/06032028721684.jpg",
            "title": "很遗憾！您未中奖"
        },
        {
            "name": "二等奖",
            "title": "您获得二等奖"
        },
         {
            "icon":"http://img.duoziwang.com/2018/18/06032028721684.jpg",
            "title": "很遗憾！您未中奖"
        },
          {
            "name": "一等奖",
            "title": "您获得一等奖"
        },
            {
            "icon":"http://img.duoziwang.com/2018/18/06032028721684.jpg",
            "title": "很遗憾！您未中奖"
        },
         {
            "name": "10优惠券",
            "title": "您获得10优惠券"
        },
         {
            "icon":"http://img.duoziwang.com/2018/18/06032028721684.jpg",
            "title": "很遗憾！您未中奖"
        },
        {
            "name": "三等奖",
            "title": "您获得三等奖"
        },
         {
            "icon":"http://img.duoziwang.com/2018/18/06032028721684.jpg",
            "title": "很遗憾！您未中奖"
        },
     ],

    
    };
  },
  computed: {
    prizeList() {
      return this.prizeListOrigin.slice(0, this.prizeNumber)
    }
  },
  methods: {
    onClickRotate() {
      if(this.clickType){
        this.clickType =false
      }else{
        return false
      }
      const {wheelDeg, prizeList} = this;
      const random = Math.floor(Math.random() * (prizeList.length));
      console.log(random);
      this.wheelDeg = wheelDeg - wheelDeg % 360 + 10 * 360 + (360 - 360 / prizeList.length * random);
      setTimeout(() => {
        this.clickType = true
        this.$dialog.alert({
           message:prizeList[random].title
        }).then(()=>{
        })
      }, 5000);
    }
  },
  watch: {
    prizeNumber() {
      this.freeze = true
      this.wheelDeg = 0
      setTimeout(() => {
        this.freeze = false
      }, 0)
    }
  },
  created(){

  }
}
</script>

<style   scoped>
.container {
  width: 100%;
  background: #F7F7F7;
  overflow: hidden;
}
.container .conApp {
  width: 100%;
  /* height: calc(100vh - .45rem); */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
 
}
.container .conApp .banner-bj {
  display: block;
  width: 100%;
}
.container .conApp .activity {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
}
.container .conApp .activity .title-img {
  width: 5.64rem;
  height: 2.04rem;
  display: block;
  margin: 1.2rem auto 0;
}
.container .conApp .activity .wheel {
  width: 5.6rem;
  height: 5.6rem;
  display: block;
  margin: 0 auto;
  position: relative;
}
.container .conApp .activity .wheel .bj-img {
  display: block;
  width: 100%;
}
.container .conApp .activity .wheel .wheel-pan {
  position: absolute;
  width: 4.7rem;
  height: 4.7rem;
  top: 0.40rem;
  left: 0.5rem;
  overflow: hidden;
}

.wheel-pointer {
  width: 1.5rem;
  height: 1.8rem;
  border-radius: 1000px;
  background-image: url("../../assets/images/zhuanpan-row.png");
  background-size: 100% 100%;
  position: absolute;
  left: 51%;
  top: 45%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 60px;
  z-index: 8;
}

.wheel-bg {
  width: 100%;
  height: 100%;
  border-radius: 1000px;
  overflow: hidden;
  transition: transform 5s ease-in-out;
  background-image: url("../../assets/images/b-w.png");
  background-size: 100% 100%;
}

.freeze {
  transition: none;
}

.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
}

.prize-item-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2.3rem;
  height: 2.3rem;
}

.prize-item {
  width: 100%;
  height: 100%;
  transform-origin: bottom;
}

.prize-name {
  padding: 0.1rem 0;
}

.prize-icon img {
  width: .7rem;
  height: .7rem;
}
.prize-icon span {
  display: block;
  width: 0.25rem;
  margin: 0 auto;
  line-height: 0.25rem;
  font-size: 0.22rem;
  color: #02464c;
  font-weight: bold;
  text-align: center;
}


</style>
