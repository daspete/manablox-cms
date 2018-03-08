<template>
    <div>
        <panel :title="`Edit `">
            <template slot="content">
                <v-form v-on:submit.prevent="OnFormSubmit">
                    <div v-for="(field, fieldId) in model.fields" :key="`modelfield-${ fieldId }`">
                        <template v-if="field.type=='string'">
                            <v-text-field small
                                :disabled="isSubmitting"
                                :loading="isSubmitting"
                                :label="field.name"
                                v-model="modelData[field.name]"
                                :required="field.required"
                            ></v-text-field>
                        </template>
                        <template v-if="field.type=='text'">
                            <v-text-field
                                :disabled="isSubmitting"
                                :loading="isSubmitting"
                                :label="field.name"
                                v-model="modelData[field.name]"
                                multi-line
                            ></v-text-field>
                        </template>
                        <template v-if="field.type=='relation_one'">
                            <v-select v-if="field.type == 'relation_one'"
                                dark
                                autocomplete
                                clearable
                                :disabled="isSubmitting"
                                :loading="isSubmitting"
                                :label="field.relation_one.foreignModel.model_name"
                                :items="field.relation_one.foreignModelData"
                                v-model="modelData[field.name]"
                                item-text="first_name"
                                item-value="id"
                            ></v-select>
                        </template>
                        <template v-if="field.type=='relation_many'">
                            <v-select v-if="field.type == 'relation_many'"
                                dark
                                multiple
                                autocomplete
                                clearable
                                :disabled="isSubmitting"
                                :loading="isSubmitting"
                                :label="field.relation_many.foreignModel.model_name"
                                :items="field.relation_many.foreignModelData"
                                v-model="modelData[field.name]"
                                item-text="first_name"
                                item-value="id"
                            ></v-select>
                        </template>
                    </div>
                    <v-container grid-list-sm fluid>
                        <v-layout row wrap>
                            <v-flex xs6>
                                <v-btn color="error"
                                    nuxt to="."
                                    :disabled="isSubmitting"
                                    :loading="isSubmitting"
                                >
                                    <v-icon left dark>cancel</v-icon>
                                    Cancel
                                </v-btn>
                            </v-flex>
                            <v-flex xs6 class="text-xs-right">
                                <v-btn color="primary"
                                    :disabled="isSubmitting"
                                    :loading="isSubmitting"
                                    type="submit"
                                >
                                    <v-icon left dark>save</v-icon>
                                    Save
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-form>
            </template>
        </panel>
    </div>
</template>

<script>
export default {
    layout: "cms",

    async fetch({ store }){
        await store.dispatch('sidenav/FetchItems')
    },

    async asyncData({ app, params }){
        let model = await app.$axios.$get(`/api/v1/models/${ params.model }?by=model_slug`);

        let { data } = await app.$axios.$get(`/api/v1/data/${ params.model }/${ params.id }`);

        let relationIds = [];
        let relationId = null;
        let foreignModel = null;
        let foreignModelData = null;
        let relationData = null;
        let modelData = null;
        let i = null;

        for(let x = 0; x < model.fields.length; x++){
            switch(model.fields[x].type){
                case 'relation_one':
                    foreignModel = await app.$axios.$get(`/api/v1/models/${ model.fields[x].relation_one }`);
                    foreignModelData = await app.$axios.$get(`/api/v1/data/${ foreignModel.model_slug }`);
                    model.fields[x].relation_one = {
                        foreignModel,foreignModelData
                    }

                    relationId = data[model.fields[x].name];

                    modelData = foreignModelData.find((item) => { return item.id == relationId});

                    data[model.fields[x].name] = modelData ? modelData : null;

                break;

                case 'relation_many':
                    foreignModel = await app.$axios.$get(`/api/v1/models/${ model.fields[x].relation_many }`);
                    foreignModelData = await app.$axios.$get(`/api/v1/data/${ foreignModel.model_slug }`);
                    model.fields[x].relation_many = {
                        foreignModel,foreignModelData
                    }

                    if(data[model.fields[x].name] != null){
                        relationIds = JSON.parse(data[model.fields[x].name]);

                        relationData = [];

                        for(i = 0; i < relationIds.length; i++){
                            modelData = foreignModelData.find((item) => { return item.id == relationIds[i]});

                            if(modelData) relationData.push(modelData)
                        }

                        data[model.fields[x].name] = relationData;
                    }

                break;
            }
        }


        return {
            modelData: data,
            model,
            errors: null,
            showDeleteConfirm: false,
            isDeleting: false,
            isSubmitting: false,
            current: null,
            selected: []
        }
    },

    methods: {
        async OnFormSubmit(){
            this.errors = [];

            this.isSubmitting = true;



            try{
                await this.$axios.$put(`/api/v1/data/${ this.$route.params.model }/${ this.$route.params.id }`, this.modelData);
                this.$router.push('.');
            }catch(e){
                this.errors = [];
                this.errors.push(e.response.data.error.message);
            }

            this.isSubmitting = false;
        },
    }
}
</script>

