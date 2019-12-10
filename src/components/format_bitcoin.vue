<template>
    <span>
        <q-item-tile icon-left="more_vert" label>{{display(market.default)}}<span class="label fg-primary text-green">...</span></q-item-tile>
            <q-popover anchor="bottom right" self="top right">
                <q-list separator link>
                    <q-item v-for="(exchange, index) in market.exchanges" :key="exchange.key"
                        v-close-overlay @click.native="selectionChanged(index)">
                        <q-item-main>
                            <q-item-tile label>{{exchange.label}}</q-item-tile>
                        </q-item-main>
                    </q-item>
                </q-list>
            </q-popover>
        </q-btn>
    </span>
</template>

<script>
import { mapState } from "vuex"
export default {
    computed: mapState({
        market: state => state.gateway.market.info,
        info: state => state.gateway.wallet.info,
        is_ready (state) {
            console.log(this.$store.getters["gateway/isReady"])
            return this.$store.getters["gateway/isReady"]
        }
    }),
    name: "FormatBitcoin",
    props: {
        round: {
            type: Boolean,
            required: false,
            default: false
        },
        rawValue: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        display (selected) {
            if (this.market.exchanges.length == 0) return `0.0`
            let value = this.info.balance * (this.market.exchanges[selected].value / 1e9)
            value = value.toFixed(8)
            return `${value} ${this.market.exchanges[selected].symbol}`
        },
        selectionChanged(selected) {
            this.market.default = selected
        }

    }
}
</script>

<style>
</style>
