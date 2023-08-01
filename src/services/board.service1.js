import { utilService } from "./util.service"

import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'

const sampleBoard = [
  {
    id: utilService.makeId(),
    color: "red",
    tasks: [
      {
        id: utilService.makeId(),
        side: "null",
        tasktTitle: "learn CSS",
        members: [
          { name: "din", color: "red" },
          { name: "yona", color: "black" },
          { name: "dore", color: "green" },
        ],
        date: "27-02-2022",
        status: "IN WORK",
        priority: "LOW",
      },
      {
        id: utilService.makeId(),
        side: "null",
        tasktTitle: "learn vue",
        members: [
          { name: "din", color: "red" },
          { name: "yona", color: "black" },
          { name: "dore", color: "green" },
        ],
        date: "27-02-2022",
        status: "STUCK",
        priority: "LOW",
      },
      {
        id: utilService.makeId(),
        side: "null",
        tasktTitle: "learn js",
        members: [
          { name: "din", color: "red" },
          { name: "yona", color: "black" },
          { name: "dore", color: "green" },
        ],
        date: "27-02-2022",
        status: "DONE",
        priority: "LOW",
      },
    ],
  },
  {
    id: utilService.makeId(),
    color: "blue",
    tasks: [
      {
        id: utilService.makeId(),
        side: "null",
        tasktTitle: "drag and drop it",
        members: [
          { name: "din", color: "red" },
          { name: "yona", color: "black" },
          { name: "dore", color: "green" },
        ],
        date: "27-02-2022",
        status: "IN WORK",
        priority: "LOW",
      },
      {
        id: utilService.makeId(),
        side: "null",
        tasktTitle: "do all tasks",
        members: [
          { name: "din", color: "red" },
          { name: "yona", color: "black" },
          { name: "dore", color: "green" },
        ],
        date: "27-02-2022",
        status: "STUCK",
        priority: "LOW",
      },
      {
        id: utilService.makeId(),
        side: "null",
        tasktTitle: "wash dishes",
        members: [
          { name: "din", color: "red" },
          { name: "yona", color: "black" },
          { name: "dore", color: "green" },
        ],
        date: "27-02-2022",
        status: "DONE",
        priority: "LOW",
      },
    ],
  },
  {
    id: utilService.makeId(),
    color: "green",
    tasks: [
      {
        id: utilService.makeId(),
        side: "null",
        tasktTitle: "Driver license",
        members: [
          { name: "din", color: "red" },
          { name: "yona", color: "black" },
          { name: "dore", color: "green" },
        ],
        date: "27-02-2022",
        status: "IN WORK",
        priority: "LOW",
      },
      {
        id: utilService.makeId(),
        side: "null",
        tasktTitle: "walk the dog",
        members: [
          { name: "din", color: "red" },
          { name: "yona", color: "black" },
          { name: "dore", color: "green" },
        ],
        date: "27-02-2022",
        status: "STUCK",
        priority: "LOW",
      },
      {
        id: utilService.makeId(),
        side: "null",
        tasktTitle: "coding power",
        members: [
          { name: "din", color: "red" },
          { name: "yona", color: "black" },
          { name: "dore", color: "green" },
        ],
        date: "27-02-2022",
        status: "DONE",
        priority: "LOW",
      },
    ],
  },
]



export const boardService = {
  getBoard,
  query,
	getById,
	remove,
	save,
	addToyMsg,
	removeToyMsg,
	getEmptyBoard,
	getEmptyGroup,
	getEmptyTask,
}

function getBoard() {
  return sampleBoard
}

async function query(filterBy) {
	return await httpService.get('toy',filterBy)
}

async function getById(toyId) {
	return httpService.get(`toy/${toyId}`)
}

async function remove(toyId) {
	return httpService.delete(`toy/${toyId}`)
}

async function save(toy) {
	if (toy._id) {
		return httpService.put(`toy/${toy._id}`, toy)
	}
	return httpService.post('toy', toy)
}

async function addToyMsg(toyId,txt){
	return await httpService.post(`toy/${toyId}/msg`,{txt})
}

async function removeToyMsg(toyId,msgId){
	return await httpService.delete(`toy/${toyId}/msg/${msgId}`)
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