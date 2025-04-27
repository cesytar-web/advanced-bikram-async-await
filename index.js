//DESARROLLA AQUI TUS SOLUCIONES

async function getImageAndName (pokemon){

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const data = await response.json();
        const name = data.name;
        const img = data.sprites.front_default;
        return { name, img };
    } catch (error) {
        console.error("Error obteniendo nombre e imagen:", error);
    }
    
}
async function getRandomPokemon() {
    try {
        const maxPokemon = 1025;
        const randomId = Math.floor(Math.random() * maxPokemon) + 1;
        return await getImageAndName(randomId);
    } catch (error) {
        console.error("Error obteniendo el Pokémon aleatorio:", error);
    }
}

async function mostrarPokemon() {
    const pokemon = await getRandomPokemon();
    const nameElement = document.getElementById('pokemon-name');
    const imageElement = document.getElementById('pokemon-image');

    // Asignamos el nombre del Pokémon
    nameElement.textContent = pokemon && pokemon.name ? pokemon.name.toUpperCase() : 'No se pudo cargar el Pokémon.';

    // Si tenemos una imagen, la mostramos, si no, la ocultamos
    imageElement.src = pokemon && pokemon.img ? pokemon.img : '';
    imageElement.style.display = pokemon && pokemon.img ? 'block' : 'none';
}

//obtener getImageAndName de un pokemon
async function getImageAndName(pokemon) {
    try {
        // Hacemos la solicitud a la API para obtener los datos del Pokémon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        
        // Convertimos la respuesta en formato JSON
        const data = await response.json();
        
        // Extraemos el nombre y la imagen
        const name = data.name;
        const img = data.sprites.front_default;
        
        // Retornamos un objeto con el nombre y la URL de la imagen
        return { name, img };
    } catch (error) {
        console.error("Error al obtener la información del Pokémon:", error);
    }
}
//obtner printImageAndName de un pokemon
async function printImageAndName(pokemon) {
    // Obtenemos la información del Pokémon (nombre e imagen)
    const { name, img } = await getImageAndName(pokemon);
    
    // Creamos el HTML para el Pokémon
    const section = document.createElement('section');
    section.innerHTML = `
        <img src="${img}" alt="${name}">
        <h1>${name}</h1>
    `;
    
    // Añadimos el HTML generado al DOM
    document.body.appendChild(section);
}

//Batalla enter pokemon y perritos
//obtner getRandom DogImage de un perro

async function getRandomDogImage() {
  
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    
    // Convertimos la respuesta a JSON
    const data = await response.json();
    
    // Extraemos la URL de la imagen
    const imageUrl = data.message;
    
  
    return imageUrl;
}

//obtener una función getRandomPokemonImage

async function getRandomPokemonImage() {
    // número aleatorio entre 1 y 898 (número total de Pokémon disponibles)
    const randomId = Math.floor(Math.random() * 898) + 1;
    
    //solicitud a la API de Pokémon para obtener la información del Pokémon
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    
   
    const data = await response.json();
    
  
    const imageUrl = data.sprites.front_default;
    
  
    return imageUrl;
}

//Ricky y Morty obteber getRandomCharacter
async function getRandomCharacter() {
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character/');
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.results.length);
        return data.results[randomIndex];
    } catch (error) {
        console.error("Error obteniendo el personaje aleatorio:", error);
    }
}
//obtener getRandomCharacterInfo
async function getRandomCharacterInfo() {
    try {
        const character = await getRandomCharacter();
        return {
            name: character.name,
            image: character.image,
            species: character.species,
            status: character.status
        };
    } catch (error) {
        console.error("Error obteniendo la información del personaje:", error);
    }
}
//obtener getCharacterInfo
async function getRandomCharacterInfo() {
    // Paso 1: Obtener un personaje aleatorio
    const characterResponse = await fetch('https://rickandmortyapi.com/api/character');
    const characterData = await characterResponse.json();
    
    // Obtener un ID aleatorio dentro del rango de personajes disponibles
    const totalCharacters = characterData.info.count;
    const randomId = Math.floor(Math.random() * totalCharacters) + 1;

    // Obtener los detalles del personaje aleatorio
    const randomCharacterResponse = await fetch(`https://rickandmortyapi.com/api/character/${randomId}`);
    const randomCharacter = await randomCharacterResponse.json();
    
    // Paso 2: Obtener el primer episodio
    const firstEpisodeUrl = randomCharacter.episode[0]; // El primer episodio en el array de episodios
    const firstEpisodeResponse = await fetch(firstEpisodeUrl);
    const firstEpisode = await firstEpisodeResponse.json();
    
    // Paso 3: Retornar la información requerida
    return {
        img: randomCharacter.image,
        nombre: randomCharacter.name,
        episodios: randomCharacter.episode.length,
        primerEpisodio: firstEpisode.name,
        fechaEpisodio: firstEpisode.air_date
    };
}
//Pintar en el DOM
async function printCharacterInfo() {
    // Obtener la información del personaje
    const characterInfo = await getRandomCharacterInfo();

    // Crear los elementos del DOM para mostrar la información
    const section = document.createElement('section');
    section.classList.add('character-info');

    // Crear y agregar la imagen del personaje
    const img = document.createElement('img');
    img.src = characterInfo.img;
    img.alt = characterInfo.nombre;
    section.appendChild(img);

    // Crear y agregar el nombre del personaje
    const name = document.createElement('h2');
    name.textContent = characterInfo.nombre;
    section.appendChild(name);

    // Crear y agregar el número de episodios
    const episodes = document.createElement('p');
    episodes.textContent = `Número de episodios: ${characterInfo.episodios}`;
    section.appendChild(episodes);

    // Crear y agregar el nombre del primer episodio
    const firstEpisodeName = document.createElement('p');
    firstEpisodeName.textContent = `Primer episodio: ${characterInfo.primerEpisodio}`;
    section.appendChild(firstEpisodeName);

    // Crear y agregar la fecha de estreno del primer episodio
    const episodeDate = document.createElement('p');
    episodeDate.textContent = `Fecha de estreno: ${characterInfo.fechaEpisodio}`;
    section.appendChild(episodeDate);

    // Agregar la sección con la información al DOM
    document.body.appendChild(section);
}
