import React, { useState } from 'react'
import InputMask from 'react-input-mask'
import AsyncSelect from 'react-select/async'
import { ToastContainer } from 'react-toastify'
import { Navbar, Header, Modal } from './components'
import { Button, Select } from './elements'
import Services from './services'
import Activities from './pages/Activities'
import './styles/global.scss'

function App() {
	const [ modals, setModals ] = useState({patient: false, activity: false})
	const [ shouldRender, setShouldRender ] = useState(false)

	return (
		<main id="content">
			<ToastContainer />

			{/* Navbar */}
			<Navbar/>

			{/* Header */}
			<Header title="Lista de atividades">
				<div className="flex items-center flex-end">
					<Button
						type="large"
						color="white"
						onClick={() => setModals({...modals, patient: true})}
					>Novo paciente</Button>

					<Button
						type="large"
						color="white"
						style={{marginLeft: "30px"}}
						onClick={() => setModals({...modals, activity: true})}
					>Nova atividade</Button>
				</div>
			</Header>
			
			{/* Page */}
			<Activities shouldRender={shouldRender}/>
			
			{/* Modals */}
			<PatientModal modals={modals} setModals={setModals} />
			<ActivityModal modals={modals} setModals={setModals} shouldRender={shouldRender} setShouldRender={setShouldRender}/>
		</main>
	)
}

function PatientModal({modals, setModals}) {
	const [ requesting, setRequesting ] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setRequesting(true)
		await Services.createPatient(e)
		setRequesting(false)
		setModals({...modals, patient: false})
	}

	return (
		<Modal
			title="Novo paciente"
			name="patient"
			show={modals.patient}
			onHide={{state: modals, fn: setModals}}
		>
			<form className="flex w-full -marginx-15 children-mx15" onSubmit={handleSubmit}>
				<input type="text" placeholder="Nome" className={`w-full input`} name="name"/>
				<InputMask mask="999.999.999.99" maskChar=" " placeholder="CPF" name="cpf" className={`w-full input`}/>
				<Button type="large" color="blue" className={`${requesting ? "disabled" : ""}`}>
					{
						requesting ?
							"Cadastrando..."
						: "Cadastrar"
					}
				</Button>
			</form>
		</Modal>
	)
}

function ActivityModal({modals, setModals, shouldRender, setShouldRender}) {
	const [ requesting, setRequesting ] = useState(false)
	const [ autocompleteValues, setAutocompleteValues ] = useState([])
	const [ selectedPatient, setSelectedPatient ] = useState()

	const handleAutocomplete = async (e) => {
		if ( !e ) return setAutocompleteValues([])

		let query = ""
		if ( isNaN(e.charAt(0)) ) {
			query = `name=${e}`
		} else {
			query = `cpf=${e}`
		}

		const request = await Services.searchPatients(query)
		if ( !request || request.length === 0 ) return
		
		let values = []
		for ( let req of request ) {
			values.push({label: req.name, value: req._id})
		}

		await setAutocompleteValues(values)
		return values
	}

	const handlePatientSelect = e => setSelectedPatient(e)
	
	const handleSubmit = async (e) => {
		e.preventDefault()
		setRequesting(true)
		await Services.createActivity(e, selectedPatient)
		setRequesting(false)
		setModals({...modals, activity: false})
		setShouldRender(!shouldRender)
	}

	return (
		<Modal
			title="Nova atividade"
			name="activity"
			show={modals.activity}
			onHide={{state: modals, fn: setModals}}
		>
			<form className="-marginx-15" onSubmit={handleSubmit}>
				<div className="flex w-full children-mx15 marginb-15">
					<AsyncSelect
						components={{DropdownIndicator: null}}
						className="w-full select"
						isClearable
						cacheOptions
						onInputChange={handleAutocomplete}
						onChange={handlePatientSelect}
						defaultOptions={autocompleteValues}
						placeholder="Busque o paciente por nome ou CPF"
						loadOptions={handleAutocomplete}
						value={selectedPatient}
						dropdownIndicator={false}
						loadingMessage={() => "Carregando..."}
						noOptionsMessage={() => "Nenhum paciente encontrado."}
                    />
				</div>

				<div className="flex w-full children-mx15 marginb-15">
					<InputMask mask="99/99/9999" maskChar=" " placeholder="Data de Vencimento" name="due_date" className={`w-full input`}/>

					<Select defaultValue={status} defaultStyle="large" name="status">
						<option value="aberto">Aberto</option>
						<option value="atrasado">Atrasado</option>
						<option value="finalizado">Finalizado</option>
					</Select>
				</div>

				<div className="flex w-full children-mx15 marginb-15">
					<textarea name="description" className="textarea" placeholder="Atividade"></textarea>
				</div>

				<Button type="large" color="blue" className={`float-right ${requesting ? "disabled" : ""}`}>
					{
						requesting ?
							"Cadastrando..."
						: "Cadastrar"
					}
				</Button>
			</form>
		</Modal>
	)
}

export default App