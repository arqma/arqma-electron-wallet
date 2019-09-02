<template>
<div class="settings-exchange">
    <div class="row pl-sm">
        <ArqmaField class="col-4" :label="$t('fieldLabels.protocol')" disable>
            <q-input
                v-model="config.market.exchange.protocol"
                :placeholder="toString(market.exchange.protocol)"
                :dark="theme=='dark'"
                hide-underline
            />
        </ArqmaField>
        <ArqmaField class="col-8" :label="$t('fieldLabels.hostname')" disable>
            <q-input
                v-model="config.market.exchange.hostname"
                :placeholder="toString(market.exchange.hostname)"
                :dark="theme=='dark'"
                hide-underline
            />
        </ArqmaField>
    </div>
    <div class="row pl-sm">
        <ArqmaField class="col-10" :label="$t('fieldLabels.endpoint')" disable>
            <q-input
                v-model="config.market.exchange.endpoint"
                :placeholder="toString(market.exchange.endpoint)"
                :dark="theme=='dark'"
                hide-underline
            />
        </ArqmaField>
        <ArqmaField class="col-2" :label="$t('fieldLabels.port')" disable>
            <q-input
                v-model="config.market.exchange.port"
                :placeholder="toString(market.exchange.port)"
                :dark="theme=='dark'"
                hide-underline
            />
        </ArqmaField>
    </div>
</div>
</template>

<script>
import { mapState } from "vuex"
import ArqmaField from "components/arqma_field"
export default {
    name: "SettingsExchange",
    props: {
        randomise_remote: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: mapState({
        theme: state => state.gateway.app.config.appearance.theme,
        config: state => state.gateway.app.pending_config,
        defaults: state => state.gateway.app.defaults,
        market: state => state.gateway.market
    }),
    mounted () {
    },
    methods: {
        toString (value) {
            if (!value && typeof value !== "number") return ""
            return String(value);
        }
    },
    data () {
        return {
            select: 0,
        }
    },
    components: {
        ArqmaField,
    }
}
</script>

<style lang="scss">
.settings-general {
    .q-field {
        margin: 20px 0
    }

    .q-if-disabled {
        cursor: default !important;
        .q-input-target {
            cursor: default !important;
        }
    }

    .q-item,
    .q-collapsible-sub-item {
        padding: 0;
    }

    .row.pl-sm {
        > * + * {
            padding-left: 16px;
        }
    }

    .col.pt-sm {
        > * + * {
            padding-top: 16px;
        }
    }

    .remote-dropdown {
        padding: 0 !important;
    }
}
</style>
