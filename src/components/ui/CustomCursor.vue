<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(-100)
const y = ref(-100)
const isVisible = ref(false)
const isHovering = ref(false)

let raf: number | null = null
let targetX = 0
let targetY = 0
let curX = -100
let curY = -100
let isEnabled = false

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function loop() {
  curX = lerp(curX, targetX, 0.5)
  curY = lerp(curY, targetY, 0.5)
  x.value = Math.round(curX * 10) / 10
  y.value = Math.round(curY * 10) / 10
  raf = requestAnimationFrame(loop)
}

function onMove(e: MouseEvent) {
  targetX = e.clientX
  targetY = e.clientY
  if (!isVisible.value) {
    curX = e.clientX
    curY = e.clientY
    isVisible.value = true
  }
}

function onOver(e: MouseEvent) {
  const t = e.target instanceof HTMLElement ? e.target : null
  isHovering.value = !!t?.closest(
    'a, button, [role="button"], [role="tab"], input, textarea, select, label',
  )
}

function onLeave() {
  isVisible.value = false
}

function onEnter() {
  isVisible.value = true
}

onMounted(() => {
  const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  isEnabled = supportsFinePointer && !prefersReducedMotion
  if (!isEnabled) return

  window.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mouseover', onOver, { passive: true })
  document.addEventListener('mouseleave', onLeave)
  document.addEventListener('mouseenter', onEnter)
  raf = requestAnimationFrame(loop)
  document.documentElement.classList.add('has-custom-cursor')
})

onUnmounted(() => {
  if (!isEnabled) return

  window.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseover', onOver)
  document.removeEventListener('mouseleave', onLeave)
  document.removeEventListener('mouseenter', onEnter)
  if (raf !== null) cancelAnimationFrame(raf)
  document.documentElement.classList.remove('has-custom-cursor')
})
</script>

<template>
  <div class="cursor-wrap" aria-hidden="true">
    <div
      v-show="isVisible"
      class="cursor-dot"
      :class="{ 'cursor-dot--hover': isHovering }"
      :style="{ transform: `translate(${x}px, ${y}px)` }"
    />
  </div>
</template>

<style scoped>
.cursor-wrap {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 9999;
  overflow: hidden;
}

.cursor-dot {
  position: absolute;
  top: -12px;
  left: -12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid rgba(99, 102, 241, 0.7);
  background: rgba(99, 102, 241, 0.08);
  will-change: transform;
  transition:
    width 0.25s ease,
    height 0.25s ease,
    top 0.25s ease,
    left 0.25s ease,
    background 0.25s ease,
    border-color 0.25s ease;
}

.cursor-dot--hover {
  top: -20px;
  left: -20px;
  width: 40px;
  height: 40px;
  background: rgba(99, 102, 241, 0.14);
  border-color: rgba(99, 102, 241, 0.9);
}

@media (hover: none), (pointer: coarse) {
  .cursor-wrap {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cursor-wrap {
    display: none;
  }
}
</style>
