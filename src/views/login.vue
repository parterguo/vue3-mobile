<template>
  <div class="container">
 
    <div class="content">
       <div class="login-tile">登录</div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="state.username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="state.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
        </div>
  </div>
</template>
<script>
import { reactive } from "vue";
import {getaddUser} from "../httpClient/index"
export default {
  setup() {
    const state = reactive({
      username: "admin",
      password: "12345",
    });
    const datas={
            username: "admin",
            password: "12345",

    }
    
    const onSubmit = (values) => {
      this.getaddUser(values);
    };

    return {
      state,
      onSubmit,
      datas
    };
  },
  created(){
      this.getaddUser();
  },
  methods:{
      async getaddUser(){
        const {meta} = await getaddUser(this.datas);
        console.log(meta);
      }
  }
};
</script>
<style scoped>
.container {
    width: 100%;
    height: 100vh;
    background:url('https://pics7.baidu.com/feed/cf1b9d16fdfaaf5146b8a79bb4a504e8f11f7ab6.jpeg?token=42f5be3e617ae5fc23a9a2831c1bd94d')no-repeat center;
    background-size: 100%;
}
.login-tile{
  font-size: 0.4rem;
  font-weight: 600;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: "";
  margin-bottom: .3rem;
}
.content{
    width: 6rem;
    height: 4rem;
    border: solid 1px #cccc;
    border-radius: 5px;
     box-shadow: 0 0 0.3rem #f0f;;
    padding: 0.3rem ;
    position: absolute;
    top: 50%;
    left: 50%;
     transform: translate(-50%, -50%);
    margin: 0 auto;
}
</style>