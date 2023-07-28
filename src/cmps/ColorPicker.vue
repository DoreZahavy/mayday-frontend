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
            <li @click="setColor('#037f4c')" style="backgroundColor: #037f4c;"></li>
            <li @click="setColor('#00c875')" style="backgroundColor: #00c875;"></li>
            <li @click="setColor('#9cd326')" style="backgroundColor: #9cd326;"></li>
            <li @click="setColor('#cab641')" style="backgroundColor: #cab641;"></li>
            <li @click="setColor('#ffcb00')" style="backgroundColor: #ffcb00;"></li>

        </ul>
        <ul class="color-list flex clean-list align-center">
            <li @click="setColor('#784bd1')" style="backgroundColor: #784bd1;"></li>
            <li @click="setColor('#a25ddc')" style="backgroundColor: #a25ddc;"></li>
            <li @click="setColor('#0086c0')" style="backgroundColor: #0086c0;"></li>
            <li @click="setColor('#579bfc')" style="backgroundColor: #579bfc;"></li>
            <li @click="setColor('#66ccff')" style="backgroundColor: #66ccff;"></li>
        </ul>
        <ul class="color-list flex clean-list align-center">
            <li @click="setColor('#bb3354')" style="backgroundColor: #bb3354;"></li>
            <li @click="setColor('#e2445c')" style="backgroundColor: #e2445c;"></li>
            <li @click="setColor('#ff158a')" style="backgroundColor: #ff158a;"></li>
            <li @click="setColor('#ff5ac4')" style="backgroundColor: #ff5ac4;"></li>
            <li @click="setColor('#ff642e')" style="backgroundColor: #ff642e;"></li>
        </ul>
        <ul class="color-list flex clean-list align-center">
            <li @click="setColor('#fdab3d')" style="backgroundColor: #fdab3d;"></li>
            <li @click="setColor('#7f5347')" style="backgroundColor: #7f5347;"></li>
            <li @click="setColor('#c4c4c4')" style="backgroundColor: #c4c4c4;"></li>
            <li @click="setColor('#808080')" style="backgroundColor: #808080;"></li>
            <!-- <li @click="setColor('#e8eaed')" style="backgroundColor: #e8eaed;"></li> -->
        </ul>
    </div>
</template >