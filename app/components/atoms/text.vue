<script lang="ts" setup>
type TextVariant = 'primary' | 'secondary' | 'muted'
type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'

const props = withDefaults(defineProps<{
  variant?: TextVariant
  size?: TextSize
  bold?: boolean
  uppercase?: boolean
}>(), {
  variant: 'primary',
  size: 'base',
  bold: false,
  uppercase: false
})

const classes = computed(() => [
  props.variant === 'muted' && 'text-gray-500',
  props.bold && 'font-semibold',
  props.uppercase && 'uppercase',
  {
    'text-xs': props.size === 'xs',
    'text-sm': props.size === 'sm',
    'text-base': props.size === 'base',
    'text-lg': props.size === 'lg',
    'text-xl': props.size === 'xl'
  }
])
</script>

<template>
  <p :class="classes">
    <slot />
  </p>
</template>