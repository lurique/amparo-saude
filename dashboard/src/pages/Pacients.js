import React, { useState, useEffect } from 'react'
import { Table } from '../components'

export default function Pacients() {
	const [ pacients, setPacients ] = useState([])

	useEffect(() => {
		console.log('oi');
	})

	return (
		<section id="pacients" className="padding-30">
			<Table
				headers={[
					"Paciente",
					"CPF",
					"Data",
					"Atividade",
					"Status"
				]}
			>
				<tr>
					<td>Lucas Henrique</td>
					<td>433.333.333.33</td>
					<td>10/10/2020</td>
					<td>Teste agora o seu pronunciamento</td>
					<td>
						<select>
							<option>Aberto</option>
							<option>Atrasado</option>
							<option>Finalizado</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>Lucas Henrique</td>
					<td>433.333.333.33</td>
					<td>10/10/2020</td>
					<td>Teste agora o seu pronunciamento</td>
					<td>
						<select>
							<option>Aberto</option>
							<option>Atrasado</option>
							<option>Finalizado</option>
						</select>
					</td>
				</tr>
			</Table>
		</section>
	)
}