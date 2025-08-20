<template>
  <div class="apartments">
    <!-- header -->
    <div class="header">
      <span class="header__text">
        Планировка
      </span>
      <span class="header__text">
        Квартира
      </span>
      <apartments-sort-button
        @update="emit('update')"
        field="area"
      >S, м²
      </apartments-sort-button>

      <apartments-sort-button
        @update="emit('update')"
        field="floor"
      >Этаж
      </apartments-sort-button>

      <apartments-sort-button
        @update="emit('update')"
        field="price"
      >Цена, ₽
      </apartments-sort-button>
    </div>
    <!-- items -->
    <apartments-card
      v-for="item in apartmentsStore.items"
      :item="item"
      :key="item.id"
    />
  </div>
</template>

<script lang="ts" setup>

const emit = defineEmits<{
  (e: 'update'): void
}>()

const apartmentsStore = useApartmentsStore()
</script>

<style scoped lang="scss">
.apartments {
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media screen and (min-width: 1440px) {
    display: block;
  }
}

.header {
  display: flex;
  column-gap: 20px;
  margin-bottom: 2px;
  padding: 8px 0;

  @media screen and (min-width: 1440px) {
    display: grid;
    grid-template-columns: 80px 3fr 1fr 1fr 1fr;
    padding-bottom: 16px;
    box-shadow: 0px 1px 0px 0px #0000001A;
  }

  &__text {
    display: none;
    color: var(--color-main-font);
    font-family: PT Root UI;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0px;

    @media screen and (min-width: 1440px) {
      display: initial;
    }
  }
}
</style>