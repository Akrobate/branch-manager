<template>
    <div>
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
                this.flow_data = data.branch_flow
            })
    },
    data() {
        return {
            data_list: [

            ],
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
