
export default {
  namespaced: true,
  state () {
    return {
      chatRecords: []
    }
  },
  mutations: {
    addChatRecords (state, chatRecord) {
      const id = new Date().getTime() + Math.random().toString(36).substr(2)
      chatRecord.id = id
      state.chatRecords.push(chatRecord)
    },
    removeLastChatRecords (state) {
      state.chatRecords.pop()
    }
  },
  actions: {
  },
  getters: {
    getChatRecords (state) {
      return state.chatRecords
    },
    getQuestionByAnswer: (state) => (ansId) => {
      let ansIndex = 0
      state.chatRecords.forEach((item, index) => {
        if (item.id === ansId) ansIndex = index
      })
      if (ansIndex === 0) return ''
      return state.chatRecords[ansIndex - 1].chatRecord
    }
  }
}
