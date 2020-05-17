import axios from 'axios'
import api_configuration from '@/configurations/api'

class ProjectRepository {
    getAllProjects() {
        return axios
            .get(`${api_configuration.url}/projects`)
    }
}

const project_repository = new ProjectRepository()

export {
    ProjectRepository,
    project_repository,
}
