<template lang="html">
    <div class="app" v-if="post">
        <h1>{{ post.fields.title }}</h1>
        <div>
            {{ post.fields.content }}
        </div>
    </div>
</template>

<script>
import client from '../plugins/contentful';

export default {
    asyncData({ params, error, payload }) {
        if (payload) return { post: payload };

        return client.getEntries({
            content_type: 'blogPost',
            'fields.slug': params.slug
        }).then((response) => {
            return {
                post: response.items[0]
            };
        }).catch(console.error);
    },
    head() {
        return {
            title: 'Test'
        };
    }
};
</script>
