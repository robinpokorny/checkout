import type { GetterTree, ActionTree, MutationTree } from 'vuex'

export interface RootState {}

export const state = (): RootState => ({})

export const getters: GetterTree<RootState, RootState> = {}

export const MutationType = {}

export const mutations: MutationTree<RootState> = {}

export const actions: ActionTree<RootState, RootState> = {}
