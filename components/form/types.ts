import { InputHTMLAttributes, ReactNode } from 'react';

import { GridSpacing } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { GridSize, ResponsiveStyleValue } from '@mui/system';

import { Property } from 'csstype';

export namespace FormTypes {
  import JustifyContent = Property.JustifyContent;

  export interface Container extends InputHTMLAttributes<HTMLInputElement> {
    children: ReactNode;
    spacing?: ResponsiveStyleValue<GridSpacing> | undefined;
    onSubmit(data: any): void;
    xs?: GridSize;
    justifyContent?: JustifyContent;
  }

  export type Input = TextFieldProps & {
    label: string;
    name: string;
    boolean?: boolean;
  };
}
