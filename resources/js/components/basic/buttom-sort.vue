<template>
  <a-dropdown :trigger="['click']">
    <a-button class="button-sort" @click="(e) => e.preventDefault()">
      Сортировка <a-icon type="down" />
    </a-button>
    <a-menu slot="overlay">
      <a-menu-item key="0"><a-icon type="user" /> по имени пользователям</a-menu-item>
      <a-menu-item key="1"><a-icon type="mail" /> по email</a-menu-item>
      <a-menu-item key="2"><a-icon type="star" /> по статусу</a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {};
</script>

<style lang="scss" >
.button-sort {
  font-size: 16px;
}
</style>>