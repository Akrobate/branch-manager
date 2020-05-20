<template>
    <div>
        <h1 class="md-title">Repositories</h1>
        <md-list class="md-triple-line">
            <div v-for="item in data_list" :key="item.name">
                <md-list-item>

                    <md-avatar>
                        <img src="@/assets/github-logo.png" alt="Github Logo"/>
                        <!-- md-progress-spinner :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner-->
                    </md-avatar>

                    <div class="md-list-item-text">
                        <span>{{ item.name }}</span>
                        <span>-</span>
                        <p>-</p>
                        <md-progress-bar v-if="false" md-mode="indeterminate"></md-progress-bar>
                    </div>

                    <md-chip>Static</md-chip>

                    <md-chip class="md-accent" md-clickable>Clickable</md-chip>

                    <div class="md-list-action">
                        <md-button class="md-icon-button">
                            <md-icon class="md-primary">star</md-icon>
                        </md-button>
                        <md-button class="md-icon-button">
                            <md-icon class="md-primary">star</md-icon>
                        </md-button>
                    </div>

                </md-list-item>

                <md-divider class="md-inset"></md-divider>
            </div>
        </md-list>
    </div>
</template>

<script>

import {
    project_repository,
} from '@/repositories/ProjectRepository'

export default {
    props: {
        project_id: 'string',
    },
    name: 'RepositoriesPage',
    components: {
    },
    mounted() {
        project_repository
            .getProject(this.project_id)
            .then((data) => {
                this.data_list = data.repository_list
            })
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
