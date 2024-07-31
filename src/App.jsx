import { useState, useEffect } from "react";

import Header from "./components/Header/Header";
import NewPlayer from "./components/NewPlayer/NewPlayer";
import PlayerList from "./components/PlayerList/PlayerList";

function App() {
	const [inProgress, setInProgress] = useState(false);
	const [players, setPlayers] = useState([]);
	const [addingPlayer, setAddingPlayer] = useState(false);
	const [currentTurn, setCurrentTurn] = useState(-1);
	const [topPlayers, setTopPlayers] = useState(calculateTopPlayers());

	function calculateTopPlayers() {
		let tempArr = [];
		for (let i = 0; i < localStorage.length; i++) {
			const username = localStorage.key(i);
			const scoreArr = JSON.parse(localStorage.getItem(username));
			if (scoreArr.length <= 0) continue;
			const avgScore =
				scoreArr.reduce((total, curr) => total + curr) /
				scoreArr.length;

			tempArr.push({ username, avgScore });
		}
		tempArr.sort((a, b) => a.avgScore - b.avgScore);
		tempArr = [tempArr[0], tempArr[1], tempArr[2]];
		return tempArr;
	}

	function beginGame() {
		if (players.length <= 0) return;
		setCurrentTurn(0);
		setInProgress(true);
	}

	function endGame() {
		setInProgress(false);
		setCurrentTurn(-1);
		setTopPlayers(calculateTopPlayers());
	}

	function addPlayer() {
		setAddingPlayer(true);
	}

	return (
		<>
			<Header
				inProgress={inProgress}
				toggleGame={beginGame}
				addPlayer={addPlayer}
				players={players}
				topPlayers={topPlayers}
			/>
			<NewPlayer
				players={players}
				setPlayers={setPlayers}
				displaying={addingPlayer}
				setAddingPlayer={setAddingPlayer}
			/>
			<PlayerList
				players={players}
				inProgress={inProgress}
				currentTurn={currentTurn}
				setCurrentTurn={setCurrentTurn}
				setPlayers={setPlayers}
				endGame={endGame}
			/>
		</>
	);
}

export default App;
