const userModule = {
  namespaced: true,
  state: {
    datas: [],
    isAdmin: false,
    Newdata: {
      name: "",
      email: "",
      password: "",
    },
  },
  getters: {
    Newdata: (state) => state.Newdata,
    datas: (state) => state.datas,
  },
  mutations: {
    setDatas(state, datas) {
      state.datas = datas;
    },
    setNewdata(state, Newdata) {
      state.Newdata = Newdata;
    },
    addData(state) {
      state.datas.unshift(state.Newdata);
    },
    setAdmin(state, value) {
      state.isAdmin = value;
      localStorage.setItem("isAdmin", value);
    },
    resetData(state) {
      state.Newdata = {
        name: "",
        email: "",
        password: "",
      };
    },
  },
  actions: {
    getDatasFromStorage({ commit }) {
      const datas = JSON.parse(localStorage.getItem("datas") || "[]");
      commit("setDatas", datas);
    },
    resetData({ commit }) {
      commit("resetData");
    },
    addData({ commit, state }) {
      if (state.datas.some((data) => data.email === state.Newdata.email)) {
        return false;
      }

      const dataWithId = {
        id: Date.now(),
        ...state.Newdata,
      };

      const updatedDatas = [dataWithId, ...state.datas];
      commit(
        "setAdmin",
        state.Newdata.email === "admin@gmail.com" &&
          state.Newdata.password == "admin"
      );
      localStorage.setItem("datas", JSON.stringify(updatedDatas));
      localStorage.setItem("user", JSON.stringify(state.Newdata));
      commit("addData", dataWithId);
      return true;
    },
  },
};

export default userModule;
