import React from 'react'
import styled from 'styled-components'

const LoaderComponent = styled.div`
	animation-duration: 1.7s;
	animation-fill-mode: forwards;
	animation-iteration-count: infinite;
	animation-name: contentLoaderAnimation;
	animation-timing-function: linear;
	background: #f6f7f8;
	background: linear-gradient(to right, #eee 2%, #ddd 18%, #eee 33%);
	background-size: 1300px;
	border-radius: 4px;
	height: 30px;
	overflow: hidden;
	position: relative;
	width: 100%; 

	@keyframes contentLoaderAnimation {
		0% {
		  background-position: -650px 0;
		}
		100% {
		  background-position: 650px 0;
		}
	}
`

export const Loader = ({className}) => {
  return (
	<LoaderComponent className={className} />
  )
}