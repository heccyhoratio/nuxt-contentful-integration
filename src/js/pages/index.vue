<template lang="html">
    <div class="app">
        <h1>Latest posts</h1>
        <ul>
            <li v-if="posts" v-for="(post, index) in posts" :key="index">
                <nuxt-link :to="post.fields.slug">{{ post.fields.title }}</nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    computed: {
        posts() {
            return this.$store.state.blogposts.posts;
        }
    },
    async fetch({ store, params }) {
        await store.dispatch('blogposts/getPosts', params.slug);
    },
    head: {
        title: 'Latest Posts'
    }
};
</script>
