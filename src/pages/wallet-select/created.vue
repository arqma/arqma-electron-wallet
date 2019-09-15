<template>
<q-page padding>

    <AddressHeader :address="info.address" :title="info.name" />

    <template v-if="secret.mnemonic">
        <template v-if="info.newly_created">
            <div class="row q-py-sm q-px-md q-mt-lg bg-amber-3 text-dark round-borders">
              {{ $t ("strings.backupSeedWord") }}
            </div>
        </template>
        <h6 class="q-mb-xs q-mt-lg">{{ $t("strings.seedWords") }}</h6>
        <div class="row">
            <div class="col" v-if="mnemonic_words_confirm.length">
                Hidden while you confirm you mnemonic seed words. Make sure to write these down!
            </div>
            <div class="col" v-else>
                {{ secret.mnemonic }}
            </div>
            <div class="q-item-side">
                <q-btn
                    v-bind:class="{ invisible: mnemonic_words_confirm.length }"
                    color="primary" style="width:25px;"
                    size="sm" icon="file_copy"
                    @click="copyPrivateKey('mnemonic', $event)">
                    <q-tooltip anchor="center left" self="center right" :offset="[5, 10]">
                        {{ $t("strings.saveSeedWarning") }}
                    </q-tooltip>
                </q-btn>
            </div>
        </div>
    </template>

    <template v-if="secret.view_key != secret.spend_key">
        <h6 class="q-mb-xs">{{ $t("strings.viewKey") }}</h6>
        <div class="row">
            <div class="col" style="word-break:break-all;">
                {{ secret.view_key }}
            </div>
            <div class="q-item-side">
                <q-btn
                    color="primary" style="width:25px;"
                    size="sm" icon="file_copy"
                    @click="copyPrivateKey('view_key', $event)">
                    <q-tooltip anchor="center left" self="center right" :offset="[5, 10]">
                      {{ $t("menuItems.copyViewKey") }}
                    </q-tooltip>
                </q-btn>
            </div>
        </div>
    </template>

    <template v-if="!/^0*$/.test(secret.spend_key)">
        <h6 class="q-mb-xs">{{ $t("strings.spendKey") }}</h6>
        <div class="row">
            <div class="col" style="word-break:break-all;">
                {{ secret.spend_key }}
            </div>
            <div class="q-item-side">
                <q-btn
                    color="primary" style="width:25px;"
                    size="sm" icon="file_copy"
                    @click="copyPrivateKey('spend_key', $event)">
                    <q-tooltip anchor="center left" self="center right" :offset="[5, 10]">
                      {{ $t("menuItems.copySpendKey") }}
                    </q-tooltip>
                </q-btn>
            </div>
        </div>
    </template>

    <div v-if="info.newly_created">
        <h6 class="q-mb-md">{{ $t("strings.confirmWords") }}</h6>
        {{ $t("strings.enter7words") }}

        <div v-bind:class="{ row: true, 'q-pa-sm': true, 'round-borders': true, 'bg-grey-4':theme=='light', 'bg-dark':theme=='dark' }" style="min-height:48px">
            <template v-for="(word, index) in mnemonic_words_confirm">
                <div class="col-auto q-px-xs">
                    <q-chip class="non-selectable" color="primary" closable @hide="removeWord(index)">{{ word }}</q-chip>
                </div>
            </template>
            <template v-if="mnemonic_words_confirm.length">
                <q-btn icon="backspace" dense flat @click="removeWord(mnemonic_words_confirm.length-1)" />
            </template>
        </div>

        <div class="row gutter-xs q-mt-md" v-if="mnemonic_words_shuffle.length">
            <template v-for="(word, index) in mnemonic_words_shuffle">
                <div class="col-auto">
                    <q-btn
                        no-caps
                        :label="word"
                        :color="mnemonic_words_confirm_i.includes(index) ? (theme=='dark'?'dark':'standard') : 'primary'"
                        :text-color="mnemonic_words_confirm_i.includes(index) ? (theme=='dark'?'white':'dark') : 'white'"
                        :disable="mnemonic_words_confirm_i.includes(index)"
                        @click="addWord(index)" />
                </div>
            </template>
        </div>
    </div>


    <q-field>
        <q-btn
            :label="$t('buttons.openWallet')"
            class="q-mt-lg"
            :color="!can_continue ? (theme=='dark'?'dark':'standard') : 'primary'"
            :text-color="!can_continue ? (theme=='dark'?'white':'dark') : 'white'"
            :disabled="!can_continue"
            @click="open" />
    </q-field>

</q-page>
</template>

<script>
const { clipboard } = require("electron")
import { mapState } from "vuex"
import AddressHeader from "components/address_header"
export default {
    computed: {
        ...mapState({
            theme: state => state.gateway.app.config.appearance.theme,
            info: state => state.gateway.wallet.info,
            secret: state => state.gateway.wallet.secret,
        }),
        can_continue() {
            return !this.info.newly_created || this.mnemonic_words_confirm.join(" ") == this.secret.mnemonic.split(" ").slice(0,7).join(" ")
        },
        mnemonic_words_confirm() {
            let mnemonic_words_confirm = []
            for(let i of this.mnemonic_words_confirm_i) {
                mnemonic_words_confirm.push(this.mnemonic_words_shuffle[i])
            }
            return mnemonic_words_confirm
        }
    },
    data() {
        return {
            mnemonic_words_confirm_i: [],
            mnemonic_words_shuffle: []
        }
    },
    mounted() {
        if(this.secret.mnemonic) {
            let words = this.secret.mnemonic.split(" ").slice(0,7)
            for(let i = words.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                const words_i = words[i]
                words[i] = words[j]
                words[j] = words_i
            }
            this.mnemonic_words_shuffle = words
        }
    },
    methods: {
        addWord(index) {
            this.mnemonic_words_confirm_i.push(index)
        },
        removeWord(index) {
            this.mnemonic_words_confirm_i.splice(index, 1)
        },
        open() {
            setTimeout(() => {
                this.$store.commit("gateway/set_wallet_data", {
                    secret: {
                        mnemonic: "",
                        spend_key: "",
                        view_key: ""
                    }
                })
            }, 500)
            this.$router.replace({ path: "/wallet" });
        },
        copyPrivateKey (type, event) {
            event.stopPropagation()
            for(let i = 0; i < event.path.length; i++) {
                if(event.path[i].tagName == "BUTTON") {
                    event.path[i].blur()
                    break
                }
            }

            if(this.secret[type] == null) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: "Error copying private key",
                })
                return
            }

            clipboard.writeText(this.secret[type])
            let type_human = type.substring(0,1).toUpperCase()+type.substring(1).replace("_"," ")

            this.$q.dialog({
                title: "Copy "+type_human,
                message: "Be careful who you send your private keys to as they control your funds.",
                ok: {
                    label: "OK"
                },
            }).then(() => {
                this.$q.notify({
                    type: "positive",
                    timeout: 1000,
                    message: type_human+" copied to clipboard"
                })
            }).catch(() => {
                this.$q.notify({
                    type: "positive",
                    timeout: 1000,
                    message: type_human+" copied to clipboard"
                })
            })
        },
    },
    components: {
        AddressHeader,
    }

}
</script>

<style>
</style>
