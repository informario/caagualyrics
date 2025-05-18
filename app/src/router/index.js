import { createRouter, createWebHistory } from 'vue-router';
import Cancionero from '@/components/Cancionero.vue'
import Editor from '@/components/Editor.vue'
import LogInForm from '@/components/LogInForm.vue'
import App from '@/components/App.vue'
import NotFound from '@/components/NotFound.vue'

const routes = [
    {
        path: '/login',
        name: 'LogInForm',
        component: LogInForm
    },
    {
        path: '/cancionero',
        name: 'Cancionero',
        component: Cancionero
    },
    {
        path: '/editor',
        name: 'Editor',
        component: Editor
    },
    {
        path: '/',
        redirect: '/cancionero', // O cualquier ruta válida
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: NotFound
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;