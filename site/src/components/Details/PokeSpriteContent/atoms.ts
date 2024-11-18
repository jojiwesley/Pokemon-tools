import styled from 'styled-components';
import { FlexBox } from '../../Atoms/Flexbox';

export const Content = styled.div`
   animation: fadeIn 0.5s both;
   max-width: 500px;
   background-color: ${(props) => props?.theme?.colors?.neutral?.pure};
   border-radius: 5px;
   box-shadow:
      rgba(0, 0, 0, 0.12) 0px 1px 3px,
      rgba(0, 0, 0, 0.24) 0px 1px 2px;
   padding: 30px;
   height: 400px;
   position: relative;
   overflow: hidden;

   @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
      max-width: 100%;
   }

   @keyframes fadeIn {
      0% {
         opacity: 0;
         transform: translateY(40px);
      }
      100% {
         opacity: 1;
         transform: translateY(0px);
      }
   }
`;

export const ContentSprite = styled(FlexBox)`
   height: 100%;
   width: 100%;
`;
export const PokemonDetailsSprite = styled.img`
   height: 400px;
   width: 400px;

   @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
      max-width: 100%;
   }
`;
