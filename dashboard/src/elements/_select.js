import React from 'react'
import styled from 'styled-components'

const StyledSelectWrapper = styled.div`
	position: relative;
	width: 100%;

	&::after {
		border-color: #007bff transparent transparent transparent;
		border-style: solid;
		border-width: 5px 5px 0 5px;
		content: "";
		height: 0;
		pointer-events: none;
		position: absolute;
		right: 15px;
		top: 50%;
		transform: translateY(-50%);
		width: 0;
	}
`

const StyledSelect = styled.select`
	appearance: none;
	background: var(--color-white);
	border: 1px solid var(--color-lightGray);
	border-radius: 4px;
	color: var(--color-darkGray);
	cursor: pointer;
	padding: 10px 35px 10px 15px;
	width: 100%;

	&:hover {
		background: var(--color-lightGray);
	}

	${props => props.defaultStyle === "large" && `
		font-size: 1.25rem;
		font-weight: 300;
		padding: 15px 25px;
	`}

	${props => props.value === "aberto" && `
		box-shadow: inset 4px 0 0 0 var(--color-blue);
	`}

	${props => props.value === "atrasado" && `
		box-shadow: inset 4px 0 0 0 var(--color-red);
	`}

	${props => props.value === "finalizado" && `
		box-shadow: inset 4px 0 0 0 var(--color-green);
	`}
`

export function Select(props) {
	return (
		<StyledSelectWrapper>
			<StyledSelect {...props}/>
		</StyledSelectWrapper>
	)
}