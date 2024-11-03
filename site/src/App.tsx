import "./App.css";
import { useEffect, useState, useMemo, useCallback } from "react";

//components
import { Container, FlexBox } from "./components";
import Button from "./components/Button";
import Card from "./components/Card";
import { PokedexView } from "./components/PokedexView";
//icons
import { MdCatchingPokemon } from "react-icons/md";
//recoil: states
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";

//recoil: atom
import {
  atomPokemonFatch,
  atomPokemonList,
  atomPokemonOffset,
  atomPokemonSearch,
} from "./store/atoms/atoms";

import { atomHashPokemonFetch, atomHashPokemonsList } from "./store/hashs";

//recoil: selectors
import {
  selectorFetchPokemon,
  selectorGetPokemon,
  selectorGetPokemons,
} from "./store/selectors";
import Input from "./components/input";

//::
function App() {
  // loca: state
  const [searchPokemon, setSearchPokemon] = useState("");
  const [pokemonCount, setpokemonCount] = useState<number>(0);

  // recoil: states
  const setPokemon = useSetRecoilState(atomPokemonSearch);
  const setFetchPokemon = useSetRecoilState(atomPokemonFatch);
  const [pokemonOffset, SetPokemonOffset] = useRecoilState(atomPokemonOffset);
  const [pokemonList, SetPokemonList] = useRecoilState(atomPokemonList);
  const [HashFetchMorePokemon, setHashFetchMorePokemon] =
    useRecoilState(atomHashPokemonFetch);
  const [HashPokemonsList, SetHashPokemonsList] =
    useRecoilState(atomHashPokemonsList);

  // recoil: loadable
  const getLoadablePokemons = useRecoilValueLoadable(selectorGetPokemons);
  const getLoadablePokemon = useRecoilValueLoadable(selectorGetPokemon);
  const fetchLoadablePokemon = useRecoilValueLoadable(selectorFetchPokemon);
  // memo: states
  const disableFetchMorePokemon = useMemo(() => {
    if (
      fetchLoadablePokemon.state === "hasError" ||
      fetchLoadablePokemon.state === "loading" ||
      getLoadablePokemon.state === "hasError" ||
      getLoadablePokemon.state === "loading"
    ) {
      return true;
    } else {
      return false;
    }
  }, [fetchLoadablePokemon.state, getLoadablePokemon.state]);

  const hasFetchPokemonError = useMemo(() => {
    if (
      fetchLoadablePokemon.state === "hasError" ||
      getLoadablePokemon.state === "hasError"
    ) {
      return true;
    } else {
      return false;
    }
  }, [fetchLoadablePokemon.state, getLoadablePokemon.state]);

  const refresherFethMorePokemon = useCallback(() => {
    if (fetchLoadablePokemon.state === "hasError") {
      setHashFetchMorePokemon(HashFetchMorePokemon + 1);
    }
    if (getLoadablePokemon.state === "hasError") {
      SetHashPokemonsList(HashPokemonsList + 1);
    }
  }, [fetchLoadablePokemon.state, getLoadablePokemon.state]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setPokemon(searchPokemon);
    }
  };
  useEffect(() => {
    if (
      fetchLoadablePokemon.state === "hasValue" &&
      fetchLoadablePokemon.contents !== undefined
    ) {
      setpokemonCount(fetchLoadablePokemon.contents.count);
      setFetchPokemon(fetchLoadablePokemon.contents.results);
    }
  }, [fetchLoadablePokemon.state, fetchLoadablePokemon.contents]);

  useEffect(() => {
    if (
      getLoadablePokemons.state === "hasValue" &&
      getLoadablePokemons.contents !== undefined
    ) {
      if (pokemonList.length + 0) {
        // const filteredList = getLoadablePokemons.contents.filter((pokemon) => pokemonList.find((item) => item.name === pokemon.name));

        SetPokemonList(pokemonList.concat(getLoadablePokemons.contents));
      } else {
        SetPokemonList(getLoadablePokemons.contents);
      }
    }
  }, [getLoadablePokemons.state, getLoadablePokemons.contents]);

  return (
    <>
      <Container>
        <FlexBox
          align="flex-start"
          justify="center"
          direction="column"
          gap="xxs"
        >
          <FlexBox
          align="center"
          justify="flex-start"
          direction="row"
          gap="xxs"
          >
          <Input
            type="text"
            placeholder="Pikachu... "
            onChange={(event) => setSearchPokemon(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={() => setPokemon(searchPokemon)}  > Procurar </Button>
        </FlexBox>
          {getLoadablePokemon?.state === "loading" && <div>Loading...</div>}
          {getLoadablePokemon?.state === "hasValue" &&
            getLoadablePokemon?.contents !== undefined && (
              <Card
                id={getLoadablePokemon.contents.id}
                name={getLoadablePokemon?.contents?.name}
                image={
                  getLoadablePokemon?.contents?.sprites?.other?.dream_world
                    ?.front_default ||
                  getLoadablePokemon?.contents?.sprites.other?.[
                    "official-artwork"
                  ]?.front_default ||
                  ""
                }
                type={getLoadablePokemon?.contents?.types[0]?.type?.name}
                preview={
                  getLoadablePokemon?.contents?.sprites?.versions?.[
                    "generation-v"
                  ]?.["black-white"]?.animated?.front_default
                }
              />
            )}
            <FlexBox
            align="flex-start"
            justify="flex-start"
            direction="row"
            gap="xxs"
            wrap="wrap"
            >
              <MdCatchingPokemon size={20}/> {pokemonCount} Pokemons
            </FlexBox>
          <PokedexView
            align="flex-start"
            justify="center"
            direction="row"
            gap="xxs"
            wrap="wrap"
          >
            {pokemonList.map((pokemon) => (
              <Card
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={
                  pokemon.sprites?.other?.dream_world?.front_default ||
                  pokemon.sprites.other?.["official-artwork"]?.front_default ||
                  ""
                }
                type={pokemon.types[0]?.type?.name}
                preview={
                  pokemon.sprites?.versions?.["generation-v"]?.["black-white"]
                    ?.animated?.front_default
                }
              />
            ))}
          </PokedexView>
          <FlexBox
            align="flex-start"
            justify="center"
            direction="row"
            gap="xxs"
          >
            <Button
              disabled={disableFetchMorePokemon}
              onClick={() => SetPokemonOffset(pokemonOffset + 10)}
            >
              Carregar mais
            </Button>
            {hasFetchPokemonError && (
              <Button onClick={() => refresherFethMorePokemon()}>
                Reflesh
              </Button>
            )}
          </FlexBox>
        </FlexBox>
      </Container>
    </>
  );
}
export default App;
