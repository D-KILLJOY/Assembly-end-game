import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./App.css";
import Top from "./components/Top";
import Keyboard from "./components/Keyboard";
import { getFarewellText } from "./assets/utils";
import { getRandomWord } from "./assets/utils";

function App() {
    const alphabets = [
        {
            alpha: "a",
            selected: false,
            contain: false,
        },
        {
            alpha: "b",
            selected: false,
            contain: false,
        },
        {
            alpha: "c",
            selected: false,
            contain: false,
        },
        {
            alpha: "d",
            selected: false,
            contain: false,
        },
        {
            alpha: "e",
            selected: false,
            contain: false,
        },
        {
            alpha: "f",
            selected: false,
            contain: false,
        },
        {
            alpha: "g",
            selected: false,
            contain: false,
        },
        {
            alpha: "h",
            selected: false,
            contain: false,
        },
        {
            alpha: "i",
            selected: false,
            contain: false,
        },
        {
            alpha: "j",
            selected: false,
            contain: false,
        },
        {
            alpha: "k",
            selected: false,
            contain: false,
        },
        {
            alpha: "l",
            selected: false,
            contain: false,
        },
        {
            alpha: "m",
            selected: false,
            contain: false,
        },
        {
            alpha: "n",
            selected: false,
            contain: false,
        },
        {
            alpha: "o",
            selected: false,
            contain: false,
        },
        {
            alpha: "p",
            selected: false,
            contain: false,
        },
        {
            alpha: "q",
            selected: false,
            contain: false,
        },
        {
            alpha: "r",
            selected: false,
            contain: false,
        },
        {
            alpha: "s",
            selected: false,
            contain: false,
        },
        {
            alpha: "t",
            selected: false,
            contain: false,
        },
        {
            alpha: "u",
            selected: false,
            contain: false,
        },
        {
            alpha: "v",
            selected: false,
            contain: false,
        },
        {
            alpha: "w",
            selected: false,
            contain: false,
        },
        {
            alpha: "x",
            selected: false,
            contain: false,
        },
        {
            alpha: "y",
            selected: false,
            contain: false,
        },
        {
            alpha: "z",
            selected: false,
            contain: false,
        },
    ];

    const languages = [
        {
            name: "HTML",
            active: true,
            class: "html",
            id: 1,
        },
        {
            name: "CSS",
            active: true,
            class: "css",
            id: 2,
        },
        {
            name: "Javascript",
            active: true,
            class: "javascript",
            id: 3,
        },
        {
            name: "React",
            active: true,
            class: "react",
            id: 4,
        },
        {
            name: "Typescript",
            active: true,
            class: "typescript",
            id: 5,
        },
        {
            name: "Node.js",
            active: true,
            class: "nodejs",
            id: 6,
        },
        {
            name: "Python",
            active: true,
            class: "python",
            id: 7,
        },
        {
            name: "Ruby",
            active: true,
            class: "ruby",
            id: 8,
        },
        {
            name: "Assembly",
            active: true,
            class: "assembly",
            id: 9,
        },
    ];

    const [lang, setLang] = useState(languages);

    const [currentWord, setCurrentWord] = useState(() => getRandomWord());

    const [keys, setKeys] = useState(alphabets);

    const [userGuess, setUserGuess] = useState([]);

    const guessesLeft = languages.length - 1;

    const wrongGuessCount = userGuess.filter(
        (letter) => !currentWord.includes(letter)
    ).length;

    const gameWon = currentWord
        .split("")
        .every((letter) => userGuess.includes(letter));

    const gameLost = wrongGuessCount >= guessesLeft;

    const isGameOver = gameWon || gameLost;

    const lastUserGuess = userGuess[userGuess.length - 1];

    const lastIncorrectGuess =
        lastUserGuess && !currentWord.includes(lastUserGuess);

    function newGame() {
        setCurrentWord(getRandomWord);
        setUserGuess([]);
    }

    function btnClick(id, letter) {
        setKeys((prevKeys) =>
            prevKeys.map((clickedKey) =>
                clickedKey.alpha === id && clickedKey.selected === false
                    ? { ...clickedKey, selected: true }
                    : clickedKey
            )
        );

        setUserGuess((prevGuess) =>
            prevGuess.includes(letter) ? prevGuess : [...prevGuess, letter]
        );
    }

    useEffect(() => {
        setLang((prevLang) =>
            prevLang.map((language, id) => ({
                ...language,
                active: id >= wrongGuessCount,
            }))
        );
    }, [wrongGuessCount]);

    const curWord = currentWord.split("").map((letter, index) => (
        <span
            key={index}
            className={`letter__disp ${
                !userGuess.includes(letter) ? "missed__letter" : null
            }`}
        >
            {gameLost ? letter : userGuess.includes(letter) ? letter : ""}
        </span>
    ));

    const keyElem = keys.map((key) => {
        const isGuessed = userGuess.includes(key.alpha);
        const isCorrect = isGuessed && currentWord.includes(key.alpha);
        const isWrong = isGuessed && !currentWord.includes(key.alpha);

        return (
            <Keyboard
                btnFunc={btnClick}
                selected={isGuessed}
                correct={isCorrect}
                wrong={isWrong}
                key={key.alpha}
                id={key.alpha}
                value={key.alpha}
                gameOver={isGameOver}
                userGuess={userGuess}
            />
        );
    });

    const langElem = lang.map((language) => {
        return (
            <div
                className={`language ${language.class} ${
                    language.active === true ? "active" : "inactive"
                }`}
                key={language.id}
            >
                {language.name}
            </div>
        );
    });

    return (
        <main className="main__container">
            {gameWon ? (
                <Confetti recycle={false} numberOfPieces={5000} />
            ) : null}
            <Top
                gameLost={gameLost}
                gameWon={gameWon}
                isGameOver={isGameOver}
                lastGuessIncorrect={lastIncorrectGuess}
                farewellFunc={getFarewellText(
                    languages[wrongGuessCount - 1]?.name
                )}
            />

            <section className="input__section">
                <section className="lang__con">{langElem}</section>

                <section className="word__con">{curWord}</section>
                {/* Accecibility Region */}
                <section className="sr__only" aria-live="polite" role="status">
                    <p>
                        {currentWord.includes(lastUserGuess)
                            ? `Correct! The letter ${lastUserGuess} is in the word.`
                            : `Sorry! The letter ${lastUserGuess} is not in the word.`}
                        you have {guessesLeft} attempts left.
                    </p>

                    <p>
                        Current word:{" "}
                        {currentWord
                            .split("")
                            .map((letter) =>
                                userGuess.includes(letter)
                                    ? letter + "."
                                    : "blank."
                            )
                            .join(" ")}
                    </p>
                </section>
                {/* Accecibility Region */}
            </section>

            <section className="keyboard">{keyElem}</section>
            {isGameOver === true ? (
                <button onClick={newGame} className="newgame">
                    New Game
                </button>
            ) : null}
        </main>
    );
}

export default App;
