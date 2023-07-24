import { boardService } from "@/services/board.service.js";

export const dataStore = {
  strict: true,
  state() {
    return {
      groups: boardService.getGroups(),
      cmpOrder: ["side", "tasktTitle", "status", "priority", "members", "date"],
      labels: [null, "task", "status", "priority", "members", "date"]
    }
  },

  getters: {
    groups({ groups }) {
      return groups;
    },
    cmpOrder({ cmpOrder }) {
      return cmpOrder;
    },
    labels({ labels }) {
      return labels;
    }
  },

  mutations: {
    applyDragGrp(state, { dragResult }) {
      const arr = state.groups
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
      state.groups = result
    },
    applyDragHeader(state, { dragResult }) {
      const cmpArr = [...state.cmpOrder];
      const labelArr = [...state.labels];

      const { removedIndex, addedIndex } = dragResult;

      if (removedIndex === null && addedIndex === null) return;

      let itemToAddCmp = cmpArr[removedIndex];
      let itemToAddLabel = labelArr[removedIndex];

      if (removedIndex !== null) {
        cmpArr.splice(removedIndex, 1);
        labelArr.splice(removedIndex, 1);
      }
      if (addedIndex !== null) {
        cmpArr.splice(addedIndex, 0, itemToAddCmp);
        labelArr.splice(addedIndex, 0, itemToAddLabel);
      }
      state.cmpOrder = cmpArr;
      state.labels = labelArr;
    },
    applyDragTask(state, { idx, dragResult }) {
      const arr = state.groups[idx].tasks
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
      state.groups[idx].tasks = result
    },
  },

  actions: {
  },
}
