<template>
  <div class="app">
    <div class="container">
      <el-main ref="test">
        <div v-for="item in chatRecords" :key="item.chatRecord">
          <DialogBox :chatBox="item" :isSmallScreen="isSmallScreen" @refresh="refreshAns"></DialogBox>
        </div>
      </el-main>
      <div class="footerDiv">
        <textarea
          placeholder="输入看看"
          class="textareaSty"
          :maxlength="maxLength"
          rows="3"
          v-model="inputText"
          @keydown.enter="commitQuestion"
        ></textarea>
        <div class="btnBox">
          {{ count }}/{{ maxLength }}
          <el-button
            type="primary"
            icon="el-icon-thumb"
            :size="isSmallScreen ? 'small' : 'medium'"
            :disabled="isBlocked"
            @click="commitQuestion"
            circle
          ></el-button>
        </div>
      </div>
      <div class="beian" v-html="beianTxt"></div>
    </div>
  </div>
</template>

<script>
import DialogBox from '@/components/DialogBox'
import { getMsgMaxLength, talkToGPT } from '@/api/gpt'
import { mapGetters, mapMutations, mapState } from 'vuex'
import { MY_MSG_TYPES, GPT_MSG_TYPES, ERROR_CHAT_RESP, BEI_AN } from '@/utils/constants'
export default {
  name: 'Gpt',
  data () {
    return {
      isSmallScreen: false,
      inputText: '',
      maxLength: 500,
      beianTxt: BEI_AN,
      isWaitingResp: false
    }
  },
  components: {
    DialogBox
  },
  computed: {
    ...mapState('gptVuex', ['chatRecords']),
    ...mapGetters('gptVuex', ['getQuestionByAnswer']),
    count () {
      return this.inputText.length
    },
    isBlocked () {
      return this.count === 0 || this.isWaitingResp
    }
  },
  async created () {
    const res = await getMsgMaxLength()
    this.maxLength = res.data
  },
  mounted () {
    // 根据页面宽度决定按钮大小
    this.isSmallScreen = window.innerWidth < 768
    if (this.chatRecords.length === 0) {
      const firstRecord = {}
      firstRecord.chatRecord = '跟我聊聊天吧！'
      firstRecord.owner = GPT_MSG_TYPES
      this.addChatRecords(firstRecord)
    }
    this.scrollToBottom()
  },
  methods: {
    ...mapMutations('gptVuex', ['addChatRecords', 'removeLastChatRecords']),
    async commitQuestion (event = {}) {
      if (event.shiftKey) { // shift + enter 换行
        return
      }
      if (event.key === 'Enter') { // 不换行
        event.preventDefault()
        if (this.isWaitingResp || this.count === 0) return
      }
      const myQuestion = {}
      myQuestion.chatRecord = this.inputText.replaceAll('\n', '<br/>')
      myQuestion.owner = MY_MSG_TYPES
      this.addChatRecords(myQuestion)

      const reqBody = {}
      reqBody.question = this.inputText.trim()
      this.inputText = ''
      this.scrollToBottom()
      // 加载中
      const loading = {}
      loading.owner = GPT_MSG_TYPES
      loading.isLoading = true
      this.addChatRecords(loading)
      this.scrollToBottom()
      let ans
      try {
        this.isWaitingResp = true
        ans = await talkToGPT(reqBody)
      } catch (error) {
        this.errorRespHandler(error)
        return
      } finally {
        this.isWaitingResp = false
      }
      // 得到回答
      const data = ans.data
      if (data.code !== 200) {
        this.errorRespHandler(ans)
        return
      }
      const gptAnswer = {}
      gptAnswer.owner = GPT_MSG_TYPES
      gptAnswer.chatRecord = data.data.replaceAll('\\n', '<br/>')
      this.removeLastChatRecords()
      this.addChatRecords(gptAnswer)
      this.scrollToBottom()
    },
    // 发送完消息后窗口自动滚动到底部
    scrollToBottom () {
      // 使用 "nextTick" 以确保 DOM 已更新
      this.$nextTick(() => {
        const chatViews = this.$el.querySelector('.el-main')
        chatViews.scrollTop = chatViews.scrollHeight // 滚动到底部
      })
    },
    errorRespHandler (errResp) {
      const errorResp = {}
      errorResp.owner = GPT_MSG_TYPES
      errorResp.isError = true
      errorResp.chatRecord = errResp.data ? errResp.data.msg : ERROR_CHAT_RESP
      this.removeLastChatRecords()
      this.addChatRecords(errorResp)
      this.scrollToBottom()
    },
    refreshAns (ansId) {
      const questionRecord = this.getQuestionByAnswer(ansId)
      if (questionRecord === '' || this.isWaitingResp) {
        return
      }
      this.inputText = questionRecord
      this.removeLastChatRecords()
      this.removeLastChatRecords()
      this.commitQuestion()
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  color: white;
  text-align: center;
  .container {
    position: fixed;
    width: 100%;
    display: flex;
    flex-direction: column;
    .el-main {
      width: 50%;
      overflow: scroll;
      overflow-x: hidden;
      border-radius: 5px;
      padding: 0 5px 0 0;
      align-self: center;
      top: 0px;
      margin-top: 10px;
      height: 55vh;
    }
    // 滚动条
    .el-main::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    .footerDiv {
      background-color: #1e1b25;
      border-radius: 5px;
      width: 50%;
      padding: 8px;
      align-self: center;
      margin: 30px 0 100px 0;
      bottom: 0px;
    }
    .textareaSty {
      width: 100%;
      color: white;
      border: none;
      outline: none;
      resize: none;
      min-height: 42px;
      max-height: 150px;
      background-color: #1e1b25;
    }
    .btnBox {
      border: 0px;
      height: 40px;
      color: #b5b5b5;
    }
    .btnBox .el-button {
      float: right;
      margin: 0px 20px 0 0;
      background: linear-gradient(-27deg, #9b3c99 0%, #8f53ea 76%);
      border: 0px;
    }
    @media (max-width: 768px) {
      .el-main{
        width: 80%;
      }
      .footerDiv{
        width: 80%;
      }
    }
  }
}
</style>
