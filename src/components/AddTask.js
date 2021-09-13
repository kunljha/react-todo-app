import { useState } from 'react'

const AddTask = ({ addTask }) => {
	const [text, setText] = useState('')
	const [date, setDate] = useState('')
	const [reminder, setReminder] = useState(false)
	const [isChecked, setIsChecked] = useState(false)

	const onSubmit = (e) => {
		e.preventDefault()

		addTask({ text, date, reminder })

		setText('')
		setDate('')
		setReminder(false)
		setIsChecked(false)
	}

	return (
		<form className='add-form' onSubmit={onSubmit}>
			<div className='form-control'>
				<label htmlFor='task'>Task</label>
				<input
					type='text'
					placeholder='Add Task'
					value={text}
					onChange={(e) => {
						setText(e.target.value)
					}}
					required
				/>
			</div>
			<div className='form-control'>
				<label htmlFor='date'>Add Date</label>
				<input
					type='text'
					placeholder='Add Date'
					value={date}
					onChange={(e) => {
						setDate(e.target.value)
					}}
				/>
			</div>
			<div className='form-control form-control-check'>
				<label htmlFor='reminder'>Reminder</label>
				<input
					type='checkbox'
					value={reminder}
					checked={isChecked}
					onChange={(e) => {
						setReminder(e.currentTarget.checked)
						setIsChecked(e.currentTarget.checked)
					}}
				/>
			</div>
			<input type='submit' className='btn btn-block' />
		</form>
	)
}

export default AddTask
