<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <div :class="$style.logo">ToDo</div>
      <a-input-search
        placeholder=""
        style="width: 300px"
        @search="onSearch"
      />
      <a-avatar size="large" icon="user" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onSearch(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="scss" module>
.container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0;

  .header {
    height: 80px;
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
        font-weight: 700;
        font-size: 24px;
    }
  }
}
</style>