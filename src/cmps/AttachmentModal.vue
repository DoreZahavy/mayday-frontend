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
        <div class="file-area">
            <header class="flex align-center">
                <span v-if="isPdf" class="type-img" v-icon="'pdf'"></span>
                <span v-if="isImage" class="type-img" v-icon="'imgFile'"></span>
                <span v-if="isVideo" class="type-img" v-icon="'video'"></span>
                <p>{{ file }}</p>

                <span class="x-btn" @click.stop="closeModal">&#10005;</span>
            </header>
            <div class="file-content">

                <embed v-if="isPdf" :src="file" />
                <img v-if="isImage" :src="file" alt="">
            </div>
            <!-- <pre>{{ file }}</pre> -->
        </div>
    </div>
</template>