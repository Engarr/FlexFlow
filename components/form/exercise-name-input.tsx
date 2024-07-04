'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Path, UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { exercises } from '@/lib/app-data';
import { formSchemaType } from '@/lib/form-schema';

import { Input } from '../ui/input';

type FormElementType = {
  form: UseFormReturn<formSchemaType>;
  title: string;
  name: Path<formSchemaType>;
};

const ExerciseNameInput = ({ form, title, name }: FormElementType) => {
  const onChangeExerciseName = (exerciseName: string) => {
    form.setValue(name, exerciseName);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className='relative' ref={dropdownRef}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => {
          const { value, ...restField } = field;
          const safeValue =
            typeof value === 'string' || typeof value === 'number' ? value : '';

          const filteredExercises = exercises
            ? exercises.filter((exercise) =>
                exercise.exerciseName
                  .toLowerCase()
                  .includes(safeValue.toString().toLowerCase())
              )
            : [];

          return (
            <FormItem>
              <FormLabel>{title}</FormLabel>
              <FormControl>
                <Input
                  {...restField}
                  value={safeValue}
                  onClick={toggleDropdown}
                />
              </FormControl>
              <FormMessage />
              {dropdownOpen && (
                <div className='max-h-[200px] overflow-y-scroll bg-[var(--main-background)] mt-2 rounded-md absolute w-full p-2 border-slate-300 border-2'>
                  <ul>
                    {filteredExercises.map((e) => (
                      <li
                        className='cursor-pointer pb-1'
                        key={e.exerciseName}
                        onClick={() => {
                          onChangeExerciseName(e.exerciseName);
                          setDropdownOpen(false);
                        }}>
                        {e.exerciseName}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </FormItem>
          );
        }}
      />
    </div>
  );
};

export default ExerciseNameInput;
