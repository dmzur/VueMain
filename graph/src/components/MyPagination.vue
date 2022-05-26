<template>
  <v-container>
    <div :class="[$style.wrp]">
      <div @click="onClick(cur - 1)"><v-icon>mdi-chevron-left-box</v-icon></div>
      <div v-for="i in amount" :key="i" :class="{ [$style.active]: cur === i }" @click="onClick(i)">
        {{ i }}
      </div>
      <div @click="onClick(cur + 1)"><v-icon>mdi-chevron-right-box</v-icon></div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "MyPagination",
  props: {
    length: Number,
    n: Number,
    cur: Number,
  },
  computed: {
    amount() {
      return Math.ceil(this.length / this.n);
    },
  },
  methods: {
    onClick(p) {
      if (p < 1 || p > this.amount) {
        return;
      }
      this.$emit("changePage", p);
    },
  },
};
</script>
<style module lang="scss">
.wrp {
  display: flex;
  justify-content: center;
  margin-top: 20px;

  &>div {
    padding: 10px;

    &.active {
      background: #ccc;
    }
  }
}
</style>
