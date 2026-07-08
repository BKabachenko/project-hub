'use client';

import { useState } from 'react';
import { type FieldErrors, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import type { FormParams } from '../types';

import { Button } from '@/shared/components/ui/button';

import { createProjectAction } from '../action';

import BasicInfoSection from './BasicInfoSection';
import MilestonesSection from './MilestonesSection';
import RequirementsSection from './RequirementsSection';
import { formSchema } from '../schema';

const mapServerErrorsToRHF = (
  fieldErrors: Record<keyof FormParams, string[]>
): FieldErrors<FormParams> => {
  const newObject = Object.entries(fieldErrors).map(([key, value]) => [
    key,
    { message: value[0], type: 'custom' },
  ]);
  return Object.fromEntries(newObject) as FieldErrors<FormParams>;
};

const CreateProjectForm = () => {
  const router = useRouter();
  const [newErrors, setNewErrors] = useState({});
  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<FormParams>({
    errors: newErrors,
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      gitUrl: '',
      type: [],
      milestones: [],
      requirements: [
        {
          role: 'FRONTEND_DEVELOPER',
          requiredCount: 1,
          techStack: [],
        },
      ],
    },
  });

  const onSubmit = async (data: FormParams) => {
    const normalizedData = {
      ...data,
      milestones: data.milestones?.map((item, index) => ({ ...item, order: index })),
    };

    try {
      const result = await createProjectAction(normalizedData);

      if (!result.success) {
        toast.error(result.message);
        if (result.fieldErrors) {
          setNewErrors(mapServerErrorsToRHF(result.fieldErrors));
        }
      }
      if (result.success) {
        toast.success(result.message);
        if (result.data) {
          router.push(`${result.data.newProjectId}`);
        }
      }
    } catch (_) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      <form
        id={'createProject'}
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        className={'space-y-8'}
      >
        <BasicInfoSection control={control} />

        <RequirementsSection control={control} />

        <MilestonesSection control={control} />
      </form>
      <div className='flex flex-row gap-4'>
        <Button
          type='button'
          variant='destructive'
          size={'lg'}
          className={'flex-1'}
          onClick={() => reset()}
          disabled={isSubmitting}
        >
          Reset
        </Button>
        <Button
          type='submit'
          form='createProject'
          size={'lg'}
          className={'flex-1'}
          disabled={isSubmitting}
        >
          Create project
        </Button>
      </div>
    </div>
  );
};

export default CreateProjectForm;
