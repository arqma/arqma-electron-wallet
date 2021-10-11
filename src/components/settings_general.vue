<template>
<div class="settings-general">
    <div class="row justify-between q-mb-md">
        <div><q-radio v-model="config.daemon.type" val="local_remote" :label="$t('strings.daemon.localRemote.title')" /></div>
        <div><q-radio v-model="config.daemon.type" val="local" :label="$t('strings.daemon.local.title')" /></div>
        <div><q-radio v-model="config.daemon.type" val="remote" :label="$t('strings.daemon.remote.title')" /></div>
        <div><q-radio v-model="config.daemon.type" val="local_zmq" :label="$t('strings.daemon.zmq.title')" /></div>
    </div>

    <p v-if="config.daemon.type == 'local_remote'">
        {{ $t("strings.daemon.localRemote.description") }}
    </p>
    <p v-if="config.daemon.type == 'local'">
        {{ $t("strings.daemon.local.description") }}
    </p>
    <p v-if="config.daemon.type == 'remote'">
        {{ $t("strings.daemon.remote.description") }}
    </p>

    <q-field v-if="config.daemon.type != 'remote' && config.daemon.type != 'local_zmq'">
        <div class="row gutter-sm items-end">
            <div class="col-8">
                <q-input v-model="config.daemon.rpc_bind_ip" :float-label="$t('fieldLabels.localDaemonIP')"
                         :dark="theme=='dark'" disable/>
            </div>
            <div class="col-4">
                <q-input v-model="config.daemon.rpc_bind_port" :float-label="$t('fieldLabels.localDaemonPort')"
                         type="number" :decimals="0" :step="1" min="1024" max="65535" :dark="theme=='dark'"/>
            </div>
        </div>
    </q-field>

    <q-field v-if="config.daemon.type != 'local' && config.daemon.type != 'local_zmq'">
        <div class="row q-mt-md pl-sm">
            <div class="col-8" label="Remote Node Host">
                <q-input v-model="config_daemon.remote_host" :float-label="$t('fieldLabels.remoteNodeHost')"
                         :placeholder="daemon_defaults.remote_host" :dark="theme=='dark'"/>
                <!-- Remote node presets -->
                <q-btn-dropdown class="remote-dropdown" v-if="config.app.net_type === 'mainnet'" flat>
                    <q-list link dark no-border>
                        <q-item v-for="option in remotes" v-bind:key="option.host" @click.native="setPreset(option)"
                                v-close-overlay>
                            <q-item-main>
                                <q-item-tile label>{{ option.host }}:{{ option.port }}</q-item-tile>
                            </q-item-main>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </div>
            <div class="col-4">
                <q-input v-model="config_daemon.remote_port" :float-label="$t('fieldLabels.remoteNodePort')"
                    :placeholder="toString(daemon_defaults.remote_port)" type="number" :decimals="0" :step="1"
                    min="1024" max="65535" :dark="theme=='dark'"/>
            </div>
        </div>
    </q-field>

    <q-field v-if="config.daemon.type === 'local_zmq'">
        <div class="row gutter-sm items-end">
            <div class="col-8">
                <q-input v-model="config.daemon.zmq_bind_ip" :float-label="$t('fieldLabels.daemonZMQIP')" :dark="theme=='dark'"
                         disable/>
            </div>
            <div class="col-4">
                <q-input v-model="config.daemon.zmq_bind_port" :float-label="$t('fieldLabels.daemonZMQPort')" type="number"
                         :decimals="0" :step="1" min="1024" max="65535" :dark="theme=='dark'"/>
            </div>
        </div>
    </q-field>

    <q-field>
        <div class="row gutter-sm items-end">
            <div class="col-8">
                <q-input v-model="config.app.data_dir" :stack-label="$t('fieldLabels.dataStoragePath')" disable :dark="theme=='dark'" />
                <input type="file" webkitdirectory directory id="dataPath" v-on:change="setDataPath" ref="fileInput" hidden />
            </div>
            <div class="col-4">
                <q-btn v-on:click="selectPath" :color="theme=='dark'?'dark':'standard'" :text-color="theme=='dark'?'white':'dark'">
                    {{$t('buttons.selectLocation')}}
                </q-btn>
            </div>
        </div>
    </q-field>

    <q-field v-if="config.daemon.type != 'remote'">
        <div class="row gutter-sm items-end">
            <div class="col-8">
                <q-select :dark="theme=='dark'" v-model="config.daemon.enhanced_ip_privacy"
                          :float-label="$t('fieldLabels.wallet247')" :options="enhancedPrivacyOptions" />
            </div>
        </div>
    </q-field>

    <q-collapsible :label="$t('strings.advancedOptions')" header-class="non-selectable row reverse advanced-options-label">

        <q-field>
            <div class="row gutter-sm items-end">
                <div class="col-3">
                    <q-input v-model="config.daemon.log_level" :disable="config.daemon.type == 'remote'" :dark="theme=='dark'"
                             :float-label="$t('fieldLabels.daemonLogLevel')" type="number" :decimals="0" :step="1" min="0" max="4" />
                </div>
                <div class="col-3">
                    <q-input v-model="config.wallet.log_level" :dark="theme=='dark'"
                             :float-label="$t('fieldLabels.walletLogLevel')" type="number" :decimals="0" :step="1" min="0" max="4" />
                </div>

                <!--
                <template v-if="config.daemon.type != 'remote'">
                    <div class="col-3 self-center">
                        <q-checkbox v-model="config.daemon.enhanced_ip_privacy" label="Enhanced IP Privacy" />
                    </div>
                </template>
                -->

                <div class="col-3 self-center" >
                    <q-checkbox v-model="config.app.stagenet" :label="$t('fieldLabels.stagenet')" />
                </div>
            </div>
        </q-field>
        <q-field>
            <div class="row gutter-sm items-end">
                <div class="col-3">
                    <q-input v-model="config.daemon.in_peers" :disable="config.daemon.type == 'remote'" :dark="theme=='dark'"
                             :float-label="$t('fieldLabels.maxIncomingPeers')" type="number" :decimals="0" :step="1" min="-1" max="65535" />
                </div>
                <div class="col-3">
                    <q-input v-model="config.daemon.out_peers" :disable="config.daemon.type == 'remote'" :dark="theme=='dark'"
                             :float-label="$t('fieldLabels.maxOutgoingPeers')" type="number" :decimals="0" :step="1" min="-1" max="65535" />
                </div>
                <div class="col-3">
                    <q-input v-model="config.daemon.limit_rate_up" :disable="config.daemon.type == 'remote'" :dark="theme=='dark'"
                             :float-label="$t('fieldLabels.limitUploadRate')" type="number" suffix="kB/s" :decimals="0" :step="1" min="-1" max="65535" />
                </div>
                <div class="col-3">
                    <q-input v-model="config.daemon.limit_rate_down" :disable="config.daemon.type == 'remote'" :dark="theme=='dark'"
                             :float-label="$t('fieldLabels.limitDownloadRate')" type="number" suffix="kB/s" :decimals="0" :step="1" min="-1" max="65535" />
                </div>
            </div>
        </q-field>
        <q-field>
            <div class="row gutter-sm items-end">
                <div class="col-3">
                    <q-input v-model="config.daemon.p2p_bind_port" :disable="config.daemon.type == 'remote'" :dark="theme=='dark'"
                             :float-label="$t('fieldLabels.daemonP2pPort')" type="number" :decimals="0" :step="1" min="1024" max="65535" />
                </div>
                <div class="col-3">
                    <q-input v-model="config.daemon.rpc_bind_port" :disable="config.daemon.type == 'remote'" :dark="theme=='dark'"
                             :float-label="$t('fieldLabels.localDaemonPort')" type="number" :decimals="0" :step="1" min="1024" max="65535" />
                </div>
                <div class="col-3">
                    <q-input v-model="config.wallet.rpc_bind_port" :disable="config.daemon.type == 'remote'" :dark="theme=='dark'"
                             :float-label="$t('fieldLabels.walletRPCPort')" type="number" :decimals="0" :step="1" min="1024" max="65535" />
                </div>
            </div>
        </q-field>

    </q-collapsible>
