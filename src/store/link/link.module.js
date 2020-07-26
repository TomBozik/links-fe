import LinkApi from "@/apis/Link";

export const link = {
  namespaced: true,
  state: {
    links: null,
    loading: false,
    loadingError: false,
    pagination: null,
    meta: null,
  },

  // actions
  actions: {
    getLinks({ commit }, page) {
      commit('LOADING_START');
      return LinkApi.getLinks(this.state.category.actualCategory, page).then(
        response => {
          commit('GET_LINKS_SUCCESS', response);
          commit('LOADING_END');
        },
        () => {
          commit('LOADING_END');
          commit('LOADING_ERROR');
        }
      );
    },

    createLink({commit, dispatch}, form){
      form = Object.assign({'category_id': this.state.category.actualCategory}, form);
      return LinkApi.createLink(form).then(
        response => {
          commit('CREATE_LINK_SUCCESS', response);
          dispatch('getLinks', 1);
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    updateLink({commit, dispatch}, form){
      return LinkApi.updateLink(form).then(
        response => {
          commit('UPDATE_LINK_SUCCESS', response);
          dispatch('getLinks', 1);
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    deleteLink({commit, dispatch}, id){
      return LinkApi.deleteLink(id).then(
        response => {
          commit('DELETE_LINK_SUCCESS', response);
          dispatch('getLinks', 1);
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }

  },


  // mutations
  mutations: {
    GET_LINKS_SUCCESS(state, response) {
      state.links = response.data.data;
      state.pagination = response.data.links;
      state.meta = response.data.meta;
    },
    GET_LINKS_FAILURE(state) {
      state.links = null;
    },

    CREATE_LINK_SUCCESS(state, response) {
      state.links.push(response.data.data);
    },
    UPDATE_LINK_SUCCESS(state, response) {
      state.links = state.links.filter(obj => obj.id !== response.data.data.id); 
      state.links.push(response.data.data);
    },
    DELETE_LINK_SUCCESS(state, id) {
      state.links = state.links.filter(obj => obj.id !== id); 
    },

    LOADING_START(state){
      state.links = null;
      state.loadingError = false;
      state.loading = true;
    },
    LOADING_END(state){
      state.loading = false;
    },
    LOADING_ERROR(state){
      state.loading = false;
      state.loadingError = true;
    }
  }
}

