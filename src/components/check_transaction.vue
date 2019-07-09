<template>
<div class="check-transaction">
    <div class="q-pa-md">
        <div class="q-mb-lg description">
            {{ $t('strings.checkTransaction.description') }}
        </div>
        <div>
            <ArqmaField :label="$t('fieldLabels.transactionId')" :error="$v.txid.$error">
                <q-input v-model="txid"
                    :dark="theme=='dark'"
                    :placeholder="$t('placeholders.pasteTransactionId')"
                    @blur="$v.txid.$touch"
                    hide-underline
                />
            </ArqmaField>
            <ArqmaField class="q-mt-md" :label="$t('fieldLabels.address')" :error="$v.address.$error" optional>
                <q-input v-model="address"
                    :dark="theme=='dark'"
                    :placeholder="$t('placeholders.recipientWalletAddress')"
                    @blur="$v.address.$touch"
                    hide-underline
                />
            </ArqmaField>
            <ArqmaField class="q-mt-md" :label="$t('fieldLabels.message')" optional>
                <q-input v-model="message"
                    :dark="theme=='dark'"
                    :placeholder="$t('placeholders.proveOptionalMessage')"
                    hide-underline
                />
            </ArqmaField>
            <ArqmaField class="q-mt-md" :label="$t('fieldLabels.signature')" :error="$v.signature.$error">
                <q-input v-model="signature"
                    :dark="theme=='dark'"
                    :placeholder="$t('placeholders.pasteTransactionProof')"
                    hide-underline
                />
            </ArqmaField>
            <q-field class="buttons q-pt-sm">
                <q-btn color="primary" @click="check" :label="$t('buttons.check')" />
                <q-btn color="secondary" @click="clear" :label="$t('buttons.clear')" v-if="canClear"/>
            </q-field>
        </div>
        <div v-if="status.state.txid">
            <div class="q-mb-sm">
                <div class="title">{{ $t('strings.transactionID') }}</div>
                <div>{{ status.state.txid }}</div>
            </div>
            <div class="q-mb-sm">
                <div class="title">{{ $t('strings.checkTransaction.infoTitles.validTransaction') }}</div>
                <div :class="status.state.good ? 'good' : 'bad'">{{ validTransaction }}</div>
            </div>
            <div class="q-mb-sm" v-if="status.state.received != null">
                <div class="title">{{ $t('strings.checkTransaction.infoTitles.received') }}</div>
                <div><FormatArqma :amount="status.state.received" raw-value /></div>
            </div>
            <div class="q-mb-sm" v-if="status.state.in_pool != null">
                <div class="title">{{ $t('strings.checkTransaction.infoTitles.inPool') }}</div>
                <div>{{ status.state.in_pool }}</div>
            </div>
            <div class="q-mb-sm" v-if="status.state.confirmations != null">
                <div class="title">{{ $t('strings.checkTransaction.infoTitles.confirmations') }}</div>
                <div>{{ status.state.confirmations }}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from "vuex"
import { required } from "vuelidate/lib/validators"
import { address } from "src/validators/common"
import { i18n } from "plugins/i18n"
import ArqmaField from "components/arqma_field"
import FormatArqma from "components/format_arqma"

export default {
    name: "CheckTransaction",
    computed: mapState({
        theme: state => state.gateway.app.config.appearance.theme,
        status: state => state.gateway.check_transaction_status,
        canClear () {
            return this.txid !== "" || this.address !== "" || this.message !== "" || this.signature != ""
        },
        validTransaction () {
            let key = this.status.state.good ? "yes" : "no"
            return i18n.t(`strings.checkTransaction.validTransaction.${key}`)
        }
    }),
    data() {
        return {
            txid: "",
            address: "",
            message: "",
            signature: ""
        }
    },
    validations: {
        txid: { required },
        address: {
            isAddress(value) {
                    if (value === '') return true

                    return new Promise(resolve => {
                        address(value, this.$gateway)
                            .then(() => resolve(true))
                            .catch(e => resolve(false))
                    });
                }
        },
        signature: { required }
    },
    watch: {
        status: {
            handler(val, old){
                if(val.code == old.code) return
                switch(this.status.code) {
                    case -1:
                        this.$q.notify({
                            type: "negative",
                            timeout: 3000,
                            message: this.status.message
                        })
                        break;
                }
            },
            deep: true
        },
    },
    methods: {
        check() {
            this.$v.txid.$touch()
            this.$v.address.$touch()
            this.$v.signature.$touch()

            if (this.$v.txid.$error) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: this.$t("notification.errors.enterTransactionId")
                })
                return
            }

            if (this.$v.signature.$error) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: this.$t("notification.errors.enterTransactionProof")
                })
                return
            }

            if (this.$v.address.$error) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: this.$t("notification.errors.invalidAddress")
                })
                return
            }

            this.$gateway.send("wallet", "check_transaction", {
                txid: this.txid,
                signature: this.signature,
                address: this.address,
                message: this.message
            })
        },
        clear() {
            this.txid = ""
            this.address = ""
            this.message = ""
            this.signature = ""
            this.$v.$reset();
        }
    },
    components: {
        ArqmaField,
        FormatArqma
    }
}
</script>


<style lang="scss">
.check-transaction {
    .description {
        white-space: pre-line;
    }
    .buttons {
        .q-btn:not(:first-child) {
            margin-left: 8px;
        }
    }
}
</style>
