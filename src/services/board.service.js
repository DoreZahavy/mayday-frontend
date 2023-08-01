import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'



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
    const activity = {
        id: utilService.makeId(),
        createdAt: Date.now(),
        byMember: userService.getLoggedinUser(),
        group: '',
        task: '',
        propType: prop
    }
    const board = await getById(boardId)
    if (taskId) {
        activity.group = groupId
        activity.task = taskId
        const group = board.groups.find(g => g._id === groupId)
        const task = group.tasks.find(t => t._id === taskId)
        activity.updateFrom = task[prop]
        task[prop] = toUpdate
    } else if (groupId) {
        activity.group = groupId
        const group = board.groups.find(g => g._id === groupId)
        activity.updateFrom = group[prop]
        group[prop] = toUpdate
    } else {
        activity.updateFrom = board[prop]
        board[prop] = toUpdate
    }
    activity.updateTo = toUpdate
    board.activities.unshift(activity)
    return await saveBoard(board)
}

async function query() {
    return await httpService.get('board')

}

async function getById(boardId) {
    return httpService.get(`board/${boardId}`)
}

async function removeBoard(boardId) {
    return httpService.delete(`board/${boardId}`)
}

async function addBoard() {
    return httpService.post('board', getEmptyBoard())

}

async function saveBoard(board) {
    return httpService.put(`board/${board._id}`, board)

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
        members: [],
        desc: '',
        activities: []
    }
}

function getEmptyGroup() {
    return {
        _id: utilService.makeId(),
        title: 'New Group',
        color: '#007f00',
        minimized: false,
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
        dueDate: null
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


