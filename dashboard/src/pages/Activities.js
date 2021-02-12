import React, { useState, useEffect } from 'react'
import InputMask from 'react-input-mask'
import { Table, Pagination } from '../components'
import { Loader, Select, Button } from '../elements'
import Services from '../services'
import { isoToDateString } from '../helpers'

const TableRow = ({activity}) => {
	const [ status, setStatus ] = useState(activity.status)
	const [ loading, setLoading ] = useState(false)
	
	const handleChange = async (target, id) => {
		setLoading(true)

		const body = {
			_id: id,
			status: target.value
		}

		const response = await Services.updateActivity(body)
		setLoading(false)
	}

	return (
		<tr>
			{
				!loading ? <> 
					<td>{activity.patient.name}</td>
					<td>{activity.patient.cpf}</td>
					<td>{isoToDateString(activity.due_date)}</td>
					<td>{activity.description}</td>
					<td>
						<Select
							value={status}
							onChange={({target}) => {
								handleChange(target, activity._id)
								setStatus(target.value)
							}}>
							<option value="aberto">Aberto</option>
							<option value="atrasado">Atrasado</option>
							<option value="finalizado">Finalizado</option>
						</Select>
					</td>
				</> : <>
					<td><Loader /></td>
					<td><Loader /></td>
					<td><Loader /></td>
					<td><Loader /></td>
					<td><Loader /></td>
				</>
			}
		</tr>
	)
}

export default function Activities({shouldRender}) {
	const [ activities, setActivities ] = useState([])
	const [ loading, setLoading ] = useState(true)
	const [ pages, setTotalPages ] = useState(0)
	const [ selectedPage, setSelectedPage ] = useState(0)

	useEffect(() => {
		async function getActivities() {
			let countActivities = await Services.countActivities()
			if ( countActivities <= 10 ) {
				countActivities = 0
			} else {
				countActivities = Math.ceil(countActivities / 10)
			}
			setTotalPages(countActivities)

			const activities = await Services.listActivities(`?page=${selectedPage}`)
			setActivities(activities)
			setLoading(false)
		}
		getActivities()
	}, [shouldRender, selectedPage])

	const handlePageChange = async(index) => {
		if ( index === selectedPage ) return
		setSelectedPage(index)
	}

	const handleSearch = async (e) => {
		e.preventDefault()

		const response = await Services.searchActivities(e)
		if ( !response || response.length === 0 ) return

		console.log(response)
		setActivities(response.data)
	}

	return (
		<section id="activities">
			<div className="w-full bg-light-gray padding-30">
				<form className="flex justify-center items-center children-mxa15" onSubmit={handleSearch}>
					<InputMask
						mask="999.999.999.99"
						maskChar=" "
						placeholder="CPF do Paciente"
						name="cpf"
						className={`w-full input`}
					/>

					<Select defaultStyle="large" defaultValue={"0"} name="status">
						<option value="0">Status do Aprazamento</option>
						<option value="aberto">Aberto</option>
						<option value="atrasado">Atrasado</option>
						<option value="finalizado">Finalizado</option>
					</Select>

					<InputMask
						mask="99/99/9999"
						maskChar=" "
						placeholder="Data"
						name="due_date"
						className={`w-full input`}
					/>

					<Button
						type="large"
						color="green"
					>Filtrar</Button>
				</form>

			</div>

			<div className="padding-30">
				<Table
					headers={[
						"Paciente",
						"CPF",
						"Data",
						"Atividade",
						"Status"
					]}
					pages={pages}
				>
					{
						activities && !loading ?
							activities.map(activity => {
								return <TableRow key={activity._id} activity={activity}/>
							})
						: <tr>
							<td><Loader /></td>
							<td><Loader /></td>
							<td><Loader /></td>
							<td><Loader /></td>
							<td><Loader /></td>
						</tr>
					}
				</Table>
			</div>

			<div className="flex align-center justify-center">
				<Pagination pages={pages} selectedPage={selectedPage} onClick={handlePageChange}/>
			</div>
		</section>
	)
}