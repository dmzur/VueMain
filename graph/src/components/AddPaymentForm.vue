<template>
  <v-card class="pa-8">
    <v-text-field v-model="date" label="date" />
    <v-select v-model="category" :items="categoryList" />
    <v-text-field v-model="value" label="value" />
    <v-btn color="teal" dark @click="onClickSave">Save</v-btn>
</v-card>
</template>
<script>
export default {
  name: "AddPaymentForm",
  props: {
    values: Object
  },
  data() {
    return {
      edit: false,
      date: "",
      category: "",
      value: "",
      id: "",
    }
  },
  computed: {
    getCurrentDate() {
      const today = new Date()
      const d = today.getDate()
      const m = today.getMonth() + 1
      const y = today.getFullYear()
      return `${d}.${m}.${y}`
    },
    categoryList() {
      return this.$store.getters.getCategoryList
    }
  },
  methods: {
    onClickSave() {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: +this.value,
        id: this.id || Math.floor(Math.random() * Math.floor(Math.random() * 99999) + 1000),
      }
      if (this.edit) {
        this.$store.commit('editDataToPaymentList', data)
        this.edit = false
      } else {
        this.$store.commit('addDataToPaymentsList', data);
      }

    }
  },
  async created() {
    await this.$store.dispatch('fetchCategoryList')
  },
  mounted() {
    if (this.values?.item) {

      const { id, category, date, value } = this.values.item
      this.value = value
      this.date = date
      this.category = category
      this.id = id
      this.edit = true
      return
    }

    const { category, section } = this.$route.params
    const { value } = this.$route.query

    if (!category || !section || !value) return

    this.category = category
    this.value = value
    this.onClickSave()

  },
}
</script>