<template>
  <ClientOnly>
    <div class="container">
      <button
        v-for="option in options"
        :key="option.value"
        class="button"
        :class="{
          'button--disabled': option.disabled,
          'button--selected': !!value?.includes(option.value)
        }"
        :inert="option.disabled"
        @click="() => onButtonClick(option.value)"
      >
        <span>{{ option.label }}</span>
      </button>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>

const value = defineModel<number[]>()

const options = [{
  label: '1К',
  value: 1,
  disabled: false
},
{
  label: '2К',
  value: 2,
  disabled: false
},
{
  label: '3К',
  value: 3,
  disabled: false
},
{
  label: '4К',
  value: 4,
  disabled: true
}
]

function onButtonClick(v: number) {
  let newValue = [...(value.value || [])]
  if (value.value?.includes(v)) {
    newValue = newValue.filter(_v => v !== _v)
  } else {
    newValue.push(v)
  }

  value.value = newValue
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: 16px;
}

.button {
  cursor: pointer;
  width: 44px;
  height: 44px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: PT Root UI;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: center;
  color: var(--color-main-font);
  border: none;
  background-color: #FFFFFF;
  transition: box-shadow ease-in-out 200ms;

  &:not(.button--disabled) {
    &:hover {
      box-shadow: 0px 6px 20px 0px #95D0A1;
    }
  }

  &--disabled {
    pointer-events: none;

    span {
      opacity: 0.2;
    }
  }

  &--selected {
    background-color: var(--color-main-dark);
    box-shadow: 0px 6px 20px 0px #95D0A1;
    color: #FFFFFF;

  }
}
</style>