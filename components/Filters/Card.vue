<template>
  <div class="filters">
    <filters-rooms-filter
      v-model="apartmentsStore.filters.rooms"
      @update:model-value="emit('update')"
    />

    <common-range-slider
      v-model="apartmentsStore.filters.price"
      label="Стоимость квартиры, ₽"
      :min="1_000_000"
      :max="40_000_000"
      :step="50_000"
      @update="emit('update')"
    />

    <common-range-slider
      v-model="apartmentsStore.filters.area"
      label="Площадь, м²"
      :min="20"
      :max="200"
      :step="1"
      @update="emit('update')"
    />

    <button
      class="reset-button"
      @click="resetFilters"
    >
      <span>
        Сбросить параметры
      </span>
      <img :src="CrossIcon">
    </button>
  </div>
</template>

<script lang="ts" setup>
import CrossIcon from '~/assets/icons/cross.svg'

const emit = defineEmits<{
  (e: 'update'): void
}>()

const apartmentsStore = useApartmentsStore()

function resetFilters() {
  apartmentsStore.filters = JSON.parse(JSON.stringify(FILTER_DEFAULTS))
  emit('update')
}
</script>

<style lang="scss" scoped>
.filters {
  min-width: 318px;
  flex-shrink: 0;
  align-self: flex-start;
  position: sticky;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 10px;
  padding: 20px 19px;
  background: linear-gradient(135deg, rgba(174, 228, 178, 0.3) 0%, rgba(149, 208, 161, 0.3) 100%);

  top: 48px;

  @media screen and (min-width: 1440px) {
    padding: 40px;
    min-width: 399px;
    top: 96px;
  }
}

.reset-button {
  display: flex;
  align-items: center;
  appearance: none;
  border: 1px solid transparent;
  border-radius: 16px;
  background-color: transparent;
  cursor: pointer;
  padding: 5px 16px;
  gap: 8px;

  font-family: PT Root UI;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  transition: border-color ease-in-out 200ms;

  &:hover {
    border-color: var(--color-main-font);
  }
}
</style>