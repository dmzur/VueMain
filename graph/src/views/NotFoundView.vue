<template>
  <div class="about">
    <h1>This is an NotFound page</h1>
    <router-link :to="{name: 'AddPaymentForm', params: {section: 'payment', category: 'Food', }, query: {value: 200}}">Food 200</router-link><br>
    <router-link :to="{name: 'AddPaymentForm', params: {section: 'payment', category: 'Transport', }, query: {value: 50}}">Transport 50</router-link><br>
    <router-link :to="{name: 'AddPaymentForm', params: {section: 'payment', category: 'Enterteiment', }, query: {value: 2000}}">Enterteiment 2000</router-link>
  </div>
</template>

<script>
export default {
    name: "NotFound",
}
</script>