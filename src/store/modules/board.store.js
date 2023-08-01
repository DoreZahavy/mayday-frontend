// import { boardService } from "@/services/board.service.js";
import { boardService } from "@/services/board.service.local.js";

export const boardStore = {
  strict: true,
  state() {
    return {
      board: {},
      boards: [],
      attachmentModal: '',
      updates: [],
      // cmpOrder: ["status", "priority", "members", "date"],
      // labels: ["status", "priority", "members", "date"]
    }
  },

  getters: {
    board({ board }) {
      return board
    },
    boardTitle({ board }) {
      return board?.title
    },
    miniBoard({ board }) {
      return { title: board?.title, desc: board?.desc, _id: board?._id }
    },
    boards({ boards }) {
      return boards
    },
    updates({ updates }) {
      return updates
    },
    boardMembers({ board }) {
      return board.members
    },
    attachmentModal({ attachmentModal }) {
      return attachmentModal
    },
    groups({ board }) {

      return board.groups
    },
    boardList({ boards }) {

      return boards.map(board => {
        return { title: board.title, _id: board._id }
      })
    },
    statusLabelConfig({ board }) {
      return JSON.parse(JSON.stringify(board.statusLabelConfig))
    },
    priorityLabelConfig({ board }) {
      return JSON.parse(JSON.stringify(board.priorityLabelConfig))
    },
    cmpOrder({ board }) {
      return board.cmpConfig.map(a => a.type)
    },
    labels({ board }) {
      return board.cmpConfig.map(a => a.title)
    },
  },

  mutations: {
    setBoardById(state, { boardId }) {
      console.log('boardId:', boardId)
      const board = state.boards.find(board => board._id === boardId)
      state.board = board
    },

    setBoard(state, { board }) {

      state.board = board
    },

    setBoards(state, { boards }) {
      state.boards = boards
    },

    removeBoard(state, { boardId }) {
      const boardIdx = state.boards.findIndex(b => b._id === boardId)
      state.boards.splice(boardIdx, 1)
    },

    saveBoard(state, { board }) {
      if(!board) return
      const boardIdx = state.boards.findIndex(b => b._id === board._id)
      state.boards.splice(boardIdx, 1, board)
      state.board = board

    },

    addBoard(state, { board }) {
      state.boards.push(board)
    },

    setGroupsOrder(state, { result }) {
      state.board.groups = result
    },

    setTaskOrder(state, { result, idx }) {
      state.board.groups[idx].tasks = result
    },

    setCmpConfig(state, { result }) {
      state.board.cmpConfig = result
    },
    fileModal(state, { file }) {
      state.attachmentModal = file
    },
    loadUpdates(state, { taskId }) {
      const groups = state.board.groups
      // console.log("🚀 ~ file: board.store.js:113 ~ loadUpdates ~ groups:", JSON.parse(JSON.stringify(state.board.groups)))
      let taskUpdates = ''
      groups.forEach(group => {
        const task = group.tasks.find(task => {
          return task._id === taskId
        })

        if (task) {
          taskUpdates = { ...task }
        }
      })
      state.updates = taskUpdates.updates
    },
    loadFirstBoard(state){
      state.board = state.boards[0]
    }

  },

  actions: {
    async applyDragGrp(context, { dragResult }) {
      const { groups } = context.state.board
      const { removedIndex, addedIndex, payload } = dragResult;

      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...groups];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      context.commit({ type: 'setGroupsOrder', result })
      try {
        await boardService.saveBoard(context.state.board)
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    async applyDragHeader(context, { dragResult }) {
      const { cmpConfig } = context.state.board
      const { removedIndex, addedIndex, payload } = dragResult
      let itemToAdd = payload;

      if (removedIndex === null && addedIndex === null) return;
      const result = [...cmpConfig]

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      context.commit({ type: 'setCmpConfig', result })
      try {
        await boardService.saveBoard(context.state.board)
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    async applyDragTask(context, { idx, dragResult }) {
      const arr = context.state.board.groups[idx].tasks
      const { removedIndex, addedIndex, payload } = dragResult;

      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      context.commit({ type: 'setTaskOrder', result, idx })

      try {
        if (idx === context.state.board.groups.length - 1) await boardService.saveBoard(context.state.board)
        else return
      } catch (err) {
        console.log(err)
        throw err
      }

    },

    async loadBoards(context) {
      try {
        console.log('loading')
        const boards = await boardService.query()
        context.commit({ type: "setBoards", boards })
        return boards
        // if(this.$route.params.boardId) context.commit({ type: "setBoardById", boardId })
        // context.commit({ type: "setBoard", board: boards[0] })
        // const boardId = this.$route.params.boardId
        // context.commit({ type: "setBoard", boardId })
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    async updateBoard(context, { boardId, groupId, taskId, prop, toUpdate }) {
      try {
        // if(!context.state.board._id) return 
        if (!boardId) boardId = context.state.board._id
        const board = await boardService.updateBoard(boardId, groupId, taskId, prop, toUpdate)
        context.commit({ type: "saveBoard", board })
        return board
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    async addBoard({ commit }) {
      try {
        const board = await boardService.addBoard()
        commit({ type: "addBoard", board })
        return board
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    async removeBoard({ commit }, { boardId }) {
      try {
        await boardService.removeBoard(boardId)
        commit({ type: "removeBoard", boardId })
        return Promise.resolve()
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    async addGroup(context) {
      console.log('adding')
      try {
        const boardId = context.state.board._id
        const board = await boardService.addGroup(boardId)
        console.log('board:', board)
        context.commit({ type: "saveBoard", board })
        return board
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    async removeGroup(context, { groupId }) {
      try {
        const boardId = context.state.board._id
        const board = await boardService.removeGroup(boardId, groupId)
        context.commit({ type: "saveBoard", board })
        return board
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    async addTask(context, { groupId, title }) {
      try {
        const boardId = context.state.board._id
        const board = await boardService.addTask(boardId, groupId, title)
        console.log(board)
        context.commit({ type: "saveBoard", board })
        console.log('board:', board)
        return board
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    async removeTask(context, { groupId, taskId }) {
      try {
        const boardId = context.state.board._id
        const board = await boardService.removeTask(boardId, groupId, taskId)
        context.commit({ type: "saveBoard", board })
        return board
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    // loadUpdates(context,{taskId}){
    //   context.state.board
    // }
  },
}
