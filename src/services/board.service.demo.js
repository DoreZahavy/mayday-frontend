import { utilService } from './util.service.js'
import { userService } from './user.service.js'
export const boardService = {
    updateBoard
}

async function updateBoard(boardId, groupId, taskId, prop, toUpdate) {
    const activity = _buildActivity(prop)
    const board = await getById(boardId)

    if (taskId) {
        _modifyTask(board, activity, prop, toUpdate, groupId, taskId)
    
    } else if (groupId) {
        _modifyGroup(board, activity, prop, toUpdate, groupId)
       
    } else {
        _modifyBoard(board, activity, prop, toUpdate)

    }
    
    activity.updateTo = toUpdate
    board.activities.unshift(activity)
    return await saveBoard(board)
}

function _buildActivity() {
    return {
        id: utilService.makeId(),
        createdAt: Date.now(),
        byMember: userService.getLoggedinUser(),
        group: '',
        taskId: '',
        taskName: '',
        propType: prop
    }
}

function _modifyTask(board, activity, prop, toUpdate, groupId, taskId) {
    const group = board.groups.find(g => g._id === groupId)
    const task = group.tasks.find(t => t._id === taskId)
    activity.group = groupId
    activity.task = taskId
    activity.taskName = task.title
    activity.updateFrom = task[prop]
    task[prop] = toUpdate
}

function _modifyGroup(board, activity, prop, toUpdate, groupId) {
    activity.group = groupId
    const group = board.groups.find(g => g._id === groupId)
    activity.updateFrom = group[prop]
    group[prop] = toUpdate
}

function _modifyBoard(board, activity, prop, toUpdate) {
    activity.updateFrom = board[prop]
    board[prop] = toUpdate
}