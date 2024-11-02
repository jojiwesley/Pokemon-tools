import { useRecoilState, useRecoilValueLoadable } from "recoil";
import "./App.css";
import { atomPokemon } from "./store/atoms/atoms";
import { selectorGetPokemon } from "./store/selectors";
import { useState } from "react";

function App() {

  // loca: state 
  const [searchPokemon, setSearchPokemon] = useState("")

  // recoil: states 
  const [pokemon, setPokemon] = useRecoilState(atomPokemon);
  
  // recoil: loadable 
  const getLoadablePokemon = useRecoilValueLoadable(selectorGetPokemon)
  console.log(getLoadablePokemon)

  return (
    <>
      <div className="">
        <input type="text" onChange={(event) => setSearchPokemon(event.target.value)} />
        <button onClick={() => setPokemon(searchPokemon)}> Procurar </button>
        {getLoadablePokemon?.state === "loading" && <div>Loading...</div>}
        {getLoadablePokemon?.state === "hasValue" && 
        getLoadablePokemon?.contents !== undefined && (
          <div>
            <img 
            width="150px"
            src={getLoadablePokemon?.contents?.sprites?.front_default} 
            alt={getLoadablePokemon?.contents?.name}
            />

          </div>
        )}
        
        
        {pokemon}
        </div>
    </>
  );

}

export default App;
