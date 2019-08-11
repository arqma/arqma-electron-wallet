<template>
<span>
    {{ value }} BTC
</span>
</template>

<script>
export default {
    name: "FormatBitcoin",
    props: {
        btcAmount: {
            required: true
        },
        amount: {
            required: true
        },
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
    computed: {
        value () {
            let value = this.btcAmount * (this.amount / 1e9)
            value = value.toFixed(8)
            return value
        }

    }
}
</script>

<style>
</style>