<template>
    <article class="attachments-progress">
        <!-- <pre>{{ files }}</pre> -->
        <div class="file-list flex align-center" v-if="files.length > 4">
            <AttachmentPreview @click.stop="openModal(files[0])" :file="files[0]" class="file-preview" />
            <AttachmentPreview @click.stop="openModal(files[1])" :file="files[1]" class="file-preview" />
            <AttachmentPreview @click.stop="openModal(files[2])" :file="files[2]" class="file-preview" />
            <!-- <div class="file-preview">

                    <img :src="files[0]">
                </div>
                <div class="file-preview">

                    <img :src="files[1]">
                </div>
                <div class="file-preview">

                    <img :src="files[2]">
                </div> -->
            <div class="extra-files">+{{ files.length - 3 }}</div>
        </div>
        <div v-else-if="files.length > 0" class="file-list flex align-center">
            <AttachmentPreview v-for="file in files" @click.stop="openModal(file)" :file="file" class="file-preview" />

            <!-- <div class="file-preview" v-for="fileUrl in files">
                    <img :src="fileUrl">
                </div> -->
        </div>
    </article>
</template>
<!-- v-if="files.length > 4"
v-else-if="files.length > 0" -->
<script>
import AttachmentPreview from '../AttachmentPreview.vue'

export default {

    name: "AttachmentsProgress",
    props: {
        group: Object,

    },
    data() {
        return {
            // files: this.getFiles()
        }
    },
    methods: {
        openModal(file) {
            this.$store.commit({ type: 'fileModal', file })

        },
        getFiles() {
            var files = []
            this.group.tasks.forEach(task => {
                files = files.concat(task.Attachments)
            })
            return files
        }
    },
    computed: {
        files() {
            var files = []
            this.group.tasks.forEach(task => {
                files = files.concat(task.Attachments)
            })
            return files
        },
    },
    components: {
        AttachmentPreview
    }


}
</script>