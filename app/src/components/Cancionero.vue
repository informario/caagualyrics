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
    <div class="mb-3">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar por titulo..."
        class="w-full px-4 py-2 border border-gray-300 rounded"
      />
    </div>
    <div class="flex flex-col" v-for="song in filteredSongs" :key="song.id" style="margin-bottom: 8px;">
      <button class="mt-4 px-4 py-2 bg-gray-200 rounded" @click="selectSong(song)">{{ song.title }}</button>
    </div>
    <p v-if="songs.length > 0 && filteredSongs.length === 0" class="text-sm text-gray-500 mt-2">
      No se encontraron canciones con ese titulo.
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { getSongs } from '@/services/songs.js'

const songs = ref([])
const selectedSong = ref(null)
const searchQuery = ref('')

function normalizeText(value) {
  return (value || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

const filteredSongs = computed(() => {
  const query = normalizeText(searchQuery.value)
  const baseList = !query
    ? songs.value
    : songs.value.filter((song) => normalizeText(song?.title).includes(query))

  return [...baseList].sort((a, b) =>
    (a?.title || '').localeCompare(b?.title || '', 'es', { sensitivity: 'base' })
  )
})

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