</div>
</template>

<script>
import { i18n } from "plugins/i18n"
import { mapState } from "vuex"
export default {
    name: "SettingsGeneral",
    data () {
        return {
            enhancedPrivacyOptions: [
                {label: i18n.t("strings.enhancedOptions.privateNetworkMode"), value: true},
                {label: i18n.t("strings.enhancedOptions.interconnectedNetworkMode"), value: false}
            ]
        }
    },
    computed: mapState({
        theme: state => state.gateway.app.config.appearance.theme,
        remotes: state => state.gateway.app.remotes,
        config: state => state.gateway.app.pending_config,
        config_daemon (state) {
            return this.config.daemons[this.config.app.net_type]
        },
        is_remote (state) {
            return this.config_daemon.type === 'remote'
        },
        defaults: state => state.gateway.app.defaults,
        daemon_defaults (state) {
            return this.config.daemons[this.config.app.net_type]
        }
    }),
    mounted () {
        if(this.randomise_remote && this.remotes.length > 0 && this.config.app.net_type === "mainnet") {
            const index = Math.floor(Math.random() * Math.floor(this.remotes.length));
            this.setPreset(this.remotes[index]);
        }
    },
    methods: {
        selectPath (type) {

            this.$refs['fileInput'].click()
        },
        setDataPath (file) {
            if (file.target.files && file.target.files.length > 0) {
                this.config.app.data_dir = file.target.files[0].path
            }
        },
        setPreset (option) {

            if (!option) return;

            const { host, port } = option;
            if (host) this.config_daemon.remote_host = host;
            if (port) this.config_daemon.remote_port = port; 
        },
        toString (value) {
            if (!value && typeof value !== "number") return ""
            return String(value);
        },
        data () {
        return {
            select: 0,
        }
    },
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
