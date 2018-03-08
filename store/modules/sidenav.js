const state = () => {
    return {
        baseItems: [
            {
                type: 'link',
                label: 'Dashboard',
                url: '/',
                icon: 'home'
            },

            {
                type: 'sectionlabel',
                label: 'Dataobjects'
            },
            {
                type: 'divider'
            }
        ],

        items: []
    }
}

const getters = {
    ITEMS(state){
        return state.items
    }
}

const mutations = {
    SETITEMS(state, items){
        state.items = items
    },
    ADDITEMS(state, items){
        state.items = JSON.parse(JSON.stringify(state.baseItems));

        for(let x = 0; x < items.length; x++){
            if(state.items.indexOf(items[x]) !== -1) continue;
            state.items.push(items[x])
        }
    }
}

const actions = {
    async FetchItems({ commit }){
        let { models } = await this.$axios.$get('/api/v1/models');
        let items = [];

        for(let x = 0; x < models.length; x++){
            items.push({
                type: 'link',
                label: models[x].model_name,
                url: `/objects/${ models[x].model_slug }`,
                icon: 'fa-database'
            });
        }

        commit('ADDITEMS', items);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}