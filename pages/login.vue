<template>
    <v-layout row justify-center>
        <v-dialog :value="true" persistent max-width="500px">
            <v-form v-on:submit.prevent="OnFormSubmit">
                <v-card>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <div class="headline">Login</div>
                                    <div>manablox-cms</div>
                                </v-flex>

                                <v-flex xs12>
                                    <v-alert
                                        v-for="(error, errorId) in errors"
                                        type="error"
                                        :value="true"
                                        v-if="error"
                                        :key="`error-${errorId}`">
                                        {{ error }}
                                    </v-alert>

                                    <v-text-field
                                        :disabled="isSubmitting"
                                        :loading="isSubmitting"
                                        box
                                        v-model="credentials.email"
                                        label="Email"
                                    ></v-text-field>

                                    <v-text-field
                                        :disabled="isSubmitting"
                                        :loading="isSubmitting"
                                        box
                                        v-model="credentials.password"
                                        :type="showPassword ? 'text' : 'password'"
                                        :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                        :append-icon-cb="() => { showPassword = !showPassword }"
                                        label="Password"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :disabled="isSubmitting" :loading="isSubmitting" type="submit" color="primary">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    layout: 'auth',

    asyncData(){
        return {
            showPassword: false,
            isSubmitting: false,
            errors: [],
            credentials: {
                email: '',
                password: ''
            }
        }
    },

    methods: {
        async OnFormSubmit(){
            this.isSubmitting = true;

            try {
                await this.$auth.login({
                    data: this.credentials
                });
            }catch(e){
                this.errors = [];
                this.errors.push(e.response.data.error);
            }

            this.isSubmitting = false;

        }
    }
}
</script>

