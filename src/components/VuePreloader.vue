<script setup lang="ts">
import type { Ref } from 'vue'
import { defineAsyncComponent, onMounted, onBeforeMount, ref, watchEffect } from 'vue'
import { transitions } from '../utils'
import definedProps from '../props'

// APIs
const emit = defineEmits(['loading', 'loaded'])
const props = defineProps(definedProps)

// References
const animationFrame: Ref<number> = ref(0)
const bar: Ref<HTMLElement | undefined> = ref()
const percent = ref(0)
const isLoading = ref(false)
const hasLoaded = ref(false)

// const ThemeComponent = defineAsyncComponent(() => import('./themes/DefaultTheme.vue'))

// On DOM fully loaded -> init percentage loading
document.addEventListener('DOMContentLoaded', function () {
  percent.value = 0
  isLoading.value = true
  emit('loading')
})

onBeforeMount(() => {
  if (props.overflow) setOverflow('hidden')
})

onMounted(() => {
  // Start animating percentage once page is loaded
  window.addEventListener('load', () => {
    animatePercentage()
  })
})

function animatePercentage() {
  if (percent.value < 100) {
    percent.value = lerp(percent.value, percent.value + 1, props.speed as number)

    if (bar.value) {
      bar.value.style.width = `${percent.value}%`
    }
  } else {
    // Once 100% trigger LOADED state and stop animation
    loaded()
    cancelAnimationFrame(animationFrame.value)
  }

  animationFrame.value = requestAnimationFrame(animatePercentage)
}

/**
 * Linear interpolation
 * @param x number
 * @param y number
 * @param a number
 * @returns number
 */
function lerp(x: number, y: number, a: number): number {
  return x * (1 - a) + y * a
}

/**
 * Emit loaded state
 * @returns void
 */
function loaded(): void {
  hasLoaded.value = true
  isLoading.value = false
  emit('loaded')
}

/**
 * Set <body> overflow style value
 * @param value string - CSS overflow value: auto | visible | hidden | etc.
 * @returns void
 */
function setOverflow(value = 'auto'): void {
  document.body.style.overflow = value
}
</script>

<template>
  <slot :percent="Math.ceil(percent)" v-if="props.theme === ''">
    <transition name="animate-preloader">
      <main v-if="isLoading" v-show="!hasLoaded" :class="[$style.preloader]">
        <div :class="$style.wrapper">
          <p class="pre-text" :class="$style.preText">Loading</p>

          <div class="bar-wrapper" :class="$style.barWrapper">
            <div ref="bar" :class="$style.bar"></div>
            <div class="percent" :class="$style.percent">{{ Math.round(percent) }} %</div>
          </div>
        </div>
      </main>
    </transition>
  </slot>

  <slot :percent="Math.ceil(percent)" v-else>
    <transition name="animate-preloader">
      <main v-if="isLoading" v-show="!hasLoaded" :class="[$style.preloader]">
        <div :class="$style.wrapperSpinner">
          <div class="spinner" :class="$style.spinLoader" aria-hidden="true"></div>
        </div>
      </main>
    </transition>
  </slot>
</template>

<style lang="scss" module>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
body {
  margin: 0 !important;
  padding: 0 !important;
}

