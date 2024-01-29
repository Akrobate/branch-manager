import axios from 'axios'
import api_configuration from '@/configurations/api'

class ProjectRepository {
    async getAllProjects() {
        const result = await axios.get(`${api_configuration.url}/projects`)
        return result.data
    }

    async getProject(project_id) {
        const result = await axios.get(`${api_configuration.url}/projects/${project_id}/`)
        return result.data
    }
}

const project_repository = new ProjectRepository()

export {
    project_repository,
}
