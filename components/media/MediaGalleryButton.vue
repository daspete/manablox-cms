<template>
    <div>
        <v-btn v-on:click.prevent="OpenMediaGallery">{{ label ? label : 'Select' }}</v-btn>
        <media-gallery
            v-if="isMediaGalleryActive"
            v-model="selectedMedias"
            :multiple="multiple"
        ></media-gallery>
    </div>
</template>

<script>
export default {
    props: [ 'value', 'label', 'multiple' ],

    watch: {
        selectedMedias(value){
            this.$emit('input', value);
        }
    },

    data(){
        return {
            selectedMedias: this.value ? this.value : [],
            isMediaGalleryActive: false
        }
    },

    methods: {
        OpenMediaGallery(){
            this.isMediaGalleryActive = true;
        },

        CloseMediaGallery(){
            this.isMediaGalleryActive = false;
        }
    }
}
</script>
