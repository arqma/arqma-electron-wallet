<template>
<q-layout-footer class="status-footer">
    <div class="status-line">

        <template v-if="config.daemon.type !== 'remote'">
            <div>Daemon: {{ (config.daemon.type === 'local_zmq' ? daemon.info.height : daemon.info.height_without_bootstrap) }} / {{ target_height }} ({{ daemon_local_pct }}%)</div>
        </template>


        <template v-if="config.daemon.type !== 'local' && config.daemon.type !== 'local_zmq'">
            <div>Remote: {{ daemon.info.height }}</div>
        </template>

        <div>Wallet: {{ wallet.info.height }} / {{ target_height }} ({{ wallet_pct }}%)</div>

        <template v-if="config.pool.server.enabled">
            <template v-if="pool.status == -1">
                <div>Solo Mining: Error</div>
            </template>
            <template v-if="pool.status == 0">
                <div>Solo Mining: Inactive</div>
            </template>
            <template v-if="pool.status == 1">
                <div>Solo Mining: Waiting for daemon...</div>
            </template>
            <template v-if="pool.status == 2">
                <div>Solo Mining: {{ pool.stats.h.hashrate_5min | hashrate }}</div>
            </template>
        </template>

        <div>{{ status }}</div>

    </div>
    <div class="status-bars">
        <div v-bind:style="{ width: daemon_pct+'%' }"></div>
        <div v-bind:style="{ width: wallet_pct+'%' }"></div>
    </div>
</q-layout-footer>
</template>

<script>
import { mapState } from "vuex"
export default {
    name: "StatusFooter",
    computed: mapState({

        config: state => state.gateway.app.config,
        daemon: state => state.gateway.daemon,
        wallet: state => state.gateway.wallet,
        pool: state => state.gateway.pool,

        target_height (state) {
            if(this.config.daemon.type === "local_zmq")
                return this.daemon.info.target_height
            if(this.config.daemon.type === "local" && !this.daemon.info.is_ready)
                return Math.max(this.daemon.info.height, this.daemon.info.target_height)
            else
                return this.daemon.info.height
        },
        daemon_pct (state) {
            if(this.config.daemon.type === "local" || this.config.daemon.type === "local_zmq")
                return this.daemon_local_pct
            return 0
        },
        daemon_local_pct (state) {
            if(this.config.daemon.type === "remote")
                return 0
            let pct = 0.0
            if(this.config.daemon.type === "local_zmq") 
            {
                pct = (100 * this.daemon.info.height / this.daemon.info.target_height).toFixed(1)
            } else {
                pct = (100 * this.daemon.info.height_without_bootstrap / this.target_height).toFixed(1)
                if(pct == 100.0 && this.daemon.info.height_without_bootstrap < this.target_height)
                return 99.9
            }
            return Math.min(pct, 100)
        },
        wallet_pct (state) {
            let pct = (100 * this.wallet.info.height / this.target_height).toFixed(1)
            if(pct == 100.0 && this.wallet.info.height < this.target_height)
                return 99.9
            else
                return Math.min(pct, 100)
        },
        status(state) {
            if(this.config.daemon.type === "local") {
                if(this.daemon.info.height_without_bootstrap < this.target_height || !this.daemon.info.is_ready) {
                    return "Syncing..."
                } else if(this.wallet.info.height < this.target_height - 1 && this.wallet.info.height != 0) {
                    return "Scanning..."
                } else {
                    return "Ready"
                }
            } else {
                let height_without_bootstrap = (this.config.daemon.type === "local_zmq") ? this.daemon.info.height : this.daemon.info.height_without_bootstrap
                if(this.wallet.info.height < this.target_height - 1 && this.wallet.info.height != 0) {
                    return "Scanning..."
                } else if(height_without_bootstrap < this.target_height) {
                    return "Syncing..."
                } else {
                    return "Ready"
                }
            }
            return
        }

    }),
    filters: {
        hashrate: (hashrate) => {
            if(!hashrate) hashrate = 0
            const byteUnits = [" H/s", " kH/s", " MH/s", " GH/s", " TH/s", " PH/s"]
            let i = 0
            if(hashrate > 0) {
                while(hashrate > 1000) {
                    hashrate /= 1000
                    i++
                }
            }
            return parseFloat(hashrate).toFixed(2) + byteUnits[i]
        },
    },
    data () {
        return {
        }
    },
}
</script>

<style lang="scss">
</style>
