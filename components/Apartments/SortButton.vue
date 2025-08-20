<template>
  <ClientOnly>
    <button
      class="table-sort-button"
      @click="onSortClick"
    >
      <span :class="{
        active: isSelected
      }">
        <slot />
      </span>
      <div class="arrows">
        <common-arrow-icon
          class="asc"
          :class="{
            active: isAsc
          }"
        />
        <common-arrow-icon
          class="desc"
          :class="{
            active: isDesc
          }"
        />
      </div>
    </button>
  </ClientOnly>
</template>

<script lang="ts" setup>

const props = defineProps<{
  field: SortField
}>()

const emit = defineEmits<{
  (e: 'update'): void
}>()

const apartmentsStore = useApartmentsStore()
const isSelected = computed(() => apartmentsStore.sort?.field === props.field)
const isDesc = computed(() => isSelected.value && apartmentsStore.sort?.direction === 'desc')
const isAsc = computed(() => isSelected.value && apartmentsStore.sort?.direction === 'asc')

function onSortClick() {
  if (!isSelected.value) {
    apartmentsStore.sort = {
      direction: 'desc',
      field: props.field
    }
  } else {
    apartmentsStore.sort.direction = isDesc.value ? 'asc' : 'desc'
  }

  emit('update')
}
</script>

<style lang="scss" scoped>
.table-sort-button {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;
  appearance: none;
  background-color: transparent;
  border: none;
  width: fit-content;
  font-family: PT Root UI;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;

  &::before {
    content: '';
    z-index: -1;
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    background-color: var(--color-brand-hover);
    border-radius: 4px;
    opacity: 0;
    transition: opacity ease-in-out 200ms;
  }

  @media screen and (hover: hover) {
    &:hover {
      &::before {
        opacity: 1;
      }
    }
  }
}

.arrows {
  display: flex;
  flex-direction: column;
  gap: 2px;

  img {
    width: 7px;
    height: 4px;
  }

  .asc {
    transform: rotate(180deg);
  }
}

.active {
  color: var(--color-main-dark);
  fill: var(--color-main-dark);
}
</style>