const loginModule = {
    namespaced: true,
    state: {
      datas: [],
      isAdmin: false,
      Newdata: {
        email: '',
        password: ''
    },
    },
    getters:{      Newdata: state => state.Newdata,
      datas: state => state.datas,},
    mutations: {
      setDatas(state, datas) {
        state.datas = datas;
      },
      setNewdata(state, Newdata) {
        state.Newdata = Newdata;
      },
      setAdmin(state, value) {
        state.isAdmin = value;
        localStorage.setItem('isAdmin', value);
      },
      resetData(state) {
        state.Newdata = {
          email: "",
          password: "",
        };
      },
    },
    actions: {
      getDatasFromStorage({ commit }) {
        const datas = JSON.parse(localStorage.getItem('datas') || '[]');
        commit('setDatas', datas);
      },
      resetData({ commit }) {
        commit("resetData");
      },
      login({ commit, state }) {
          const matchedUser = state.datas.find(
            data => data.email === state.Newdata.email && data.password === state.Newdata.password
          );
          localStorage.setItem('user', JSON.stringify(matchedUser));
          if (matchedUser) {
            commit('setAdmin', matchedUser.email === 'admin@gmail.com'&& matchedUser.password== 'admin');
            return true;
          } else {
            return false;
          }
      },
    },
  };

  export default loginModule;
