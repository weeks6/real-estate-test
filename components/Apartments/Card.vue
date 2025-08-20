<template>
  <div class="card">
    <div class="card__image">
      <img :src="item.plan_url" />
    </div>
    <h2 class="text grid--title">{{ title }}</h2>
    <span class="text grid--area">{{ intlFormat.format(item.area) }}<span class="detail">м²</span></span>
    <span class="text grid--floor">
      {{ item.floor }}
      <span class="text--dull">из {{ item.total_floors }} <span class="detail">этаж</span></span>
    </span>
    <span class="text grid--price"> {{ intlFormat.format(item.price) }} <span class="detail">₽</span></span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ item: Apartment }>()

const title = `${props.item.rooms}-комнатная №${props.item.number}`
const intlFormat = new Intl.NumberFormat('ru-RU')
</script>

<style lang="scss" scoped>
.card {
  display: grid;

  grid-template-areas:
    "title title title image"
    "area floor price image";

  grid-template-columns: min-content 80px;

  row-gap: 16px;
  column-gap: 20px;

  border-radius: 8px;
  border: 1px solid #0000001A;
  padding: 16px 24px;

  @media screen and (min-width: 1440px) {
    grid-template-areas: initial;
    border: none;
    display: grid;
    row-gap: 0;

    grid-template-columns: 80px 3fr 1fr 1fr 1fr;
    box-shadow: 0px 1px 0px 0px #0000001A;
    padding: 16px 0 24px 0;
  }

  &__image {
    display: grid;
    place-items: center;
    width: 80px;
    height: 80px;

    @media screen and (max-width: 1439px) {
      grid-area: image;
      margin-left: auto;
    }


    img {
      object-fit: contain;
    }
  }
}

.detail {
  @media screen and (min-width: 1440px) {
    display: none;
  }

}

.grid--title {
  @media screen and (max-width: 1439px) {
    grid-column: span 3;
    grid-area: title;
  }

}

.grid--area {
  @media screen and (max-width: 1439px) {
    grid-area: area;
  }

}

.grid--floor {
  @media screen and (max-width: 1439px) {
    white-space: pre;
    grid-area: floor;
  }

}

.grid--price {
  @media screen and (max-width: 1439px) {
    grid-area: price;
  }

}

.text {
  color: var(--color-main-font);
  font-family: PT Root UI;
  font-weight: 400;
  letter-spacing: 0px;
  font-size: 14px;
  line-height: 20px;

  @media screen and (min-width: 1440px) {
    font-size: 16px;
    line-height: 24px;
  }


  &--dull {
    opacity: 0.5;
  }
}
</style>