import { useState, useEffect } from 'react'
import { Modal, Button, Form, Table, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { createTask } from '../api/createTask'
import { fetchTasks } from '../api/fetchTasks'

function App() {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState<any[]>([])
  const [currentData, setCurrentData] = useState<{name: string, description: string}>({
    name: '',
    description: ''
  })

  useEffect(() => {
    const fetchTasksFromApi = async () => {
      const tasks = await fetchTasks()
      console.log(tasks)
      setFormData(tasks)
    }
    fetchTasksFromApi()
  }, [])

  const handleClose = () => {
    setShowModal(false)
    setCurrentData({name: '', description: ''})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createTask(currentData)
    const tasks = await fetchTasks()
    setFormData(tasks)
    setCurrentData({name: '', description: ''})
    setShowModal(false)
  }

  return (
    <Container className="py-4">
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => setShowModal(true)}
      >
        Adicionar  Tarefa
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentData.name}
                onChange={(e) => setCurrentData({...currentData, name: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentData.description}
                onChange={(e) => setCurrentData({...currentData, description: e.target.value})}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default App
