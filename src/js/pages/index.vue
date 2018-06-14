<template lang="html">
    <div class="app">
        <h1>Latest posts</h1>

        <ul>
            <li v-for="(post, index) in posts" :key="index">
                <nuxt-link :to="post.fields.slug">{{ post.fields.title }}</nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
import client from '../plugins/contentful';

export default {
    asyncData() {
        return client.getEntries({
            content_type: 'blogPost'
        })
            .then((response) => {
                return {posts: response.items};
            })
            .catch(console.error);
    },
    head: {
        title: 'Latest Posts'
    }
};
</script>
