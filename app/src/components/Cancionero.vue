<template>
  <!-- Full-screen intro cover for this route -->
  <div v-if="showCover" class="cover-overlay" :class="{ fade: isFading }" aria-hidden="true"></div>

  <div class="flex flex-col text-center font-light" v-if="selectedSong">
    <div>
      <p class="font-normal">{{ selectedSong.title }}</p>
    </div>
    <pre class="font-sans">{{ selectedSong.lyrics }}</pre>
    <button @click="selectedSong = null" class="mt-4 px-4 py-2 bg-gray-200 rounded">Volver al listado</button>
  </div>
  <div v-else>
    <div class="flex flex-col" v-for="song in songs" :key="song.id" style="margin-bottom: 8px;">
      <button class="mt-4 px-4 py-2 bg-gray-200 rounded" @click="selectSong(song)">{{ song.title }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getSongs } from '@/services/songs.js'

const songs = ref([])
const selectedSong = ref(null)

// Cover state
const showCover = ref(true)
const isFading = ref(false)
let fadeTimer = null
let hideTimer = null

function selectSong(song) {
  selectedSong.value = song
}

onMounted(async () => {
  try {
    const response = await getSongs()
    songs.value = response
  } catch (e) {
    songs.value = []
  }

  // Visible for 2s, then fade
  fadeTimer = setTimeout(() => {
    isFading.value = true
  }, 1000)

  // Remove after fade duration (2s + 800ms)
  hideTimer = setTimeout(() => {
    showCover.value = false
  }, 2800)
})

onBeforeUnmount(() => {
  if (fadeTimer) clearTimeout(fadeTimer)
  if (hideTimer) clearTimeout(hideTimer)
})
</script>

<style scoped>
.cover-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-image: url('/PORTADA-HIMNARIO.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 1;
  transition: opacity 0.8s ease;
}

.cover-overlay.fade {
  opacity: 0;
}
</style>
