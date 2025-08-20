<template>
  <ClientOnly>
    <div class="container">
      <label
        v-if="label"
        class="label"
      >{{ label }}</label>
      <div class="labels">
        <span class="labels__col"><span class="labels--dull">от</span>{{ intlFormat.format(minVal) }}</span>
        <span class="labels__col"><span class="labels--dull">до</span>{{ intlFormat.format(maxVal) }}</span>
      </div>

      <div class="range-slider">
        <div class="slider-track"></div>
        <div
          class="slider-range"
          :style="{ left: percent(minVal) + '%', right: 100 - percent(maxVal) + '%' }"
        >
        </div>

        <input
          type="range"
          :min="min"
          :max="max"
          :step="step"
          v-model.number="minVal"
          @input="onMinInput"
          @mouseup="emit('update')"
          class="thumb thumb-left"
        />

        <input
          type="range"
          :min="min"
          :max="max"
          :step="step"
          v-model.number="maxVal"
          @input="onMaxInput"
          @mouseup="emit('update')"
          class="thumb thumb-right"
        />


      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const modelValue = defineModel<[number, number]>()

const emit = defineEmits<{
  (e: 'update'): void
}>()

const props = withDefaults(defineProps<{
  label?: string,
  min: number,
  max: number,
  step: number
}>(), {
  min: 0,
  max: 100,
  step: 1
});

function snapToStep(val: number, min: number, max: number, step: number) {
  const n = Number(val);
  const clamped = Math.min(max, Math.max(min, n));
  const snapped = min + Math.round((clamped - min) / step) * step;
  return Number(snapped.toFixed(12));
}

function percent(val: number) {
  return ((val - props.min) / (props.max - props.min)) * 100;
}

const minVal = ref(snapToStep(modelValue.value?.[0] || 0, props.min, props.max, props.step));
const maxVal = ref(snapToStep(modelValue.value?.[1] || 100, props.min, props.max, props.step));

watch(
  modelValue,
  (v) => {
    if (!v) return

    minVal.value = snapToStep(v[0], props.min, props.max, props.step);
    maxVal.value = snapToStep(v[1], props.min, props.max, props.step);
  },
  { deep: true }
);

function onMinInput() {
  minVal.value = snapToStep(minVal.value, props.min, props.max, props.step);
  const neededMax = snapToStep(minVal.value, props.min, props.max, props.step);

  if (neededMax > maxVal.value) {
    maxVal.value = neededMax;
  }

  modelValue.value = [minVal.value, maxVal.value]

}

function onMaxInput() {
  maxVal.value = snapToStep(maxVal.value, props.min, props.max, props.step);
  const neededMin = snapToStep(maxVal.value, props.min, props.max, props.step);

  if (neededMin < minVal.value) {
    minVal.value = neededMin;
  }

  modelValue.value = [minVal.value, maxVal.value]
}

const intlFormat = new Intl.NumberFormat('ru-RU')
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label {
  margin-bottom: 2px;
  font-family: PT Root UI;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: 0px;
  color: var(--color-main-font);

  @media screen and (min-width: 1440px) {
    font-size: 14px;
    line-height: 20px;
  }
}

.range-slider {
  --thumb-size: 14px;

  position: relative;
  width: 100%;
  height: var(--thumb-size);
}

.slider-track {
  position: absolute;
  height: 3px;
  border-radius: 1.5px;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  background-color: var(--color-main-font);
  opacity: 0.1;
}

.slider-range {
  position: absolute;
  height: 3px;
  background: var(--color-main-dark);
  border-radius: 1.5px;
  top: 50%;
  transform: translateY(-50%);
}

input[type="range"] {
  width: 100%;
  pointer-events: none;
  background: none;
  -webkit-appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: var(--thumb-size);
  height: var(--thumb-size);
  border-radius: 50%;
  background: var(--color-main-dark);
  cursor: grab;
  position: relative;
  z-index: 2;
}

input[type="range"]::-moz-range-thumb {
  pointer-events: all;
  width: var(--thumb-size);
  height: var(--thumb-size);
  border-radius: 50%;
  background: var(--color-main-dark);
  cursor: grab;
}

.thumb {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.thumb-left {
  z-index: 3;
}

.thumb-right {
  z-index: 4;
}

.labels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-family: PT Root UI;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;
  color: var(--color-main-font);

  @media screen and (min-width: 1440px) {
    font-size: 16px;
    line-height: 24px;
  }

  &__col {
    display: flex;
    gap: 8px;
  }

  &--dull {
    opacity: 0.5;
  }
}
</style>
