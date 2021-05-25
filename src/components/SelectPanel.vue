<template>
  <div class="SelectPanel">
    <div class="dial-bg" :style="rotateStyle">
      <img :src="prize_img" alt="" />
    </div>
    <div class="dial-run" @click="run"></div>
    <div class="dial-mork-wrap" @touchmove.prevent.stop v-if="isrun"></div>
    <!-- 抽奖进行中，禁用页面所有操作 z-index: 99; -->
  </div>
</template>
<script>
import request from "../api/request.js";
import prizeImg from "../assets/img/dial.png";
import { mapState } from "vuex";
export default {
  name: "SelectPanel",
  data() {
    return {
      value: "a",
      bat: 25,
      prize_img: prizeImg,
      isrun: false,
      rotateAngle: 0, // 旋转角度
      config: {
        duration: 4000, // 总旋转时间 ms级
        circle: 8, // 旋转圈数
        mode: "ease-in-out", // 由快到慢 惯性效果都省了
      },
      cricleAdd: 1, // 第几次抽奖
      drawIndex: 0, // 中奖索引 转盘图片排序 指针右手开始 0-...
    };
  },
  computed: {
    ...mapState(["accoutName"]),
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
  methods: {
    async run() {
      if (this.isrun) return;
      // 可以作为弹窗等信息展示
      this.$emit("draw_fin", "start");
      this.isrun = true;
      this.rotateAngle =
        this.config.circle * 360 * this.cricleAdd -
        (22.5 + this.drawIndex * 45);
      // 圈数位置解析
      // this.config.circle * 360 * this.cricleAdd 顺时针总圈数/累积总圈数
      // 22.5 + this.drawIndex * 45 ===> (奖品位置 === this.drawIndex * 45) (指针中间位置 === 22.5)

      this.cricleAdd++;
      setTimeout(() => {
        this.$emit("draw_fin", "fin");
        this.isrun = false;
      }, this.config.duration);
    },
    getGameResult() {
      let that = this;
      let params = {
        name: that.accoutName,
        bet: that.bat,
      };
      console.log("->获取游戏结果", params);
      request
        .getGameResult(params)
        .then((res) => {
          if (res.status != 200) {
            return;
          } else {
            console.log("请求数据data", res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped lang="scss">
.SelectPanel {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: hidden;
  .dial-bg {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .dial-run {
    width: 35%;
    height: 35%;
    background: url("../assets/img/dial-center-icon.png") no-repeat;
    background-size: contain;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
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
}
</style>