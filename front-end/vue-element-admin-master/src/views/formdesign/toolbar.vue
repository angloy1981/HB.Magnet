<template>
  <div id="toolbar" name="toolbar" class="fdtoolbar">
    <div class="toolbar-buttons">
      <div>{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  data() {
    return {
      message: 'toolbar'
    }
  }
}
</script>

<style scoped>
.fdtoolbar {
background-color: #524e4e;
}
.fdtoolbar .toolbar-buttons {
    line-height: 46px;
    margin: 0 20px;
    font-size: 0;
    color: aquamarine;
}
</style>