.preloader {
  position: fixed;
  z-index: 100;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-image: linear-gradient(to right, #00b09b, #96c93d);

  &,
  .wrapper,
  .wrapperSpinner {
    position: relative;
    width: 100%;
    width: 100vw;
    height: 100%;
    height: 100vh;

    top: 0;
    left: 0;
    // background-color: #091a28;

    // transition: all 0.5s ease-in-out;
    // transform: 'translate(-100%, 0)';
  }

  .wrapper {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap: 1rem;

    .percent,
    .preText {
      font-family: 'Poppins', sans-serif;
      text-transform: uppercase;
    }

    .preText {
      color: #006a5d;
      font-size: 1.125rem;
    }

    .barWrapper {
      display: flex;
      position: relative;
      width: 100%;
      height: 1.125rem;

      background-color: rgba(0, 0, 0, 0.1);
      border: 1px solid transparent;
      border-top: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow:
        inset 0 1px 2px rgba(0, 0, 0, 0.39),
        0 -1px 1px rgba(255, 255, 255, 0.2),
        0 1px 0 rgba(255, 255, 255, 0.2);
      border-radius: 1.125rem;

      .bar {
        position: relative;
        width: 0%;
        height: 100%;
        background-image: linear-gradient(to right, #33c0af, #abd464);
        border: 1px solid transparent;
        border-bottom: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow:
          inset 0 1px 2px rgba(255, 255, 255, 0.39),
          0 -1px 1px rgba(0, 0, 0, 0.2),
          0 1px 0 rgba(0, 0, 0, 0.2);
        border-radius: 1.125rem;
      }

      .percent {
        position: absolute;
        right: 0.4rem;
        top: -0.075rem;
        color: #3c5018;
        font-size: 0.85rem;
      }
    }
  }

  .wrapperSpinner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-image: linear-gradient(to right, #ffefba, #ffffff);

    $spinner_speed: 0.675s;
    $spinner_radius: 80%;
    $spinner_fill_radius: 90px;

    $spinner_size: 50px;
    $spinner_thickness: 10px;
    $spinner_inner_circle: $spinner_size - $spinner_thickness;

    $spinner_color: #ffffff;
    $spinner_bg: #ccbf95;
    $spinner_inner_bg: linear-gradient(to right, #fff2c8, #ffffff);

    .spinLoader {
      border-radius: 80%;
      display: block;
      height: $spinner_size;
      width: $spinner_size;
      position: relative;
      animation: spin $spinner_speed linear 0s infinite normal;
      background: $spinner_bg;

      &:before,
      &:after {
        content: '';
        display: block;
        position: absolute;
      }

      &:before {
        border-radius: 0 $spinner_fill_radius $spinner_fill_radius 0;
        height: $spinner_size;
        width: 50%;
        top: 0;
        right: 0;
        z-index: 1;
        background: $spinner_color;
        background-image: linear-gradient($spinner_bg, $spinner_color);
      }

      &:after {
        border-radius: $spinner_radius;
        height: $spinner_inner_circle;
        width: $spinner_inner_circle;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        background: $spinner_inner_bg;
      }
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.animate-preloader-enter-active {
  opacity: 1;
  transition: all 0.3s ease-in-out;

  .pre-text {
    opacity: 1;
    transform: translateX(0), scaleX(1);
    transition: all 0.3s ease-in-out;
    transition-delay: 0.2s;
  }

  .bar-wrapper {
    opacity: 1;
    width: 100%;
    transition: all 0.15s ease-in-out;
    transition-delay: 0.4s;

    .percent {
      opacity: 1;
      transition: all 0.15s ease-in-out;
      transition-delay: 0.45s;
    }
  }

  .spinner {
    opacity: 1;
    transform: scale(1);
    transition: all 0.3s ease-in-out;
    transition-delay: 0.2s;
  }
}

.animate-preloader-enter-from {
  opacity: 0;

  .pre-text {
    opacity: 0;
    transform: translateX(-100%), scaleX(0);
  }

  .bar-wrapper {
    opacity: 0;
    width: 0%;

    .percent {
      opacity: 0;
    }
  }

  .spinner {
    opacity: 0;
    transform: scale(0);
  }
}

.animate-preloader-leave-active {
  opacity: 1;
  transition: all 0.3s ease-in-out;
  transition-delay: 0.3s;

  .pre-text {
    opacity: 1;
    transform: translateX(0), scaleX(1);
    transition: all 0.3s ease-in-out;
    transition-delay: 0.1s;
  }

  .bar-wrapper {
    opacity: 1;
    width: 100%;
    transition: all 0.15s ease-in-out;
    transition-delay: 0.05s;

    .percent {
      opacity: 1;
      transition: all 0.15s ease-in-out;
    }
  }

  .spinner {
    opacity: 1;
    transform: scale(1);
    transition: all 0.3s ease-in-out;
  }
}
.animate-preloader-leave-to {
  opacity: 0;

  .pre-text {
    opacity: 0;
    transform: translateX(-100%), scaleX(0);
  }

  .bar-wrapper {
    opacity: 0;
    width: 0%;

    .percent {
      opacity: 0;
    }
  }

  .spinner {
    opacity: 0;
    transform: scale(0);
  }
}
</style>
