<script lang="ts" setup>
type BoxDirection = 'row' | 'col'
type BoxAlign = 'start' | 'center' | 'end'
type BoxJustify = 'start' | 'center' | 'end' | 'between'

const props = withDefaults(defineProps<{
  direction?: BoxDirection
  align?: BoxAlign
  justify?: BoxJustify
  gap?: number
}>(), {
  direction: 'row',
  align: 'start',
  justify: 'start',
  gap: 0
})

const classes = computed(() => [
  'flex',
  props.direction === 'col' && 'flex-col',
  props.align === 'center' && 'items-center',
  props.align === 'end' && 'items-end',
  props.align === 'start' && 'items-start',
  props.justify === 'center' && 'justify-center',
  props.justify === 'end' && 'justify-end',
  props.justify === 'between' && 'justify-between'
])

const gapClass = computed(() => {
  if (props.gap === 0) return ''
  return `gap-${props.gap}`
})
</script>

<template>
  <div :class="[classes, gapClass]">
    <slot />
  </div>
</template>