import React from 'react'
import styles from './style.module.scss'

export function Breadcrumbs({className, items}) {
	if ( !items || items.length === 0 || !Array.isArray(items) ) throw "[ERR]: Breadcrumbs items should be a array of objects containing label and href."

	return (
		<div className={`${styles.breadcrumbs} ${className}`}>
			<ul>
				{
					items &&
					items.map((item, index) => {
						return <li key={`${index}_breadcrumb`}><a href={item.href ?? ""}>{item.label ?? ""}</a></li>
					})
				}
			</ul>
		</div>
	)
}