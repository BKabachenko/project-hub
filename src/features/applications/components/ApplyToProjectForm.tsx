'use client';
import { type ReactNode, useState } from 'react';
import { Controller } from 'react-hook-form';
import { type FieldErrors, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import type { ApplyFormParams } from '../types';

import { mapServerErrorsToRHF } from '@/features/projects/CreateProjectForm/utils';
import { type Application, ApplicationStatus, type ProjectRequirement } from '@/generated/prisma';
import { applicationStatusLabels, memberRoleLabels } from '@/lib/constants';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Field, FieldContent, FieldError, FieldLabel } from '@/shared/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/shared/components/ui/input-group';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';

import applyToProjectAction from '../actions/applyToProjectAction';
import { APPLY_FORM_SCHEMA_LIMITS, applyFormSchema } from '../schemas';

interface ApplyToProjectFormProps {
  requirements: ProjectRequirement[];
  applications: Application[];
  children?: ReactNode;
}

type RequirementsFormState = Record<string, { coverLetter: string; status: string | null }>;

const buildInitialFormState = (
  requirements: ProjectRequirement[],
  applications: Application[]
): RequirementsFormState => {
  return requirements.reduce((acc, req) => {
    const app = applications.find((a) => a.requirementId === req.id);
    acc[req.id] = { coverLetter: app?.coverLetter || '', status: app?.status || null };
    return acc;
  }, {} as RequirementsFormState);
};

export const ApplyToProjectForm = ({
  requirements,
  children,
  applications,
}: ApplyToProjectFormProps) => {
  const router = useRouter();
  const [newErrors, setNewErrors] = useState<FieldErrors<ApplyFormParams>>({});
  const [checkedRequirementId, setCheckedRequirementId] = useState('');
  const [formState, setFormState] = useState<RequirementsFormState>(() =>
    buildInitialFormState(requirements, applications)
  );

  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { isSubmitting },
  } = useForm<ApplyFormParams>({
    errors: newErrors,
    resolver: zodResolver(applyFormSchema),
    defaultValues: {
      projectId: requirements[0]?.projectId,
      coverLetter: '',
      requirementId: '',
    },
  });

  const onSubmit = async (data: ApplyFormParams) => {
    try {
      const result = await applyToProjectAction(data);
      if (!result.success) {
        toast.error(result.message);
        if (result.fieldErrors) {
          setNewErrors(mapServerErrorsToRHF(result.fieldErrors));
        }
      }
      if (result.success) {
        toast.success(result.message);
        router.back();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleValueChange = (requirementId: string) => {
    setCheckedRequirementId(requirementId);
    setValue('requirementId', requirementId);
    setValue('coverLetter', formState[requirementId]?.coverLetter || '');
  };

  const handleReset = () => {
    reset();
    setFormState(buildInitialFormState(requirements, applications));
    setCheckedRequirementId('');
  };

  return (
    <div className={'flex w-full min-w-0 flex-col gap-8'}>
      <form
        id={'applyToProject'}
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        className={'space-y-6'}
      >
        <Controller
          name={'requirementId'}
          control={control}
          render={({ field, fieldState }) => (
            <RadioGroup
              className={'flex flex-col gap-2'}
              onValueChange={(newValue) => {
                field.onChange(newValue);
                handleValueChange(newValue);
              }}
              value={field.value}
              name={field.name}
              required={true}
            >
              <p className={'font-semibold'}>Requirements</p>
              {requirements.map((item) => {
                const isFull = item.openPositionsCount <= 0;
                const userApp = applications.find((a) => a.requirementId === item.id);
                const isClosed = isFull && !userApp;

                return (
                  <Field
                    data-invalid={fieldState.invalid}
                    key={item.id}
                    className={'flex flex-row items-center'}
                  >
                    <RadioGroupItem
                      value={item.id}
                      id={item.id}
                      disabled={isClosed}
                      className={'max-w-4'}
                    />
                    <FieldLabel htmlFor={item.id} className={isClosed ? 'opacity-60' : ''}>
                      <FieldContent>
                        <Card className={'justify-start'}>
                          <CardHeader>
                            {userApp ? (
                              <Badge variant={'outline'} key={userApp.status}>
                                {applicationStatusLabels[userApp.status]}
                              </Badge>
                            ) : isFull ? (
                              <Badge variant={'secondary'}>Filled</Badge>
                            ) : null}

                            <CardTitle className={'text-lg font-semibold'}>
                              {memberRoleLabels[item.role]}
                            </CardTitle>
                            <CardDescription className={'text-muted-foreground'}>
                              {`${item.requiredCount - item.openPositionsCount} of ${item.requiredCount} filled`}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className={'flex flex-row flex-wrap gap-2'}>
                            {item.techStack.map((tech) => (
                              <Badge
                                key={tech}
                                variant={'role'}
                                className={'h-auto p-1 px-3 wrap-anywhere whitespace-normal'}
                              >
                                {tech}
                              </Badge>
                            ))}
                          </CardContent>
                        </Card>
                      </FieldContent>
                    </FieldLabel>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                );
              })}
            </RadioGroup>
          )}
        />

        <Controller
          name={'coverLetter'}
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Cover letter</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  id={field.name}
                  placeholder='Explain why you are a great fit for this role and what relevant experience you bring...'
                  rows={8}
                  className='min-h-24 resize-none'
                  aria-invalid={fieldState.invalid}
                  {...field}
                  value={formState[checkedRequirementId]?.coverLetter || ''}
                  onChange={(e) => {
                    const newText = e.target.value;

                    setFormState((prev) => ({
                      ...prev,
                      [checkedRequirementId]: {
                        status: prev[checkedRequirementId]?.status || '',
                        coverLetter: newText,
                      },
                    }));

                    field.onChange(newText);
                  }}
                />
                <InputGroupAddon align='block-end'>
                  <InputGroupText className='tabular-nums'>
                    {`${field.value?.length || 0} / ${APPLY_FORM_SCHEMA_LIMITS.COVER_LETTER_MAX} characters (min. ${APPLY_FORM_SCHEMA_LIMITS.COVER_LETTER_MIN})`}
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </form>

      <div className='flex flex-row gap-4'>
        <Button
          type='button'
          form={'applyToProject'}
          variant='outline'
          className={'flex-1'}
          onClick={handleReset}
          disabled={isSubmitting}
        >
          Reset
        </Button>
        <Button
          type='submit'
          form='applyToProject'
          className={'flex-1'}
          disabled={
            isSubmitting ||
            !checkedRequirementId ||
            formState[checkedRequirementId]?.status === ApplicationStatus.APPROVED
          }
          onClick={() => {
            setValue('action', 'apply');
            setValue('coverLetter', formState[checkedRequirementId]?.coverLetter || '');
          }}
        >
          {formState[checkedRequirementId]?.status === ApplicationStatus.PENDING
            ? 'Update application'
            : formState[checkedRequirementId]?.status === ApplicationStatus.APPROVED
              ? 'Already approved'
              : 'Apply to project'}
        </Button>
        {formState[checkedRequirementId]?.status === ApplicationStatus.PENDING ? (
          <Button
            type='submit'
            form='applyToProject'
            variant='destructive'
            className={'flex-1'}
            disabled={isSubmitting}
            onClick={() => {
              setValue('action', 'withdraw');
            }}
          >
            Withdraw application
          </Button>
        ) : null}
        {children || null}
      </div>
    </div>
  );
};
