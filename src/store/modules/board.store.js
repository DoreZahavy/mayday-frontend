// import { boardService } from "@/services/board.service.js";
import { boardService } from "@/services/board.service.local.js";

export const boardStore = {
  strict: true,
  state() {
    return {
      board: {},
      boards: [],
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
    boards({ boards }) {
      return boards
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
      return board.cmpConfig.map(a => a.type)
    },
  },

  mutations: {
    setBoardById(state, { boardId }) {
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

      const boardIdx = state.boards.findIndex(b => b._id === board._id)
      state.boards.splice(boardIdx, 1, board)
      // state.board = board

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
        await boardService.saveBoard(context.state.board)
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    async loadBoards(context) {
      try {
        const boards = await boardService.query()
        context.commit({ type: "setBoards", boards })
        context.commit({ type: "setBoard", board:boards[0] })
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    async saveBoard(context, { data }) {
      try {
        const boardId = context.state.board._id
        const board = await boardService.saveBoard(data, boardId)
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

    async saveGroup(context, { groupId, title }) {
      try {
        const boardId = context.state.board._id
        const board = await boardService.saveGroup(boardId, groupId, title)
        context.commit({ type: "saveBoard", board })
        return board
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    async addGroup(context) {
      try {
        const boardId = context.state.board._id
        const board = await boardService.addGroup(boardId)
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

    async saveTask(context, { groupId, taskData }) {
      try {
        const boardId = context.state.board._id
        const board = await boardService.saveTask(boardId, groupId, taskData)
        context.commit({ type: "saveBoard", board })
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

    // async loadBoards({ commit }) {
    //   const boards = await boardService.query()
    //   commit({ type: 'setBoards', boards })
    //   commit({ type: 'setBoard', board: boards[0] })


    // }
  },
}
