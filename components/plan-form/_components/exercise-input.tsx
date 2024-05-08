'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { onChangeExerciseName } from '@/utils/plan-functions';
import { exercises } from '@/lib/app-data';
import ErrorMessage from '@/components/error-message';
import { PlanDataType } from '@/types/user-plan-type';

type ExerciseInputType = {
  value: string;
  planId: number;
  setPlanData: React.Dispatch<React.SetStateAction<PlanDataType>>;
  error: string;
  searchExercise: string;
};

const ExerciseInput = ({
  value,
  planId,
  setPlanData,
  error,
  searchExercise,
}: ExerciseInputType) => {
  const filteredExercises = exercises
    ? exercises.filter((exercise) =>
        exercise.exerciseName
          .toLowerCase()
          .includes(searchExercise.toLowerCase())
      )
    : [];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <Label htmlFor='exerciseName'>Exercise Name</Label>
      <Input
        id='exerciseName'
        type='text'
        value={value}
        onChange={(e) =>
          onChangeExerciseName(e.target.value, planId, setPlanData)
        }
        onClick={toggleDropdown}
      />
      {error && <ErrorMessage message={error} />}
      {dropdownOpen && (
        <div className='max-h-[200px] overflow-y-scroll bg-[var(--main-background)] mt-2 rounded-md absolute w-full p-2 border-slate-300 border-2'>
          <ul>
            {filteredExercises.map((e) => (
              <li
                className='cursor-pointer pb-1'
                key={e.exerciseName}
                onClick={() => {
                  onChangeExerciseName(e.exerciseName, planId, setPlanData);
                  setDropdownOpen(false);
                }}>
                {e.exerciseName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExerciseInput;
