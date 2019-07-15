<template>
<q-item class="address-header">
    <q-item-side>
    <div class="wallet-icon">
           <svg width="48" viewBox="0 0 17 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="si-glyph si-glyph-wallet"><defs class="si-glyph-fill"></defs><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(1.000000, 0.000000)" fill="#434343"><path d="M7.988,10.635 L7.988,8.327 C7.988,7.578 8.561,6.969 9.267,6.969 L13.964,6.969 L13.964,5.531 C13.964,4.849 13.56,4.279 13.007,4.093 L13.007,4.094 L11.356,4.08 L11.336,4.022 L3.925,4.022 L3.784,4.07 L1.17,4.068 L1.165,4.047 C0.529,4.167 0.017,4.743 0.017,5.484 L0.017,13.437 C0.017,14.269 0.665,14.992 1.408,14.992 L12.622,14.992 C13.365,14.992 13.965,14.316 13.965,13.484 L13.965,12.031 L9.268,12.031 C8.562,12.031 7.988,11.384 7.988,10.635 L7.988,10.635 Z" class="si-glyph-fill"></path><path d="M14.996,8.061 L14.947,8.061 L9.989,8.061 C9.46,8.061 9.031,8.529 9.031,9.106 L9.031,9.922 C9.031,10.498 9.46,10.966 9.989,10.966 L14.947,10.966 L14.996,10.966 C15.525,10.966 15.955,10.498 15.955,9.922 L15.955,9.106 C15.955,8.528 15.525,8.061 14.996,8.061 L14.996,8.061 Z M12.031,10.016 L9.969,10.016 L9.969,9 L12.031,9 L12.031,10.016 L12.031,10.016 Z" class="si-glyph-fill"></path><path d="M3.926,4.022 L10.557,1.753 L11.337,4.022 L12.622,4.022 C12.757,4.022 12.885,4.051 13.008,4.092 L11.619,0.051 L1.049,3.572 L1.166,4.048 C1.245,4.033 1.326,4.023 1.408,4.023 L3.926,4.023 L3.926,4.022 Z" class="si-glyph-fill"></path></g></g></svg>
    </div>
    </q-item-side>
    <q-item-main class="self-start">
        <q-item-tile label>{{ title }}</q-item-tile>
        <q-item-tile class="monospace break-all" sublabel>{{ address }}</q-item-tile>
        <q-item-tile v-if="payment_id" sublabel>Payment id: {{ payment_id }}</q-item-tile>
        <q-item-tile v-if="extra" sublabel>{{ extra }}</q-item-tile>
    </q-item-main>
    <q-item-side>
        <q-btn
            color="primary" style="width:25px;"
            size="sm" icon="file_copy"
            ref="copy"
            @click="copyAddress">
            <q-tooltip anchor="center left" self="center right" :offset="[5, 10]">
                {{ $t("menuItems.copyAddress") }}
            </q-tooltip>
        </q-btn>

    </q-item-side>

    <q-context-menu>
        <q-list link separator style="min-width: 150px; max-height: 300px;">
            <q-item v-close-overlay
                    @click.native="copyAddress(address, $event)">
                <q-item-main :label="$t('menuItems.copyAddress')" />
            </q-item>

            <q-item v-close-overlay
                    @click.native="$refs.identicon.saveIdenticon()">
                <q-item-main label="Save identicon to file" />
            </q-item>
        </q-list>
    </q-context-menu>

</q-item>
</template>

<script>
const { clipboard } = require("electron")
import Identicon from "components/identicon"
export default {
    name: "AddressHeader",
    props: {
        title: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        payment_id: {
            type: String,
            required: false
        },
        extra: {
            type: String,
            required: false
        }
    },
    data () {
        return {}
    },
    methods: {
        copyAddress () {
            this.$refs.copy.$el.blur()
            clipboard.writeText(this.address)
            if(this.payment_id) {
                this.$q.dialog({
                title: this.$t("dialog.copyAddress.title"),
                message: this.$t("dialog.copyAddress.message"),
                    ok: {
                        label: this.$t(`dialog.${key}.ok`)
                    },
                }).then(() => {
                    this.$q.notify({
                        type: "positive",
                        timeout: 1000,
                        message: this.$t("notification.positive.addressCopied")
                    })
                }).catch(() => {
                    this.$q.notify({
                        type: "positive",
                        timeout: 1000,
                        message: this.$t("notification.positive.addressCopied")
                    })
                })
            } else {
                this.$q.notify({
                    type: "positive",
                    timeout: 1000,
                    message: this.$t("notification.positive.addressCopied")
                })
            }
        },
    },
    components: {
        Identicon
    }
}
</script>

<style lang="scss">
.address-header {
    padding: 0;
    img {
        float:left;
        margin-right: 15px;
    }
    h3 {
        margin: 15px 0 0;
    }
    p {
        word-break: break-all;
    }
    &::after {
        content: "";
        clear: both;
        display: table;
    }

    .q-item-main {
        .q-item-label {
            font-size:2em;
        }
    }
}
</style>
