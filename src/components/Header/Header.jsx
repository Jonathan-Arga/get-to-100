export default function Header(props) {
  return (
    <header>
      <h1>Get to 100!</h1>
      {props.inProgress ? (
        <p>Game in progress</p>
      ) : (
        <>
          <button onClick={props.addPlayer}>Add Player</button>
          <button onClick={props.beginGame}>Begin Game</button>
        </>
      )}
    </header>
  );
}
