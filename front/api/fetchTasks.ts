import api from "../lib/axios";

export async function fetchTasks() {
  try {
    const response = await api.get('/api/tasks');
    if (!response.data) {
      throw new Error('No data received from server');
    }
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('No tasks found');
      }
      throw new Error(`Server error: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error(`Error fetching tasks: ${error.message}`);
    }
  }
}
