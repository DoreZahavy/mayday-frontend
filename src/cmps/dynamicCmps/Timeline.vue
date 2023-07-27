<template>
    <article style=" position: relative; height: 100%; width: 100%; text-align: center;" class="date-container">
        <div class="flex justify-center align-center" style="height:100%">
            <span>{{ formattedStartDate }} - {{ formattedDueDate }}</span>
        </div>
        <el-date-picker v-model="pickedDateTimeRange" type="datetimerange" @change="onDateTimeChange" ref="datePicker">
        </el-date-picker>
    </article>
</template>

<script>
export default {
    name: "Timeline",
    props: {
        info: Object,
    },
    data() {
        return {
            currDateSettings: this.info,
            pickedDateTimeRange: [this.info.startDate, this.info.dueDate],
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
