<template>
    <article class="conversation-item">
        <header>
            <div class="image-container">
                <img :src="update.user.imgUrl">
            </div>
            <h2>{{ update.user.fullname }}</h2>
            <span>{{ formattedDate }}</span>
        </header>
        <p>
            {{ update.content }}
        </p>
    </article>
</template>
<script>
export default {
    props: { update: Object },
    computed: {
        formattedDate() {
            let date = new Date(this.update.date)
            const currentYear = (new Date()).getFullYear()
            const options = { month: 'short', day: 'numeric' }
            if (date.getFullYear() !== currentYear) {
                options.year = 'numeric'
            }
            return date.toLocaleDateString('en-US', options)
        }
    }
}
</script>