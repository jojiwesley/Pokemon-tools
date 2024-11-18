import styled from 'styled-components';
import { Container } from '../../components';

export const ContentDetails = styled(Container)`
   background-color: ${(props) => props?.theme?.colors?.neutral?.[1]};
   box-shadow:
      rgba(0, 0, 0, 0.12) 0px 1px 3px,
      rgba(0, 0, 0, 0.24) 0px 1px 2px;
   padding: 50px;
   animation: fadeIn 0.5s both;

   //    max-width: 500px;
   //    border-radius: 5px;
   //
   //    height: 300px;

   //    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
   //       max-width: 100%;
   //    }

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
