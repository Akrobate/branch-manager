<template>
    <div>
        <h1 class="md-title">Projects</h1>
        <md-list class="md-triple-line">
            <div v-for="item in data_list" :key="item.name">
                <md-list-item :to="{ name: 'ProjectPage', params: { project_id: item.id }}">

                    <md-avatar>
                        <img src="@/assets/github-logo.png" alt="Github Logo"/>
                        <!-- md-progress-spinner :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner-->
                    </md-avatar>

                    <div class="md-list-item-text">
                        <span>{{ item.name }}</span>
                        <span>repositories: {{ item.repository_count }}</span>
                        <p>{{ item.branch_flow_string }}</p>
                        <md-progress-bar v-if="false" md-mode="indeterminate"></md-progress-bar>
                    </div>

                    <md-chip>Static</md-chip>

                    <md-chip class="md-accent" md-clickable @click.prevent="test()">Clickable</md-chip>

                    <div class="md-list-action">
                        <md-button class="md-icon-button" >
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
    name: 'ProjectsPage',
    components: {
    },
    mounted() {
        this.loadAllProjects()
    },
    data() {
        return {
            data_list: [
                {
                    name: 'Lorem ispum si amet dolorit',
                    branch_flow_string: 'a > b > c',
                    repository_count: 0,
                },
                {
                    name: 'Lorem ispum si amet dolorit 2',
                    branch_flow_string: 'a > b > c',
                    repository_count: 0,
                },
                {
                    name: 'Lorem ispum si amet dolorit 3',
                    branch_flow_string: 'a > b > c',
                    repository_count: 0,
                },
            ],
        }
    },
    methods: {
        async loadAllProjects() {
            const data = await project_repository.getAllProjects()
            console.log(data)
            this.data_list = data.map((item) => {
                item.branch_flow_string = item
                    .branch_flow
                    .map((flow_item) => flow_item.branch)
                    .join(' > ')
                item.repository_count = item.repository_list.length
                return item
            })
        },
        test() {
            console.log('clicked')
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
