<template>
  <ClientOnly>
    <button
      v-if="shouldShow"
      class="button"
      @click="scrollToTop"
    >
      <img :src="ScrollUpIcon" />
    </button>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ClientOnly } from '#components';
import ScrollUpIcon from '~/assets/icons/arrow-up.svg'

const shouldShow = ref(false)

function checkScrollable() {
  const el = document.documentElement
  shouldShow.value = !!el.scrollTop && el.scrollHeight > el.clientHeight
}

function scrollToTop() {
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  checkScrollable()
  window.addEventListener('resize', checkScrollable)
  window.addEventListener('scroll', checkScrollable)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScrollable)
  window.removeEventListener('scroll', checkScrollable)
})
</script>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  appearance: none;
  border: none;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 40px;
  height: 40px;
  background: var(--color-multi-brand);
  transition: box-shadow ease-in-out 200ms;

  @media screen and (hover: hover) {
    &:hover {
      box-shadow: 0px 6px 20px 0px #95D0A1;
    }
  }
}
</style>