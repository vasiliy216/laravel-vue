<template>
  <div class="add-task">
    <button class="icon-plus" @click="addItem()">
      <a-icon type="plus" />
    </button>
    <input
      class="input"
      type="text"
      v-model="item.name"
      placeholder="Добавить задачу"
      tabindex="-1"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      item: {
        name: "",
      },
    };
  },
  methods: {
    addItem() {
      if (this.item.name == "") return;

      axios
        .post("api/item/store", {
          item: this.item,
        })
        .then((res) => {
          if (res.status == 201) {
            this.item.name = "";
            this.$emit('reloadlist')
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.icon-plus {
  font-size: 20px;
  opacity: 0.5;
  position: absolute;
  background-color: transparent;
  border: none;

  cursor: pointer;

  z-index: 1;
}
.add-task {
  display: flex;
  align-items: center;
  position: relative;
  box-shadow: 0 1px 0 0px #e5e5e5;

  .input {
    width: 100%;

    padding: 16px 12px 16px 36px;
    border: none;

    background: transparent;

    &:focus {
      border-bottom: 1px solid black;
    }
  }
}
</style>