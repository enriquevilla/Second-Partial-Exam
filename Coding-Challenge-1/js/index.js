const watchForm = () => {
    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const searchValue = document.querySelector("input").value;
        fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}/`)
            .then(r => {
                return r.json();
            })
            .then(d => {
                const moves = d.moves.map(i => {
                    return i.move.name;
                });
                const stats = d.stats.map(i => {
                    return i.base_stat;
                });
                document.querySelector("main").innerHTML = `
                    <p>
                        Name: ${d.name}
                    </p>
                    <p>
                        Sprite: 
                        <img src="${d.sprites.front_default}"/>
                    </p>
                    <p>
                        Moves: ${moves}
                    </p>
                    <p>
                        Stats: ${stats}
                    </p>
                `
            })
            .catch(_ => {
                document.querySelector("main").innerHTML = `
                    <p>
                        Pokémon not found or API is down.
                    </p>
                `
            })
    })
}

const init = () => {
    watchForm();
}

init();