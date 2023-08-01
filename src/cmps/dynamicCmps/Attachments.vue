<template>
    <article class="attachments">
        <el-tooltip placement="bottom" trigger="click" effect="light">
            <!-- <span v-if="files.length > 0" class="icon plus-icon-left" v-icon="'plusSign'"></span> -->

            <template #content>
                <ul class="file-pill-list clean-list">

                    <li v-for="file in files">

                        <!-- <span v-if="isPdf(file)" class="x-btn" v-icon="'pdf'"></span>
                        <span v-if="isImage(file)" class="x-btn" v-icon="'imgFile'"></span>
                        <span v-if="isVideo(file)" class="x-btn" v-icon="'video'"></span> -->
                        <p>{{ file }}</p>
                        <span @click="removeFile(member._id)" class="x-btn" v-icon="'xButton'"></span>
                    </li>
                </ul>
                <label class="from-computer" @drop.prevent="handleFile" @dragover.prevent="handleFile">
                    <span v-icon="'attachment'"></span>
                    <p>From Computer</p>
                    <!-- <div class="from-computer">
                    </div> -->
                    <input type="file" @change="handleFile" hidden>
                </label>
            </template>
            <!-- <div >
                <span class="icon file-icon" v-icon="'file'"></span>
                <span class="icon plus-icon" v-icon="'plusSign'"></span>
    
            </div> -->
            <!-- </label> -->



            <div class="file-list flex align-center" v-if="files.length > 4">


                <AttachmentPreview @click.stop="openModal(files[0])" :file="files[0]" class="file-preview" />
                <AttachmentPreview @click.stop="openModal(files[1])" :file="files[1]" class="file-preview" />
                <AttachmentPreview @click.stop="openModal(files[2])" :file="files[2]" class="file-preview" />

                <div class="extra-files">+{{ files.length - 3 }}</div>
            </div>
            <div class="file-list flex align-center" v-else-if="files.length > 0">

                <AttachmentPreview v-for="file in files" @click.stop="openModal(file)" :file="file" class="file-preview" />

                <!-- <div class="file-preview" v-for="fileUrl in files">
                    <img :src="fileUrl">
                </div> -->
            </div>

            <!-- </label> -->
            <div v-if="!files.length">
                <span class="icon file-icon" v-icon="'file'"></span>
                <span class="icon plus-icon" v-icon="'plusSign'"></span>

            </div>
        </el-tooltip>


        <div v-if="info.length" @click="handleFile"
            style="position: absolute; left: 2em; bottom: -0.35em; margin-bottom: 20px;height: 10px;">
            <span class="icon plus-icon" v-icon="'plusSign'"></span>
        </div>


    </article>
</template>
  
<script>
import { uploadService } from '../../services/upload.service'
import AttachmentPreview from '../AttachmentPreview.vue'

export default {

    name: "Attachments",
    props: {
        info: Array,
    },
    data() {
        return {
            files: this.info
        }
    },
    methods: {

        async handleFile(ev) {
            const res = await uploadService.uploadImg(ev)
            this.files.push(res.url)
            this.$emit('update', this.files)

        },
        openModal(file) {
            this.$store.commit({ type: 'fileModal', file })
        },
        getExtension(file) {

            var parts = file.split('.')
            return parts[parts.length - 1]
        },


    },
    computed: {
        isImage(file) {
            var ext = this.getExtension(file)
            switch (ext.toLowerCase()) {
                case 'jpg':
                case 'gif':
                case 'bmp':
                case 'png':
                    return true
            }
            return false
        },
        isVideo(file) {
            var ext = this.getExtension(file)
            switch (ext.toLowerCase()) {
                case 'm4v':
                case 'avi':
                case 'mpg':
                case 'mp4':
                    return true
            }
            return false
        },
        isPdf(file) {
            var ext = this.getExtension(file)
            if (ext.toLowerCase() === 'pdf') return true
            return false
        },
        hasFiles() {
            return (this.info[0]?._id)
        },
    },
    components: {
        AttachmentPreview
    }

}
</script>
