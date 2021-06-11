<template>
  <div>
    <a-tabs class="table">
      <!-- 登录table -->
      <a-tab-pane key="1" force-render>
        <span slot="tab">登录</span>
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
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import request from "../api/request.js";
import { mapMutations } from "vuex";
export default {
  name: "LogPanel",
  data() {
    return {
      logName: "",
      logPassword: "",
    };
  },
  computed: {},
  created() {},
  methods: {
    ...mapMutations(["setAccoutName", "setAccoutBalance"]),
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
            that.$message.info("登录成功");
            that.setAccoutName(res.data.name);
            that.setAccoutBalance(res.data.accountBalance);
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
      if ((that.logName == "")) {
        that.$message.error("账户名不能为空");
        return false;
      }
      if ((that.logPassword == "")) {
        that.$message.error("密码不能为空");
        return false;
      }
      return true;
    },
  },
};
</script>
<style scoped lang="scss">
.table {
  width: 100%;
  text-align: center;
}
.inputType {
  width: 80%;
  max-width: 400px;
  margin-bottom: 1rem;
}
.special {
  width: 55%;
  max-width: 300px;
}
.smsCode {
  width: 25%;
  max-width: 100px;
}
</style>