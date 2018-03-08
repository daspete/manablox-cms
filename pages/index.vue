<template>
  <div>bla</div>
</template>

<script>
export default {
    layout: 'cms',

    async fetch({ store }){
        await store.dispatch('sidenav/FetchItems')
    }
}
</script>

