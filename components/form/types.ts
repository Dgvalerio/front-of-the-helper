import { InputHTMLAttributes, ReactNode } from 'react';

import { GridSpacing } from '@mui/material';
import { ResponsiveStyleValue } from '@mui/system';

export namespace FormTypes {
  export interface Container extends InputHTMLAttributes<HTMLInputElement> {
    children: ReactNode;
    spacing?: ResponsiveStyleValue<GridSpacing> | undefined;
    onSubmit(data: any): void;
  }
  export interface Input extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    small?: boolean;
  }
}
