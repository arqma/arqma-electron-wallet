<template>
<q-modal v-model="isVisible" maximized class="address-book-details">

    <q-modal-layout v-if="mode == 'edit' || mode == 'new'">
        <q-toolbar slot="header" color="dark" inverted>
            <q-btn flat round dense icon="reply" @click="close()" />
            <q-toolbar-title v-if="mode=='new'">
                {{ $t("strings.addAddressBookEntry") }}
            </q-toolbar-title>
            <q-toolbar-title v-else-if="mode=='edit'">
                {{ $t("strings.editAddressBookEntry") }}
            </q-toolbar-title>

            <q-btn v-if="mode=='edit'" flat no-ripple @click="cancelEdit()" :label="$t('buttons.cancel')" />
            <q-btn class="q-ml-sm" color="primary" @click="save()" :label="$t('buttons.save')" />

        </q-toolbar>
        <div>

            <q-list no-border :dark="theme=='dark'">

                <q-item>
                    <q-item-side>
                    <div class="wallet-icon">
                           <svg width="48" viewBox="0 0 17 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="si-glyph si-glyph-wallet"><defs class="si-glyph-fill"></defs><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(1.000000, 0.000000)" fill="#434343"><path d="M7.988,10.635 L7.988,8.327 C7.988,7.578 8.561,6.969 9.267,6.969 L13.964,6.969 L13.964,5.531 C13.964,4.849 13.56,4.279 13.007,4.093 L13.007,4.094 L11.356,4.08 L11.336,4.022 L3.925,4.022 L3.784,4.07 L1.17,4.068 L1.165,4.047 C0.529,4.167 0.017,4.743 0.017,5.484 L0.017,13.437 C0.017,14.269 0.665,14.992 1.408,14.992 L12.622,14.992 C13.365,14.992 13.965,14.316 13.965,13.484 L13.965,12.031 L9.268,12.031 C8.562,12.031 7.988,11.384 7.988,10.635 L7.988,10.635 Z" class="si-glyph-fill"></path><path d="M14.996,8.061 L14.947,8.061 L9.989,8.061 C9.46,8.061 9.031,8.529 9.031,9.106 L9.031,9.922 C9.031,10.498 9.46,10.966 9.989,10.966 L14.947,10.966 L14.996,10.966 C15.525,10.966 15.955,10.498 15.955,9.922 L15.955,9.106 C15.955,8.528 15.525,8.061 14.996,8.061 L14.996,8.061 Z M12.031,10.016 L9.969,10.016 L9.969,9 L12.031,9 L12.031,10.016 L12.031,10.016 Z" class="si-glyph-fill"></path><path d="M3.926,4.022 L10.557,1.753 L11.337,4.022 L12.622,4.022 C12.757,4.022 12.885,4.051 13.008,4.092 L11.619,0.051 L1.049,3.572 L1.166,4.048 C1.245,4.033 1.326,4.023 1.408,4.023 L3.926,4.023 L3.926,4.022 Z" class="si-glyph-fill"></path></g></g></svg>
                    </div>

                    </q-item-side>
                    <q-item-main>
                        <q-field>
                            <q-input v-model="newEntry.address" :float-label="$t('fieldLabels.address')"
                                     @blur="$v.newEntry.address.$touch"
                                     :error="$v.newEntry.address.$error"
                                     :dark="theme=='dark'"
                                     />
                        </q-field>
                    </q-item-main>
                </q-item>

                <q-item>
                    <q-item-main>
                        <q-field>
                            <q-input v-model="newEntry.name" :float-label="$t('fieldLabels.name')" :dark="theme=='dark'" />
                        </q-field>
                    </q-item-main>
                    <q-item-side>
                        <q-checkbox
                            v-model="newEntry.starred"
                            checked-icon="star"
                            unchecked-icon="star_border"
                            class="star-entry"
                            />
                    </q-item-side>
                </q-item>

                <q-item>
                    <q-item-main>
                        <q-field>
                            <q-input v-model="newEntry.payment_id" :float-label="$t('strings.paymentID')"
                                     @blur="$v.newEntry.payment_id.$touch"
                                     :error="$v.newEntry.payment_id.$error"
                                     :dark="theme=='dark'"
                                     />
                        </q-field>
                    </q-item-main>
                </q-item>

                <q-item>
                    <q-item-main>
                        <q-field>
                            <q-input v-model="newEntry.description" type="textarea" :float-label="$t('strings.notes')" :dark="theme=='dark'" />
                        </q-field>
                    </q-item-main>
                </q-item>


                <q-item v-if="mode=='edit'">
                    <q-item-main>
                        <q-field>
                            <q-btn class="float-right" color="red" @click="deleteEntry()" :label="$t('buttons.delete')" />
                        </q-field>
                    </q-item-main>
                </q-item>


            </q-list>
        </div>
    </q-modal-layout>

    <q-modal-layout v-else>
        <q-toolbar slot="header" color="dark" inverted>
            <q-btn flat round dense icon="reply" @click="close()" />
            <q-toolbar-title>
                {{ $t("strings.addressBookDetails") }}
            </q-toolbar-title>
            <q-btn class="q-mr-sm"
                   flat no-ripple
                   :disable="!is_ready"
                   @click="edit()" :label="$t('buttons.edit')" />
            <q-btn
                color="primary"
                :disabled="view_only"
                @click="sendToAddress"
                :label="$t('buttons.sendCoins')" />
        </q-toolbar>
        <div class="layout-padding">

            <template v-if="entry != null">

                <AddressHeader :address="entry.address"
                               :title="entry.name"
                               :payment_id="entry.payment_id"
                               :extra="entry.description ? 'Notes: '+entry.description : ''"
                               />



                <div class="q-mt-lg">

                    <div class="non-selectable">
                        <q-icon name="history" size="24px" />
                        <span class="vertical-middle q-ml-xs">{{ $t("strings.recentTransactionsWithAddress") }}</span>
                    </div>

                    <TxList type="in" :limit="5" :to-outgoing-address="entry.address" />

                </div>

            </template>

        </div>
    </q-modal-layout>


