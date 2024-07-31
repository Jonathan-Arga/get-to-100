import { useState } from "react";
import Player from "../Player/Player.jsx";

import styles from "./PlayerList.module.css";

export default function PlayerList(props) {
	function incrementTurn(isQuitting = false) {
		if (isQuitting && props.players.length === 1) return props.endGame();
		isQuitting
			? props.setCurrentTurn((t) => t % (props.players.length - 1))
			: props.setCurrentTurn((t) => (t + 1) % props.players.length);
	}

	return (
		<ul className={styles.playerList}>
			{props.players.map((player, index) => (
				<li key={index + player.username}>
					<Player
						player={player}
						inProgress={props.inProgress}
						index={index}
						currentTurn={props.currentTurn}
						incrementTurn={incrementTurn}
						setPlayers={props.setPlayers}
					/>
				</li>
			))}
		</ul>
	);
}
