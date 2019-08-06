<template>
<q-page>
    <template v-if="!wallets.list.length">
        <div class="q-px-md q-py-lg">
            <h2 class="q-my-sm text-weight-thin">Welcome to Arqma Wallet Atom</h2>
            <p>To get started, select one of the options below.</p>

        </div>
    </template>


    <q-list link no-border :dark="theme=='dark'">
        <template v-if="wallets.list.length">

            <q-item-main :label="$t('buttons.openWallet')" />
            <q-item v-for="(wallet, index) in wallets.list" :key="index" @click.native="openWallet(wallet)">
                <q-item-side>
                <div class="wallet-icon">
                       <svg width="48" viewBox="0 0 17 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="si-glyph si-glyph-wallet"><defs class="si-glyph-fill"></defs><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(1.000000, 0.000000)" fill="#434343"><path d="M7.988,10.635 L7.988,8.327 C7.988,7.578 8.561,6.969 9.267,6.969 L13.964,6.969 L13.964,5.531 C13.964,4.849 13.56,4.279 13.007,4.093 L13.007,4.094 L11.356,4.08 L11.336,4.022 L3.925,4.022 L3.784,4.07 L1.17,4.068 L1.165,4.047 C0.529,4.167 0.017,4.743 0.017,5.484 L0.017,13.437 C0.017,14.269 0.665,14.992 1.408,14.992 L12.622,14.992 C13.365,14.992 13.965,14.316 13.965,13.484 L13.965,12.031 L9.268,12.031 C8.562,12.031 7.988,11.384 7.988,10.635 L7.988,10.635 Z" class="si-glyph-fill"></path><path d="M14.996,8.061 L14.947,8.061 L9.989,8.061 C9.46,8.061 9.031,8.529 9.031,9.106 L9.031,9.922 C9.031,10.498 9.46,10.966 9.989,10.966 L14.947,10.966 L14.996,10.966 C15.525,10.966 15.955,10.498 15.955,9.922 L15.955,9.106 C15.955,8.528 15.525,8.061 14.996,8.061 L14.996,8.061 Z M12.031,10.016 L9.969,10.016 L9.969,9 L12.031,9 L12.031,10.016 L12.031,10.016 Z" class="si-glyph-fill"></path><path d="M3.926,4.022 L10.557,1.753 L11.337,4.022 L12.622,4.022 C12.757,4.022 12.885,4.051 13.008,4.092 L11.619,0.051 L1.049,3.572 L1.166,4.048 C1.245,4.033 1.326,4.023 1.408,4.023 L3.926,4.023 L3.926,4.022 Z" class="si-glyph-fill"></path></g></g></svg>
                </div>
                </q-item-side>
                <q-item-main>
                    <q-item-tile label>{{ wallet.name }}</q-item-tile>
                    <q-item-tile class="monospace ellipsis" sublabel>{{ wallet.address }}</q-item-tile>
                </q-item-main>
                <q-item-side>
                    <q-btn
                        color="primary" style="width:25px;"
                        size="sm" icon="file_copy"
                        @click="copyAddress(wallet.address, $event)">
                        <q-tooltip anchor="center left" self="center right" :offset="[5, 10]">
                            Copy address
                        </q-tooltip>
                    </q-btn>
                </q-item-side>

                <q-context-menu>
                    <q-list link separator style="min-width: 150px; max-height: 300px;">
                        <q-item v-close-overlay
                                @click.native="openWallet(wallet)">
                                <q-item-main :label="$t('buttons.openWallet')" />
                        </q-item>

                        <q-item v-close-overlay
                                @click.native="copyAddress(wallet.address, $event)">
                            <q-item-main label="Copy address" />
                        </q-item>

                        <q-item v-close-overlay
                                @click.native="$refs[`${index}-identicon`][0].saveIdenticon()">
                            <q-item-main label="Save identicon to file" />
                        </q-item>
                    </q-list>
                </q-context-menu>

            </q-item>
            <q-item-separator />
        </template>
        <q-item @click.native="createNewWallet()">
            <q-item-side>
                <q-icon name="add_circle_outline" size="40px" />
            </q-item-side>
            <q-item-main :label="$t('titles.wallet.createNew')" />
        </q-item>
        <q-item @click.native="restoreWallet()">
            <q-item-side>
                <q-icon name="input" size="40px" />
            </q-item-side>
            <q-item-main :label="$t('titles.wallet.restoreFromSeed')" />
        </q-item>
        <q-item @click.native="restoreViewWallet()">
            <q-item-side>
                <q-icon name="remove_red_eye" size="40px" />
            </q-item-side>
            <q-item-main :label="$t('titles.wallet.restoreViewOnly')" />
        </q-item>
        <q-item @click.native="importWallet()">
            <q-item-side>
                <q-icon name="file_copy" size="40px" />
            </q-item-side>
            <q-item-main :label="$t('titles.wallet.importFromFile')" />
        </q-item>
        <template v-if="wallets.legacy.length">
            <q-item @click.native="importLegacyWallet()">
                <q-item-side>
                    <q-icon name="file_copy" size="40px" />
                </q-item-side>
                <q-item-main label="Import wallet from legacy gui" />
            </q-item>
        </template>
    </q-list>

    <WalletLoading ref="loading" />

