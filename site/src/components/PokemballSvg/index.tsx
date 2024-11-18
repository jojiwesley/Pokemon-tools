import * as Atom from './atoms';

const PokeballSvg = () => {
   return (
      <Atom.ContentSvg>
         <svg
            width="100%"
            height="100%"
            viewBox="0 0 499 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <Atom.Path
               fill-rule="evenodd"
               clip-rule="evenodd"
               d="M389.373 275H498.199C485.656 401.333 379.067 500 249.434 500C119.8 500 13.2111 401.333 0.667969 275H109.494C121.307 341.575 179.466 392.131 249.434 392.131C319.401 392.131 377.56 341.575 389.373 275ZM389.373 225H498.199C485.656 98.6669 379.067 0 249.434 0C119.8 0 13.2111 98.6669 0.667969 225H109.494C121.307 158.425 179.466 107.869 249.434 107.869C319.401 107.869 377.56 158.425 389.373 225ZM249 348C303.124 348 347 304.124 347 250C347 195.876 303.124 152 249 152C194.876 152 151 195.876 151 250C151 304.124 194.876 348 249 348Z"
               fill-opacity="0.2"
            />
         </svg>
      </Atom.ContentSvg>
   );
};

export default PokeballSvg;
