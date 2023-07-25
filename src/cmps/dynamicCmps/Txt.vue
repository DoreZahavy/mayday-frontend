<template>
    <div class="txt">
        <p>{{info}}</p>
    </div>
</template>
  
<script>
export default {

    name: "txt",
    props: {
        info: String,
    },
}
</script>