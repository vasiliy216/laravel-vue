<template>
  <div class="tool-bar-top">
    <div class="tool-bar">
      <p class="tool-bar-title">My Day</p>
      <span class="tool-bar-date">{{ date }}</span>
    </div>
    <div class="tool-bar-right">
      <ButtonSort />
      <div class="tool-bar-sort" v-if="SortType">
        <span v-if="SortType === 'USER'">Сортировка по имери пользователя</span>
        <span v-if="SortType === 'EMAIL'">Сортировка по email</span>
        <span v-if="SortType === 'STATUS'">Сортировка по статусу</span>
        <span v-if="SortType === 'IMPORTANT'">Сортировка по важности</span>
        <a-popover placement="topRight">
          <template slot="content">
            <span>Удалить параметр порядка сортировки</span>
          </template>
          <div
            class="icon-closs"
            @click="() => sortItemsData({ type: '', items: Items })"
          >
            <a-icon type="close" />
          </div>
        </a-popover>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonSort from "../basic/buttom-sort.vue";
import { mapGetters, mapActions } from "Vuex";
export default {
  components: {
    ButtonSort,
  },
  data: () => ({
    date: new Date().toLocaleTimeString(),
  }),
  computed: {
    ...mapGetters(["SortType", "Items"]),
  },
  methods: {
    ...mapActions(["sortItemsData"]),
  },
};
</script>

<style lang="scss">
.tool-bar-top {
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  margin-bottom: 50px;
}
.tool-bar {
  &-title {
    font-size: 26px;
    font-weight: 700;
    margin: 0;
  }

  &-sort {
    display: flex;
    position: absolute;
    font-weight: 700;
    top: 60px;
    right: 0;
    text-align: center;

    align-items: center;

    .icon-closs {
      width: 20px;
      height: 20px;

      font-size: 13px;

      margin-left: 5px;
      margin-top: 2px;

      cursor: pointer;
      color: #767678;

      &:hover {
        background-color: #ededed;
      }
    }
  }
}
.icon {
  transform: rotate(90deg);
}
</style>