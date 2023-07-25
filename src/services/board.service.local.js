import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOARD_KEY = 'boardDB'

// fetch("@/data/boards.json")
// .then(response => {
//    return response.json();
// })
// .then(data => {
//     _createBoards(data)
// });

// const boards = utilService.readJsonFile('data/boards.json')

    _createBoards()

export const boardService = {
    query,
    getById,
    removeBoard,
    saveBoard,
    saveGroup,
    removeGroup,
    saveTask,
    removeTask,
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask,
}

function query() {
    return storageService.query(BOARD_KEY)
}

function getById(boardId) {
    return storageService.get(BOARD_KEY, boardId)
}

function removeBoard(boardId) {
    return storageService.remove(BOARD_KEY, boardId)
}

function saveBoard(board) {
    if (board._id) {
        return storageService.put(BOARD_KEY, board)
    } else {
        return storageService.post(BOARD_KEY, board)
    }
}

async function saveGroup(boardId, group) {
    const board = getById(boardId)
    if (group._id) {
        const groupIdx = board.groups.findIndex(g => g._id === group._id)
        board.groups.splice(groupIdx, 1, group)
        return await saveBoard(board)
    } else {
        board.groups.push(group)
        return await saveBoard(board)
    }
}
async function removeGroup(boardId, groupId) {
    const board = getById(boardId)
    const groupIdx = board.groups.findIndex(g => g._id === groupId)
    board.groups.splice(groupIdx, 1)
    return await saveBoard(board)
}

async function saveTask(boardId, groupId, task) {
    const board = getById(boardId)
    const group = board.groups.find(grp => grp._id === groupId)
    if (task._id) {
        const taskIdx = group.tasks.findIndex(t => t._id === task._id)
        group.tasks.splice(taskIdx, 1, task)
        return await saveBoard(board)
    } else {
        group.tasks.push(task)
        return await saveBoard(board)
    }
}

async function removeTask(boardId, groupId, taskId) {
    const board = getById(boardId)
    const group = board.groups.find(grp => grp._id === groupId)
    const taskIdx = group.tasks.findIndex(t => t._id === taskId)
    group.tasks.splice(taskIdx, 1)
    return await saveBoard(board)
}

function getEmptyBoard() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: false,
    }
}

function _createBoards() {
    const boards = storageService.query(BOARD_KEY)
  if (!boards || !boards.length) {
      boards = utilService.readJsonFile('data/boards.json')
      utilService.saveToStorage(BOOK_KEY, boards)
  }
}

function getEmptyBoard() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: false,
    }
}
function getEmptyGroup() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: false,
    }
}
function getEmptyTask() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: false,
    }
}

function _createBoard(name, price) {
    return {
        _id: utilService.makeId(),
        name,
        price,
        labels: [
            { title: 'Doll', color: '#6d28d9' },
            { title: 'Battery Powered', color: '#71717a' },
            { title: 'Baby', color: '#2563eb' },
        ],
        createdAt: Date.now(),
        inStock: true,
    }
}