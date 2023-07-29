<template>
    <article style="position: relative; height: 100%; width: 100%; text-align: center;" class="date-container timeline fs15"
        :class="{ hovered: !isDateNull && hovered }" @mouseover="onMouseOver" @mouseout="onMouseOut">
        <div class="flex justify-center align-center" style="height:100%; width: 100%;">
            <span v-if="!hovered"
                style="position:absolute; z-index:1; width:100%; text-align:center; color: #fff; font-weight: 400;">{{
                    formattedStartDate }}<span v-if="formattedDueDate !== ''"> - </span>{{ formattedDueDate }}</span>
            <span v-else
                style="position:absolute; z-index:1; width:100%; text-align:center; color: #fff; font-weight: 400;">{{
                    totalDays }}</span>
            <div class="progress-bar">
                <div class="progress-fill" :style="progressStyle"></div>
            </div>
        </div>
        <el-date-picker style="position: absolute; left:0; top: 0; width: 100%; height: 125%; z-index: 25;"
            v-model="pickedDateTimeRange" type="daterange" ref="datePicker">
        </el-date-picker>
        <div v-if="!isDateNull" class="reset-text" @click="clearTimeline">
            <span class="x-icon" v-html="getSvg('xButton')">
            </span>
        </div>
    </article>
</template>

<script>
import { svgService } from '../../services/svg.service'

export default {
    name: "Timeline",
    props: {
        info: Object,
        groupColor: String
    },
    data() {
        return {
            currDateSettings: this.info,
            hovered: false,
            pickedDateTimeRange: []
        }
    },
    created() {
        this.pickedDateTimeRange = [this.currDateSettings?.startDate, this.currDateSettings?.dueDate]
    },
    computed: {
        formattedStartDate() {
            if (this.isDateNull) {
                return '-'
            }
            const d = new Date(this.pickedDateTimeRange[0])
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            return `${monthNames[d.getMonth()]} ${d.getDate()}${this.isDifferentYear ? `, '${d.getFullYear().toString().slice(-2)}` : ''}`
        },
        formattedDueDate() {
            if (this.isDateNull) return ''
            const d1 = new Date(this.pickedDateTimeRange[0])
            const d2 = new Date(this.pickedDateTimeRange[1])
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
                const start = new Date(this.pickedDateTimeRange[0])
                const end = new Date(this.pickedDateTimeRange[1])
                return Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1 + 'd'
            }
        },
        progress() {
            if (!this.pickedDateTimeRange || this.pickedDateTimeRange.length === 0 || this.isDateNull) {
                return 100
            }

            const now = new Date()
            const start = new Date(this.pickedDateTimeRange[0])
            const end = new Date(this.pickedDateTimeRange[1])

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
                    backgroundColor: this.groupColor
                }
            }
        },
        isDateNull() {
            return this.currDateSettings?.startDate === null || this.currDateSettings?.dueDate === null
        },
        isDifferentYear() {
            const start = new Date(this.pickedDateTimeRange[0])
            const end = new Date(this.pickedDateTimeRange[1])
            return start.getFullYear() !== end.getFullYear()
        },
    },
    watch: {
        pickedDateTimeRange(newValue) {
            if (newValue && newValue[0] && newValue[1]) {
                this.currDateSettings = {
                    startDate: newValue[0].valueOf(),
                    dueDate: newValue[1].valueOf()
                }
                this.$emit('update',
                    {
                        startDate: newValue[0].valueOf(),
                        dueDate: newValue[1].valueOf()
                    }
                )
            } else {
                this.currDateSettings = {
                    startDate: null,
                    dueDate: null
                }
                this.$emit('update', this.currDateSettings)
            }
        },
    },
    methods: {
        onMouseOver() {
            this.hovered = true
        },
        onMouseOut() {
            this.hovered = false
        },
        clearTimeline() {
            this.currDateSettings = {
                startDate: null,
                dueDate: null
            }
            this.$emit('update',
                {
                    startDate: null,
                    dueDate: null
                }
            )
        },
        getSvg(name) {
            return svgService.getSvg(name)
        }
    }
}
</script>

<style scoped>
.progress-bar {
    position: absolute;
    right: 1.52em;
    z-index: 0;
    width: 70%;
    height: 1.6em;
    background-color: #333;
    border: none;
    overflow: hidden;
    border-radius: 20px;
}

.date-container.hovered .progress-fill {
    filter: brightness(70%);
}

.progress-fill {
    height: 100%;
}
</style>
