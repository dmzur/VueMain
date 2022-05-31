<template>
    <v-container>
        <v-row>
            <v-col :cols="8">
                <div class="text-h5 text-sm-h4 pb-3">My personal cost</div>
                <v-dialog v-model="dialog" widh="500">
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" color="teal" dark>ADD NEW COST <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <AddPaymentForm />
                    </v-card>
                </v-dialog>
                <PaymentsDisplay :items="currentElements" />
                <MyPagination :cur="cur" :length="getPaymentsList.length" :n="n" @changePage="changePage" />
            </v-col>
            <v-col :cols="4">
                <div class="text-h5 text-sm-h4 mt-8 text-center">Диаграмма</div>
                <BarChart />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import PaymentsDisplay from '@/components/PaymentsDisplay.vue'
import AddPaymentForm from '@/components/AddPaymentForm.vue';
import MyPagination from '@/components/MyPagination.vue';
import BarChart from '@/components/BarChart.vue';
import { mapGetters } from "vuex";

export default {
    name: "Dashboard",
    components: {
        PaymentsDisplay,
        AddPaymentForm,
        MyPagination,
        BarChart
    },
    data() {
        return {
            dialog: false,
            cur: 1,
            n: 10,
        }
    },
    methods: {
        changePage(p) {
            this.cur = p
        },
    },
    computed: {
        ...mapGetters(['getFullPaymentValue', 'getPaymentsList']),
        currentElements() {
            return this.getPaymentsList.slice(this.n * (this.cur - 1), this.n * (this.cur - 1) + this.n)
        }
    },
    mounted() {
        if (!this.$route.params?.page || isNaN(this.$route.params.page)) return
        this.cur = Number(this.$route.params.page)
    }
}
</script>