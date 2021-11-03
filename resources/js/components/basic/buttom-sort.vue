<template>
  <a-dropdown :trigger="['click']" placement="bottomRight">
    <a-button class="button-sort" @click="(e) => e.preventDefault()">
      Сортировка <a-icon type="down" />
    </a-button>
    <a-menu slot="overlay">
      <a-menu-item
        key="0"
        @click="() => sortItemsData({ type: 'USER', items: Items })"
        ><a-icon type="user" /> по имени пользователя</a-menu-item
      >
      <a-menu-item
        key="1"
        @click="() => sortItemsData({ type: 'EMAIL', items: Items })"
        ><a-icon type="mail" /> по email</a-menu-item
      >
      <a-menu-item
        key="2"
        @click="() => sortItemsData({ type: 'STATUS', items: Items })"
        ><a-icon type="check" /> по статусу</a-menu-item
      >
      <a-menu-item
        key="3"
        disabled
        @click="() => sortItemsData({ type: 'IMPORTANT', items: Items })"
        ><a-icon type="star" /> по важности</a-menu-item
      >
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapGetters, mapActions } from "Vuex";
export default {
  computed: {
    ...mapGetters(["Items"]),
  },
  methods: {
    ...mapActions(["sortItemsData"]),
  },
};
</script>

<style lang="scss" >
.button-sort {
  font-size: 16px;
}
</style>>