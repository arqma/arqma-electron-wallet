<template>
  <q-page class="service-node-page">
    <div class="header row items-center justify-center q-pt-md">
      <q-btn-toggle
        v-model="screen"
        toggle-color="primary"
        color="secondary"
        :options="[
          {
            label: $t('titles.serviceNode.myStakes'),
            value: 'myStakes'
          },
          {
            label: $t('titles.serviceNode.staking'),
            value: 'staking'
          },
          {
            label: $t('titles.serviceNode.registration'),
            value: 'registration'
          }
        ]"
      />
    </div> 
    <ServiceNodeUnlock v-if="screen === 'myStakes'" />
    <ServiceNodeStaking v-if="screen === 'staking'" />
    <ServiceNodeRegistration v-if="screen === 'registration'" />
  </q-page>
</template>

<script>
import ServiceNodeStaking from "components/service_node/service_node_staking";
import ServiceNodeRegistration from "components/service_node/service_node_registration";
import ServiceNodeUnlock from "components/service_node/service_node_unlock";
export default {
  components: {
    ServiceNodeStaking,
    ServiceNodeRegistration,
    ServiceNodeUnlock
  },
  data() {
    return {
      screen: "myStakes"
    };
  }
};
</script>

<style lang="scss"></style>