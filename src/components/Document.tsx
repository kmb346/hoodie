import { GeistSans } from "geist/font/sans";
import {ReactNode} from 'react';
import './globals.css';

type Props = {
  children: ReactNode;
  locale: string;
};

export default function Document({ children, locale }: Props) {
  return (
    <html className={`${GeistSans.variable}`} lang={locale}>
      <body>{ children }</body>
    </html>
  )
}