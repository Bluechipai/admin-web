<!--  cǐ lù yóu kě zuò wèi fù lèi lù yóu tōng yòng lù yóu yè miàn shǐ yòng  rú xū zì dìng yì fù lèi lù yóu yè miàn  qǐng cān kǎo @/view/superAdmin/index.vue -->
<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="el-fade-in-linear">
        <keep-alive :include="routerStore.keepAliveRouters">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'RouterHolder'
}
</script>

<script setup>
import { useRouterStore } from '@/pinia/modules/router'
const routerStore = useRouterStore()
</script>
