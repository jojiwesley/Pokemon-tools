import { Container, FlexBox, Header, PokedexView } from '../../components';

const Error404 = () => {
   return (
      <Container>
         <Header />
         <FlexBox align="center" justify="center" direction="row">
            <img
               alt="Pokemon gengar gif"
               src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/94.gif"
            />
            <img
               alt="Pokemon haunter gif"
               src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/93.gif"
            />
            <img
               alt="Pokemon gastly gif"
               src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/92.gif"
            />
         </FlexBox>
         <PokedexView align="center" justify="center" direction="column">
            <h3>Página não encontrada.</h3>
            <span>Só fantasmas por aqui...</span>
         </PokedexView>
      </Container>
   );
};

export default Error404;
