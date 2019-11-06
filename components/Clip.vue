<!--
 * @Author: Aaron
 * @Date: 2019-11-06 10:37:18
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-06 16:30:29
 * @Description: file content
 -->
<template>
  <el-badge :value="99" type="info" :max="99" class="clip-box">
    <ul class="clip-content" @click="showAll">
      <li class="clip-img-item">
        <img src="https://www.baidu.com/favicon.ico" alt="icon">
        <div class="clip-item-mask"></div>
      </li>
      <li class="clip-img-item">
        <img src="http://localhost:3000/icon.png" alt="icon">
        <div class="clip-item-mask"></div>
      </li>
      <li class="clip-img-item">
        <img src="http://localhost:3000/icon.png" alt="icon">
        <div class="clip-item-mask"></div>
      </li>
      <li class="clip-img-item">
        <img src="http://localhost:3000/icon.png" alt="icon">
        <div class="clip-item-mask"></div>
      </li>
      <li class="clip-img-item">
        <img src="http://localhost:3000/icon.png" alt="icon">
        <div class="clip-item-mask"></div>
      </li>
      <li class="clip-img-item">
        <img src="http://localhost:3000/icon.png" alt="icon">
        <div class="clip-item-mask"></div>
      </li>
    </ul>
    <div class="clip-footer">
      <el-input v-if="isShow" ref="input" v-model="title" autofocus maxlength="10" class="clip-input" @focus="focus" @blur="save"></el-input>
      <span v-else>{{title}}</span>
      <div>
        <el-tooltip class="item" effect="dark" content="编辑" placement="top">
          <svg class="icon" aria-hidden="true" @click="toggle">
            <use xlink:href="#icon-bianji"></use>
          </svg>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="top">
          <svg class="icon" aria-hidden="true" @click="deleteGroup">
            <use xlink:href="#icon-shanchu1"></use>
          </svg>
        </el-tooltip>
      </div>
    </div>
  </el-badge>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      title: '默认收藏'
    }
  },
  methods: {
    // 切换组名编辑
    toggle() {
      this.isShow = !this.isShow
    },
    // 获取焦点后逻辑
    focus() {
      this.$refs.input.select()
    },
    // 保存组名
    save() {
      this.isShow = false
      this.$message.success('保存成功')
    },
    // 删除组逻辑
    deleteGroup(item) {
      this.$prompt(`
        <p style="color:#E6A23C;">您将要删除这个分组内的所有内容。</p>
        <p style="color:#F56C6C;">注意：此操作成功后将无法撤消</p>
        <p>如确认删除请在下方输入该分组名称：<span style="color:#F56C6C;">【${this.title}】</span></p>
      `, '删除分组', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入要删除的分组名称',
        dangerouslyUseHTMLString: true,
        inputValidator(val) {
          if (!val) return '分组名称不能为空'
          return true
        }
      }).then(({ value }) => {
        this.$message.success('删了。。')
      })
    },
    // 查看组内所有数据
    showAll() {

    }
  }
}
</script>
<style lang="less">
.clip-box{
  .el-input__inner{
    height: 28px;
    line-height: 28px;
    background: none;
    border: none;
    color: #fff;
    padding: 0;
  }
}
</style>
<style lang="less" scoped>
.clip-box{
  width: 220px;
  height: 170px;
  margin: 20px;
  background-color: rgba(255, 255, 255, .2);
  border-radius: 4px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.clip-content{
  display: flex;
  flex: 1;
  padding: 12px 0 12px 5px;
  cursor: pointer;
  flex-wrap: wrap;
  list-style: none;
}
.clip-img-item{
  width: 58px;
  height: 50px;
  border: 1px solid #fff;
  margin: 0 6px;
  position: relative;
  img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .clip-item-mask{
    display: none;
  }
  &:hover{
    .clip-item-mask{
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background-color: rgba(0, 0, 0, .3)
    }
  }
}
.clip-footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  color: rgb(233, 153, 87);
  padding: 0 10px;
  font-size: 14px;
  border-radius: 4px;

  .clip-input{
    height: 28px;
    padding: 0;
    width: 140px;
    color: red;
  }

  .icon{
    margin-left: 10px;
    cursor: pointer;
    font-size: 16px;
    outline: none;
  }
}
</style>
