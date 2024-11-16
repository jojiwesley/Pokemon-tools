import { useParams } from 'react-router-dom';
import { Container } from '../../components';

const PokeDetails = () => {
   const { id } = useParams<{ id: string }>(); // Captura o parâmetro 'id' da URL

   return (
      <Container>
         <div>PokeDetails = {id}</div>
      </Container>
   );
};

export default PokeDetails;
