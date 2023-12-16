<template>
  <div class="app">
    <div class="main">
      <el-container>
        <el-header>
          <span @click="backIndex">&lt;&lt;</span>
          <span ref="titleRef" v-html="detailBlog.title"></span>
          <span></span>
        </el-header>
        <el-main>
          <span ref="contentRef" v-html="detailBlog.content"> </span>
        </el-main>
        <el-footer ref="footerRef">
          <span>Posted: <span v-html="detailBlog.updateTime"></span> </span>
          <span>Written By: me ~</span>
        </el-footer>
        <!-- <el-header>
          <span @click="backIndex">&lt;&lt;</span>
          <span ref="titleRef"
            ><h3>
              <span style="font-size: 14px"
                ><strong
                  >iec104-protocol：打造高效的数据通信解决方案</strong
                ></span
              >
            </h3></span
          >
          <span></span>
        </el-header>
        <el-main>
          <span ref="contentRef">
              <p>&nbsp;</p>

              <h4>引言</h4>

              <p>&nbsp;</p>

              <p>
                在今天的数字化时代，高效、可靠的数据通信对于任何自动化和远程监控系统至关重要。作为一名热衷于技术创新和软件开发的程序员，我很高兴介绍我的开源项目&mdash;&mdash;<code>iec104-protocol</code>。这个项目旨在简化复杂的数据通信流程，为开发者提供一个易于使用、高效且稳定的数据交换接口。
              </p>

              <p>&nbsp;</p>

              <h4>项目概览</h4>

              <p>&nbsp;</p>

              <p>
                <strong><code>iec104-protocol</code></strong
                >是一个基于JavaScript的库，利用Node.js的<strong
                  ><code>net.Socket</code></strong
                >实例实现了一个双工流接口。它专门用于处理IEC
                60870-5-104协议的数据通信，这是一个在电力自动化领域广泛应用的国际标准。我的项目核心在于将复杂的二进制数据流转换成简洁、易于处理的格式，从而使开发者能够专注于数据的使用而不是底层通信细节。
              </p>

              <p>&nbsp;</p>

              <h4>技术亮点</h4>

              <p>&nbsp;</p>

              <ol>
                <li>
                  <p>
                    <strong>双工流接口实现</strong
                    >：项目利用Node.js的强大功能，提供了一个高效的双工流处理机制。这意味着数据的发送和接收可以同时进行，大大提升了通信效率。
                  </p>
                </li>
                <li>
                  <p>
                    <strong>海量数据处理</strong
                    >：对于大规模的电力系统，海量数据的处理和解析是一个挑战。<strong
                      ><code>iec104-protocol</code></strong
                    >通过高效的算法优化数据处理流程，确保数据传输的高速和准确。
                  </p>
                </li>
                <li>
                  <p>
                    <strong>易于集成和扩展</strong
                    >：作为一个开源项目，我特别注重其易用性和扩展性。开发者可以轻松将此库集成到他们的应用中，并根据自己的需求进行定制和扩展。
                  </p>
                </li>
              </ol>

              <p>&nbsp;</p>

              <h4>实际应用场景</h4>

              <p>&nbsp;</p>

              <p>
                从电力监控系统到智能电网管理，<strong
                  ><code>iec104-protocol</code></strong
                >都能提供可靠的数据通信支持。它的应用不仅限于电力行业，任何需要稳定的实时数据通信的场景都可以从中受益。
              </p>

              <p>&nbsp;</p>

              <h4>结语</h4>
              <p>&nbsp;</p>
              <p>
                作为这个项目的开发者，我深信技术的力量在于简化生活，提升效率。<strong
                  ><code>iec104-protocol</code></strong
                >是我对这一信念的实践，也是我作为软件开发者能力的体现。我期待看到这个项目如何帮助其他开发者和工程师解决实际问题，同时也欢迎任何形式的合作和反馈。
              </p>
              <p>&nbsp;</p>
              <p>Github 仓库：<a href="https://github.com/wukz959/iec104-protocol">wukz959/iec104-protocol (github.com)</a></p>
              <p>&nbsp;</p>
              <p>npm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;网址：<a href="https://www.npmjs.com/package/iec104-protocol">iec104-protocol - npm (npmjs.com)</a></p>
          </span>
        </el-main>
        <el-footer ref="footerRef">
          <span>Posted: <span> 2023/12/4 20:38:09 </span></span>
          <span>Written By: me ~</span>
        </el-footer> -->
      </el-container>
    </div>
  </div>
</template>

<script>
import { getLocalTime } from '@/utils/time'
export default {
  props: ['detailBlog'],
  data () {
    return {
      content: ''
    }
  },
  async mounted () {
    // 将页面滚动到顶部
    window.scrollTo(0, 0)
    // this.saveBlog()
  },
  components: {},
  methods: {
    async saveBlog () {
      const obj = {}
      obj.title = this.$refs.titleRef.innerHTML
      obj.content = this.$refs.contentRef.innerHTML
      // obj.types = 'BLOG'
      obj.types = 'OPEN_SOURCE'
      obj.createTime = getLocalTime()
      obj.updateTime = getLocalTime()
      // await blogSaveReq(obj)
    },
    backIndex () {
      this.$emit('changeView')
    }
  }
}
</script>

<style lang="less" scoped >
.app {
  color: black;
  .main {
    display: flex;
    flex-direction: column;
    padding: 3vh 18vw;
    border-radius: 2px;
    .el-container {
      border-radius: 1rem;
      background-color: rgba(255, 255, 255, 0.5);
      padding: 10px 10px;
      .el-header {
        font-weight: bold;
        font-size: large;
        border-bottom: 2px solid rgba(42, 42, 50, 0.5);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .el-header span:nth-child(odd) {
        color: #d2d2da;
        text-align: center;
      }
      .el-main {
        img {
          max-width: 100%;
        }
      }
      .el-footer {
        border-top: 2px solid rgba(42, 42, 50, 0.5);
        color: #d2d2da;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 3px 8px;
      }
    }
  }
  @media (max-width: 768px) {
    .main{
      padding: 3vh 10vw;
      .el-container{
        .el-header {
          font-size: small;
        }
        .el-footer {
          font-size: small;
        }
      }
    }
  }
  @media (max-width: 500px) {
    .main{
      padding: 3vh 4vw;
      .el-container{
        .el-header {
          font-size: small;
        }
        .el-footer {
          font-size: small;
        }
      }
    }
  }
}
</style>
