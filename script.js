const API_URL = "http://localhost:3000";
const jokes = [
  { id: 0, joke: "Quelle est la femelle du hamster ?\nL'Amsterdam" },
  { id: 1, joke: "Que dit un oignon quand il se cogne ?\nAïe" },
  {
    id: 2,
    joke: "Quel est l'animal le plus heureux ?\nLe hibou, parce que sa femme est chouette.",
  },
  {
    id: 3,
    joke: "Pourquoi le football c'est rigolo ?\nParce que Thierry en rit",
  },
  {
    id: 4,
    joke: "Quel est le sport le plus fruité ?\nLa boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes.",
  },
  { id: 5, joke: "Que fait un Schtroumpf quand il tombe ?\nun Bleu" },
  {
    id: 6,
    joke: "Quel est le comble pour un marin ?\nAvoir le nez qui coule !",
  },
  {
    id: 7,
    joke: "Qu'est ce que les enfants usent le plus à l'école ?\nLe professeur !",
  },
  { id: 8, joke: "Quel est le sport le plus silencieux ?\nle para-chuuuut !" },
  {
    id: 9,
    joke: "Quel est le comble pour un joueur de bowling ?\nC'est de perdre la boule !",
  },
];

function getRandomJoke() {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  return jokes[randomIndex];
}

function displayAllJokes(){
  console.table(jokes);
}
displayAllJokes();

const randomJokeBtn = document.getElementById("randomJokeBtn");
const jokesContainer = document.getElementById("jokesContainer")

randomJokeBtn.addEventListener("click", function() {
  const randomJoke = getRandomJoke();
  jokesContainer.textContent = randomJoke.joke;
  console.log("ID de la blague :", randomJoke.id);
  console.log("Blague :", randomJoke.joke);
})
document.addEventListener("DOMContentLoaded", () => {
  const jokesList = document.getElementById("jokesList");

  const newJokeInput = document.getElementById("newJokeInput");
  const addJokeBtn = document.getElementById("addJokeBtn");

  // Function pour fetch les blagues
  const fetchJokes = async () => {
    try {
      const response = await fetch(`${API_URL}/blagues`);
      const jokes = await response.json();
      jokesList.innerHTML = "";
      jokes.forEach((joke) => {
        const li = document.createElement("li");
        li.textContent = joke.text;
        jokesList.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching jokes:", error);
    }
  };

  // Function fetch blague aléatoire

  
  // Function ajouter une nouvelle blague
  const addJoke = async () => {
    const newJoke = newJokeInput.value;
    if (newJoke.trim() === "") return;

    try {
      const response = await fetch(`${API_URL}/blagues`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newJoke }),
      });
      if (response.ok) {
        newJokeInput.value = "";
        fetchJokes();
      }
    } catch (error) {
      console.error("Error adding joke:", error);
    }
  };

  // Event listeners
  randomJokeBtn.addEventListener("click", getRandomJoke());
  addJokeBtn.addEventListener("click", addJoke);

  // Initial fetch of jokes
  fetchJokes();
});
