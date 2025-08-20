<template>
  <button
    class="table-action-button"
    :class="{
      'table-action-button--disabled': disabled
    }"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps<{ disabled?: boolean }>()
</script>

<style lang="scss" scoped>
.table-action-button {
  appearance: none;
  cursor: pointer;

  background-color: transparent;
  border-radius: 25px;
  padding-top: 8px;
  padding-right: 24px;
  padding-bottom: 8px;
  padding-left: 24px;
  font-family: PT Root UI;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: center;
  color: var(--color-main-font);
  border: 1px solid #0B173933;

  &:hover {
    background-color: var(--color-brand-hover);
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>