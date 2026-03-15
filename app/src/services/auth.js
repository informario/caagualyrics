// lib/authService.js
import { auth } from "./firebase";
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

// Login con email y password
export async function login(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}

// Logout
export async function logout() {
    await signOut(auth);
}

// Escuchar cambios de sesión
// Usalo en tu componente raíz: onAuthChange(user => setUser(user))
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}