import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const mutations = {
  setPaymentsListData(state, payload) {
    state.paymentList = payload
  },
  addDataToPaymentsList(state, payload) {
    state.paymentList.push(payload)
  },
  setCategories(state, payload) {
    state.categoryList = payload
  },
  deleteDataToPaymentList(state, payload) {
    state.paymentList = state.paymentList.filter((item) => item.id !== payload)
  },
  editDataToPaymentList(state, payload) {
    state.paymentList.forEach((el) => {
      if (el.id === payload.id) {
        el.value = payload.value
        el.category = payload.category
        el.date = payload.date
      }
    })
  },
}

const getters = {
  getPaymentsList: state => state.paymentList,
  getFullPaymentValue: state => {
    return state.paymentList.reduce((res, cur) => res + cur.value, 0)
  },
  getCategoryList: state => state.categoryList,
  getCategoryReady: state => {
    return state.paymentList.reduce((acc, elem) => acc.add(elem.category), new Set())
  },
  con: state => {
    const result = [];
    const category = [...new Set(state.paymentList.map(bill => bill.category))]
    for (let i in category){
      const filtred = state.paymentList.filter(f => f.category === category[i]);
      const total = filtred.reduce((acc, f) => acc + f.value, 0);
      result.push(total)
    }
    return result;
  },

}

export default new Vuex.Store({
  state: {
    paymentList: [],
    categoryList: [],
    categoryValue: [],
    uniqCat: []
  },
  mutations,
  actions: {
    fetchData({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const items = []
          for (let i = 1; i <= 50; i++) {
            const catArr = ['Food', 'Transport', 'Education', 'Entertainment', 'Sport']
            const rand = Math.floor(Math.random() * catArr.length)
            items.push({
              date: "23.12.2022",
              category: catArr[rand],
              value: i,
              id: Math.floor(Math.random() * Math.floor(Math.random() * 99999) + 1000)
            })
          } resolve(items)
        }, 0)
      }).then(res => {
        commit('setPaymentsListData', res)
      })
    },
    fetchCategoryList({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(['Food', 'Transport', 'Education', 'Entertainment', 'Sport'])
        }, 0)
      }).then(res => { commit('setCategories', res) })
    }
  },
  getters
})