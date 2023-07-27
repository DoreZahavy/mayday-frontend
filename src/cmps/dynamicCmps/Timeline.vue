<template>
    <article class="timeline">
        <p @click="openDatePicker">
            {{ formattedStartDate }} - {{ formattedDueDate }}
        </p>
        <el-date-picker v-model="pickedDateTimeRange" type="datetimerange" unlink-panels range-separator="to"
            start-placeholder="Start Date" end-placeholder="Due Date" @change="onDateTimeChange" ref="datePicker"
            v-if="isDatePickerVisible" @hide="isDatePickerVisible = false" />
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
            pickedDateTimeRange: [this.info.startDate, this.info.dueDate],
            isDatePickerVisible: false
        }
    },
    computed: {
        formattedStartDate() {
            const d = new Date(this.pickedDateTimeRange[0])
            return `${d.getDate()}/${d.getMonth() + 1}`
            //  ${d.getHours()}:00`
        },
        formattedDueDate() {
            const d = new Date(this.pickedDateTimeRange[1])
            return `${d.getDate()}/${d.getMonth() + 1}`
            //  ${d.getHours()}:00
        }
    },
    methods: {
        onDateTimeChange(date) {
            this.$emit('update', {
                cmpType: 'Timeline',
                data: {
                    startDate: date[0].valueOf(),
                    dueDate: date[1].valueOf(),
                    isHourIncluded: true
                }
            })
            this.isDatePickerVisible = false
        },
        openDatePicker() {
            this.isDatePickerVisible = true
        }
    }
}
</script>
