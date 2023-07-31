<template>
    <article class="attachments">
        <label @drop.prevent="handleFile" @dragover.prevent="handleFile">
            <input type="file" @change="handleFile" hidden>
        <!-- </label> -->
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
            <div v-else>
                <span class="icon file-icon" v-html="getSvg('file')"></span>
                <span class="icon plus-icon" v-html="getSvg('plusSign')"></span>

            </div>
        </label>
    </article>
</template>
  
<script>
import { svgService } from '../../services/svg.service'
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
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        async handleFile(ev) {
            const res = await uploadService.uploadImg(ev)
            this.files.push(res.url)
            this.$emit('update', this.files)

        },
        openModal(file){
            this.$store.commit({type:'fileModal',file})
        }


    },
    components: {
        AttachmentPreview
    }

}
</script>