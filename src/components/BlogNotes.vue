<template>
  <div class="app" @click="changeStatus">
    <div class="container">
      <h2 class="header titleHidden">{{ blog.title }}</h2>
      <div class="content"  v-html="blog.digest!=null?blog.digest:blog.content"> </div>
      <div class="footer">Posted on <span> {{ blog.createTime }}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blog'],
  data () {
    return {
      count: 10
    }
  },
  mounted () {
  },
  methods: {
    changeStatus () {
      this.$emit('noteClick')
    }
  }

}
</script>

<style lang="less" scoped>
.app {
  .container{
    height: 150px;
    background: #2c2635;
    opacity: 0.9;
    margin: 15px 0;
    padding: 4px 15px;
    border-radius: 8px;
    .header{
      color: #ffffff;
      margin: 8px 0 0 0;
    }
    .titleHidden {
        overflow: hidden; //多出的隐藏
        text-overflow: ellipsis; //多出部分用...代替
        display: -webkit-box; //定义为盒子模型显示
        -webkit-line-clamp: 1; //用来限制在一个块元素显示的文本的行数
        -webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
        overflow: hidden;
        text-overflow: ellipsis;
      }
    .content{
      margin: 10px 0;
      padding: 0 10px 0 0;
      color: #888890;
      overflow: hidden;//多出的隐藏
      text-overflow: ellipsis;//多出部分用...代替
      display: -webkit-box;//定义为盒子模型显示
      -webkit-line-clamp: 2;//用来限制在一个块元素显示的文本的行数
      -webkit-box-orient: vertical;//从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
      word-break: keep-all;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .footer{
      color: #d2d2da;
      font-size: large;
    }
  }
  @media (max-width: 800px){
    .container{
      height: 130px;
      .header{
        font-size: initial;
      }
      .content{
        font-size: initial;
      }
      .footer{
        font-size: small;
      }
    }
  }
}
</style>
