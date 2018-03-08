'use strict'

require('dotenv').config();

module.exports = {
    env: {

    },

    head: {
        titleTemplate: '%s',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]
    },

    render: {
        etag: { strong: true },
        bundleRenderer: {
            shouldPreload: (file, type) => {
                return ['script', 'style', 'font'].includes(type)
            }
        }
    },

    css: [],

    router: {
        middleware: []
    },

    build: {
        
        babel: {
            plugins: [
                ["transform-imports", {
                    "vuetify": {
                        "transform": "vuetify/es5/components/${member}",
                        "preventFullImport": true
                    }
                }]
            ]
        },

        extractCSS: true,

        cssSourceMap: false,

        extend(config, ctx){
            if(ctx.isServer){
                config.externals = []
            }
        }
    },

    generate: {
        routes: []
    },

    modules: [
        '@nuxtjs/font-awesome',
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        'manablox-ui'
    ],

    plugins: [

    ],

    auth: {
        endpoints: {
            login: {
                url: '/api/v1/auth/login',
                method: 'post',
                propertyName: 'token'
            },
            logout: {
                url: '/api/v1/auth/logout',
                method: 'get'
            },
            user: {
                url: '/api/v1/auth/me',
                method: 'get',
                propertyName: 'user'
            }
        },

        token: {
            type: 'Bearer',
            name: 'token'
        },

        cookie: {
            name: 'token',
            options: {
                path: '/'
            }
        },

        fetchUserOnLogin: false,

        redirect: {
            login: '/login',
            home: '/'
        }

    }


};

