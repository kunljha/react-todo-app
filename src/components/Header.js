import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title }) => {
	const onClick = (e) => {
		console.log('Button Clicked!')
	}
	return (
		<header className='header'>
			<h1>{title}</h1>
			<Button color='green' text='Add' onClick={onClick} />
		</header>
	)
}

Header.defaultProps = {
	title: 'This a title prop',
}

Header.propTypes = {
	title: PropTypes.string,
}

// css in jsx
// const headerStyle = {
// 	color: 'red',
// 	backgroundColor: 'black',
// }

export default Header
