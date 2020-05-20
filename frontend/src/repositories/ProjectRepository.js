import axios from 'axios'
import api_configuration from '@/configurations/api'

class ProjectRepository {
    getAllProjects() {
        return axios
            .get(`${api_configuration.url}/projects`)
            .then((result) => result.data)
    }

    getProject(project_id) {
        return axios
            .get(`${api_configuration.url}/projects/${project_id}/`)
            .then((result) => result.data)
    }
}

const project_repository = new ProjectRepository()

export {
    project_repository,
}
