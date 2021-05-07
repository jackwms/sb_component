exports.createComponent = (componet_name) => `
<template>
    <div id='${componet_name}'>
        {{msg}}
    </div>
</template>

<script>
export default {
    name: '${componet_name}',
    data () {
        return {
            msg: '${componet_name}'
        }
    },
    mounted(){
        
    },
    methods(){
    
    }
        
}
</script>

<style scoped="scoped"></style>
    `;



