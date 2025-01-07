import { defineStore } from 'pinia';

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    appName: import.meta.env.VITE_APP_NAME,
    host: import.meta.env.VITE_API_URL 
  })
})
