import React from 'react'
import { Breadcrumbs } from '../'
import styles from './style.module.scss'

export function Header({title, children}) {
	if ( !title ) throw "[ERR]: Title is required to build Header component"

	return (
		<header className={styles.header}>
			<div className={styles["header__group"]}>
				<h1>{title}</h1>
				<Breadcrumbs
					items={[
						{ label: "Início", href: "#" },
						{ label: "Lista de Atividades", href: "#" }
					]}
				/>
			</div>
			{
				children &&
				<div className={styles["header__group"]}>
					{children}
				</div>
			}
		</header>
	)
}