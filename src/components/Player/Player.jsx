import { useState } from "react";

import styles from "./Player.module.css";

export default function Player(props) {
	const [number, setNumber] = useState(Math.floor(Math.random() * 100));
	const [moves, setMoves] = useState(0);
	const [currentlyPlaying, setCurrentlyPlaying] = useState(true);

	function init() {
		setNumber(Math.floor(Math.random() * 99 + 1));
		setMoves(0);
		setCurrentlyPlaying(true);
	}

	function finishGame() {
		setCurrentlyPlaying(false);
		props.player.prevScores.push(moves + 1);
		props.setPlayers((p) => {
			let newp = [];
			p.forEach((player) => {
				newp.push(
					player.username == props.player.username
						? props.player
						: player
				);
			});
			return newp;
		});
		localStorage.setItem(
			props.player.username,
			JSON.stringify(props.player.prevScores)
		);
	}

	function clickHandler(e) {
		if (!props.inProgress || props.currentTurn !== props.index) {
			return;
		}

		let buttonText = e.target.textContent;
		if (buttonText === "New Game") {
			init();
			return;
		}
		if (buttonText === "Quit") {
			props.setPlayers((a) => {
				a = a.filter(
					(player) => player.username !== props.player.username
				);
				return a;
			});
			props.incrementTurn(true);
			return;
		}
		let newNumber = getOperation(buttonText)(number);
		if (newNumber === 100) finishGame();
		setNumber(newNumber);
		setMoves((m) => m + 1);
		props.incrementTurn();
	}

	function getOperation(str) {
		switch (str) {
			case "+ 1":
				return (n) => n + 1;
			case "- 1":
				return (n) => n - 1;
			case "* 2":
				return (n) => n * 2;
			case "/ 2":
				return (n) => Math.floor(n / 2);
			default:
				(n) => n;
				break;
		}
	}

	let playerData = <>{props.player.username}</>;
	if (props.inProgress) {
		playerData = (
			<div
				className={
					props.index === props.currentTurn
						? styles.playerIsPlaying
						: styles.playerIsNotPlaying
				}
			>
				<h1>{props.player.username}</h1>
				<h2>Number = {number}</h2>
				<h2>Moves = {moves}</h2>
				{currentlyPlaying ? (
					<GameMoveButtons clickHandler={clickHandler} />
				) : (
					<GameOverButtons clickHandler={clickHandler} />
				)}
				<h3>
					Scores ={" "}
					{props.player.prevScores.map((score) => score + " ")}
				</h3>
			</div>
		);
	}
	return playerData;
}

function GameMoveButtons(props) {
	return (
		<>
			<button onClick={props.clickHandler}>+ 1</button>
			<button onClick={props.clickHandler}>- 1</button>
			<button onClick={props.clickHandler}>* 2</button>
			<button onClick={props.clickHandler}>/ 2</button>
		</>
	);
}

function GameOverButtons(props) {
	return (
		<>
			<button onClick={props.clickHandler}>New Game</button>
			<button onClick={props.clickHandler}>Quit</button>
		</>
	);
}
