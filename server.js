import express from "express";
import axios from "axios";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Permitir acesso entre front e backend
app.use(cors());

// Corrige caminhos de pastas no ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir arquivos estáticos da pasta src
app.use(express.static(path.join(__dirname, "src")));

// Rota da API
app.get("/pokemon/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const pokemon = {
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.front_default,
    };

    res.json(pokemon);
  } catch (error) {
    console.error("Erro ao buscar Pokémon:", error.message);
    res.status(500).json({ error: "Erro ao buscar Pokémon" });
  }
});

// Rota principal (serve index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
