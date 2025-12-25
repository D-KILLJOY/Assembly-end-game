const Keyboard = (props) => {
    return (
        <button
            onClick={() => props.btnFunc(props.id, props.value)}
            className={`alphakey ${
                (props.selected === true ? "selected" : "") &&
                (props.correct === true ? "green" : "orange")
            }`}
            id={props.id}
            disabled={props.gameOver}
            aria-disabled={props.userGuess.includes(props.value)}
            aria-label={`Letter ${props.value}`}
        >
            {props.value}
        </button>
    );
};

export default Keyboard;
