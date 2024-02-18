<script setup>

</script>

<template>
  <!-- 一级路由出口组件 -->
  <RouterView></RouterView>
  <div class = "test">
    test scss
  </div>
  <el-button type="primary">Primary</el-button>
</template>

<style lang="scss" scoped>
.test{
  color: $priceColor;
}
</style>