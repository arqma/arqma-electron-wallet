<template>
<q-page class="create-wallet">
    <div class="fields q-mx-md q-mt-md">
        <ArqmaField :label="$t('fieldLabels.walletName')" :error="$v.wallet.name.$error">
            <q-input
                v-model="wallet.name"
                @keyup.enter="create"
                @blur="$v.wallet.name.$touch"
                :dark="theme=='dark'"
                :placeholder="$t('placeholders.walletName')"
                hide-underline
            />
        </ArqmaField>

        <ArqmaField :label="$t('fieldLabels.seedLanguage')">
            <q-select
                v-model="wallet.language"
                :options="languageOptions"
                :dark="theme=='dark'"
                hide-underline
            />
        </ArqmaField>

        <ArqmaField :label="$t('fieldLabels.password')" optional>
            <q-input
                v-model="wallet.password"
                @keyup.enter="create"
                type="password"
                :dark="theme=='dark'"
                :placeholder="$t('placeholders.walletPassword')"
                hide-underline
            />
        </ArqmaField>

        <ArqmaField :label="$t('fieldLabels.confirmPassword')">
            <q-input
                v-model="wallet.password_confirm"
                @keyup.enter="create"
                type="password"
                :dark="theme=='dark'"
                hide-underline
            />
        </ArqmaField>
        <PasswordStrength :password="wallet.password" ref="password_strength" />

        <q-field>
            <q-btn color="primary" @click="create" :label="$t('buttons.createWallet')" />
        </q-field>

    </div>
</q-page>
</template>

<script>
import PasswordStrength from "components/password_strength"
import { required } from "vuelidate/lib/validators"
import { mapState } from "vuex"
import ArqmaField from "components/arqma_field"
export default {
    data () {
        return {
            wallet: {
                name: "",
                language: "English",
                password: "",
                password_confirm: ""
            },

            languageOptions: [

                {label: "English", value: "English"},
                {label: "Deutsch", value: "Deutsch"},
                {label: "Español", value: "Español"},
                {label: "Français", value: "Français"},
                {label: "Italiano", value: "Italiano"},
                {label: "Nederlands", value: "Nederlands"},
                {label: "Português", value: "Português"},
                {label: "Русский", value: "Русский"},
                {label: "日本語", value: "日本語"},
                {label: "简体中文 (中国)", value: "简体中文 (中国)"},
                {label: "Esperanto", value: "Esperanto"},
                {label: "Lojban", value: "Lojban"}

            ]
        }
    },
    computed: mapState({
        theme: state => state.gateway.app.config.appearance.theme,
        status: state => state.gateway.wallet.status,
    }),
    watch: {
        status: {
            handler(val, old){
                if(val.code == old.code) return
                switch(this.status.code) {
                    case 1:
                        break;
                    case 0:
                        this.$q.loading.hide()
                        this.$router.replace({ path: "/wallet-select/created" });
                        break;
                    default:
                        this.$q.loading.hide()
                        this.$q.notify({
                            type: "negative",
                            timeout: 1000,
                            message: this.status.message
                        })
                        break;
                }
            },
            deep: true
        }
    },
    validations: {
        wallet: {
            name: { required }
        }
    },
    methods: {
        create() {
            this.$v.wallet.$touch()

            if (this.$v.wallet.$error) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: this.$t("notification.errors.enterWalletName")
                })
                return
            }
            if(this.wallet.password != this.wallet.password_confirm) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: this.$t("notification.errors.passwordNoMatch")
                })
                return
            }
            this.warnEmptyPassword()
                            .then(options => {
                                if(options.length > 0 && options[0] === true) {
                                    // user selected do not show again
                                    this.$gateway.send("core", "quick_save_config", {
                                        preference: {
                                            notify_empty_password: false
                                        }
                                    })
                                }
                                this.$q.loading.show({
                                    delay: 0
                                })
                                this.$gateway.send("wallet", "create_wallet", this.wallet);
                                    }).catch(() => {
                                    })
                            },
                            cancel() {
                                this.$router.replace({ path: "/wallet-select" });
                            },
                            warnEmptyPassword: function () {
                                let message = ""
                                if(this.wallet.password == "") {
                                    message = "Using an empty password will leave your wallet unencrypted on your file system!"
                                } else if(this.$refs.password_strength.score < 3) {
                                    message = "Using an insecure password could allow attackers to brute-force your wallet! Consider using a password with better strength."
                                }
                                if(this.notify_empty_password && message != "") {
                                    return this.$q.dialog({
                                        title: "Warning",
                                        message: message,
                                        options: {
                                            type: "checkbox",
                                            model: [],
                                            items: [
                                                {label: "Do not show this message again", value: true},
                                            ]
                                        },
                                        ok: {
                                            label: "CONTINUE"
                                        },
                                        cancel: {
                                            flat: true,
                                            label: "CANCEL",
                                            color: this.theme=="dark"?"white":"dark"
                                        }
                                    })
                                } else {
                                    return new Promise((resolve, reject) => {
                                        resolve([])
                                    })
                                }
                            }
                        },

    components: {
        ArqmaField,
        PasswordStrength
    }
}
</script>

<style lang="scss">
.create-wallet {
    .fields {
        > * {
            margin-bottom: 16px;
        }
    }
}
</style>
