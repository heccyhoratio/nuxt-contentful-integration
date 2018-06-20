<template lang="html">
    <div v-if="currentPost.content" class="c-single-post">
        <h1 class="c-single-post__title">{{ currentPost.title }}</h1>
        <div>
            {{ currentPost.content }}
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        currentPost() {
            return this.$store.state.blogposts.currentPost;
        }
    },
    async fetch({ store, params }) {
        await store.dispatch('blogposts/getSinglePost', params.slug);
    },
    head() {
        return {
            title: this.currentPost.title
        };
    }
};
</script>
