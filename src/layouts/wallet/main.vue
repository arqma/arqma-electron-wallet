<template>
<q-layout view="hHh Lpr lFf">
    <q-layout-header class="shift-title">
        <main-menu />
<q-tabs class="col" align="justify" :color="theme == 'dark' ? 'light' : 'dark'" inverted>
            <q-route-tab to="/wallet" default slot="title">
                <span><q-icon name="attach_money" /> Wallet</span>
            </q-route-tab>
            <q-route-tab to="/wallet/receive" slot="title">
                <span><q-icon name="call_received" /> Receive</span>
            </q-route-tab>
            <q-route-tab to="/wallet/send" slot="title">
                <span><q-icon name="call_made" /> Send</span>
            </q-route-tab>
            <q-route-tab to="/wallet/addressbook" slot="title">
                <span><q-icon name="person" /> Address Book</span>
            </q-route-tab>

        </q-tabs>
    </q-layout-header>

    <q-toolbar-title>
        <div class="flex items-center justify-center" style="margin-top:7px">
        </div>
    </q-toolbar-title>
    </q-layout-header>
        <q-page-container>
            <WalletDetails />
            <!-- <AddressHeader :address="info.address" :title="info.name" /> -->

    </q-layout-header>

    <q-page-container>
        <keep-alive>
            <router-view />
        </keep-alive>
    </q-page-container>

    <status-footer />
    </q-page-container>

</q-layout>
</template>

<script>
import { openURL } from "quasar"
import { mapState } from "vuex"
import WalletDetails from "components/wallet_details"
import FormatArqma from "components/format_arqma"
import StatusFooter from "components/footer"
import MainMenu from "components/mainmenu"
export default {
    name: "LayoutDefault",
    computed: mapState({
        theme: state => state.gateway.app.config.appearance.theme,
    }),
    data() {
        return {
            selectedTab: "tab-1",
        }
    },
    methods: {
        openURL,
    },
    components: {
      StatusFooter,
      MainMenu,
      WalletDetails
    }
}
</script>

<style>
</style>
