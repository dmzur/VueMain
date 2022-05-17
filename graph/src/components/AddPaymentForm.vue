<template>
  <div class="form-wrapper">
    <input v-model="date" placeholder="date" />
    <select v-model="category" v-if="categoryList">
      <option v-for="(value, idx) in categoryList" :key="idx">{{ value }}</option>
    </select>
    <input v-model.number="value" placeholder="value" />
    <button @click="onClickSave">Save</button>
  </div>
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
        id: this.id || Math.floor(Math.random() * Math.floor(Math.random() * Date.now()) + 50),
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