</q-page>
</template>

<script>
const { clipboard } = require("electron")
import { mapState } from "vuex"
import Identicon from "components/identicon"
import WalletLoading from "components/wallet_loading"
export default {
    computed: mapState({
        theme: state => state.gateway.app.config.appearance.theme,
        wallets: state => state.gateway.wallets,
        status: state => state.gateway.wallet.status
    }),
    methods: {
        openWallet(wallet) {
            if(wallet.password_protected !== false) {
                this.$q.dialog({
                title: this.$t("dialog.password.title"),
                message: this.$t("dialog.password.message"),
                    prompt: {
                        model: "",
                        type: "password"
                    },
                    ok: {
                        label: this.$t("dialog.buttons.open")
                    },
                    cancel: {
                        flat: true,
                        label: this.$t("dialog.buttons.cancel"),
                        color: this.theme=="dark"?"white":"dark"
                    }
                }).then(password => {
                    this.$refs.loading.show()
                    this.$gateway.send("wallet", "open_wallet", {name: wallet.name, password: password});
                })
                .catch(() => {
                })
            } else {
                this.$refs.loading.show()
                this.$gateway.send("wallet", "open_wallet", {name: wallet.name, password: ""});
            }
        },
        createNewWallet() {
            this.$router.replace({ path: "wallet-select/create" });
        },
        restoreWallet() {
            this.$router.replace({ path: "wallet-select/restore" });
        },
        restoreViewWallet() {
            this.$router.replace({ path: "wallet-select/import-view-only" });
        },
        importWallet() {
            this.$router.replace({ path: "wallet-select/import" });
        },
        importLegacyWallet() {
            this.$router.replace({ path: "wallet-select/import-legacy" });
        },
        copyAddress (address, event) {
            event.stopPropagation()
            for(let i = 0; i < event.path.length; i++) {
                if(event.path[i].tagName == "BUTTON") {
                    event.path[i].blur()
                    break
                }
            }
            clipboard.writeText(address)
            this.$q.notify({
                type: "positive",
                timeout: 1000,
                message: "Address copied to clipboard"
            })
        }
    },
    watch: {
        status: {
            handler(val, old){
                if(val.code == old.code) return
                switch(this.status.code) {
                    case 0: // Wallet loaded
                        this.$refs.loading.hide()
                        this.$router.replace({ path: "/wallet" });
                        break;
                    case -1: // Error
                    case -22:
                        this.$refs.loading.hide()
                        this.$q.notify({
                            type: "negative",
                            timeout: 1000,
                            message: this.status.message
                        })
                        this.$store.commit("gateway/set_wallet_data", {
                            status: {
                                code: 1 // Reset to 1 (ready for action)
                            }
                        });
                        break;
                }
            },
            deep: true
        }
    },
    components: {
        Identicon,
        WalletLoading
    }
}
</script>
<style>
</style>
