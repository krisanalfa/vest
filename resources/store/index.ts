import * as Vuex from "vuex";

interface IState {
  message: string;
}

export const state = (): IState => ({
  message: "Welcome",
});

export const getters: Vuex.GetterTree<IState, IState> = {
  //
};

export const mutations: Vuex.MutationTree<IState> = {
  //
};

export const actions: Vuex.ActionTree<IState, IState> = {
  //
};
