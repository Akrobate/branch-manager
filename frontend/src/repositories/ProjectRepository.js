import axios from 'axios'
import api_configuration from '@/configurations/api'

class ProjectRepository {
    getAllProjects() {
        return axios
            .get(`${api_configuration.url}/projects`)
            .then((result) => result.data)
    }
}

const project_repository = new ProjectRepository()

export {
    project_repository,
}
