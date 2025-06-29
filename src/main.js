import './assets/main.css'
import Clipboard from 'v-clipboard'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.use(Clipboard);
app.mount('#app')
