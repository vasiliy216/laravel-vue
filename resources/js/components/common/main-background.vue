<template>
  <div class="main-background">
    <add-task :user="User" v-on:reloadlist="fetchItemsData()" />
    <div class="task-body">
      <div v-if="Filter">
        <task-item
          v-for="(item, index) in ItemsFilter"
          :key="index"
          :item="item"
          v-on:reloadlist="fetchItemsData()"
        />
      </div>
      <div v-else>
        <task-item
          v-for="(item, index) in collection"
          :key="index"
          :item="item"
          v-on:reloadlist="fetchItemsData()"
        />
      </div>
    </div>
    <div class="main-pagination">
      <pagination @current="onCurrent" :page="pagination.page" :isFilter="Filter"/>
    </div>
  </div>
</template>

<script>
import AddTask from "../basic/add-task.vue";
import TaskItem from "../basic/task-item.vue";
import Pagination from "../basic/pagination.vue";

import _ from "lodash";

import { mapGetters, mapActions } from "Vuex";

export default {
  components: {
    AddTask,
    TaskItem,
    Pagination,
  },
  data: function () {
    return {
      perPage: 6,
      pagination: {},
    };
  },
  computed: {
    ...mapGetters(["User", "Items", "ItemsFilter", "Filter"]),
    collection() {
      return this.paginate(this.Items);
    },
  },
  methods: {
    ...mapActions(["fetchUserData", "fetchItemsData"]),
    onCurrent(current = 1) {
      this.pagination = this.paginator(this.Items.length, current);
    },
    paginate(data) {
      return _.slice(
        data,
        this.pagination.startIndex,
        this.pagination.endIndex + 1
      );
    },
    paginator(totalItems, currentPage) {
      var startIndex = (currentPage - 1) * this.perPage,
        endIndex = Math.min(startIndex + this.perPage - 1, totalItems - 1);

      return {
        currentPage: currentPage,
        startIndex: startIndex,
        endIndex: endIndex,
        page: Math.ceil(totalItems / this.perPage),
      };
    },
  },
  watch: {
    //Отслеживаем изменение переменной
    Items: function () {
      this.onCurrent();
    },
  },
  created: async function () {
    this.fetchUserData();
    await this.fetchItemsData();
    this.onCurrent();
  },
};
</script>

<style lang="scss">
.main-background {
  flex-flow: column;
  display: flex;
  flex: 1 1 0px;
}
.task-body {
  overflow-x: hidden;

  display: flex;
  flex-flow: column;
  flex: 1 1 0px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.4);
    -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 50%);
    box-shadow: inset 0 0 6px rgb(0 0 0 / 50%);
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
    box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
    border-radius: 10px;
  }
}
.main-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}
</style>