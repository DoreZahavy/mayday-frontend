import { utilService } from './util.service.js'
import jsonBoards from '../../demo-board-v1.2.json'
import { storageService } from './async-storage.service.js'

const BOARD_KEY = 'boardDB'




export const boardService = {
    query,
    getById,
    removeBoard,
    saveBoard,
    addBoard,
    saveGroup,
    addGroup,
    removeGroup,
    saveTask,
    addTask,
    removeTask,
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask,
    
}



async function query() {
    let boards = await storageService.query(BOARD_KEY)
    if (!boards || !boards.length) {
        boards = jsonBoards
        utilService.saveToStorage(BOARD_KEY, boards)
    }
    return boards
    // return await storageService.query(BOARD_KEY)
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

async function saveBoard(board, boardId) {
    if (typeof board === 'string') {
        const boardToEdit = await getById(boardId)
        boardToEdit.title = board
    } else {

        return await storageService.put(BOARD_KEY, board)
    }
   
}

async function saveGroup(boardId, groupId, title) {
    const board = await getById(boardId)
    const groupIdx = board.groups.findIndex(g => g._id === groupId)
    const group =  board.groups[groupIdx]
    group.title = title
     return await saveBoard(board)
    // if (title) { // if received new title

    // } else { // add new group
    //     board.groups.push(getEmptyGroup())
    //     return await saveBoard(board)
    // }
}
async function addGroup(boardId) {
    const board = await getById(boardId)

        board.groups.push(getEmptyGroup())
        return await saveBoard(board)
    
}



async function removeGroup(boardId, groupId) {
    const board = await getById(boardId)
    const groupIdx = board.groups.findIndex(g => g._id === groupId)
    board.groups.splice(groupIdx, 1)
    return await saveBoard(board)
}

async function saveTask(boardId, groupId, taskData) {
    console.log("🚀 ~ file: board.service.local.js:105 ~ saveTask ~ taskData:", taskData)
    console.log('taskData:', taskData)

    const board = await getById(boardId)
    const group = board.groups.find(grp => grp._id === groupId)

    if (typeof taskData === 'string') { // add new task with received title
        group.tasks.push(getEmptyTask(taskData))
    } else { // update change
        const taskIdx = group.tasks.findIndex(t => t._id === taskData._id)
        if (taskData.cmpType === 'TaskTitle') {
            group.tasks[taskIdx].title = taskData.data
        } else {
            group.tasks[taskIdx].components[taskData.cmpType] = taskData.data
        }

    }
    return await saveBoard(board)
}

async function addTask(boardId,groupId,title){
    const board = await getById(boardId)
    const group = board.groups.find(grp => grp._id === groupId)
    group.tasks.push(getEmptyTask(title))
    return await saveBoard(board)
}

async function removeTask(boardId, groupId, taskId) {
    const board = await getById(boardId)
    console.log('board:', board)
    const group = board.groups.find(grp => grp._id === groupId)
    const taskIdx = group.tasks.findIndex(t => t._id === taskId)
    group.tasks.splice(taskIdx, 1)
    return await saveBoard(board)
}

function getEmptyBoard(title = 'New Board') {
    return {
        _id: utilService.makeId(),
        title,
        cmpConfig: [
            {
                type: "Status",
                title: "Status"
            },
            {
                type: "Priority",
                title: "Priority"
            },
            {
                type: "Person",
                title: "Person"
            },
            {
                type: "Date",
                title: "Date"
            },
            {
                type: "Timeline",
                title: "Timeline"
            },
            {
                type: "Numbers",
                title: "Numbers"
            },
            {
                type: "Txt",
                title: "Text"
            },
            {
                type: "Files",
                title: "Files"
            }
        ],
        groups: [getEmptyGroup()],
    }
}

function getEmptyGroup() {
    return {
        _id: utilService.makeId(),
        title: 'New Group',
        tasks: [],
    }
}

function getEmptyTask(title) {
    return {
        _id: utilService.makeId(),
        title,
        updates: [],
        components: [_getEmptyComponents()],
    }
}

function _getEmptyPersonComponent() {
    return {
        _id: '',
        fullname: '',
        imgUrl: ''
    }
}

function _getEmptyStatusComponent() {
    return { title: "", class: "default-gray" }
}

function _getEmptyPriorityComponent() {
    return { title: "", class: "default-gray" }
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

function _getEmptyNumbersComponent() {
    return 0
}

function _getEmptyTxtComponent() {
    return ''
}

function _getEmptyFilesComponent() {
    return []
}

function _getEmptyComponents() {
    return {
        Person: [_getEmptyPersonComponent()],
        Status: _getEmptyStatusComponent(),
        Priority: _getEmptyPriorityComponent(),
        Date: _getEmptyDateComponent(),
        Timeline: _getEmptyTimelineComponent(),
        Numbers: _getEmptyNumbersComponent(),
        Txt: _getEmptyTxtComponent(),
        Files: _getEmptyFilesComponent()
    }
}


