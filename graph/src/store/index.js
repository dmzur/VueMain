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
  setCategories(state, payload){
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
  getCategoryList: state=>state.categoryList
}

export default new Vuex.Store({
  state: {
    paymentList: [],
    categoryList: []
  },
  mutations,
  actions: {
    fetchData({commit}) {
      return new Promise((resolve)=>{
        setTimeout(()=>{
          const items = []
          for(let i=1; i<=50; i++) {
            items.push({
              date: "23.12.2022",
              category: "Sport",
              value: i,
              id: Math.floor(Math.random()* Math.floor(Math.random() * Date.now()) +50)
            })
          } resolve(items)
        },500)
      }).then(res=> {
        commit('setPaymentsListData', res)
      })
    },
    fetchCategoryList({commit}) {
      return new Promise((resolve)=> {
        setTimeout(()=>{
          resolve (['Food', 'Transport', 'Education', 'Entertainment', 'Sport'])
        },0)
      }).then(res => { commit('setCategories', res)})
    }
  },
  getters
})