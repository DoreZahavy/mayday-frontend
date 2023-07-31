<template>
    <article>
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
        <div class="file-list flex align-center" v-else-if="files.length > 0">
            <AttachmentPreview v-for="file in files" @click.stop="openModal(file)" :file="file" class="file-preview" />

            <!-- <div class="file-preview" v-for="fileUrl in files">
                    <img :src="fileUrl">
                </div> -->
        </div>
    </article>
</template>
  
<script>

export default {

    name: "AttachmentsProgress",
    props: {
        group: Object,
        cmpOrder: Array
    },
    methods: {
        openModal(file) {
            this.$store.commit({ type: 'fileModal', file })
        },
    },
    computed: {
        files() {
            var files = []
            group.tasks.forEach(task => {
                files.concat(task.files)
            })
            console.log('files:', files)
            return files
        }
    }


}
</script>