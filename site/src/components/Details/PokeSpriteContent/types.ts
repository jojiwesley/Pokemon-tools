import { ImgHTMLAttributes } from 'react';

export interface IPokemonDetailContent
   extends ImgHTMLAttributes<HTMLImageElement> {
   image?: string;
   alt?: string;
   width?: number | string;
   height?: number | string;
}
