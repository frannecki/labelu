import React from 'react'
import logo from '../../logo.svg'
import './index.css'

const Header: React.FC = () => {
	return (
		<div className="topbar">
			<img src={logo} />
		</div>
	)
}

export default Header