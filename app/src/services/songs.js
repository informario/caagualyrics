import { makeRequest } from "@/services/api.js";

// Obtener todas las canciones
export const getSongs = async () => {
    return makeRequest('get', '/song');
};

// Agregar una nueva canción
export const addSong = async (data) => {
    return makeRequest('post', '/song', data);
};

// Edita canción existente
export const editSong = async (data) => {
    return makeRequest('put', '/song', data);
};

// Eliminar una canción por título
export const removeSong = async (data) => {
    return makeRequest('delete', '/song', data);
};