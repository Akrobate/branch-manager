<template>
    <div>
        <h1 class="md-title">Project: {{ name }}</h1>
        <h2> id: {{ id }} </h2>
    </div>
</template>

<script>

import {
    project_repository,
} from '@/repositories/ProjectRepository'

export default {
    name: 'ProjectsPage',
    props: [ 'project_id', ],
    components: {
    },
    mounted() {
        console.log(this.$props)
        this.loadProject(this.$props.project_id)
    },
    data() {
        return {
            id: null,
            name: null,
            branch_flow: [],
            repository_list: [],
        }
    },
    methods: {
        async loadProject(project_id) {
            const data = await project_repository.getProject(project_id)
            console.log(data)
            this.id = data.id
            this.name = data.name
            this.branch_flow = data.branch_flow
            this.repository_list = data.repository_list
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
