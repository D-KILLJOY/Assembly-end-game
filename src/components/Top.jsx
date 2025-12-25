const Top = (props) => {
    return (
        <section className="top__section">
            <header className="about">
                <h1>Assembly: Endgame</h1>
                <p className="game__desc">
                    Guess the word in under 8 attempts to keep the programming
                    world safe from Assembly!
                </p>
            </header>
            <section
                className="status__section "
                aria-live="polite"
                role="status"
            >
                {!props.isGameOver && props.lastGuessIncorrect === true ? (
                    <article className="game__stat gone">
                        <p className="gone__text"> {props.farewellFunc} </p>
                    </article>
                ) : null}
                {props.gameWon === true ? (
                    <article className="game__stat game__won">
                        <h2 className="game__stat__header">You Win!</h2>
                        <p className="game__stat__text">Well done! 🎉</p>
                    </article>
                ) : null}
                {props.gameLost === true ? (
                    <article className="game__stat game__lost">
                        <h2 className="game__stat__header">Game over!</h2>
                        <p className="game__stat__text">
                            You lose! Better start learning Assembly 😭
                        </p>
                    </article>
                ) : null}
            </section>
        </section>
    );
};

export default Top;
