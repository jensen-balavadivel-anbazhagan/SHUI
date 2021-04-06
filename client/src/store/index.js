import Vue from 'vue'
import Vuex from 'vuex'
const config = require('../assets/config.json');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    streams: [],
    token: '',
    userName: [],
    message: '',
    tags: [],

  },
  mutations: {
    updateToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token)
    },
    displayStreams(state, streams) {
      state.streams = streams;
    },
    addStream(state, stream) {
      state.streams.push(stream)
    },
    registerUser(state, userName) {
      state.userName = userName;
    },
    deleteUser(state) {
      state.streams = [];
      state.tags = [];
    },
    deleteStream(state, id) {
      const index = state.streams.find((stream) => stream.id === id)
      state.streams.splice(index, 1)
      console.log(this.state.streams)
    },
    deleteAllStreams(state) {
      state.streams = []
    },
    addTag(state, newTag) {
      state.tags.push(newTag);
    },
    displayTags(state, tags) {
      state.tags = tags
    },
    deleteTag(state, tagIndex) {
      state.tags.splice(tagIndex, 1)
      console.log(this.state.tags)
    },
    deleteAllTags(state) {
      state.tags = []
    }
  },
  actions: {
    async registerUser(ctx, userDetails) {
      console.log(userDetails)
      const response = await fetch(config.userDBURl+'/register', {
        method: 'POST',
        body: JSON.stringify(userDetails),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log(data)
      ctx.commit('registerUser', data.userName);
    },
    async login(ctx, userDetails) {
      console.log(userDetails)
      const response = await fetch(config.userDBURl+'/login', {
        method: 'POST',
        body: JSON.stringify(userDetails),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log(data)
      ctx.commit('updateToken', data.token);
    },
    async deleteUser(ctx) {
      const response = await fetch(config.userDBURl+'/userDelete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + ctx.state.token,
        }
      });
      const data = await response.json();
      console.log(data)
      ctx.commit('deleteUser', data.message);
    },
    
    async loadStreams(ctx) {
      const response = await fetch(config.streamsDBURl+'/streams', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + ctx.state.token,
        }
      });
      const data = await response.json();
      console.log(data)
      ctx.commit('displayStreams', data.streams);
    },
    async addStream(ctx, newStream) {
      console.log(newStream)
      const response = await fetch(config.streamsDBURl+'/streams', {
        method: 'POST',
        body: JSON.stringify(newStream),
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + ctx.state.token,
        }
      });

      const data = await response.json();
      console.log(data)
      ctx.commit('addStream', data.newStream);
    },
    async deleteStream(ctx, streamId) {
      const response = await fetch(config.streamsDBURl+'/stream/', {
        method: 'DELETE',
        body: JSON.stringify(streamId),
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + ctx.state.token,
        }
      });

      const data = await response.json();
      console.log(data)
      ctx.commit('deleteStream', data.id);
    },
    async deleteAllStreams(ctx) {
      const response = await fetch(config.streamsDBURl+'/streams/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + ctx.state.token,
        }
      });

      const data = await response.json();
      console.log(data)
      ctx.commit('deleteAllStreams', data.message);
    },

    async addTag(ctx, tagDetails) {
      const response = await fetch(config.userDBURl+'/addtag', {
        method: 'POST',
        body: JSON.stringify(tagDetails),
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + ctx.state.token,
        }
      })
      const data = await response.json();
      console.log(data)
      ctx.commit('addTag', data.newTag)
    },
    async loadTags(ctx) {
      const response = await fetch(config.userDBURl+'/tags', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + ctx.state.token,
        }
      });
      const data = await response.json();
      console.log(data)
      ctx.commit('displayTags', data.tags);
    },
    async deleteTag(ctx, tagInfo) {
      const response = await fetch(config.userDBURl+'/tag', {
        method: 'DELETE',
        body: JSON.stringify(tagInfo),
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + ctx.state.token,
        }
      });
      const data = await response.json();
      console.log(data)
      ctx.commit('deleteTag', data.index);
    },
    async deleteAllTags(ctx) {
      const response = await fetch(config.userDBURl+'/tags', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + ctx.state.token,
        }
      });
      const data = await response.json();
      console.log(data)
      ctx.commit('deleteAllTags', data.message);
    }

  },
  modules: {
  }
})
