import React from 'react'
import styles from './style.module.scss'

export function Pagination({className, pages, selectedPage, onClick}) {
	let paginationItems = []
	for ( let i = 0; i < pages; ++i ) {
		paginationItems.push(<li key={`pagination_${i}`} onClick={() => onClick(i)} className={selectedPage === i ? "active" : ""}>{i+1}</li>)
	}

	return (<>
		{
			pages &&
			<div className={`${className} ${styles.pagination}`}>
				<ul>
					{
						selectedPage !== 0 &&
						<li className={styles.arrow} onClick={() => onClick(selectedPage-1)}>&lt;</li>
					}

					{ paginationItems }

					{
						pages !== selectedPage+1 &&
						<li className={styles.arrow} onClick={() => onClick(selectedPage+1)}>&gt;</li>
					}
				</ul>
			</div>
		}
	</>)
}