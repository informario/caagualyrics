<template>
    <p class="text-center font-light">Editor</p>

    <div class="flex flex-col text-center font-light" v-if="selectedSong === 'newSong'">
        <input class="mx-20 my-2 border-2 border-indigo-500 rounded-md" type="text" v-model="newTitle"></input>
        <textarea class="mx-20 border-2 border-indigo-500 rounded-md" rows="20" v-model="newLyrics"></textarea>
        <button @click="agregarCancion()" class="mt-4 px-4 py-2 bg-gray-200 rounded">Agregar cancion</button>
        <button @click="selectedSong = null" class="mt-4 px-4 py-2 bg-gray-200 rounded">Volver al listado</button>
    </div>

    <div class="flex flex-col text-center font-light" v-else-if="selectedSong">
        <input class="mx-20 my-2 border-2 border-indigo-500 rounded-md" type="text" v-model="selectedSong.title"></input>
        <textarea class="mx-20 border-2 border-indigo-500 rounded-md" rows="20" v-model="selectedSong.lyrics"></textarea>
        <button @click="editarCancion()" class="mt-4 px-4 py-2 bg-gray-200 rounded">Editar cancion</button>
        <button @click="eliminarCancion()" class="mt-4 px-4 py-2 bg-gray-200 rounded">Eliminar cancion</button>
        <button @click="selectedSong = null" class="mt-4 px-4 py-2 bg-gray-200 rounded">Volver al listado</button>
    </div>



    <div class="flex flex-col font-light"v-else>
        <div class="flex flex-col font-light" v-for="song in songs" :key="song._id" style="margin-bottom: 8px;">
            <button class="mt-4 px-4 py-2 bg-gray-200 rounded" @click="selectSong(song)">{{ song.title }}</button>
        </div>
        <button @click="selectedSong = 'newSong'" class="mt-4 px-4 py-2 bg-gray-200 rounded">+</button>
    </div>







</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getSongs, addSong, editSong, removeSong } from '@/services/songs.js'

const songs = ref([])
const selectedSong = ref(null)
const newTitle = ref("")
const newLyrics = ref("")

function selectSong(song) {
    selectedSong.value = song
}

async function agregarCancion() {
    if (!newTitle.value || !newLyrics.value) return
    try {
        await addSong({ title: newTitle.value, lyrics: newLyrics.value })
        // Refresca el listado
        const response = await getSongs()
        songs.value = response
        // Limpia los campos y vuelve al listado
        newTitle.value = ''
        newLyrics.value = ''
        selectedSong.value = null
    } catch (e) {
        alert(e)
    }
}

async function editarCancion() {
    if (!selectedSong.value || !selectedSong.value._id || !selectedSong.value.title || !selectedSong.value.lyrics) return
    try {
        await editSong({
            _id: selectedSong.value._id,
            title: selectedSong.value.title,
            lyrics: selectedSong.value.lyrics
        })
        // Refresca el listado
        const response = await getSongs()
        songs.value = response
        selectedSong.value = null
    } catch (e) {
        alert('Error al editar la canción')
    }
}

async function eliminarCancion() {
    if (!selectedSong.value || !selectedSong.value._id) return
    try {
        await removeSong({ _id: selectedSong.value._id })
        // Refresca el listado
        const response = await getSongs()
        songs.value = response
        selectedSong.value = null
    } catch (e) {
        alert('Error al eliminar la canción')
    }
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