<template>
  <div :class="$style.container">
    <Header />
    <Body />
  </div>
</template>
<script>
import Header from "./section/Header.vue";
import Body from "./section/Body.vue";

export default {
  components: {
    Header,
    Body,
  }
};
</script>
<style lang="scss" module>
// @import "ant-design-vue/lib/date-picker/style";

.container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0;

  display: flex;
  flex-flow: column;
  flex: 1 1 0px;

  // border: 1px solid #666666;
  // border-radius: 10px;
  // box-shadow: 0 0 7px rgba(0,0,0,0.2);
}
</style>