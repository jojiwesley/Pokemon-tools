import { useRecoilState, useRecoilValue } from "recoil";
import "./App.css";
import { atomPokemon } from "./store/atoms/atoms";
import { selectorPokemonLength } from "./store/selectors";
function App() {
  // const [search, setSearch] = useState()
  const [pokemon, setPokemon] = useRecoilState(atomPokemon);
  const pokemonLength = useRecoilValue(selectorPokemonLength)

  return (
    <>
      <div className="">
        <input type="text" onChange={(event) => setPokemon(event.target.value)} />
        {pokemon}
        <p>lenght: {pokemonLength}</p>
        </div>
    </>
  );

}

export default App;
