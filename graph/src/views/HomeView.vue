<template>
  <div class="home">
    <header>
      <div class="title">My personal costs</div>
      <div>Total price {{ getFullPaymentValue }}</div>
    </header>
    <main>
      <AddPaymentForm />
      <PaymentsDisplay :items="currentElements" />
      <MyPagination :cur="cur" :length="12" :n="n" @changePage="changePage" />
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from "@/components/PaymentsDisplay.vue";
import AddPaymentForm from "@/components/AddPaymentForm.vue";
import MyPagination from "@/components/MyPagination.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "HomeView",
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    MyPagination,
  },
  data() {
    return {
      cur: 1,
      n: 3,
    };
  },
  computed: {
    // getFPV (){
    // return this.$store.getters.getFullPaymentValue
    // }
    ...mapGetters(["getFullPaymentValue", "getPaymentsList"]),
    currentElements() {
      return this.getPaymentsList.slice(
        this.n * (this.cur - 1),
        this.n * (this.cur - 1) + this.n
      );
    },
  },
  methods: {
    ...mapMutations({
      MyMutation: "setPaymentsListData",
    }),
    addPaymentData(data) {
      this.paymentsList.push(data);
    },
    changePage(p) {
      this.cur = p;
      this.$store.dispatch("fetchData", p);
    },
  },
  created() {
    this.$store.dispatch("fetchData", this.cur);
    // this.$store.commit('setPaymentsListData', this.fetchData())
    // this.MyMutation(this.fetchData());
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.title {
  font-size: 20px;
}
</style>
