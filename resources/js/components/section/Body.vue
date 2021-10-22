<template>
  <div class="main">
    <tool-bar />
    <main-background />
  </div>
</template>

<script>
import ToolBar from "../common/tool-bar.vue";
import MainBackground from "../common/main-background.vue";
export default {
  components: {
    ToolBar,
    MainBackground,
  }
};
</script>

<style lang="scss">
.main {
  display: flex;
  flex-flow: column;
  flex: 1 1 0px;
}
</style>