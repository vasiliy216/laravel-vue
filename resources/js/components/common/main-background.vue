<template>
  <div class="main-background">
    <add-task :username="username" :email="email" v-on:reloadlist="$emit('reloadlist')"/>
    <task-item
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      v-on:itemchanged="$emit('reloadlist')"
    />
    <div class="backgroundLines"></div>
  </div>
</template>

<script>
import AddTask from "../basic/add-task.vue";
import TaskItem from "../basic/task-item.vue";
export default {
  props: ["items", "username", "email"],
  components: {
    AddTask,
    TaskItem,
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