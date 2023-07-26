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
    groups({ board }) {

      return board.groups
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
    setBoard(state, { board }) { 

      state.board = board
    },
    applyDragGrp(state, { dragResult }) {
      const arr = state.board.groups
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
      state.board.groups = result
    },
    applyDragHeader(state, { dragResult }) {
      // const cmpArr = [...state.cmpOrder];
      // const labelArr = [...state.labels];
      const cmpConfigArr = [...state.board.cmpConfig]

      const { removedIndex, addedIndex } = dragResult;

      if (removedIndex === null && addedIndex === null) return;

      let itemToAdd = cmpConfigArr[removedIndex]
      let itemToAddCmp = cmpArr[removedIndex];
      let itemToAddLabel = labelArr[removedIndex];

      if (removedIndex !== null) {
        cmpConfigArr.splice(removedIndex, 1)
        // cmpArr.splice(removedIndex, 1);
        // labelArr.splice(removedIndex, 1);
      }
      if (addedIndex !== null) {
        cmpConfigArr.splice(addedIndex, 0, itemToAddCmp);
        // cmpArr.splice(addedIndex, 0, itemToAddCmp);
        // labelArr.splice(addedIndex, 0, itemToAddLabel);
      }
      state.boards.cmpConfig = cmpConfigArr
      // state.cmpOrder = cmpArr;
      // state.labels = labelArr;
    },
    applyDragTask(state, { idx, dragResult }) {
      // const arr = state.board[idx].tasks
      const arr = state.board.groups[idx].tasks
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
      state.board.groups[idx].tasks = result
    },
    removeBoard(state, { boardId }) {
      const boardIdx = state.boards.findIndex(b => b._id === boardId)
      state.boards.splice(boardIdx, 1)
    },
    saveBoard(state, { savedBoard }) {
      if (savedBoard._id) {
        const boardIdx = state.boards.findIndex(b => b._id === savedBoard._id)
        state.boards.splice(boardIdx, 1, savedBoard)
        state.board = savedBoard
      } else {
        state.boards.push(savedBoard)
      }
    },
    setBoards(state, { boards }) {
      state.boards = boards
    }
  },

  actions: {
    async loadBoards(context) {
      try {
        const boards = await boardService.query()
        return context.commit({ type: "setBoards", boards })
      } catch {
        console.log(err)
        return Promise.reject()
      }
    },

    async saveBoard({ commit }, { boardToSave }) {
      try {
        const savedBoard = await boardService.saveBoard(boardToSave)
        commit({ type: "saveBoard", savedBoard })
        return savedBoard
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
    // async addTask({commit}, {  groupId, task }) {
    //   try {
    //     const savedBoard = await boardService.addTask(this.board._id, groupId, task)
    //     commit({ type: "saveBoard", savedBoard })
    //     return savedBoard
    //   } catch (err) {
    //     console.log(err)
    //     return Promise.reject()
    //   }
    // },

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

    async loadJson({ commit }) {
      const boards = await boardService.loadJson()
      commit({ type: 'setBoards', boards })
      commit({ type: 'setBoard', board:boards[0] })


    }
  },
}
