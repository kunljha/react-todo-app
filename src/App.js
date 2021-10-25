import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
	const [showTaskForm, setShowTaskForm] = useState(false)
	const [tasks, setTasks] = useState([])

	// fetch tasks from server
	const fetchTasks = async () => {
		const res = await fetch('/tasks')
		const data = await res.json()
		return data
	}

	useEffect(() => {
		const getTasks = async () => {
			const data = await fetchTasks()
			setTasks(data)
		}

		getTasks()
	}, [])

	// Add Task
	const addTask = async (task) => {
		const res = await fetch('/tasks', {
			method: 'POST',
			body: JSON.stringify(task),
			headers: { 'Content-Type': 'application/json' },
		})

		const newTask = await res.json()

		setTasks([...tasks, newTask])

		// const id = Math.floor(Math.random() * 1000) + 1

		// const newTask = { id, ...task }
		// setTasks([...tasks, newTask])
	}

	// deleting tasks
	const deleteTask = async (id) => {
		await fetch(`/tasks/${id}`, {
			method: 'DELETE',
		})

		setTasks(
			tasks.filter((task) => {
				return task.id !== id
			})
		)
	}

	// fetch a task
	const fetchTask = async (id) => {
		const res = await fetch(`/tasks/${id}`)
		const data = await res.json()

		return data
	}

	// toggle reminder of a task
	const toggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id)
		const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

		const res = await fetch(`/tasks/${id}`, {
			method: 'PUT',
			body: JSON.stringify(updatedTask),
			headers: { 'Content-Type': 'application/json' },
		})

		const data = await res.json() // data is updated task here

		setTasks(
			tasks.map((task) => {
				return task.id === id ? { ...task, reminder: data.reminder } : task
			})
		)
	}

	return (
		<Router>
			<div className='container'>
				<Header
					title='Todo List'
					onAddForm={() => {
						setShowTaskForm(!showTaskForm)
					}}
					addButton={showTaskForm}
				/>
				<Route
					exact
					path='/'
					render={(props) => {
						return (
							<>
								{showTaskForm && <AddTask addTask={addTask} />}
								{tasks.length > 0 ? (
									<Tasks
										tasks={tasks}
										deleteTask={deleteTask}
										toggleReminder={toggleReminder}
									/>
								) : (
									<h4 className='task'>No Tasks remaining</h4>
								)}
							</>
						)
					}}
				/>
				<Route exact path='/about' component={About} />
				<Footer />
			</div>
		</Router>
	)
}

export default App
