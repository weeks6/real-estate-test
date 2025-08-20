<template>
  <div class="container">
    <div class="apartments">
      <h1 class="heading">Квартиры</h1>
      <apartments-table
        class="table"
        @update="onSortUpdate"
      />

      <apartments-action-button
        v-if="apartmentsStore.items.length < apartmentsStore.count"
        :disabled="apartmentsStore.loading"
        @click="onActionClicked"
      >
        Загрузить ещё
      </apartments-action-button>
    </div>
    <filters-card @update="onFiltersUpdate" />

    <common-scroll-top-button />
  </div>
</template>

<script lang="ts" setup>

const apartmentsStore = useApartmentsStore()

const page = ref(1)
const limit = ref(5)

onMounted(() => {
  apartmentsStore.appendApartments(page.value, limit.value)
})

function onActionClicked() {
  page.value += 1
  apartmentsStore.appendApartments(page.value, limit.value)
}

function onFiltersUpdate() {
  page.value = 1
  apartmentsStore.items = []
  apartmentsStore.appendApartments(page.value, limit.value)
}

function onSortUpdate() {
  page.value = 1
  apartmentsStore.items = []
  apartmentsStore.appendApartments(page.value, limit.value)
}
</script>

<style scoped lang='scss'>
.container {
  position: relative;
  margin: 0 auto;
  max-width: 1440px;
  min-height: 100vh;
  padding: 54px 48px;
  display: flex;
  gap: 28px;


  @media screen and (min-width: 1440px) {
    gap: 80px;
    padding: 96px 80px;
  }
}

.heading {
  color: var(--color-main-font);
  font-size: 54px;
  line-height: 55px;
  margin-bottom: 24px;


  @media screen and (min-width: 1440px) {
    margin-bottom: 48px;
  }
}

.table {
  margin-bottom: 24px;

  @media screen and (min-width: 1440px) {
    margin-bottom: 48px;
  }
}

.apartments {
  flex-shrink: 0;
  flex-grow: 1;
}
</style>