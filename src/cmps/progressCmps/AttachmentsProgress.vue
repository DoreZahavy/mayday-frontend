<template>
    <article>
        <pre>{{ files }}</pre>
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
import AttachmentPreview from '../AttachmentPreview.vue'

export default {

    name: "AttachmentsProgress",
    props: {
        group: Object,
       
    },
    data(){
        return {
            // files:this.getFiles()
        }
    },
    methods: {
        openModal(file) {
            this.$store.commit({ type: 'fileModal', file })
            
        },
        getFiles() {
            var files = []
            this.info.tasks.forEach(task => {
                // files.concat([1,2,3])
                files.concat(task.Attachments)
            })
            return files
        }
    },
    computed: {
        files() {
            var files = []
            // for (var i = 0; i < this.group.tasks.length; i++) {
            //     files = files.concat(this.group.tasks[i].Attachments)
            // }
            this.group.tasks.forEach(task => {
                files = files.concat(task.Attachments)
                // files.concat([1,2,3])
            })
            return files
            // return this.group.tasks[0].Attachments
        },
        components:{
            AttachmentPreview
        }
    }


}
</script>