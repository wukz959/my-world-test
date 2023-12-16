<template>
  <div class="app">
    <div class="top">
      <div class="header">
        <el-avatar v-if="chatBox.owner==='gpt'" :size="isSmallScreen?'small':'medium'" :src="personImg"></el-avatar>
        <el-avatar v-else :size="isSmallScreen?'small':'medium'" :src="gptImg"></el-avatar>
      </div>
      <div v-if="chatBox.isError" class="content"><div v-html="chatBox.chatRecord" class="errorChat"></div></div>
      <div v-else-if="chatBox.isLoading" class="content"><div class="loading"></div></div>
      <div v-else class="content" v-html="chatBox.chatRecord"></div>
    </div>
    <div class="bottom" v-if="chatBox.owner==='gpt'">
      <div>
        <i class="el-icon-thirdgood" @click="goodFun" :class="good===1?'good':'middle'"></i>
        <i class="el-icon-thirdbad" @click="badFun" :class="good===-1?'bad':'middle'"></i>
      </div>
      <div class="copyDiv">
        <i class="el-icon-thirdcopy"></i>
      </div>
      <div class="refreshDiv">
        <span class="el-icon-refresh-right"></span>
        <span class="refreshWord" @click="$emit('refresh',chatBox.id)">重新生成</span>
      </div>
    </div>
  </div>
</template>

<script>
import gptImg from '@/assets/logo.png'
import personImg from '@/assets/people.png'
export default {
  props: ['chatBox', 'isSmallScreen'],
  mounted () {
  },
  data () {
    return {
      gptImg: gptImg,
      personImg: personImg,
      good: 0
    }
  },
  methods: {
    goodFun () {
      this.good = this.good === 1 ? 0 : 1
    },
    badFun () {
      this.good = this.good === -1 ? 0 : -1
    }
  }
}
</script>

<style lang="less" scoped>
.app {
  display: flex;
  flex-direction: column;
  background-color: #1e1b25;
  border-radius: 8px;
  margin: 15px 0px;
  padding: 10px 5px;
  color: #f1f1f2;
  .top {
    display: flex;
    background-color: #1e1b25;
    .header {
      flex: 1;
      text-align: center;
      align-self: flex-start;
    }
    .content {
      flex: 10;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow-x: auto; //在内容宽度超过容器宽度时（例如一长串不换行的数字），为容器添加水平滚动条；如若没超过，则不会添加滚动条
    }
    .loading {
      flex: 10;
      display: block;
      width: 15px;
      height: 15px;
      border: 1px solid #8f53ea;
      border-top-color: transparent;
      border-radius: 100%;
      animation: circle infinite 0.75s linear;
    }
    @keyframes circle {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .errorChat {
      // width: 50%;
      display: inline-block;
      background-color: #fef0f0;
      color: #f56c6c;
      border-radius: 5px;
      padding: 2px 5px;
      word-wrap: break-word;
    }
    .el-avatar {
      background: #1e1b25;
    }
  }
  .bottom {
    display: flex;
    justify-content: flex-end;
    .copyDiv::before{
      content: '';
      height: 50%;
      display: inline-block;
      border: 0.5px solid #dbdce7;
      margin: 0px 6px;
    }
    .copyDiv::after{
      content: '';
      height: 50%;
      display: inline-block;
      border: 0.5px solid #dbdce7;
      margin: 0px 6px;
    }
    .el-icon-thirdbad{
      margin:  0 0 0 10px;
    }
    .good{
      color:#8f53ea ;
    }
    .bad{
      color: #f56c6c;
    }
    .middle{
    }
    .refreshWord{
      margin: 0 6px;
    }
  }
}
</style>
