<template>
  <a-pagination :current="current" :default-current="1" :total="currentPage()" @change="onChange" :disabled="page <= 1 || isFilter"/>
</template>
<script>
import { mapGetters } from "Vuex";

export default {
  props: {
    page: Number,
    isFilter: Boolean
  },
  data() {
    return {
      current: 1,
    };
  },
  computed: {
    ...mapGetters(["Items"]),
  },
  methods: {
    currentPage() {
      return this.page * 10;
    },
    onChange(current) {
      this.current = current;
      this.$emit('current', current);
    },
  },
};
</script>