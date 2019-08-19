<template>
<q-page padding>

    <AddressHeader :address="info.address" :title="info.name" />

    <div class="row">

        <div class="infoBoxBalance">
            <div class="infoBox">
                <div class="infoBoxContent">
                    <q-item-tile label>{{ $t("strings.arqmaBalance") }}</q-item-tile>
                    <div class="value"><span><FormatArqma :amount="info.balance" /></span></div>
                </div>
            </div>
        </div>
        <div class="infoBoxBalance">
            <div class="infoBox">
                <div class="infoBoxContent">
                    <q-item-tile label>{{ $t("strings.arqmaBalance") }}</q-item-tile>
                    <div class="value"><span><FormatBitcoin :amount="info.balance" :btcAmount="market.arq.btc" /></span></div>
                </div>
            </div>
        </div>
        <div>
            <div class="infoBox">
                <div class="infoBoxContent">
                    <q-item-tile label>{{ $t("strings.arqmaUnlockedBalance") }}</q-item-tile>
                    <div class="value"><span><FormatArqma :amount="info.unlocked_balance" /></span></div>
                </div>
            </div>
        </div>
        <div class="col text-right q-mr-sm">
            <div class="infoBox">
            <q-item-tile icon-right="more_vert" label>{{ $t("placeholders.operations") }}</q-item-tile>
                <q-btn>{{ $t("placeholders.walletOperations") }}:
                    <q-popover anchor="bottom right" self="top right">
                        <q-list separator link>
                            <q-item :disabled="!is_ready"
                                    v-close-overlay @click.native="showModal('change_password')">
                                <q-item-main>
                                    <q-item-tile label>{{ $t("menuItems.changePassword") }}</q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item :disabled="!is_ready"
                                    v-close-overlay @click.native="deleteWallet()">
                                <q-item-main>
                                    <q-item-tile label>{{ $t("menuItems.deleteWallet") }}</q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item :disabled="!is_ready"
                                    v-close-overlay @click.native="showModal('export_wallet')">
                                <q-item-main>
                                    <q-item-tile label>{{ $t("menuItems.exportWallet") }}</q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item :disabled="!is_ready"
                                    v-close-overlay @click.native="showModal('key_image')">
                                <q-item-main>
                                    <q-item-tile label>{{ $t("menuItems.manageKeyImages") }}</q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item :disabled="!is_ready"
                                    v-close-overlay @click.native="showModal('rescan')">
                                <q-item-main>
                                    <q-item-tile label>{{ $t("menuItems.rescanWallet") }}</q-item-tile>
                                </q-item-main>
                            </q-item>
                            <q-item :disabled="!is_ready"
                                    v-close-overlay @click.native="getPrivateKeys()">
                                <q-item-main>
                                    <q-item-tile label>{{ $t("menuItems.showPrivateKeys") }}</q-item-tile>
                                </q-item-main>
                            </q-item>
                        </q-list>
                    </q-popover>
                </q-btn>
            </div>
        </div>

    </div>

    <h6 class="q-my-none">{{ $t("strings.recentTransactionsWithAddress") }}:</h6>

    <div style="margin: 0 -16px;">
        <TxList :limit="5" />
    </div>

    <q-modal minimized v-model="modals.private_keys.visible" @hide="closePrivateKeys()">
        <div class="modal-header">{{ $t("menuItems.showPrivateKeys") }}</div>
        <div class="q-ma-lg">

            <template v-if="secret.mnemonic">
                <h6 class="q-mb-xs q-mt-lg">{{ $t("strings.seedWords") }}</h6>
                <div class="row">
                    <div class="col">
                        {{ secret.mnemonic }}
                    </div>
                    <div class="col-auto">
                        <q-btn
                            color="primary" style="width:25px;"
                            size="sm" icon="file_copy"
                            @click="copyPrivateKey('mnemonic', $event)">
                            <q-tooltip anchor="center left" self="center right" :offset="[5, 10]">
                                {{ $t("menuItems.copySeedWords") }}
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
                    <div class="col-auto">
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
                    <div class="col-auto">
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

            <div class="q-mt-lg">
                <q-btn
                    color="primary"
                    @click="hideModal('private_keys')"
                    :label="$t('buttons.close')"
                    />
            </div>
        </div>
    </q-modal>


    <q-modal minimized v-model="modals.rescan.visible">
        <div class="modal-header">{{ $t("menuItems.rescanWallet") }}</div>
        <div class="q-ma-lg">
            <p>{{ $t("strings.rescanModalDescription") }}</p>

            <div class="q-mt-lg">
                <q-radio v-model="modals.rescan.type" val="full" :label="$t('fieldLabels.rescanFullBlockchain')" />
            </div>
            <div class="q-mt-sm">
                <q-radio v-model="modals.rescan.type" val="spent" :label="$t('fieldLabels.rescanSpentOutputs')" />
            </div>

            <div class="q-mt-xl text-right">
                <q-btn
                    flat class="q-mr-sm"
                    @click="hideModal('rescan')"
                    :label="$t('buttons.close')"
                    />
                <q-btn
                    color="primary"
                    @click="rescanWallet()"
                    :label="$t('buttons.rescan')"
                    />
            </div>
        </div>
    </q-modal>

    <q-modal minimized v-model="modals.key_image.visible">
        <div class="modal-header">{{modals.key_image.type}} key images</div>
        <div class="q-ma-lg">
            <div class="row q-mb-md">
                <div class="q-mr-xl">
                    <q-radio v-model="modals.key_image.type" val="Export" :label="$t('buttons.export')" />
                </div>
                <div>
                    <q-radio v-model="modals.key_image.type" val="Import" :label="$t('buttons.import')" />
                </div>
            </div>

            <template v-if="modals.key_image.type == 'Export'">
                <q-field style="width:450px">
                    <div class="row gutter-sm">
                        <div class="col-9">
                            <q-input v-model="modals.key_image.export_path" stack-label="Key image export directory" disable />
                            <input type="file" webkitdirectory directory id="keyImageExportPath" v-on:change="setKeyImageExportPath" ref="keyImageExportSelect" hidden />
                        </div>
                        <div class="col-3">
                            <q-btn class="float-right" v-on:click="selectKeyImageExportPath">{{ $t("buttons.browse") }}</q-btn>
                        </div>
                    </div>
                </q-field>
            </template>
            <template v-if="modals.key_image.type == 'Import'">
                <q-field style="width:450px">
                    <div class="row gutter-sm">
                        <div class="col-9">
                            <q-input v-model="modals.key_image.import_path" stack-label="Key image import file" disable />
                            <input type="file" id="keyImageImportPath" v-on:change="setKeyImageImportPath" ref="keyImageImportSelect" hidden />
                        </div>
                        <div class="col-3">
                            <q-btn class="float-right" v-on:click="selectKeyImageImportPath">{{ $t("buttons.browse") }}</q-btn>
                        </div>
                    </div>
                </q-field>
            </template>

            <div class="q-mt-xl text-right">
                <q-btn
                    flat class="q-mr-sm"
                    @click="hideModal('key_image')"
                    :label="$t('buttons.close')"
                    />
                <q-btn
                    color="primary"
                    @click="doKeyImages()"
                    :label="$t('buttons.export')"
                    />
            </div>
        </div>
    </q-modal>

    <q-modal minimized v-model="modals.change_password.visible" @hide="clearChangePassword()">
        <div class="modal-header">{{ $t("menuItems.changePassword") }}</div>
        <div class="q-ma-lg">
            <q-field>
                <q-input v-model="modals.change_password.old_password" type="password" :float-label="$t('fieldLabels.oldPassword')" :dark="theme=='dark'" />
            </q-field>

            <q-field>
                <q-input v-model="modals.change_password.new_password" type="password" :float-label="$t('fieldLabels.newPassword')" :dark="theme=='dark'" />
            </q-field>

            <q-field>
                <q-input v-model="modals.change_password.new_password_confirm" type="password" :float-label="$t('fieldLabels.confirmNewPassword')" :dark="theme=='dark'" />
            </q-field>

            <div class="q-mt-xl text-right">
                <q-btn
                    flat class="q-mr-sm"
                    @click="hideModal('change_password')"
                    :label="$t('buttons.close')"
                    />
                <q-btn
                    color="primary"
                    @click="doChangePassword()"
                    :label="$t('buttons.change')"
                    />
            </div>
        </div>
    </q-modal>

    <q-modal minimized v-model="modals.export_wallet.visible">
        <div class="modal-header">{{ $t("menuItems.exportWallet") }}</div>
        <div class="q-ma-lg">
            <q-field style="width:450px">
                <div class="row gutter-sm">
                    <div class="col-9">
                        <q-input v-model="modals.export_wallet.export_path" stack-label="wallet export directory" disable />
                        <input type="file" webkitdirectory directory id="walletExportPath" v-on:change="setWalletExportPath" ref="walletExportSelect" hidden />
                    </div>
                    <div class="col-3">
                        <q-btn class="float-right" v-on:click="selectWalletExportPath">{{ $t("buttons.browse") }}</q-btn>
                    </div>
                </div>
            </q-field>
            <div class="q-mt-xl text-right">
                <q-btn
                    flat class="q-mr-sm"
                    @click="hideModal('export_wallet')"
                    :label="$t('buttons.close')"
                    />
                <q-btn
                    color="primary"
                    @click="doExportWallet()"
                    :label="$t('buttons.export')"
                    />
            </div>
        </div>
    </q-modal>

