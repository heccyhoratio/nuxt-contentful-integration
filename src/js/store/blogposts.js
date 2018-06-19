import client from '../plugins/contentful';

export const state = () => {
    return {
        posts: {},
        currentPost: {
            title: 'Loading'
        }
    };
};

export const mutations = {
    setPosts(state, payload) {
        state.posts = payload;
    },
    setCurrentPost(state, payload) {
        state.currentPost = payload.fields;
    }
};

export const actions = {
    async getSinglePost({commit}, slug) {
        await client.getEntries({
            content_type: 'blogPost',
            'fields.slug': slug
        }).then((response) => {
            commit('setCurrentPost', response.items[0]);
        }).catch(console.error);
    },
    async getPosts({commit}) {
        await client.getEntries({
            content_type: 'blogPost'
        }).then((response) => {
            commit('setPosts', response.items);
        }).catch(console.error);
    }
};
