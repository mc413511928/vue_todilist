import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'aaa',
    nextId: 5,
    rowkey: 'all'
  },
  mutations: {
    initList (state, step) {
      state.list = step
    },
    setInputValue (state, value) {
      state.inputValue = value
    },
    addItem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    deleteDate (state, id) {
      const index = state.list.findIndex(t => t.id === id)
      state.list.splice(index, 1)
    },
    changeStatus (state, step) {
      const f = state.list.find(t => t.id === step.id)
      f.done = step.status
    },
    handleChange (state, step) {
      state.rowkey = step
    },
    unchanged (state) {
      state.list = state.list.filter(t => t.done === false)
    }
  },
  actions: {
    async getList (context) {
      const { data: res } = await axios.get('/list.json')
      context.commit('initList', res)
    }

  },
  getters: {
    undoneStatus (state) {
      const unDon = state.list.filter(t => !t.done)
      return unDon.length
    },
    infoList (state) {
      if (state.rowkey === 'all') {
        return state.list
      } if (state.rowkey === 'undone') {
        return state.list.filter(t => !t.done)
      } if (state.rowkey === 'done') {
        return state.list.filter(t => t.done === true)
      }
    }

  },
  modules: {
  }
})
