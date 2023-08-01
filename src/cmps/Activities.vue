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
                    class="activity-type-icon" v-html="getSvg('statusActivity')"></span>
                <span v-else-if="activity.propType.toLowerCase() === 'number'" class="activity-type-icon"
                    v-html="getSvg('numberActivity')"></span>
                <span v-else-if="activity.propType.toLowerCase() === 'date'" class="activity-type-icon"
                    v-html="getSvg('dateActivity')"></span>
                <span v-else-if="activity.propType.toLowerCase() === 'timeline'" class="activity-type-icon"
                    v-html="getSvg('timelineActivity')"></span>
                <span v-else-if="activity.propType.toLowerCase() === 'text' || activity.propType.toLowerCase() === 'title'"
                    class="activity-type-icon" v-html="getSvg('textActivity')"></span>
                <span v-else-if="activity.propType.toLowerCase() === 'attachments'" class="activity-type-icon"
                    v-html="getSvg('attachmentsActivity')"></span>
                <span v-else-if="activity.propType.toLowerCase() === 'person'" class="activity-type-icon"
                    v-html="getSvg('personActivity')"></span>

                <span class="activity-type"
                    :title="activity.propType.charAt(0).toUpperCase() + activity.propType.slice(1)">{{
                        activity.propType.charAt(0).toUpperCase() + activity.propType.slice(1) }}</span>
                <span class="changed-from"
                    :title="typeof activity.updateFrom === 'number' || typeof activity.updateFrom === 'string' ? activity.updateFrom : ''">{{
                        activity.updateFrom }}</span>
                <span
                    v-if="activity.propType.toLowerCase() === 'status' || activity.propType.toLowerCase() === 'priority' || activity.propType.toLowerCase() === 'timeline'">></span>
                <span v-else> </span>
                <span class="changed-into"
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
}
</style>