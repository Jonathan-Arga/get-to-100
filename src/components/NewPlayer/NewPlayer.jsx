import styles from "./NewPlayer.module.css";

export default function NewPlayer(props) {
	function addPlayer() {
		let username = document.getElementById("username");
		let error = document.getElementById("error-dialog");
		if (username.value === "" || !username.value)
			return (error.textContent = `Username can't be empty`);

		let prevScores = JSON.parse(localStorage.getItem(username.value));
		const player = {
			username: username.value,
			prevScores: prevScores ? prevScores : [],
			isPlaying: true,
		};
		if (!prevScores)
			localStorage.setItem(
				username.value,
				JSON.stringify(player.prevScores)
			);

		if (props.players.some((p) => p.username === player.username))
			return (error.textContent = "Player already in the current game!");
		props.setPlayers((p) => [...p, player]);
		props.setAddingPlayer(false);
		username.value = "";
	}
	function clearDialog() {
		props.setAddingPlayer(false);
		document.getElementById("username").value = "";
		document.getElementById("error-dialog").textContent = "";
	}
	return (
		<div style={{ position: "relative" }}>
			<dialog className={styles.newPlayerDialog} open={props.displaying}>
				<a onClick={clearDialog}>&#x2715;</a>
				<br />
				<div style={{ margin: "0 1dvw" }}>
					<label htmlFor="username">Username:</label>
					<br />
					<input
						type="text"
						id="username"
						onKeyDown={(e) => {
							if (e.key === "Enter") addPlayer();
						}}
						autoFocus
					/>
					<p id="error-dialog"></p>
					<button onClick={addPlayer}>Add Player</button>
				</div>
			</dialog>
		</div>
	);
}
