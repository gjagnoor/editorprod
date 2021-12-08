/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import axios from 'axios';

export async function fetchProjects() {
  return await axios.get('/api/projects')
      .then((res) => res.data)
      .catch((err) => console.error(err));
}

export async function updateProject(project) {
  return await axios.put('/api/project', project)
      .then((res) => res.data)
      .catch((err) => console.error(err));
}

export async function postProject(project) {
  return await axios.post('/api/project', project)
      .then((res) => res.data)
      .catch((err) => console.error(err));
}

export async function deleteProject(projectName) {
  return await axios.delete('/api/project', {
    data: {
      projectName,
    },
  })
      .then((res) => res.data)
      .catch((err) => console.error(err));
}
