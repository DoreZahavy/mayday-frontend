<template>
    <div  class="file-preview">
        <img v-if="isImage" :src="file">
        <span v-else-if="isVideo" v-icon="'video'"></span>
        <span v-else-if="isPdf" v-icon="'pdf'"></span>
        <span v-else v-icon="'otherFile'"></span>
        <!-- <AttachmentModal v-if="fileModal === true"  /> -->
           
    </div>
</template>
    
<script>
import AttachmentModal from './AttachmentModal.vue'
export default {
    name: "file-preview",
    props: {
        file: String,
    },
    data(){
        return {
            fileModal: false
        }
    },

    computed: {
        isImage() {
            var ext = this.getExtension(this.file)
            switch (ext.toLowerCase()) {
                case 'jpg':
                case 'gif':
                case 'bmp':
                case 'png':
                    return true
            }
            return false
        },
        isVideo() {
            var ext = this.getExtension(this.file)
            switch (ext.toLowerCase()) {
                case 'm4v':
                case 'avi':
                case 'mpg':
                case 'mp4':
                    return true
            }
            return false
        },
        isPdf() {
            var ext = this.getExtension(this.file)
            if (ext.toLowerCase() === 'pdf') return true
            return false
        },
    },
    methods:{
        getExtension(filename) {
            var parts = filename.split('.')
            return parts[parts.length - 1]
        },
       
        
    },
    components:{
        AttachmentModal
    }
    
};
</script>
    
