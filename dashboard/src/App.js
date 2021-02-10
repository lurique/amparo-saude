import React, { useEffect } from 'react'
import { Navbar, Header } from './components'
import { Button } from './elements'
import Pacients from './pages/Pacients'
import './styles/global.scss'

function App() {
	useEffect(() => {
		document.title = "Amparo Saúde - Lista de Atividades"
	}, [])

	return (
		<main id="content">
			<Navbar/>

			<Header title="Lista de atividades">
				<div className="flex items-center flex-end">
					<Button type="large" color="white">Novo paciente</Button>
					<Button type="large" color="white" style={{marginLeft: "30px"}}>Nova atividade</Button>
				</div>
			</Header>
			
			<Pacients />
		</main>
	)
}

export default App