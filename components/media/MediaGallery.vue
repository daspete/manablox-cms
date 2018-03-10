<template>
    <div :class="`mb-media-gallery ${ isClosed ? 'mb-media-gallery--closed' : '' }`">
        <div class="mb-media-gallery__underlay" v-on:click="Close"></div>
        <div class="mb-media-gallery__content">
            <v-container justify-center :class="`${ mode == 'selection' ? 'mb-5' : '' }`">
                <v-layout row>
                    <v-flex d-flex>
                        <panel title="Mediagallery" class="elevation-24">
                            <template slot="content">
                                <v-tabs color="grey darken-2" slider-color="primary">
                                    <v-tab ripple>
                                        Media
                                    </v-tab>
                                    <v-tab ripple>
                                        Upload media
                                    </v-tab>
                                    <v-tab ripple>
                                        Link external media
                                    </v-tab>

                                    <v-tab-item>

                                        <v-layout row>
                                            <v-flex d-flex pt-3>
                                                <v-container grid-list-md>
                                                    <v-layout row wrap>
                                                        <v-flex xs2 v-for="n in 120" :key="n">
                                                            <v-card :class="`${ IsItemSelected(n) ? 'elevation-24 accent' : '' }`">
                                                                <v-card-media v-on:click="SelectMedia(n)"
                                                                    :src="`https://unsplash.it/150/300?image=99`"
                                                                    height="8vw"
                                                                ></v-card-media>
                                                                <v-card-text>BLA</v-card-text>
                                                            </v-card>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-container>
                                            </v-flex>
                                        </v-layout>

                                        <div class="mb-media-gallery__select grey darken-3 elevation-24 text-xs-center">
                                            <v-btn color="primary" v-if="(multiple == false && selectedMedias != null) || selectedMedias.length" v-on:click="SubmitSelection">
                                                Select
                                            </v-btn>
                                            <v-btn color="error" v-on:click="Close">
                                                Cancel
                                            </v-btn>
                                        </div>
                                    </v-tab-item>
                                    <v-tab-item>
                                        UPLOAD
                                    </v-tab-item>
                                    <v-tab-item>
                                        LINK
                                    </v-tab-item>
                                </v-tabs>
                            </template>
                        </panel>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>

</template>

<script>
export default {

    props: {
        mode: {
            type: String,
            default: 'selection'
        },
        multiple: {
            type: Boolean,
            default: true
        },
        value: {

        }
    },

    data(){
        return {
            isClosed: false,
            selectedMedias: []
        }
    },

    created(){
        document.querySelector('html').classList.add('overflow-hidden');
        document.addEventListener('keyup', this.KeyListener);
    },

    destroyed(){
        document.querySelector('html').classList.remove('overflow-hidden');
        document.removeEventListener('keyup', this.KeyListener);
    },

    methods: {
        KeyListener(e){
            if(e.keyCode === 27){
                this.Close();
            }
        },

        Close(){
            this.isClosed = true;

            setTimeout(() => {
                this.$parent.CloseMediaGallery();
            }, 200);

        },

        SelectMedia(item){
            if(this.multiple == false){
                this.selectedMedias = item;
                return;
            }

            if(this.selectedMedias.find((media) => { return media == item })){
                this.selectedMedias.splice(this.selectedMedias.indexOf(item), 1);
            }else{
                this.selectedMedias.push(item);
            }
        },

        IsItemSelected(item){
            if(this.multiple == false){
                return item == this.selectedMedias;
            }

            return this.selectedMedias.indexOf(item) !== -1;
        },

        SubmitSelection(){
            this.$emit('input', this.selectedMedias);
            this.Close();
        }
    }
}
</script>


<style lang="scss">
    html.overflow-hidden,
    html.overflow-hidden body {
        overflow: hidden;
    }

    .mb-media-gallery {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
        z-index: 100000;
        animation: 0.25s ease-in-out 0s 1 fadein;

        &--closed {
            animation: 0.25s ease-in-out 0s 1 fadeout;
        }

        &__underlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(66, 66, 66, 0.8);
        }

        &__content {
            position: relative;
        }

        &__select {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100vw;
        }
    }

    @keyframes fadein {
        0% {
            opacity: 0
        }

        100% {
            opacity: 1
        }
    }

    @keyframes fadeout {
        0% {
            opacity: 1
        }

        100% {
            opacity: 0
        }
    }
</style>

