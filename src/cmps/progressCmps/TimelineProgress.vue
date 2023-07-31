<template>
    <article v-if="group" style="position: relative; height: 100%; width: 100%; text-align: center; overflow:hidden;"
        class="overall-timeline fs16" :class="{ hovered: !isDateNull && hovered }" @mouseover="onMouseOver"
        @mouseout="onMouseOut">
        <div class="flex justify-center align-center" style="position: relative; height:100%; width: 100%;">
            <span v-if="!hovered"
                style="position:absolute; z-index:1; width:100%; text-align:center; color: #fff; font-weight: 400;">{{
                    formattedStartDate }}<span v-if="formattedDueDate !== ''"> - </span>{{ formattedDueDate }}</span>
            <span v-else
                style="position:absolute; z-index:1; width:100%; text-align:center; color: #fff; font-weight: 400;">{{
                    totalDays }}</span>
            <div class="overall-progress-bar">
                <div class="overall-progress-fill" :style="progressStyle"></div>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    name: "OverallTimeline",
    props: {
        group: Object
    },
    data() {
        return {
            earliestStartDate: null,
            latestDueDate: null,
            hovered: false
        }
    },
    mounted() {
        this.calculateTimeline()
    },
    computed: {
        formattedStartDate() {
            if (this.isDateNull) return '-'
            const d = new Date(this.earliestStartDate)
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            return `${monthNames[d.getMonth()]} ${d.getDate()}${this.isDifferentYear ? `, '${d.getFullYear().toString().slice(-2)}` : ''}`
        },
        formattedDueDate() {
            if (this.isDateNull) return ''
            const d1 = new Date(this.earliestStartDate)
            const d2 = new Date(this.latestDueDate)
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
        totalDays() {
            if (this.isDateNull && !this.hovered) {
                return '-'
            } else if (this.isDateNull && this.hovered) {
                return 'Set Dates'
            } else {
                const start = new Date(this.earliestStartDate)
                const end = new Date(this.latestDueDate)
                return Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1 + 'd'
            }
        },
        progress() {
            if (this.isDateNull) {
                return 100
            }

            const now = new Date()
            const start = new Date(this.earliestStartDate)
            const end = new Date(this.latestDueDate)

            const nowTime = now.getTime()
            const startTime = start.getTime()
            const endTime = end.getTime()

            const duration = endTime - startTime
            const elapsed = nowTime - startTime

            if (nowTime < startTime) {
                return 0
            } else if (nowTime > endTime) {
                return 100
            } else {
                return Math.round((elapsed / duration) * 100)
            }
        },
        progressStyle() {
            if (this.isDateNull) {
                return {
                    width: this.progress + '%',
                    backgroundColor: '#c4c4c4'
                }
            } else {
                return {
                    width: this.progress + '%',
                    backgroundColor: this.group.color
                }
            }
        },
        isDateNull() {
            return this.earliestStartDate === null || this.latestDueDate === null
        },
        isDifferentYear() {
            const start = new Date(this.earliestStartDate)
            const end = new Date(this.latestDueDate)
            return start.getFullYear() !== end.getFullYear()
        }
    },
    methods: {
        calculateTimeline() {
            this.group.tasks.forEach(task => {
                const startDate = task.Timeline?.startDate
                const dueDate = task.Timeline?.dueDate

                if (startDate && (!this.earliestStartDate || startDate < this.earliestStartDate)) {
                    this.earliestStartDate = startDate
                }

                if (dueDate && (!this.latestDueDate || dueDate > this.latestDueDate)) {
                    this.latestDueDate = dueDate
                }
            })
        },
        onMouseOver() {
            this.hovered = true
        },
        onMouseOut() {
            this.hovered = false
        }
    }
}
</script>

<style scoped>
.overall-timeline:hover .progress-fill {
    filter: brightness(70%);
    z-index: 999999999999999999999999999;
}

.overall-progress-bar {
    position: absolute;
    z-index: 0;
    width: 70%;
    height: 66%;
    background-color: #333;
    border: none;
    overflow: hidden;
    border-radius: 20px;
}

.overall-progress-fill {
    height: 100%;
}
</style>
