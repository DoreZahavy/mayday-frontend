<template>
    <section class="modal-content activity-modal">
        <h2>Activities</h2>
        <ul class="activity-list">
            <li class="activity-item" v-for="activity in activities" :key="activity.id">
                <span><span v-html="getSvg('activityTime')"></span><span class="time-passed"> {{
                    getTimePassed(activity.createdAt) }}</span></span>
                <img v-if="activity.byMember" :src="activity.byMember.imgUrl" class="user-image" alt="User" />
                <span v-else v-html="getSvg('person')"></span>
                <span class="task-name" :title="activity.taskName.charAt(0).toUpperCase() + activity.taskName.slice(1)">{{
                    activity.taskName }}</span>
                <span v-if="activity.propType.toLowerCase() === 'status' || activity.propType.toLowerCase() === 'priority'"
                    class="activity-type-icon" v-icon="'statusActivity'"></span>
                <span v-else-if="activity.propType.toLowerCase() === 'number'" class="activity-type-icon"
                    v-icon="'numberActivity'"></span>
                <span v-else-if="activity.propType.toLowerCase() === 'date'" class="activity-type-icon"
                    v-icon="'dateActivity'"></span>
                <span v-else-if="activity.propType.toLowerCase() === 'timeline'" class="activity-type-icon"
                    v-icon="'timelineActivity'"></span>
                <span v-else-if="activity.propType.toLowerCase() === 'text' || activity.propType.toLowerCase() === 'title'"
                    class="activity-type-icon" v-icon="'textActivity'"></span>
                <span v-else-if="activity.propType.toLowerCase() === 'attachments'" class="activity-type-icon"
                    v-icon="'attachmentsActivity'"></span>
                <span v-else-if="activity.propType.toLowerCase() === 'person'" class="activity-type-icon"
                    v-icon="'personActivity'"></span>

                <span class="activity-type"
                    :title="activity.propType.charAt(0).toUpperCase() + activity.propType.slice(1)">{{
                        activity.propType.charAt(0).toUpperCase() + activity.propType.slice(1) }}</span>
                <span v-if="activity.propType.toLowerCase() === 'date'">
                    {{ formatDate(activity.updateFrom) }}
                </span>
                <span v-else-if="activity.propType.toLowerCase() === 'number'">
                    {{ formatNumber(activity.updateFrom) }}
                </span>
                <span v-else-if="activity.propType.toLowerCase() === 'timeline'">
                    <div class="flex justify-center align-center timeline-container">
                        <span class="timeline-text">
                            {{ formattedStartDate(activity.updateFrom.startDate) }}<span
                                v-if="formattedDueDate(activity.updateFrom.startDate, activity.updateFrom.dueDate) !== ''">
                                - </span>{{ formattedDueDate(activity.updateFrom.startDate, activity.updateFrom.dueDate) }}
                        </span>
                        <div class="progress-bar progress-bar-from">
                            <div :style="progressStyle(activity.updateFrom.startDate, activity.updateFrom.dueDate)"></div>
                        </div>
                    </div>
                </span>
                <span
                    v-else-if="activity.propType.toLowerCase() === 'status' || activity.propType.toLowerCase() === 'priority'">
                    <div class="activity-status" :class="activity.updateFrom.color">
                        <span class="activity-status-text">{{ activity.updateFrom.title }}</span>
                    </div>
                </span>
                <span v-else class="changed-from"
                    :title="typeof activity.updateFrom === 'number' || typeof activity.updateFrom === 'string' ? activity.updateFrom : ''">{{
                        activity.updateFrom }}</span>


                <span
                    v-if="activity.propType.toLowerCase() === 'status' || activity.propType.toLowerCase() === 'priority' || activity.propType.toLowerCase() === 'timeline'"
                    v-html="getSvg('activityArrow')" class="activity-arrow"
                    :class="{ 'activity-arrow-status-priority': activity.propType.toLowerCase() === 'status' || activity.propType.toLowerCase() === 'priority' }"></span>
                <span v-else> </span>


                <span v-if="activity.propType.toLowerCase() === 'date'">
                    {{ formatDate(activity.updateTo) }}
                </span>
                <span v-else-if="activity.propType.toLowerCase() === 'number'">
                    {{ formatNumber(activity.updateTo) }}
                </span>
                <span v-else-if="activity.propType.toLowerCase() === 'timeline'">
                    <div class="flex justify-center align-center timeline-container">
                        <span class="timeline-text">
                            {{ formattedStartDate(activity.updateTo.startDate) }}<span
                                v-if="formattedDueDate(activity.updateTo.startDate, activity.updateTo.dueDate) !== ''"> -
                            </span>{{ formattedDueDate(activity.updateTo.startDate, activity.updateTo.dueDate) }}
                        </span>
                        <div class="progress-bar progress-bar-to">
                            <div :style="progressStyle(activity.updateTo.startDate, activity.updateTo.dueDate)"></div>
                        </div>
                    </div>
                </span>
                <span
                    v-else-if="activity.propType.toLowerCase() === 'status' || activity.propType.toLowerCase() === 'priority'">
                    <div class="activity-status" :class="activity.updateTo.color">
                        <span class="activity-status-text">{{ activity.updateTo.title }}</span>
                    </div>
                </span>
                <span v-else class="changed-into"
                    :title="typeof activity.updateTo === 'number' || typeof activity.updateTo === 'string' ? activity.updateTo : ''">{{
                        activity.updateTo }}</span>
            </li>
        </ul>
    </section>
