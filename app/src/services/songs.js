// lib/songService.js
import { db, auth } from "./firebase";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

function sortSongsByTitle(songs) {
    return [...songs].sort((a, b) =>
        (a?.title || "").trim().localeCompare((b?.title || "").trim(), "es", {
            sensitivity: "base",
        })
    );
}

// Lectura pública
export async function getSongs() {
    const snapshot = await getDocs(collection(db, "songs"));
    return sortSongsByTitle(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
}

// Agregar (requiere login)
export async function addSong(title, lyrics) {
    if (!auth.currentUser) throw new Error("No autenticado");
    const docRef = await addDoc(collection(db, "songs"), { title, lyrics });
    return { id: docRef.id, title, lyrics };
}

// Editar (requiere login)
export async function editSong(id, title, lyrics) {
    if (!auth.currentUser) throw new Error("No autenticado");
    await updateDoc(doc(db, "songs", id), { title, lyrics });
    return { id, title, lyrics };
}

// Eliminar (requiere login)
export async function removeSong(id) {
    if (!auth.currentUser) throw new Error("No autenticado");
    await deleteDoc(doc(db, "songs", id));
}