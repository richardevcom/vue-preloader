<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'

import { VuePreloader } from './components/'

// Show preloader animation
const show: Ref<boolean | undefined> = ref(undefined)
</script>

<template>
  <vue-preloader @loading="show = true" @loaded="show = false" :overflow="true" theme="" />
  <!-- <template v-slot="{ percent }">
      <transition name="loading-animation" mode="in-out">
        <span v-if="show">{{ percent }} %</span>
      </transition>
    </template> -->
  <!-- </vue-preloader> -->
</template>
