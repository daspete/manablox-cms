<template>
    <div>
        <v-layout row>
            <v-flex d-flex pt-3>
                <v-container grid-list-md>
                    <v-layout row wrap>
                        <v-flex xs2 v-for="(item, itemId) in value" :key="`media-item-${ itemId }`">
                            <v-card>
                                <v-card-media
                                    :src="`https://unsplash.it/150/300?image=99`"
                                    height="8vw"
                                ></v-card-media>
                                <v-card-text>
                                    <v-btn color="error" v-on:click="DeleteItem(item)">DELETE</v-btn>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    props: [ 'value' ],

    watch: {
        items(value){
            this.$emit('input', value);
        },

        value(value){
            this.items = value;
        }
    },

    data(){
        return {
            items: this.value
        }
    },

    methods: {
        DeleteItem(item){
            this.items.splice(this.items.indexOf(item), 1);
        }
    }
}
</script>
