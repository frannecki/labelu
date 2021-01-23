import React, { useState, useEffect } from 'react'
import { labels } from './data'
import './index.css'
import logo from '../../logo.svg'
import { submit, retrieve } from './api'

interface IInstance {
	file: string,
	image: string,
	label: number,
	uid: string
}

const insts: IInstance[] = []

const LabelingView: React.FC = () => {

	const [instances, setInstances] = useState(insts)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [label, setLabel] = useState(0);
	const [jumpInput, setJumpInput] = useState("");

	useEffect(() => {
		retrieve()
		.then(({ data }) => {
			if(!data.success) {
				console.error(data.message)
			}
			setInstances(data.data)
			if(currentIndex < instances.length)
				setLabel(instances[currentIndex].label)
		})
		.catch(err => {
			console.error(err)
		})
	}, [])

	const handleCheckboxChange = (idx: number) => (event: any) => {
		const label_tmp = label === null ? 0 : label
		if(event.target.checked)  setLabel(label_tmp | (1 << idx))
		else{
			setLabel(label_tmp & (~(1 << idx)))
		}
	}

	const handleConfirm = () => {
		if(currentIndex >= instances.length){
			return
		}
		const uid = instances[currentIndex].uid
		const file = instances[currentIndex].file
		submit(uid, file, 0)
		.then(({ data }) => {
			if(!data.success) {
				console.error(data.message)
			}
		})
		.catch(err => {
			console.error(err)
		})
	}

	const handleSubmit = (event: any) => {
		if(currentIndex >= instances.length){
			return
		}
		const uid = instances[currentIndex].uid
		const file = instances[currentIndex].file
		setLabel(0)
		submit(uid, file, label)
		.then(({ data }) => {
			if(!data.success) {
				console.error(data.message)
			}
		})
		.catch(err => {
			console.error(err)
		})
	}

	const handleJumpInputChange = (event: any) => {
		setJumpInput(event.target.value)
	}

	const handleJumpClick = (event: any) => {
		const page = parseInt(jumpInput)
		if(!isNaN(page) && page >= 0 && page < instances.length) {
			setLabel(instances[page].label)
			setCurrentIndex(page)
		}
	}

	const handleIncrement = (num: number) => (event: any) => {
		const page = currentIndex + num
		if(!isNaN(page) && page >= 0 && page < instances.length) {
			setLabel(instances[page].label)
			setCurrentIndex(page)
		}
	}

	const handlePageChange = (num: number) => (event: any) => {
		if(!isNaN(num) && num >= 0 && num < instances.length) {
			setLabel(instances[num].label)
			setCurrentIndex(num)
		}
	}

	return (
		<div className="main-layout">
			<h1>Labeling</h1>
			<div className="instance">
				<div className="instance-image">
					<img src={instances[currentIndex] && `/file/${instances[currentIndex].uid}/${instances[currentIndex].file}`} />
				</div>
				<div className="info">
					<div className="vertical-divider"></div>
					<div className="instance-properties">
						<div>
							<h5>Image Uid:</h5>
							<p>{instances[currentIndex] && instances[currentIndex].uid}</p>
						</div>
						<div>
							<h5>Image File:</h5>
							<p>{instances[currentIndex] && instances[currentIndex].image}</p>
						</div>
						<div>
							<h5>Patch File:</h5>
							<p>{instances[currentIndex] && instances[currentIndex].file}</p>
						</div>
						<div>
							<h5>Label</h5>
							<p>{label}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="checkboxes">
				{labels.map((element, idx) => {
					return (
						<span className="checkbox">
							<input 
								type="checkbox"
								name="category"
								checked={Boolean((label===null?0:label) & (1<<idx))}
								onChange={handleCheckboxChange(idx)}
							/>
								{element}
						</span>
					)
				})}
			</div>
			<button id="submit-button" onClick={handleSubmit} disabled={label===null}>保存</button>
			<div className="paginator">
				<span onClick={handleIncrement(-1)}>&#10094;</span>
				{Array.from(Array(5).keys()).map(
					item => item + Math.min(instances.length-1-item, Math.max(currentIndex-2, 0))).filter(
						item => (item >= 0 && item < instances.length)
						).map((item, idx) => (
					<span>
						<button
							onClick={handlePageChange(item)} 
							style={item===currentIndex ? {color: "blue"} : {}}
						>
							{item}
						</button>
					</span>
				))}
				<span onClick={handleIncrement(1)}>&#10095;</span>
				<span><button onClick={handleConfirm}>确认良性</button></span>
				<span></span>
				<span><button onClick={handleJumpClick}>跳转</button></span>
				<span><input type="text" value={jumpInput} onChange={handleJumpInputChange} /></span>
			</div>
		</div>
	)
}

export default LabelingView