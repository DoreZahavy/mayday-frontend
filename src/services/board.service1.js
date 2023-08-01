import { utilService } from "./util.service"

import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'


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