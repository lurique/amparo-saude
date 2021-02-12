import React from 'react'
import styles from './style.module.scss'

export function Table({className, headers, children, pages}) {
	return (
		<div className={styles["table__responsive"]}>
			<table className={`${className} ${styles.table}`}>
				{
					headers &&
					<thead>
						<tr>
							{
								headers.map((header, index) => {
									return <th key={`${index}_${header}`}>{header}</th>
								})
							}
						</tr>
					</thead>
				}

				<tbody>
					{children}
				</tbody>
			</table>
		</div>
	)
}