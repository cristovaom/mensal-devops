

interface CreateTaskRequest {
  name: string;
  description: string;
}


import api from "../lib/axios";

export async function createTask(task: CreateTaskRequest) {
  try {
    const response = await api.post('/api/tasks', task);
    if (!response.data) {
      throw new Error('No data received from server');
    }
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error('Invalid task data');
      }
      if (error.response.status === 409) {
        throw new Error('Task already exists');
      }
      throw new Error(`Server error: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error(`Error creating task: ${error.message}`);
    }
  }
}
