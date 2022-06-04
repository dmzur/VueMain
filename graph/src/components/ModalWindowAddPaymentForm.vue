<template>
  <div class="wrapper">
    <div class="header">{{ settings.title }}</div>
    <div class="content">
      <component :is="settings.component" :values="settings.props"/>
     </div>
    <div class="footer">
      <v-btn @click="onCloseClick" v-on="on" color="teal" dark>Close</v-btn>
    </div>
  </div>
</template>
<script>
export default{
    name: "ModalWindowAddPaymentForm",
    props: {
      settings: Object
    },
    components: {
        AddPaymentForm: ()=>import('./AddPaymentForm.vue'),
        AuthForm: ()=>import('./AuthForm.vue')
    },
    methods: {
        onCloseClick() {
            this.$modal.hide();
        }
    },
}
</script>
<style lang="scss" scoped >
.wrapper{
    padding: 20px;
    position: relative;
    max-width: 400px;
    bottom:50%;
    left: 30%;
    background: #efefef;
}
</style>