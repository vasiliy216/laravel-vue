<template>
  <div class="task-item">
    <a-popover placement="topLeft" v-if="User.email === item.email || item.completed">
      <template slot="content">
        <span v-if="!item.completed">Пометить как завершенное</span>
        <span v-else>Пометить как не завершенное</span>
      </template>
      <div
        class="icon-circle"
        v-bind:class="{
          active: item.completed,
        }"
      >
        <a-icon
          type="check"
          class="icon-check"
          v-bind:class="{
            active: item.completed,
            'no-active': !item.completed,
          }"
          v-on:click="updateCheck()"
          v-model="item.completed"
        />
      </div>
    </a-popover>
    <a-icon
      type="delete"
      class="icon-delete"
      v-on:click="Delete()"
      v-model="item.completed"
      v-if="User.email === item.email"
    />
    <div class="task-item-wrapper">
      <div class="task-item-name">{{ item.username }}</div>
      <div class="task-item-email">{{ item.email }}</div>
      <div class="task-item-text">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "Vuex";

export default {
  props: {
    item: Object,
  },
  data: () => ({
    value: true,
  }),
  computed: {
    ...mapGetters(["User"]),
  },
  methods: {
    updateCheck() {
      axios
        .put("api/item/" + this.item.id, {
          item: this.item,
        })
        .then((res) => {
          if (res.status == 200) this.$emit("reloadlist");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    Delete() {
      axios
        .delete("api/item/" + this.item.id, {
          item: this.item,
        })
        .then((res) => {
          if (res.status == 200) this.$emit("reloadlist");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.icon-circle {
  top: 11px;
  left: 6px;
  position: absolute;

  width: 20px;
  height: 20px;

  border-radius: 50px;
  border: 1px solid #3e69e4;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  &:hover {
    .no-active {
      opacity: 0.5;
    }
  }
}
.icon-delete {
  font-size: 19px;
  color: #db3a29;

  opacity: 0.2;

  top: 40px;
  left: 6px;
  position: absolute;

  &:hover {
    opacity: 0.6;
  }
}
.icon-check {
  font-size: 13px;
  color: #3e69e4;
  opacity: 0;
}
.task-item {
  display: flex;
  align-items: center;
  position: relative;
  box-shadow: 0 1px 0 0px #e5e5e5;

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
    background-color: #f5f5f5;
  }

  &-wrapper {
    flex: 1 1 0px;
    padding: 8px 12px 8px 36px;
    cursor: pointer;
  }
}
.active {
  opacity: 1;
  color: white;
  background-color: #3e69e4;
}
</style>