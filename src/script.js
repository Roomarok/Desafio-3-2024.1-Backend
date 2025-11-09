// Função de mudar imagem pelo id e pela url
function changeImage(id, url) {
  document.getElementById(id).src = url;
}

// Função de mudar texto pelo id e pelo texto
function changeText(id, text) {
  document.getElementById(id).innerText = text;
}

// ----------------------
// Código do desafio
// ----------------------

// Variável para guardar o ID do Pokémon atual
let currentPokemonId = 1;

// Função que busca o Pokémon no backend
async function fetchPokemon(id) {
  console.log("Buscando Pokémon ID:", id);

  try {
    // Faz uma requisição para o backend (Node.js)
    const response = await fetch(`http://localhost:3000/pokemon/${id}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar Pokémon: ${response.status}`);
    }

    const data = await response.json();
    console.log("Dados recebidos:", data);

    // Atualiza o nome e a imagem na página
    changeText("name", data.name);
    changeImage("img_sprite_front_default", data.image);
  } catch (error) {
    console.error("Erro ao buscar Pokémon:", error);
    changeText("name", "Erro ao carregar Pokémon");
    changeImage("img_sprite_front_default", "../assets/missingno.png");
  }
}

// Função para ir ao Pokémon anterior
function previousPokemon() {
  if (currentPokemonId > 1) {
    currentPokemonId--;
    fetchPokemon(currentPokemonId);
  } else {
    alert("Esse é o primeiro Pokémon!");
  }
}

// Função para ir ao próximo Pokémon
function nextPokemon() {
  currentPokemonId++;
  fetchPokemon(currentPokemonId);
}

// Ao carregar a página, mostra o primeiro Pokémon
window.onload = () => {
  fetchPokemon(currentPokemonId);
};
