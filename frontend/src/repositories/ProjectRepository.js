import axios from 'axios'
import api_configuration from '@/configurations/api'

class ProjectRepository {
    getAllProjects() {
        console.log('Teeeeesttt')
        console.log(`${api_configuration.url}/projects`)
        return axios
            .get(`${api_configuration.url}/projects`)
    }
}

const project_repository = new ProjectRepository()

export {
    project_repository,
}
