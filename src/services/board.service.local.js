import { utilService } from './util.service.js'
import jsonBoards from '@/data/demo-board-v1.2.json'
import { storageService } from './async-storage.service.js'

const BOARD_KEY = 'boardDB'

export const boardService = {
    query,
    getById,
    removeBoard,
    saveBoard,
    addBoard,
    addGroup,
    removeGroup,
    addTask,
    removeTask,
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask,
    updateBoard
}

async function updateBoard(boardId, groupId, taskId, prop, toUpdate) {
    const board = await getById(boardId)
    if (taskId) {
        const group = board.groups.find(g => g._id === groupId)
        const task = group.tasks.find(t => t._id === taskId)
        task[prop] = toUpdate
    } else if (groupId) {
        const group = board.groups.find(g => g._id === groupId)
        group[prop] = toUpdate
    } else (
        board[prop] = toUpdate
    )
    return await saveBoard(board)
}

async function query() {
    let boards = await storageService.query(BOARD_KEY)
    if (!boards || !boards.length) {
        boards = jsonBoards
        utilService.saveToStorage(BOARD_KEY, boards)
    }
    // console.log('boards:', boards)
    return boards
}

async function getById(boardId) {
    return await storageService.get(BOARD_KEY, boardId)
}

async function removeBoard(boardId) {
    return await storageService.remove(BOARD_KEY, boardId)
}

async function addBoard() {
    return await storageService.post(BOARD_KEY, getEmptyBoard())
}

async function saveBoard(board) {
    return await storageService.put(BOARD_KEY, board)
}

async function addGroup(boardId) {
    const board = await getById(boardId)
    board.groups.push(getEmptyGroup())
    return await saveBoard(board)
}

async function removeGroup(boardId, groupId) {
    // console.log('boardId,groupId:', boardId, groupId)
    const board = await getById(boardId)
    const groupIdx = board.groups.findIndex(g => g._id === groupId)
    board.groups.splice(groupIdx, 1)
    return await saveBoard(board)
}

async function addTask(boardId, groupId, title) {
    const board = await getById(boardId)
    const group = board.groups.find(grp => grp._id === groupId)
    group.tasks.push(getEmptyTask(title))
    // console.log(getEmptyTask(title))
    return await saveBoard(board)
}

async function removeTask(boardId, groupId, taskId) {
    const board = await getById(boardId)
    // console.log('board:', board)
    const group = board.groups.find(grp => grp._id === groupId)
    const taskIdx = group.tasks.findIndex(t => t._id === taskId)
    group.tasks.splice(taskIdx, 1)
    return await saveBoard(board)
}

function getEmptyBoard(title = 'New Board') {
    return {
        _id: utilService.makeId(),
        title,
        statusLabelConfig: [
            {
                title: "Done",
                color: "done-green"
            },
            {
                title: "Working on it",
                color: "working-orange"
            },
            {
                title: "Stuck",
                color: "stuck-red"
            },
            {
                title: "Almost there",
                color: "dark-blue"
            },
            {
                title: "",
                color: "default-gray"
            }
        ],
        priorityLabelConfig: [
            {
              title: "Low",
              color: "low-blue"
            },
            {
              title: "Medium",
              color: "medium-purple"
            },
            {
              title: "High",
              color: "high-dark-purple"
            },
            {
              title: "Critical ⚠",
              color: "critical-dark-gray"
            },
            {
              title: "",
              color: "default-gray"
            }
          ],
        cmpConfig: [
            {
                type: 'Status',
                title: 'Status'
            },
            {
                type: 'Priority',
                title: 'Priority'
            },
            {
                type: 'Members',
                title: 'Person'
            },
            {
                type: 'Date',
                title: 'Date'
            },
            {
                type: 'Timeline',
                title: 'Timeline'
            },
            {
                type: 'Number',
                title: 'Numbers'
            },
            {
                type: 'Text',
                title: 'Text'
            },
            {
                type: 'Attachments',
                title: 'Files'
            }
        ],
        groups: [getEmptyGroup()],
    }
}

function getEmptyGroup() {
    return {
        _id: utilService.makeId(),
        title: 'New Group',
        color: '#007f00',
        minimized:true,
        tasks: [],
    }
}

function getEmptyTask(title) {
    return {
        _id: utilService.makeId(),
        title,
        updates: [],
        Members: [_getEmptyMembersComponent()],
        Status: _getEmptyStatusComponent(),
        Priority: _getEmptyPriorityComponent(),
        Date: _getEmptyDateComponent(),
        Timeline: _getEmptyTimelineComponent(),
        Number: _getEmptyNumberComponent(),
        Text: _getEmptyTextComponent(),
        Attachments: _getEmptyAttachmentsComponent()
        // components: [_getEmptyComponents()],
    }
}

function _getEmptyMembersComponent() {
    return {
        _id: '',
        fullname: '',
        imgUrl: ''
    }
}

function _getEmptyStatusComponent() {
    return { title: '', color: 'default-gray' }
}

function _getEmptyPriorityComponent() {
    return { title: '', color: 'default-gray' }
}

function _getEmptyDateComponent() {
    return null
}

function _getEmptyTimelineComponent() {
    return {
        startDate: null,
        dueDate: null,
        isHourIncluded: false
    }
}

function _getEmptyNumberComponent() {
    return null
}

function _getEmptyTextComponent() {
    return ''
}

function _getEmptyAttachmentsComponent() {
    return []
}

function _getEmptyComponents() {
    return {
        Members: [_getEmptyMembersComponent()],
        Status: _getEmptyStatusComponent(),
        Priority: _getEmptyPriorityComponent(),
        Date: _getEmptyDateComponent(),
        Timeline: _getEmptyTimelineComponent(),
        Number: _getEmptyNumberComponent(),
        Text: _getEmptyTextComponent(),
        Attachments: _getEmptyAttachmentsComponent()
    }
}


