<template>
  <div class="openSource">
    <h2 class="openSide"><div>开源作品</div></h2>
    <div class="openZone">
      <div class="openTitle flexCenter">
        <div v-html="openSource.title" class="titleHidden"></div>
      </div>
      <div class="openContent" v-html="openSource.digest!=null?openSource.digest:openSource.content"></div>
      <div class="openFooter flexCenter">
        日期 - {{ openSource.updateTime }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['openSource']
}
</script>

<style lang = "less" scoped>
.openSource {
  height: 180px;
  background: #2c2635;
  display: flex;
  opacity: 0.9;
  border-radius: 2px;
  margin: 10px 0 0 0;
  .openSide {
    color: #e3c8f9;
    width: 10%;
    padding: 7px 0px;
    font-weight: lighter;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 2 0 0;
    div {
      width: 2em;
      text-align: center;
      border-right: 2px solid #36363a;
    }
  }

  .openZone {
    display: flex;
    flex-direction: column;
    color: #ffffff;
    .openTitle {
      flex: 1;
      font-size: large;
      border-bottom: 1px solid #36363a;
      padding: 0px 2px;
      .titleHidden {
        overflow: hidden; //多出的隐藏
        text-overflow: ellipsis; //多出部分用...代替
        display: -webkit-box; //定义为盒子模型显示
        -webkit-line-clamp: 1; //用来限制在一个块元素显示的文本的行数
        -webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    @media (max-width: 768px) {
      .openTitle {
        font-size: small;
      }
    }
    .openContent {
      margin: 10px 0;
      color: #888890;
      overflow: hidden; //多出的隐藏
      text-overflow: ellipsis; //多出部分用...代替
      display: -webkit-box; //定义为盒子模型显示
      -webkit-line-clamp: 2; //用来限制在一个块元素显示的文本的行数
      -webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .openFooter {
      flex: 1;
      color: #d2d2da;
      border-top: 1px solid #36363a;
    }
  }
}

@media (max-width: 800px) {
  .openSource {
    font-size: small;
    height: 140px;
    .openSide div {
      margin-right: 2px;
      font-size: medium;
    }
  }
}
.flexCenter {
  display: flex;
  align-items: center;
}
</style>
