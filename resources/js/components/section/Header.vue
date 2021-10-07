<template>
  <div :class="$style.header">
    <div :class="$style.logo">ToDo</div>
    <a-input-search placeholder="#" style="width: 300px" @search="onSearch" />
    <div :class="$style.avatar" @click="Link()">
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
    Link() {
      this.$router.push('/register');
    }
  },
};
</script>

<style lang="scss" module>
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

  .avatar {
    display: flex;
    justify-content: flex-end;
  }

  .logo,
  .avatar {
    width: 10%;
    cursor: pointer;
  }
}
</style>