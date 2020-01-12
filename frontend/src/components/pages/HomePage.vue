<template>
    <div>
        <md-list class="md-triple-line">
            <div v-for="item in data_list" :key="item.name">
                <md-list-item>
                    <md-avatar>
                    <!--img src="https://placeimg.com/40/40/people/1" alt="People"-->
                    <img src="@/assets/github-logo.png" />
                    </md-avatar>

                    <div class="md-list-item-text">
                    <span>{{ item.name }}</span>
                    <span>Brunch this weekend?</span>
                    <p>I'll be in your neighborhood doing errands this week. Do you want to meet?</p>
                    </div>

                    <md-button class="md-icon-button md-list-action">
                    <md-icon class="md-primary">star</md-icon>
                    </md-button>
                </md-list-item>

                <md-divider class="md-inset"></md-divider>
            </div>
        </md-list>
    </div>
</template>

<script>

export default {
    name: 'HomePage',
    components: {
    },
    data() {
        return {
            data_list: [
                {
                    name: 'Lorem ispum si amet dolorit',
                },
                {
                    name: 'Lorem ispum si amet dolorit 2',
                },
                {
                    name: 'Lorem ispum si amet dolorit 3',
                },
                {
                    name: 'Lorem ispum si amet dolorit 4',
                },
            ],
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