</q-modal>
</template>

<script>
import { mapState } from "vuex"
import Identicon from "components/identicon"
import AddressHeader from "components/address_header"
import TxList from "components/tx_list"
import { payment_id, address } from "src/validators/common"
import { required } from "vuelidate/lib/validators"
export default {
    name: "AddressBookDetails",
    data () {
        return {
            isVisible: false,
            entry: null,
            mode: "view",
            newEntry: {
                index: false,
                address: "",
                payment_id: "",
                name: "",
                description: "",
                starred: false
            }
        }
    },
    computed: mapState({
        theme: state => state.gateway.app.config.appearance.theme,
        view_only: state => state.gateway.wallet.info.view_only,
        is_ready (state) {
            return this.$store.getters["gateway/isReady"]
        }
    }),
    validations: {
        newEntry: {
            address: { required, address },
            payment_id: { payment_id }
        }
    },
    methods: {
        save () {
            this.$v.newEntry.$touch()

            if (this.$v.newEntry.address.$error) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: "Address not valid"
                })
                return
            }

            if (this.$v.newEntry.payment_id.$error) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: "Payment id not valid"
                })
                return
            }

            this.$gateway.send("wallet", "add_address_book", this.newEntry)
            this.close()
        },
        deleteEntry () {
            this.$gateway.send("wallet", "delete_address_book", this.newEntry)
            this.close()
        },
        sendToAddress () {
            this.close()
            this.$router.replace({ path: "send", query: {address: this.entry.address, payment_id: this.entry.payment_id} });
        },
        edit () {
            this.mode = "edit"
            this.newEntry = this.entry
        },
        cancelEdit () {
            this.mode = "view"
            this.$v.$reset();
            this.newEntry = {
                index: false,
                address: "",
                payment_id: "",
                name: "",
                description: "",
                starred: false
            }
        },
        close () {
            this.isVisible = false
            this.$v.$reset();
            this.newEntry = {
                index: false,
                address: "",
                payment_id: "",
                name: "",
                description: "",
                starred: false
            }
        }
    },

    components: {
        AddressHeader,
        Identicon,
        TxList
    }
}
</script>

<style lang="scss">
.address-book-details {

    .q-field {
        margin: 0 10px 20px;
    }
    .q-checkbox.star-entry .q-checkbox-icon {
        font-size:40px;
        margin-left: 10px;
    }
}
</style>
