let arrayPokemon = []
let baseUrl = 'https://pokeapi.co/api/v2/pokemon/'


window.onload = () => {
    init();
   
}

async function init () {
    const pokemon = await getPokemons();
    const listPokemon = await mapPokemon(pokemon)
    printPokemons(listPokemon)
    const buttonPokemon = document.querySelector("#filter");
    buttonPokemon.addEventListener("input", ()=> searchPokemon())

}


async function getPokemons () {
   for (let i = 1; i <= 151; i++) {
       const api = await fetch(baseUrl + i)
       const pokeList = await api.json()
       arrayPokemon.push(pokeList)
   }
  return arrayPokemon
}

function mapPokemon(pokemons) {
     const pokemonsMapped = pokemons.map(pokemon => {
         return {
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            id: pokemon.id,
            img: pokemon.sprites.other.dream_world.front_default
         
         }
     })
     return pokemonsMapped 
 }

 function printPokemons (pokemons) {
     const pokemonCard = document.querySelector(".containerPokemon")?document.querySelector(".containerPokemon"):document.createElement ('div');
     pokemonCard.innerHTML = ""
    pokemonCard.className = 'containerPokemon';
    pokemons.forEach(pokemon => {

        pokemonCard.innerHTML += `<div class="pokeCard">
        <h1 class="pokeTitle">${pokemon.name} </h1>
        <img class="pokeImg" src=${pokemon.img} />
        <div class="pokeTitle1">
        <h2>#${pokemon.id} </h2>
        <p>Weight:${pokemon.weight/10} kg</p>
        <p>Height:${pokemon.height/10} m</p>
        </div>
        </div>`
    });
document.body.appendChild(pokemonCard)
}
 
const searchPokemon = () => {
    const input = document.querySelector("#filter");
    const filterPokemon = arrayPokemon.filter(poke =>(poke.name.toLowerCase().includes(input.value.toLocaleLowerCase())))
    printPokemons(mapPokemon(filterPokemon))
}
