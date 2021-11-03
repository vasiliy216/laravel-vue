<template>
  <div class="header">
    <div class="logo">ToDo</div>
    <a-input-search
      placeholder="Найти текст"
      style="width: 300px"
      v-on:change="(e) => onSearch(e.target.value)"
    />
    <a-dropdown :trigger="['click']">
      <div class="avatar">
        <div class="user-name" v-if="User">
          <span>{{ User.username }}</span>
          <span>{{ User.email }}</span>
        </div>
        <a-avatar size="large" icon="user" />
      </div>
      <a-menu slot="overlay">
        <a-menu-item key="0" @click="Link()"><a-icon type="export" /> Выйти</a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "Vuex";

export default {
  computed: {
    ...mapGetters(["Items", "User"]),
  },
  methods: {
    ...mapActions(["searchItemsText", "fetchUserExit"]),
    onSearch(e) {
      if (e == "") {
        this.searchItemsText({ items: [], boolen: false });
      } else {
        const value = this.Items.filter(
          (search_text) =>
            search_text.text.toLowerCase().indexOf(e.toLowerCase()) >= 0
        );
        this.searchItemsText({ items: value, boolen: true });
      }
    },
    Link() {
      this.fetchUserExit();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
.header {
  height: 80px;
  width: 100%;
  position: relative;

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
  .user-name {
    position: absolute;
    right: 50px;
    top: 50%;

    transform: translateY(-50%);

    line-height: 16px;

    display: flex;
    flex-flow: column;

    span:nth-of-type(1) {
      font-weight: 700;
      font-size: 18px;
    }

    span:nth-of-type(2) {
      font-weight: 400;
      font-size: 14px;
    }
  }
}
</style>