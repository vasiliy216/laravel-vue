<template>
  <div class="main">
    <tool-bar />
    <main-background :username="username" :email="email" :items="items" v-on:reloadlist="$emit('reloadlist')"/>
  </div>
</template>

<script>
import ToolBar from "../common/tool-bar.vue";
import MainBackground from "../common/main-background.vue";
export default {
  props: ["items", "username", "email"],
  components: {
    ToolBar,
    MainBackground,
  },
};
</script>

<style lang="scss">
.main {
  display: flex;
  flex-flow: column;
  flex: 1 1 0px;
}
</style>