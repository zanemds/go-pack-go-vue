<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomeContent',
    props: {
        msg: {
            type: String,
            required: true
        }
    }
    
});
</script>

<template>
    <div>Home content</div>
    <div>{{ msg }}</div>
</template>

    


<style scoped></style>
