import React, { useState, useEffect } from 'react'
import { labels } from './data'
import { submit, retrieve, retrieveSingle } from './api'
import './index.css'
import { group } from 'console'

interface IInstance {
	uid: string;
	file: string;
}

interface IGroup {
	uid: string;
	label: number,
	instances: IInstance[];
}

const groups_: IGroup[] = []

const LabelingView: React.FC = () => {

	const [groups, setGroups] = useState(groups_)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [label, setLabel] = useState(0);
	const [jumpInput, setJumpInput] = useState("");
	const [instanceIdx, setInstanceIdx] = useState(0);

	useEffect(() => {
		retrieve()
		.then(({ data }) => {
			if(!data.success) {
				console.error(data.message)
			}
			const instance_groups = data.data.map((item: any) => {
				const grp: IGroup = {
					uid: item.uid,
					label: item.label,
					instances: item.instances.map((inst: any) => {
						const instance: IInstance = {
							uid: inst.uid,
							file: inst.file,
						}
						return instance
					})
				}
				instance_groups.push(grp)
			})
			setGroups(instance_groups)
			if(currentIndex < instance_groups.length)
				setLabel(instance_groups[currentIndex].label || 0)
		})
		.catch(err => {
			console.error(err)
		})
	}, [])

	useEffect(() => {
		if(groups.length === 0) {
			return
		}
		const uid = groups[currentIndex].uid
		retrieveSingle(uid)
		.then(({ data }) => {
			if(!data.success) {
				console.error(data.message)
			}
			if(currentIndex < groups.length) {
				setLabel(data.data.label)
			}
		})
		.catch(err => {
			console.error(err)
		})
	}, [groups, currentIndex])

	const handleCheckboxChange = (idx: number) => (event: any) => {
		const label_tmp = label === null ? 0 : label
		if(event.target.checked)  setLabel(label_tmp | (1 << idx))
		else{
			setLabel(label_tmp & (~(1 << idx)))
		}
	}

	const handleConfirm = () => {
		if(currentIndex >= groups.length){
			return
		}
		const uid = groups[currentIndex].uid
		setLabel(0)
		submit(uid, 0)
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
		if(currentIndex >= groups.length){
			return
		}
		const uid = groups[currentIndex].uid
		submit(uid, label)
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
		if(!isNaN(page) && page >= 0 && page < groups.length) {
			setLabel(groups[page].label)
			setCurrentIndex(page)
		}
	}

	const handleIncrement = (num: number) => () => {
		const page = currentIndex + num
		if(!isNaN(page) && page >= 0 && page < groups.length) {
			setLabel(groups[page].label)
			setCurrentIndex(page)
		}
	}

	const handlePageChange = (num: number) => () => {
		if(!isNaN(num) && num >= 0 && num < groups.length) {
			setLabel(groups[num].label)
			setCurrentIndex(num)
		}
	}

	return (
		<div className="main-layout">
			<h1>Labeling</h1>
			<div className="instance">
				<div className="instance-group">
					{/* {groups[currentIndex] && groups[currentIndex].instances.map((item, idx) => ( */}
					{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, idx) => (
							<img
								style={{marginBottom: 0}}
								alt=""
								src={
									// `/file/datasets/${groups[currentIndex].uid}/${item.file}`
									"/logo512.png"
								}
								onClick={() => {setInstanceIdx(idx)}}
							/>
						))
					}
				</div>
				<div className="instance-image">
					<img
						alt=""
						src={
							// groups[currentIndex] && groups[currentIndex].instances[instanceIdx] &&
							// `/file/datasets/${groups[currentIndex].uid}/${groups[currentIndex].instances[instanceIdx].file}`
							"/logo512.png"
						}
					/>
				</div>
				<div className="info">
					<div className="vertical-divider"></div>
					<div className="instance-properties">
						<div>
							<h5>Group Uid:</h5>
							<p>{groups[currentIndex] && groups[currentIndex].uid}</p>
						</div>
						<div>
							<h5>Group Label:</h5>
							<p>{groups[currentIndex] && groups[currentIndex].label}</p>
						</div>
						<div>
							<h5>Image Uid:</h5>
							<p>{groups[currentIndex] && groups[currentIndex].instances[instanceIdx] && groups[currentIndex].instances[instanceIdx].uid}</p>
						</div>
						<div>
							<h5>Image File:</h5>
							<p>{groups[currentIndex] && groups[currentIndex].instances[instanceIdx] && groups[currentIndex].instances[instanceIdx].file}</p>
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
				<span>
					<button
						onClick={handleIncrement(-1)}
					>
						&#10094;
					</button>
				</span>
				{Array.from(Array(5).keys()).map(
					item => item + Math.min(groups.length-1-item, Math.max(currentIndex-2, 0))).filter(
						item => (item >= 0 && item < groups.length)
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
				<span>
					<button
						onClick={handleIncrement(1)}
					>
						&#10095;
					</button>
				</span>
				<span><button onClick={handleConfirm}>确认良性</button></span>
				<span></span>
				<span><input type="text" value={jumpInput} onChange={handleJumpInputChange} /></span>
				<span><button onClick={handleJumpClick}>跳转</button></span>
			</div>
		</div>
	)
}

export default LabelingView
