import { Spinner } from "components/spinner";
import { isObjectEmpty } from "lib";
import {
  getChuckNorrisJoke,
  getRandomDadJoke,
  getRandomDevJoke,
  getRandomGeekJoke,
} from "lib/api/jokes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ChuckNorrisCard } from "ui/tweetCard/jokeCard/chuck";
import { DadJokeCard } from "ui/tweetCard/jokeCard/dadJoke";
import { DevJokeCard } from "ui/tweetCard/jokeCard/devJoke";
import { GeekJokeCard } from "ui/tweetCard/jokeCard/geekJoke";
import styles from "./jokesDisplay.module.css";

export function JokesDisplay({ query }) {
  const [content, setContent] = useState([{}]);
  const [character, setCharacter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isObjectEmpty(content[0])) {
      setIsLoading(!isLoading);
    }
  }, [content]);
  async function pullJokesPageContent(query: string) {
    if (query == " Chuck Norris Jokes") {
      const jokes = await getChuckNorrisJoke();
      setCharacter("Chuck Norris");
      setContent(jokes);
    }
    if (query == " Dad Jokes") {
      const jokes = await getRandomDadJoke();

      setContent(jokes);
      setCharacter("Dad Joke");
    }
    if (query == " Dev Jokes") {
      const jokes = await getRandomDevJoke();
      setCharacter("Dev Joke");
      setContent(jokes);
    }
    if (query == " Geek Jokes") {
      const jokes = await getRandomGeekJoke();
      console.log(jokes);

      setCharacter("Geek Joke");
      setContent(jokes);
    }
  }
  useEffect(() => {
    pullJokesPageContent(query);
  }, [query]);

  if (character == "Chuck Norris") {
    return (
      <div className={styles.jokes_content_container}>
        {content.map((joke: any) => {
          return <ChuckNorrisCard jokeTitle={query} value={joke.value} />;
        })}
      </div>
    );
  }

  if (character == "Dev Joke") {
    return (
      <div className={styles.jokes_content_container}>
        {content.map((joke: any) => {
          return (
            <DevJokeCard
              jokeTitle="Developers jokes"
              question={joke[0].question}
              punchline={joke[0].punchline}
            />
          );
        })}
      </div>
    );
  }
  if (character == "Dad Joke") {
    return (
      <div className={styles.jokes_content_container}>
        {content.map((joke) => {
          return <DadJokeCard />;
        })}
      </div>
    );
  }
  if (character == "Geek Joke") {
    return (
      <div className={styles.jokes_content_container}>
        {content.map((joke: any) => {
          return <GeekJokeCard jokeTitle="Geek Jokes" punchline={joke.joke} />;
        })}
      </div>
    );
  }
  return <div className={styles.spinner_container}>{isLoading ? <Spinner /> : ""}</div>;
}
