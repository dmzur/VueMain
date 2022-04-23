<template>
  <div class="form-wrapper">
    <button @click="clickShow">ADD NEW COST +</button>
    <div class="form-inputs" v-show="showForm">
        <input v-model="date" placeholder="date" />
        <input v-model="category" placeholder="category" />
        <input v-model="value" placeholder="value" />
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
  },
  methods: {
      clickShow(){
          if(this.showForm === false){
              this.showForm = true;
          }else{
              this.showForm = false;
          }
      },
    onClickSave() {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: this.value,
      };
      this.$emit("addNewPayment", data);
      console.log(data);
    },
  },
};
</script>

<style lang="sass" scoped>
    
</style>