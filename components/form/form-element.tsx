import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Path, UseFormReturn } from 'react-hook-form';
import { formSchemaType } from '@/lib/form-schema';
import { Input } from '../ui/input';

type FormElementType = {
  form: UseFormReturn<formSchemaType>;
  title: string;
  name: Path<formSchemaType>;
};

const FormElement = ({ form, title, name }: FormElementType) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const { value, ...restField } = field;

        const safeValue =
          typeof value === 'string' || typeof value === 'number' ? value : '';

        return (
          <FormItem className='mb-5'>
            <FormLabel>{title}</FormLabel>
            <FormControl>
              <Input {...restField} value={safeValue} />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormElement;
