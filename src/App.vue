<template>
  <Card @get-link="sendRequest" :link="short_link" />
</template>
<script setup>
import { onMounted, ref } from 'vue';
import Card from './components/Card.vue';

const short_link = ref(null);

const request_data = ref({
            token: '1a7dcc341b36ae24539b4abd3a2f8fd55e165b52',
            groupID: '',
});

const sendRequest= async (link)=>{
  try{
	const response	= await fetch('https://api-ssl.bitly.com/v4/shorten', {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${request_data.value.token}`,
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				"group_guid": request_data.value.groupID,
				"long_url": link.long_link
			})
		})
		const data = await response.json();
		short_link.value = data.link;
		console.log(short_link.value)
  }catch(error){
    console.log(error)
  }
}







const getGroupID= async ()=>{
	try{
	const response	= await fetch('https://api-ssl.bitly.com/v4/groups', {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${request_data.value.token}`,
				"Content-Type": "application/json" 
			}
		})
		const data = await response.json();
		request_data.value.groupID = data.groups[0].guid;
		console.log(request_data.value.groupID)

	}catch(error){
		console.log(error)
	}
}

onMounted(getGroupID); 
</script>
<style lang="">
  
</style>