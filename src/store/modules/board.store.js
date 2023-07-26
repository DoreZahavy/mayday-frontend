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
      return board.title
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
    cmpOrder({ board }) {
      // const cmpOrder = board.cmpConfig.map(a => a.type)
      const cmpOrder = board.cmpConfig.reduce((acc, currCmp) => {
        acc.push(currCmp.type)
        return acc
      }, [])
      return cmpOrder
    },
    labels({ board }) {
      // const labelOrder = board.cmpConfig.map(a => a.type)
      const labelOrder = board.cmpConfig.reduce((acc, currCmp) => {
        acc.push(currCmp.title)
        return acc
      }, [])
      return labelOrder
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
    saveBoard(state, { savedBoard }) {

      // if (savedBoard._id) {
      const boardIdx = state.boards.findIndex(b => b._id === savedBoard._id)
      state.boards.splice(boardIdx, 1, savedBoard)
      state.board = savedBoard
      // }
      //  else {
      //   state.boards.push(savedBoard)
      // }
    },
    addBoard(state, { newBoard }) {
      state.boards.push(newBoard)
    },
    setGroupsOrder(state, { result }) {
      state.board.groups = result
    },
    setTaskOrder(state, { result ,idx}) {
      state.board.groups[idx].tasks = result
    },
    setCmpConfig(state, { result }) {
      state.board.cmpConfig = result
    }

  },

  actions: {
    applyDragGrp(context, { dragResult }) {
      const arr = context.state.board.groups
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
      // state.board.groups = result
      context.commit({ type: 'setGroupsOrder', result })
    },
    applyDragHeader(context, { dragResult }) {
      // console.log('dragResult',dragResult)
      const arr = context.state.board.cmpConfig
      // console.log('arr:', arr)
      const { removedIndex, addedIndex,payload } = dragResult
      // console.log('removedIndex:', removedIndex)
      let itemToAdd = payload;

      if (removedIndex === null && addedIndex === null) return;
      const result = [...arr]//JSON.parse(JSON.stringify(arr))
      // console.log('result:', result)

      if (removedIndex !== null) {
        // cmpConfigArr.splice(removedIndex, 1)
        itemToAdd = result.splice(removedIndex, 1)[0];
        // console.log('result after splice:', result)
        // console.log('item:', item)
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      console.log('result:', result)
      context.commit({ type: 'setCmpConfig', result })

      // state.boards.cmpConfig = cmpConfigArr
    },
    applyDragTask(context, { idx, dragResult }) {
      // const arr = state.board[idx].tasks
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
      // state.board[idx].tasks = result
      // state.board.groups[idx].tasks = result
      context.commit({ type: 'setTaskOrder', result,idx })

    },

    async loadBoards(context) {
      try {
        const boards = await boardService.query()
        return context.commit({ type: "setBoards", boards })
      } catch {
        console.log(err)
        return Promise.reject()
      }
    },

    async saveBoard(context, { data }) {
      try {
        const savedBoard = await boardService.saveBoard(data, context.state.board._id)
        context.commit({ type: "saveBoard", savedBoard })
        return savedBoard
      } catch (err) {
        console.log(err)
        return Promise.reject()
      }
    },

    async addBoard({ commit }) {
      try {
        const newBoard = await boardService.addBoard()
        commit({ type: "addBoard", newBoard })
        return newBoard
      } catch (err) {
        console.log(err)
        return Promise.reject()
      }
    },

    async removeBoard({ commit }, { boardId }) {
      try {
        await boardService.removeBoard(boardId)
        commit({ type: "removeBoard", boardId })
        return Promise.resolve()
      } catch (err) {
        console.log(err)
        return Promise.reject()
      }
    },

    async saveGroup(context, { groupId, title }) {
      try {
        const savedBoard = await boardService.saveGroup(context.state.board._id, groupId, title)

        context.commit({ type: "saveBoard", savedBoard })
        return savedBoard
      } catch (err) {
        console.log(err)
        return Promise.reject()
      }
    },

    async removeGroup(context, { groupId }) {
      try {
        const savedBoard = await boardService.removeGroup(context.state.board._id, groupId)
        context.commit({ type: "saveBoard", savedBoard })
        return savedBoard
      } catch (err) {
        console.log(err)
        return Promise.reject()
      }
    },

    async saveTask(context, { groupId, taskData }) {
      try {
        const savedBoard = await boardService.saveTask(context.state.board._id, groupId, taskData)
        context.commit({ type: "saveBoard", savedBoard })
        return savedBoard
      } catch (err) {
        console.log(err)
        return Promise.reject()
      }
    },

    async removeTask(context, { groupId, taskId }) {
      try {

        const savedBoard = await boardService.removeTask(context.state.board._id, groupId, taskId)
        console.log('savedBoard:', savedBoard)
        context.commit({ type: "saveBoard", savedBoard })
        return savedBoard
      } catch (err) {
        console.log(err)
        return Promise.reject()
      }
    },

    async loadBoard({ commit }) {
      const boards = await boardService.query()
      commit({ type: 'setBoards', boards })
      commit({ type: 'setBoard', board: boards[0] })


    }
  },
}
