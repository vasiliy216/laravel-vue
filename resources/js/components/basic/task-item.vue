<template>
  <div class="task-item">
    <a-popover placement="topLeft">
      <template slot="content">
        <p>Пометить как завершенное</p>
      </template>
      <a-icon
        type="check-circle"
        class="icon-check"
        v-bind:class="{ active: item.completed, 'no-active': !item.completed }"
        v-on:click="updateCheck()"
        v-model="item.completed"
      />
    </a-popover>
    <div class="task-item-wrapper">
      <div class="task-item-name">{{ item.username }}</div>
      <div class="task-item-email">{{ item.email }}</div>
      <div class="task-item-text">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["item"],
  methods: {
    updateCheck() {
      axios
        .put("api/item/" + this.item.id, {
          item: this.item,
        })
        .then((res) => {
          if (res.status == 200) this.$emit("itemchanged");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data: () => ({
    value: true,
  }),
};
</script>

<style lang="scss">
.icon-check {
  font-size: 20px;
  opacity: 0;
  top: 11px;
  left: 6px;
  position: absolute;
}
.task-item {
  display: flex;
  align-items: center;
  position: relative;

  &-name {
    font-size: 18px;
    font-weight: 700;
  }

  &-email {
    font-size: 14px;
  }

  &-text {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 500;
  }

  &:hover {
    .no-active {
      opacity: 0.2;
    }
  }

  &-wrapper {
    flex: 1 1 0px;
    padding: 8px 12px 8px 36px;
    cursor: pointer;
  }
}
.no-active {
  opacity: 0;
}
.active {
  opacity: 1;
  color: #3e69e4;
}
</style>