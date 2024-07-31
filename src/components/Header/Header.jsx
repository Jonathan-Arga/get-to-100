import { useState } from "react";

import styles from "./Header.module.css";

export default function Header(props) {
	return (
		<>
			<div className={styles.headerLeaderboard}>
				<ol>
					{props.topPlayers.map((player) =>
						player ? (
							<li key={player.username}>
								{player.username} : {player.avgScore.toFixed(1)}
							</li>
						) : (
							false
						)
					)}
				</ol>
			</div>
			<header className={styles.Header}>
				<h1>Get to 100!</h1>
				{props.inProgress && props.players.length > 0 ? (
					<p>Game in progress</p>
				) : (
					<div className={styles.headerButtons}>
						<button onClick={props.addPlayer}>Add Player</button>
						<button onClick={props.toggleGame}>Begin Game</button>
					</div>
				)}
			</header>
		</>
	);
}
