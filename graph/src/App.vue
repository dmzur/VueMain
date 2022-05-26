<template>
  <v-app>
    <v-app-bar app flat>
      <v-btn plain :ripple="false" to="/dashboard">Dashboard</v-btn>
      <v-btn plain :ripple="false" to="/about">About</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
      <transition name="fade">
        <ModalWindowAddPaymentForm :settings="settings" v-if="modalShow" />
      </transition>
      <transition name="fade">
        <ContextMenu />
      </transition>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data() {
    return {
      modalShow: false,
      settings: {
      },
    }
  },
  methods: {
    goToAboutPage() {
      this.$router.push({
        name: "Dashboard",
        params: {
          page: "3"
        }
      })
    },
    onShow(data) {
      this.modalShow = true
      this.settings = data
      console.log(data)
    },
    onHide() {
      this.settings = {}
      this.modalShow = false
    },
  },
  created() {
    this.$store.dispatch('fetchData')
  },
  mounted() {
    this.$modal.EventBus.$on('show', this.onShow)
    this.$modal.EventBus.$on('hide', this.onHide)
  },
  beforeDestroy() {
    this.$modal.EventBus.$off('show', this.onShow)
    this.$modal.EventBus.$off('hide', this.onHide)
  },
  components: {
    ModalWindowAddPaymentForm: () => import('./components/ModalWindowAddPaymentForm.vue'),
    ContextMenu: () => import('./components/ContextMenu.vue'),
  },
};
</script>
