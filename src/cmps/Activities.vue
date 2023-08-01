<template>
    <section class="modal-content activity-modal">
        <h2>Activities</h2>
        <ul class="activity-list">
            <li class="activity-item" v-for="activity in activities" :key="activity.id">
                <span class="time-passed">{{ getTimePassed(activity.createdAt) }}</span>
                <img v-if="activity.byMember" :src="activity.byMember.imgUrl" class="user-image" alt="User" />
                <span v-else v-html="getSvg('person')"></span>
                <span class="task-name">{{ activity.taskName }}</span>
                <span class="activity-type-icon" v-html="getSvg('plusSign')"></span>
                <span class="activity-type">{{
                    activity.propType }}</span>
                <span class="changed-from">{{ activity.updateFrom }}</span>
                <span class="changed-into">{{ activity.updateTo }}</span>
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
    overflow: scroll;
    font-weight: 300;
    letter-spacing: 0.8px;
    padding-top: 15px;
}

.activity-list {
    list-style: none;
    padding: 0;
}

.activity-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;

    .time-passed {
        width: 80px;
    }

    .user-image {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .guest {
        width: 90px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
        background-color: #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
    }

    .task-name,
    .activity-type,
    .changed-from,
    .changed-into {
        flex-grow: 1;
        text-align: center;
    }
}
</style>