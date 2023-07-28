<template>
    <article style=" position: relative; height: 100%; width: 100%; text-align: center;" class="date-container">
        <div class="flex justify-center align-center" style="height:100%; position:relative;">
            <span style="position:absolute; z-index:1; width:100%; text-align:center; color: black; font-weight: 400;">{{
                formattedStartDate }} - {{ formattedDueDate }}</span>
            <!-- <progress max="100" :value="progress" style="position:absolute; z-index:0; width:70%; height:125%;"></progress> -->
        </div>
        <el-date-picker style="position: absolute; left:0; top: 0; width: 100% height: 100%; z-index: 25;"
            v-model="pickedDateTimeRange" type="datetimerange" @change="onDateTimeChange" ref="datePicker">
        </el-date-picker>
    </article>
</template>

<script>
export default {
    name: "Timeline",
    props: {
        info: Object
    },
    data() {
        return {
            currDateSettings: this.info,
            pickedDateTimeRange: [this.info?.startDate, this.info?.dueDate], //TODO:give default value for new tasks
        }
    },
    computed: {
        formattedStartDate() {
            const d = new Date(this.pickedDateTimeRange[0])
            return `${d.getDate()}/${d.getMonth() + 1}`
            // ${d.getHours()}:00`
        },
        formattedDueDate() {
            const d = new Date(this.pickedDateTimeRange[1])
            return `${d.getDate()}/${d.getMonth() + 1}`
            // ${d.getHours()}:00`
        },
        progress() {
            const now = new Date()
            const start = new Date(this.pickedDateTimeRange[0])
            const end = new Date(this.pickedDateTimeRange[1])

            now.setHours(0, 0, 0, 0)
            start.setHours(0, 0, 0, 0)
            end.setHours(0, 0, 0, 0)

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
        color() {
            return { background: this.group.color }
        }
    },
    methods: {
        onDateTimeChange(date) {
            this.currDateSettings = {
                startDate: date[0].valueOf(),
                dueDate: date[1].valueOf(),
                isHourIncluded: true
            }
            console.log(this.currDateSettings)
            this.$emit('update',
                {
                    startDate: date[0].valueOf(),
                    dueDate: date[1].valueOf(),
                    isHourIncluded: true
                }
            )
        }
    }
}
</script>
