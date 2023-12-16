<template>
  <div id="app">
    <el-container>
      <vue-danmaku
        v-model="danmus"
        style="height: 100px"
        :speeds="100"
        :channels="4"
        :loop="true"
        class="barrage"
        ref="barrageKit"
      ></vue-danmaku>
      <el-main>
        <h1>创意不止，有趣至上</h1>
        <h4>愿常青树长青，愿一切都有希望</h4>
      </el-main>
      <el-footer height="220px">
        <!-- <el-input placeholder="说你想说" class="inputBox" v-model="barrageContent">
          <el-button slot="append" class="sendBtn" @click="sendBarrage" :plain="true">发送</el-button>
        </el-input>
        <div class="barrageBox">
          <i v-if="barrageSwitch" class="el-icon-third086tanmuclose"  @click="switched"></i>
          <i v-else class="el-icon-third087tanmuopen closeSwitch"  @click="switched"></i>
        </div> -->
      </el-footer>
      <div class="beian" v-html="beianTxt"></div>
    </el-container>
  </div>
</template>

<script>
import vueDanmaku from 'vue-danmaku'
import { barrageGetReq, barrageSaveReq } from '@/api/home'
import { BEI_AN } from '@/utils/constants'
export default {
  name: 'Home',
  data () {
    return {
      danmus: [
        // 'danmu1',
        // '9pQwR2tU',
        // '随机1234',
        // '1aBc2D&3E',
        // '随机内容123',
        // '你好World',
        // '漢字測試內容',
        // '9pQw!RtU'
      ],
      barrageSwitch: true,
      barrageContent: '',
      beianTxt: BEI_AN
    }
  },
  created () {},
  async mounted () {
    this.getBarrages()
  },
  methods: {
    switched () {
      if (this.barrageSwitch) {
        this.$refs.barrageKit.hide()
        this.$refs.barrageKit.pause()
      } else {
        this.$refs.barrageKit.show()
        this.$refs.barrageKit.play()
      }
      this.barrageSwitch = !this.barrageSwitch
    },
    async getBarrages () {
      const barrageList = await barrageGetReq()
      const arr = []
      barrageList.data.forEach(item => {
        arr.push(item.barrageContent)
      })
      this.danmus = arr
    },
    async sendBarrage () {
      if (this.barrageContent === '') {
        return
      }
      if (this.barrageContent.length > 50) {
        this.$message({
          message: '发送的弹幕长度不能超过50个字符哦~',
          type: 'warning'
        })
        return
      }
      const obj = {}
      obj.barrageContent = this.barrageContent
      obj.createTime = new Date()
      await barrageSaveReq(obj)
      await this.getBarrages()
    }
  },
  components: {
    vueDanmaku
  }
}
</script>

<style lang="less" scoped>
#app {
  color: black;
  text-align: center;
  .sendBtn{
    background: linear-gradient(-27deg,#9b3c99 0%,#8f53ea 76%);
    color: white;
    border: 0px;
    outline: 1px solid #8f53ea;
  }
  .inputBox{
    width: 300px;
    margin-top: 120px;
  }
  .barrage{
    margin-top: 2px;
  }
  .barrageBox i{
    font-size: 60px;
    color: rgb(64, 158, 255);
    margin-top: 40px;
    left: 0;
    right: 0;
  }
  .barrageBox .closeSwitch{
    color: gray;
  }
}
</style>
