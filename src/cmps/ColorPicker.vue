<script>
export default {

    methods: {
        setColor(colorHash) {
            this.$emit('color', colorHash)
        }
    }

}
</script>
<template template >
    <div class="color-picker flex align-center justify-evenly">
        <ul class="color-list flex clean-list align-center">
            <li class="fa-regular" @click="setColor('#fff')"></li>
            <li @click="setColor('#f28b82')" style="backgroundColor: #f28b82;"></li>
            <li @click="setColor('#fbbc04')" style="backgroundColor: #fbbc04;"></li>
            <li @click="setColor('#fff475')" style="backgroundColor: #fff475;"></li>
            <li @click="setColor('#ccff90')" style="backgroundColor: #ccff90;"></li>
            <li @click="setColor('#a7ffeb')" style="backgroundColor: #a7ffeb;"></li>

        </ul>
        <ul class="color-list flex clean-list align-center">
            <li @click="setColor('#cbf0f8')" style="backgroundColor: #cbf0f8;"></li>
            <li @click="setColor('#aecbfa')" style="backgroundColor: #aecbfa;"></li>
            <li @click="setColor('#d7aefb')" style="backgroundColor: #d7aefb;"></li>
            <li @click="setColor('#fdcfe8')" style="backgroundColor: #fdcfe8;"></li>
            <li @click="setColor('#e6c9a8')" style="backgroundColor: #e6c9a8;"></li>
            <li @click="setColor('#e8eaed')" style="backgroundColor: #e8eaed;"></li>
        </ul>
    </div>
</template >