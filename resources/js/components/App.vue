<template>
  <div :class="$style.container">
    <Header />
    <Body :username="username" :email="email" :items="items" v-on:reloadlist="getList()"/>
  </div>
</template>
<script>
import Header from "./section/Header.vue";
import Body from "./section/Body.vue";

import axios from 'axios'

export default {
  components: {
    Header,
    Body
  },
  data: function() {
    return {
      items: [],
      username: null,
      email: null
    }
  },
  methods: {
    getList() {
      axios.get('api/items')
      .then( res => {
        this.items = res.data
      })
      .catch( err => {
        console.log(err)
      })
    },
    init() {
      axios.get('api/auth/init')
      .then( res => {
        console.log(res.data);
        this.username = res.data.username;
        this.email = res.data.email;
      }).catch( err => {
        console.log(err);
      })
    }
  },
  created() {
    this.getList();
    this.init();
  }
};
</script>
<style lang="scss" module>
// @import "ant-design-vue/lib/date-picker/style";

.container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0;

  display: flex;
  flex-flow: column;
  flex: 1 1 0px;

  // border: 1px solid #666666;
  // border-radius: 10px;
  // box-shadow: 0 0 7px rgba(0,0,0,0.2);
}
</style>