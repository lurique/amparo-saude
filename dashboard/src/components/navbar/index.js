import React from 'react'
import styles from './style.module.scss'

export function Navbar() {
	return (
		<nav className={styles.navbar}>
			<div className={styles['navbar__brand']}>
				<p>Amparo Saúde</p>
			</div>
			<div className={styles['navbar__menu']}>
				<ul>
					<li><a href="javascript:void(0);s" className="active">Atividades</a></li>
				</ul>
			</div>
		</nav>
	)
}