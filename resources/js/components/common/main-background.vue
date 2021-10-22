<template>
  <div class="main-background">
    <add-task :user="User" v-on:reloadlist="fetchItemsData()" />
    <task-item
      v-for="(item, index) in Items"
      :key="index"
      :item="item"
      v-on:reloadlist="fetchItemsData()"
    />
    <div class="backgroundLines"></div>
  </div>
</template>

<script>
import AddTask from "../basic/add-task.vue";
import TaskItem from "../basic/task-item.vue";

import { mapGetters, mapActions } from "Vuex";

export default {
  components: {
    AddTask,
    TaskItem,
  },
  computed: {
    ...mapGetters(["User", "Items"]),
  },
  methods: {
    ...mapActions(["fetchUserData", "fetchItemsData"]),
  },
  created() {
    this.fetchUserData();
    this.fetchItemsData();
  },
};
</script>

<style lang="scss">
.main-background {
  flex-flow: column;
  display: flex;
  flex: 1 1 0px;
}
.backgroundLines {
  flex: 1;
  background: linear-gradient(
    180deg,
    white,
    white 52px,
    #e5e5e5 52px,
    #e5e5e5 52px
  );
  background-size: 100% 53px;
  box-shadow: inset 0 1px 0 0 #e5e5e5;
}
</style>