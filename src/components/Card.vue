<template>
    <div class="card">
      <div class="card-header">
        <span> <img width="17" height="17" src="/icons8-link-40.png"/> </span><h1>Link Shortener</h1>
      </div>
      <div class="card-body">
      <form >
        <input v-model="long_link" type="url" placeholder="https://long-url.com....." required />
        <button @click.prevent="getLink" type="submit">Shorten Link</button>
      </form>
      </div>
      <div class="card-footer" v-if="props.link">
        <p>Shortened Link :  </p>
        <span><a :href="props.link" target="_blank">{{ props.link }} </a><button @click="copy" class="copy-button" 
          >copy</button></span>
      </div>
    </div> 
    <div ref="alert" class="alert">
		  Link copied!
    </div>
  </template>
  <script setup>
import { defineEmits, ref, defineProps,useTemplateRef } from 'vue';
import { Clipboard } from "v-clipboard"

const long_link = ref(null);
const props = defineProps({link:String});
const emit = defineEmits(['getLink']);
const alertRef = useTemplateRef('alert')

const copy = ()=>{
  if(props.link){
    Clipboard.copy(props.link)
    showAlert('success')
  }else{
    showAlert('error')
  }
 
  // navigator.clipboard.writeText(long_link.value);
}
const showAlert = (type)=>{
  if(type === 'success'){
    alertRef.value.textContent="  Link copied!";
			alertRef.value.classList.add("show-alert")
			setTimeout(
				() => {
					alertRef.value.classList.remove("show-alert")
				}, 3000
			)
  } else if(type === 'error'){
    alertRef.value.textContent=" Invalid Link";
    alertRef.value.classList.add("show-alert-error")
    setTimeout(
				() => {
					alertRef.value.classList.remove("show-alert-error")
				}, 3000
			)
  }
}
const getLink = () => {
  if(long_link.value){
    emit('getLink', { long_link: long_link.value });
  } else{
    showAlert('error')
  }
};


</script>
<style scoped>

</style>