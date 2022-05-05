<template>
  <div class="form-wrapper">
    <button @click="clickShow">ADD NEW COST +</button>
    <div class="form-inputs" v-show="showForm">
      <input v-model="date" placeholder="date" />
      <select v-model="category" v-if="categoryList">
        <option v-for="(value, idx) in categoryList" :key="idx">{{value}}</option>
      </select>
      <input v-model.number="value" placeholder="value" />
      <button @click="onClickSave">ADD +</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPaymentForm",
  data() {
    return {
      date: "",
      category: "",
      value: "",
      showForm: false,
    };
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
    categoryList(){
      return this.$store.getters.getCategoryList
    }
  },
  methods: {
    clickShow() {
      if (this.showForm === false) {
        this.showForm = true;
      } else {
        this.showForm = false;
      }
    },
    onClickSave() {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: this.value,
      };
      this.$store.commit("addDataToPaymentsList", data);
      // this.$emit("addNewPayment", data);
      // console.log(data);
    },
  },
  async created(){
    await this.$store.dispatch('fetchCategoryList')
  },
  mounted(){
    if(this.categoryList.length){
      this.category = this.categoryList[0]
    }
  },
};
</script>

<style lang="scss" scoped>
</style>