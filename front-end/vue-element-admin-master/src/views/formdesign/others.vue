<template>
  <div id="others" name="others" class="fdothers">
    <div id="fdleftbar" class="see-ctrlArea noselect" style="width: 210px;">
      <div class="left-bar">
        <div class="left-bar-main" />
      </div>
      <div class="left-bar-hide-btn">
        <i class="cap cap-icon-shuzhedie-zuo" />
      </div>
    </div>
    <div class="design-area noselect">
      <div class="see-views" />
    </div>
    <div class="see-layout-right" style="width: 235px;">
      <div class="rightbar" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Others',
  data() {
    return {
      message: 'others'
    }
  }
}
</script>

<style scoped>
.fdothers {
    display: flex;
    flex: 1;
}
.noselect {
user-select: none;
}
.see-ctrlArea {
    position: relative;
    flex: 0 0 auto;
    z-index: 1;
}
.see-ctrlArea .left-bar {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    box-shadow: 6px 0 6px -6px rgb(0 0 0 / 50%);
}
.ctrlArea .left-bar-hide-btn {
    position: absolute;
    top: 10px;
    left: 100%;
    padding: 3px 0 0 2px;
    width: 20px;
    height: 24px;
    background: #fff;
    border: 1px solid #ccc;
    border-left: none;
    border-radius: 0 100px 100px 0;
    cursor: pointer;
    color: #1f85ec;
}
.see-ctrlArea .left-bar-main {
    height: calc(100% - 31px);
    background: #f4f4f4;
    overflow-y: auto;
}
.see-ctrlArea .left-bar-hide-btn .cap {
    font-size: 12px;
}
.cap-icon-shuzhedie-zuo:before {
    content: "\e675";
}
.design-area {
    flex: 1 1 auto;
    position: relative;
    background-color: #666;
    min-width: 0;
    overflow: hidden;
}
.see-views {
    position: absolute;
    width: 100%;
    height: calc(100% - 42px);
}
.see-layout-right {
    position: relative;
    flex: 0 0 auto;
}
.rightbar {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: #fff;
    box-shadow: -6px 0 6px -6px rgb(0 0 0 / 50%);
}
</style>
