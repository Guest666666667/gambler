<template>
  <div class="LogPanel">
    <img :src="prize_img" alt="本该有图片的。。" class="image"/>
        <a-input
          class="inputType"
          ref="logNameInput"
          v-model="logName"
          placeholder="请输入账户名"
        ></a-input>
        <br />
        <a-input-password
          class="inputType"
          ref="logPasswordInput"
          v-model="logPassword"
          placeholder="请输入密码"
        ></a-input-password>
        <br />
        <a-button type="primary" @click="getUserInfo()">立即登录</a-button>
  </div>
</template>
<script>
import request from "../api/request.js";
import prizeImg from "../assets/img/title.png";
import { mapMutations } from "vuex";
export default {
  name: "LogPanel",
  data() {
    return {
      prize_img: prizeImg,
      logName: "",
      logPassword: "",
    };
  },
  computed: {},
  created() {},
  methods: {
    ...mapMutations(["setAccoutName", "setAccoutBalance", "setStatus"]),
    getUserInfo() {
      let that = this;
      let params = {
        name: that.logName,
        pwd: that.logPassword,
      };
      if (!that.check()) return;
      request
        .getUserInfo(params)
        .then((res) => {
          if (res.data.respCode == 200) {
            that.$message.success("登录成功");
            that.setAccoutName(res.data.name);
            that.setAccoutBalance(res.data.accountBalance);
            that.setStatus(true);
            sessionStorage.setItem("accountInfo", JSON.stringify(params));
            console.log(sessionStorage.getItem("accountInfo"));
            that.$router.push("/main");
          } else {
            that.$message.error("登陆失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    check() {
      let that = this;
      if (that.logName == "") {
        that.$message.error("账户名不能为空");
        return false;
      }
      if (that.logPassword == "") {
        that.$message.error("密码不能为空");
        return false;
      }
      return true;
    },
  },
};
</script>
<style scoped lang="scss">
.LogPanel {
  background: url("../assets/img/background0.png");
  width: 100%;
  height: 100vh;
  .image{
    margin-bottom: 2rem;
  }
 .inputType {
      width: 80%;
      max-width: 400px;
      margin-bottom: 1rem;
    }
}
</style>