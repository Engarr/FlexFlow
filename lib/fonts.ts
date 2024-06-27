import { Poppins } from 'next/font/google';
import { Baloo_2 } from 'next/font/google';

export const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
export const baloo = Baloo_2({ subsets: ['latin'] });