import { InputHTMLAttributes, ReactNode } from 'react';

export namespace FormTypes {
  export interface Container extends InputHTMLAttributes<HTMLInputElement> {
    children: ReactNode;
    onSubmit(data: any): void;
  }
  export interface Input extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
  }
}