</template>

<script>
import { svgService } from '../services/svg.service'
export default {
    props: {
        boardId: String
    },
    data() {
        return {
        }
    },
    computed: {
        activities() {
            const board = this.$store.getters.boards.find(board => board._id === this.boardId)
            if (board && board.activities) {
                return board.activities
            } else {
                return []
            }
        },
    },
    methods: {
        getTimePassed(timestamp) {
            const now = Date.now()
            const difference = now - timestamp
            const seconds = difference / 1000
            const minutes = seconds / 60
            const hours = minutes / 60
            const days = hours / 24

            if (seconds < 60) return 'now'
            if (minutes < 60) return `${Math.floor(minutes)}m`
            if (hours < 24) return `${Math.floor(hours)}h`
            return `${Math.floor(days)}d`
        },
        formatDate(timestamp) {
            const date = new Date(timestamp)
            const options = { month: 'short', day: 'numeric', year: 'numeric' }
            return date.toLocaleDateString('en-US', options)
        },
        formatNumber(number) {
            return Number(number).toLocaleString()
        },
        formatTimeline(start, end) {
            return `${start} - ${end}`
        },
        progressStyle(start, end) {
            return {
                width: this.progress(start, end) + '%',
                backgroundColor: '#333'
            }
        },
        progress(start, end) {
            const now = new Date()
            const startTime = new Date(start).getTime()
            const endTime = new Date(end).getTime()

            const duration = endTime - startTime
            const elapsed = now.getTime() - startTime

            if (now.getTime() < startTime) {
                return 0
            } else if (now.getTime() > endTime) {
                return 100
            } else {
                return Math.round((elapsed / duration) * 100)
            }
        },
        formattedStartDate(timestamp) {
            const d = new Date(timestamp)
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            return `${monthNames[d.getMonth()]} ${d.getDate()}`
        },
        formattedDueDate(start, end) {
            if (!start || !end) return ''
            const d1 = new Date(start)
            const d2 = new Date(end)
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            if (d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()) {
                return ''
            } else if (d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()) {
                return `${d2.getDate()}`
            } else if (d1.getFullYear() === d2.getFullYear()) {
                return `${monthNames[d2.getMonth()]} ${d2.getDate()}`
            } else {
                return `${monthNames[d2.getMonth()]} ${d2.getDate()}, '${d2.getFullYear().toString().slice(-2)}`
            }
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        }
    },
    created() {
    }
}
</script>

<style lang="scss">
.modal-content {
    background-color: #fff;
    color: #323338;
    width: 100%;
    max-height: 70vh;
    overflow-y: auto;
    font-weight: 300;
    letter-spacing: 0.8px;
    padding-top: 15px;
}

.activity-list {
    list-style: none;
    padding: 0;
    margin-top: 13px;
}

.activity-item {
    display: grid;
    grid-template-columns: 1.5fr 1fr 5fr 0.6fr 2fr 3fr 0.2fr 3fr;
    gap: 4px;
    padding: 15px;
    border-bottom: 1px solid #e0e0e0;

    .time-passed,
    .task-name,
    .activity-type-icon,
    .activity-type,
    .changed-from,
    .changed-into {
        text-align: left;
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .time-passed {
        width: 1em;
        letter-spacing: 0.001px;
    }

    .user-image,
    .guest {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 10px;
        background-color: #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
    }

    .timeline-container {
        position: relative;
        height: 1.6em;
        width: 100%;
        text-align: center;
    }

    .timeline-text {
        position: absolute;
        z-index: 1;
        max-width: 80%;
        text-align: center;
        color: #fff;
        font-weight: 400;
        font-size: 0.8em;
    }

    .progress-bar {
        position: absolute;
        z-index: 0;
        width: 90%;
        height: 1.6em;
        border: none;
        overflow: hidden;
        border-radius: 20px;

        &.progress-bar-from {
            background-color: #e2445b;
        }

        &.progress-bar-to {
            background-color: #0286c3;
        }
    }

    .activity-status {
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 80%;
        margin-left: 0.87em;
        height: 3.2em;
        border-radius: 3px;
        font-size: 0.95em;
        font-weight: 400;
        color: #fff;

        .activity-status-text {
            width: 80%;
            text-align: center;
            overflow-x: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    .activity-arrow {
        margin-top: 4.5px;
    }

    .activity-arrow-status-priority {
        margin-top: 12.5px;
    }
}
</style>