</q-page>
</template>

<script>
const { clipboard } = require("electron")
import { mapState } from "vuex"
import AddressHeader from "components/address_header"
import FormatArqma from "components/format_arqma"
import FormatBitcoin from "components/format_bitcoin"
import TxList from "components/tx_list"
export default {
    computed: mapState({
        theme: state => state.gateway.app.config.appearance.theme,
        market: state => state.gateway.market.info,
        info: state => state.gateway.wallet.info,
        secret: state => state.gateway.wallet.secret,
        data_dir: state => state.gateway.app.config.app.data_dir,
        is_ready (state) {
            return this.$store.getters["gateway/isReady"]
        },
        tx_list: state => state.gateway.wallet.transactions.tx_list
    }),
    data () {
        return {
            modals: {
                private_keys: {
                    visible: false,
                },
                rescan: {
                    visible: false,
                    type: "full",
                },
                key_image: {
                    visible: false,
                    type: "Export",
                    export_path: "",
                    import_path: "",
                },
                change_password: {
                    visible: false,
                    old_password: "",
                    new_password: "",
                    new_password_confirm: "",
                },
                export_wallet: {
                    export_path: "",
                    visible: false,
                },
            }
        }
    },
    mounted() {
        const path = require("path")
        this.modals.key_image.export_path = path.join(this.data_dir, "gui")
        this.modals.key_image.import_path = path.join(this.data_dir, "gui", "key_image_export")
        this.modals.export_wallet.export_path = path.join(this.data_dir, "exports")
    },
    watch: {
        secret: {
            handler(val, old) {
                if(val.view_key == old.view_key) return
                switch(this.secret.view_key) {
                    case "":
                        break
                    case -1:
                        this.$q.notify({
                            type: "negative",
                            timeout: 1000,
                            message: this.secret.mnemonic
                        })
                        this.$store.commit("gateway/set_wallet_data", {
                            secret: {
                                mnemonic: "",
                                spend_key: "",
                                view_key: ""
                            }
                        })
                        break
                    default:
                        this.showModal("private_keys")
                        break
                }
            },
            deep: true
        }
    },
    methods: {
        showModal (which) {
            if(!this.is_ready) return
            this.modals[which].visible = true
        },
        hideModal (which) {
            this.modals[which].visible = false
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
        getPrivateKeys () {
            if(!this.is_ready) return
            this.$q.dialog({
                title: this.$t('dialog.showPrivateKeys.title'),
                message: this.$t('dialog.showPrivateKeys.message'),
                prompt: {
                    model: "",
                    type: "password"
                },
                ok: {
                    label: this.$t('dialog.showPrivateKeys.ok')
                },
                cancel: {
                    flat: true,
                    label: this.$t('dialog.buttons.cancel'),
                    color: this.theme=="dark"?"white":"dark"
                }
            }).then(password => {
                this.$gateway.send("wallet", "get_private_keys", {password})
            }).catch(() => {
            })
        },
        closePrivateKeys () {
            this.hideModal("private_keys")
            setTimeout(() => {
                this.$store.commit("gateway/set_wallet_data", {
                    secret: {
                        mnemonic: "",
                        spend_key: "",
                        view_key: ""
                    }
                })
            }, 500)
        },
        rescanWallet () {
            this.hideModal("rescan")
            if(this.modals.rescan.type == "full") {
                this.$q.dialog({
                    title: "Rescan wallet",
                    message: "Warning: Some information about previous transactions\nsuch as the recipient's address will be lost.",
                    ok: {
                        label: "RESCAN"
                    },
                    cancel: {
                        flat: true,
                        label: "CANCEL",
                        color: this.theme=="dark"?"white":"dark"
                    }
                }).then(password => {
                    this.$gateway.send("wallet", "rescan_blockchain")
                }).catch(() => {
                })
            } else {
                this.$gateway.send("wallet", "rescan_spent")
            }
        },
        selectKeyImageExportPath () {
            this.$refs.keyImageExportSelect.click()
        },
        setKeyImageExportPath (file) {
            this.modals.key_image.export_path = file.target.files[0].path
        },
        selectKeyImageImportPath () {
            this.$refs.keyImageImportSelect.click()
        },
        setKeyImageImportPath (file) {
            this.modals.key_image.import_path = file.target.files[0].path
        },
        doKeyImages () {
            this.hideModal("key_image")

            this.$q.dialog({
                title: this.modals.key_image.type + " key images",
                message: "Enter wallet password to continue.",
                prompt: {
                    model: "",
                    type: "password"
                },
                ok: {
                    label: this.modals.key_image.type
                },
                cancel: {
                    flat: true,
                    label: "CANCEL",
                    color: this.theme=="dark"?"white":"dark"
                }
            }).then(password => {
                if(this.modals.key_image.type == "Export")
                    this.$gateway.send("wallet", "export_key_images", {password: password, path: this.modals.key_image.export_path})
                else if(this.modals.key_image.type == "Import")
                    this.$gateway.send("wallet", "import_key_images", {password: password, path: this.modals.key_image.import_path})
            }).catch(() => {
            })

        },
        doChangePassword () {

            let old_password = this.modals.change_password.old_password
            let new_password = this.modals.change_password.new_password
            let new_password_confirm = this.modals.change_password.new_password_confirm

            if(new_password == old_password) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: "New password must be different"
                })
            } else if(new_password != new_password_confirm) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: "New passwords do not match"
                })
            } else {
                this.hideModal("change_password")
                this.$gateway.send("wallet", "change_wallet_password", {old_password, new_password})
            }

        },
        clearChangePassword () {
            this.modals.change_password.old_password = ""
            this.modals.change_password.new_password = ""
            this.modals.change_password.new_password_confirm = ""
        },
        deleteWallet () {
            this.$q.dialog({
                title: this.$t('dialog.deleteWallet.title'),
                message: this.$t('dialog.deleteWallet.message'),
                ok: {
                    label: this.$t('dialog.deleteWallet.ok'),
                    color: "red"
                },
                cancel: {
                    flat: true,
                    label: this.$t('dialog.buttons.cancel'),
                    color: this.theme=="dark"?"white":"dark"
                }
            }).then(() => {
                this.$q.dialog({
                    title: "Delete wallet",
                    message: "Enter wallet password to continue.",
                    prompt: {
                        model: "",
                        type: "password"
                    },
                    ok: {
                        label: "DELETE",
                        color: "red"
                    },
                    cancel: {
                        flat: true,
                        label: "CANCEL",
                        color: this.theme=="dark"?"white":"dark"
                    }
                }).then(password => {
                    this.$gateway.send("wallet", "delete_wallet", {password})
                }).catch(() => {
                })
            }).catch(() => {
            })
        },
        doExportWallet () {
            this.hideModal("export_wallet")
            //console.log(this.tx_list)
            //this.$gateway.send("wallet", "export_wallet", this.tx_list)
        },
        selectWalletExportPath () {
            this.$refs.walletExportSelect.click()
        },
        setWalletExportPath (file) {
            if (file.target.files)
                this.modals.export_wallet.export_path = file.target.files[0].path
        }
    },
    components: {
        FormatArqma,
        FormatBitcoin,
        AddressHeader,
        TxList
    },
}
</script>

<style lang="scss">
.infoBoxBalance {
    width: 290px;
}
@media screen and (max-width: 750px) {
    .infoBoxBalance {
        width: 200px;
    }
}
</style>
