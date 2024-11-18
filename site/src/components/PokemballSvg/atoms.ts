import styled from 'styled-components';
// import { TPokemonType } from '../../interface';

// interface TAtomPokemonType {
//    type: TPokemonType;
// }

export const ContentSvg = styled.div`
   width: 125% !important;
   heigth: 125% !important;
   position: absolute;
   left: -45%;
   bottom: -55%;
   z-index: -1;
   animation: fadeInAndRotate 3s both;

   @keyframes fadeInAndRotate {
      0% {
         opacity: 0;
         rotate: -90deg;
      }
      100% {
         opacity: 1;
         rotate: 0deg;
      }
   }
`;
export const Path = styled.path`
   fill: white;
`;
