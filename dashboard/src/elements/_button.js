import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
	align-items: center;
	background: var(--color-blue);
	border: none;
	border-radius: 4px;
	color: var(--color-white);
	cursor: pointer;
	display: flex;
	font-size: 1rem;
	font-weight: 300;
	padding: 10px 15px;
	transition: box-shadow 150ms cubic-bezier(0.4, 0, 0, 1.2);
	transform: translate(0, 0);

	&:hover {
		box-shadow: 0 0 0 4px rgba(9, 125, 249, 0.5);
	}

	${props => props.type === "large" && `
		font-size: 1.25rem;
		padding: 15px 25px;
	`}

	${props => props.color === "white" && `
		background: var(--color-white);
		box-shadow: 0 2px 4px 0 rgba(0,0,0,0.15);
		color: var(--color-darkGray);

		&:hover {
			box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.5);
		}
	`}
`

export function Button({className, style, type, color, onClick, children}) {
	return (
		<StyledButton
			className={className}
			style={style}
			type={type}
			color={color}
			onClick={onClick}
		>
			{children}
		</StyledButton>
	)
}