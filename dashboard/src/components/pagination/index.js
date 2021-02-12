import React from 'react'
import styles from './style.module.scss'

export function Pagination({className, pages, onClick}) {
	return (
		<div className={`${className} ${styles.pagination}`}>
			{
				pages &&
					<ul>
						{
							(() => {
								for ( let i = 0; i < pages; ++i ) {
									return <li onClick={onClick}>{i}</li>
								}
							})()
						}
					</ul>
			}
		</div>
	)
}