export async function getChuckNorrisJoke() {
  const arr: {}[] = [];
  for (let i = 0; i < 10; i++) {
    const res = await fetch("https://api.chucknorris.io/jokes/random");
    const json = await res.json();
    arr.push(json);
  }

  return arr;
}

export async function getRandomDadJoke() {
  const arr: {}[] = [];
  for (let i = 0; i < 10; i++) {
    const res = await fetch("https://dad-jokes.p.rapidapi.com/random/joke", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "aa22d47aa9msh0fa69eb68a9dab4p1aa504jsndff0e46b8dc3",
      },
    });
    const json = await res.json();
    arr.push(json);
  }
  return arr;
}

export async function getRandomDevJoke() {
  const arr: {}[] = [];
  for (let i = 0; i < 10; i++) {
    const res = await fetch(
      "https://backend-omega-seven.vercel.app/api/getjoke"
    );
    const json = await res.json();
    arr.push(json);
  }
  return arr;
}

export async function getRandomGeekJoke() {
  const arr: {}[] = [];
  for (let i = 0; i < 10; i++) {
    const res = await fetch(
      "https://geek-jokes.sameerkumar.website/api?format=json"
    );
    const json = await res.json();
    arr.push(json);
  }
  return arr;
}
