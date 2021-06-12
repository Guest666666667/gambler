<template>
  <div class="SelectPanel">
    <div class="dial-bg" :style="rotateStyle">
      <img :src="prize_img" alt="本该有图片的。。" />
    </div>
    <div class="dial-run" :style="betStyle" @click="getGameResult"></div>
    <div class="dial-mork-wrap" @touchmove.prevent.stop v-if="isrun"></div>
    <div class="img" v-show="status">
      <span>
        <a-rate class="the-bet" v-model="value" allow-half />
        <br />
        <span class="text-1">赌注：{{ value * 20 }}</span>
        <br />
        <br />
        <span class="text-2">资产：{{ accountBalance }}</span>
        <br />
        <span class="text-1">欢迎！{{ accountName }}</span>
        <br />
        <br />
        <br />
        <span class="text-1" @click="logOut">退出</span>
      </span>
    </div>
    <!-- 抽奖进行中，禁用页面所有操作 z-index: 99; -->
  </div>
</template>
<script>
import request from "../api/request.js";
import prizeImg from "../assets/img/dial.png";
import { mapState, mapMutations } from "vuex";
export default {
  name: "SelectPanel",
  data() {
    return {
      value: "a",
      prize_img: prizeImg,
      isrun: false,
      rotateAngle: 0, // 旋转角度
      config: {
        duration: 4000, // 总旋转时间ms
        circle: 8, // 旋转圈数
        mode: "ease-in-out",
      },
      cricleAdd: 1, // 第几次抽奖
      drawIndex: 0, // 中奖索引顺时针
      betStyle: {
        position: "absolute",
        width: "10%",
        height: "10%",
        top: "0",
        left: "0",
      },
      value: 3,
    };
  },
  computed: {
    ...mapState(["accountName", "accountBalance", "status"]),
    rotateStyle() {
      const _c = this.config;
      return `
       -webkit-transition: transform ${_c.duration}ms ${_c.mode};
       transition: transform ${_c.duration}ms ${_c.mode};
       -webkit-transform: rotate(${this.rotateAngle}deg);
           transform: rotate(${this.rotateAngle}deg);`;
    },
  },
  created() {},
  mounted() {
    let that = this;
    window.onresize = function () {
      that.relocate();
    };
    that.reLocate();
    if (!that.status) {
      that.reLogin();
    }
  },
  methods: {
    ...mapMutations(["setAccoutName", "setAccoutBalance", "setStatus"]),
    //免登录验证
    reLogin() {
      let that = this;
      let params = JSON.parse(sessionStorage.getItem("accountInfo"));
      request
        .getUserInfo(params)
        .then((res) => {
          if (res.data.respCode == 200) {
            that.$message.success("免登录成功");
            that.setAccoutName(res.data.name);
            that.setAccoutBalance(res.data.accountBalance);
            that.setStatus(true);
          } else {
            that.$message.info("登录过期");
            that.returnIndex();
          }
        })
        .catch((err) => {
          console.log(err);
          that.$message.error("免登录失败");
          that.returnIndex();
        });
    },
    //获取游戏结果
    getGameResult() {
      let that = this;
      //如果还在旋转，点击无效
      if (that.isrun) return;
      that.isrun = true;
      let params = {
        name: that.accountName,
        bet: that.value * 20,
      };
      request
        .getGameResult(params)
        .then((res) => {
          if (res.data.respCode == 200) {
            that.changeIndex(res.data.result);
            that.run();
            setTimeout(() => {
              that.changeState(res.data.result, res.data.accountBalance);
            }, 4000);
          } else {
            that.$message.error("参数错误");
            that.isrun = false;
          }
        })
        .catch((err) => {
          that.$message.error("参数错误");
          that.isrun = false;
          console.log(err);
        });
    },
    //旋转轮盘
    async run() {
      let that = this;
      //旋转圈数
      that.rotateAngle =
        that.config.circle * 360 * that.cricleAdd -
        (22.5 + that.drawIndex * 45);
      //计时器
      that.cricleAdd++;
      setTimeout(() => {
        that.isrun = false;
      }, that.config.duration);
    },
    //更新游戏状态
    changeState(result, balance) {
      let that = this;
      if (result == "win") {
        that.$message.success("你赢了！");
      } else {
        that.$message.warning("你输了！");
      }
      that.setAccoutBalance(balance);
    },
    //改变旋转圈数
    changeIndex(result) {
      let that = this;
      if (result == "win") {
        that.drawIndex = Math.floor(Math.random() * 3 + 1) * 2;
        //0 2 4 6
      } else {
        that.drawIndex = Math.floor(Math.random() * 3 + 1) * 2 + 1;
        //1 3 5 7
      }
    },
    //重定位按钮
    reLocate() {
      let that = this;
      that.betStyle.width = document.body.clientWidth / 3 + "px";
      that.betStyle.height = document.body.clientWidth / 3 + "px";
      that.betStyle.top = document.body.clientWidth / 3 + "px";
      that.betStyle.left = document.body.clientWidth / 3 + "px";
    },
    //退出登录
    logOut() {
      let that = this;
      that.$message.success("退出成功");
      that.returnIndex();
    },
    //返回主页
    returnIndex() {
      let that = this;
      sessionStorage.removeItem("accountInfo");
      that.setStatus(false);
      setTimeout(() => {
        that.$router.push("/Login");
      }, 3500);
    },
  },
};
</script>
<style scoped lang="scss">
.SelectPanel {
  background: url("../assets/img/background.png");
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-y: hidden;
  .dial-bg {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .dial-run {
    background: url("../assets/img/dial-center-icon.png") no-repeat;
    background-size: contain;
    position: absolute;
    text-align: center;
    div {
      font-size: 0.3rem;
      font-weight: bold;
      color: #ff1717;
      line-height: 0.3rem;
      padding-top: 1.22rem;
      padding-bottom: 0.21rem;
    }
    p {
      font-size: 0.2rem;
      font-weight: bold;
      color: #834f36;
      line-height: 0.2rem;
    }
  }
  .img {
    color: #fff;
    .the-bet {
      font-size: 3rem;
    }
    .text-1 {
      font-size: 1rem;
    }
    .text-2 {
      font-size: 2rem;
    }
  }
}
</style>