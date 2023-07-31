<script>
export default {
    props: ['file'],
    methods: {
        closeModal() {
            this.$store.commit('fileModal', '')
        },
        getExtension(filename) {
            var parts = filename.split('.')
            return parts[parts.length - 1]
        },
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
  
}
</script>
<template>
    <div class="file-modal">
        <div class="screen" @click.stop="closeModal"></div>
        <div class="modal">
            <img v-if="isImage" :src="file" alt="">
            <!-- <pre>{{ file }}</pre> -->
        </div>
    </div>
</template>