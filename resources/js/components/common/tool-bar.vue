<template>
  <div class="tool-bar-top">
    <div class="tool-bar">
      <p class="tool-bar-title">My Day</p>
      <span class="tool-bar-date">{{ date }}</span>
    </div>
    <div class="tool-bar-right">
      <ButtonSort />
    </div>
  </div>
</template>

<script>
import ButtonSort from "../basic/buttom-sort.vue";
export default {
  components: {
    ButtonSort
  },
  data: () => ({
    date: new Date(),
  }),
};
</script>

<style lang="scss">
.tool-bar-top {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 50px;
}
.tool-bar {
  &-title {
    font-size: 26px;
    font-weight: 700;
    margin: 0;
  }
}
.icon {
  transform: rotate(90deg);
}
</style>