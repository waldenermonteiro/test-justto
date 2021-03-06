/* eslint-disable no-useless-catch */
import UserService from '../services/UserService'

const list = async ({ commit }, params) => {
  try {
    const { data } = await UserService.list(params)
    commit('SET_DATA', data)
  } catch (error) {
    await error
  }
}
const create = async ({ commit }, obj) => {
  try {
    await UserService.create(obj)
  } catch (error) {
    throw error
  }
}
const update = async ({ commit }, obj) => {
  try {
    await UserService.update(obj, obj.id)
  } catch (error) {
    throw error
  }
}
const remove = async ({ commit }, obj) => {
  try {
    await UserService.remove(obj._id)
  } catch (error) {
    throw error
  }
}
export default {
  list,
  create,
  update,
  remove
}
