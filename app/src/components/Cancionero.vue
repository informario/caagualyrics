<template>
    <div class="flex flex-col text-center font-light" v-if="selectedSong">
        <div>
            <p class="font-normal">{{ selectedSong.title }}</p>
        </div>
        <pre class="font-sans">{{ selectedSong.lyrics }}</pre>
        <button @click="selectedSong = null" class="mt-4 px-4 py-2 bg-gray-200 rounded">Volver al listado</button>
    </div>
    <div v-else>
        <div class="flex flex-col" v-for="song in songs" :key="song._id" style="margin-bottom: 8px;">
            <button class="mt-4 px-4 py-2 bg-gray-200 rounded" @click="selectSong(song)">{{ song.title }}</button>
        </div>
    </div>







</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getSongs } from '@/services/songs.js'

const songs = ref([])
const selectedSong = ref(null)

function selectSong(song) {
    selectedSong.value = song
}

onMounted(async () => {
  try {
    const response = await getSongs()
    console.log(response)
    songs.value = response
  } catch (e) {
    songs.value = []
  }
})
</script>

<style scoped>
</style>