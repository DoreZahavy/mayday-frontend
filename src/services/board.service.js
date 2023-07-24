import { utilService } from "./util.service"

const groups = [
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
  getGroups
}

function getGroups() {
  return groups
}