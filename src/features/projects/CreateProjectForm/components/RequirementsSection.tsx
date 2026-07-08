'use client';

import { type Control, Controller, useFieldArray, useFormState } from 'react-hook-form';

import { Trash2 } from 'lucide-react';

import type { FormParams } from '../types';

import { memberRoleLabels } from '@/lib/constants';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/shared/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
} from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Separator } from '@/shared/components/ui/separator';
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputList,
} from '@/shared/components/ui/tags-input';

interface RequirementsSectionProps {
  control: Control<FormParams>;
}

const memberRoleOptions = Object.entries(memberRoleLabels).map(([id, value]) => ({
  id,
  value,
}));

const RequirementsSection = ({ control }: RequirementsSectionProps) => {
  const { errors } = useFormState({ control, name: 'requirements' });
  const arrayError = errors.requirements?.message || errors.requirements?.root?.message;

  const requirementsFieldArray = useFieldArray({
    control,
    name: 'requirements',
  });

  return (
    <Card>
      <CardHeader className={'flex flex-col items-center justify-center'}>
        <CardDescription className={'text-xl'}>Choose how much workers you need</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <div className={'grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4'}>
            {requirementsFieldArray.fields.map((item, index) => {
              return (
                <Card
                  key={item.id}
                  className={
                    'bg-muted/20 flex flex-col gap-4 rounded-md p-2 transition hover:shadow-md'
                  }
                  size={'sm'}
                >
                  <CardHeader className={'flex flex-row items-center justify-between'}>
                    <Badge className='rounded-lg p-3' variant={'outline'}>
                      Requirement {index + 1}
                    </Badge>
                    <CardAction>
                      <Button
                        type='button'
                        variant='destructive'
                        size={'icon'}
                        aria-label='Remove requirement card'
                        onClick={() => requirementsFieldArray.remove(index)}
                      >
                        <Trash2 />
                      </Button>
                    </CardAction>
                  </CardHeader>
                  <Separator />
                  <CardContent className={'flex flex-1 flex-col justify-around gap-3'}>
                    <Controller
                      name={`requirements.${index}.role`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Select requirement role</FieldLabel>
                          <Select
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              ref={field.ref}
                              onBlur={field.onBlur}
                            >
                              <SelectValue placeholder={'Select project category'} />
                            </SelectTrigger>
                            <SelectContent position={'item-aligned'}>
                              {memberRoleOptions.map(({ id, value }) => (
                                <SelectItem key={id} value={id}>
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                    <Controller
                      name={`requirements.${index}.requiredCount`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>How many you need?</FieldLabel>
                          <Input
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder={'How many you need?'}
                            type={'number'}
                            min={1}
                            {...field}
                            onChange={(e) => {
                              const val = e.target.valueAsNumber;
                              field.onChange(Number.isNaN(val) ? '' : val);
                            }}
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                    <Controller
                      name={`requirements.${index}.techStack`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Type tags who you need</FieldLabel>
                          <TagsInput
                            value={field.value}
                            onValueChange={field.onChange}
                            editable
                            addOnPaste
                            name={field.name}
                          >
                            <TagsInputList className={'bg-transparent'}>
                              {field.value.map((tag) => (
                                <TagsInputItem key={tag} value={tag}>
                                  {tag}
                                </TagsInputItem>
                              ))}
                              <TagsInputInput
                                id={field.name}
                                placeholder={'Add tags...'}
                                ref={field.ref}
                                onBlur={field.onBlur}
                              />
                            </TagsInputList>
                          </TagsInput>
                          <FieldDescription>
                            Use Enter button or comma sign to separate tags.
                          </FieldDescription>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </FieldSet>
      </CardContent>
      <CardFooter className={'flex flex-col items-start gap-2'}>
        <Button
          type={'button'}
          variant={'outline'}
          className={'w-full p-5'}
          aria-label='Add one more card to requirements'
          onClick={() =>
            requirementsFieldArray.append(
              {
                role: 'FRONTEND_DEVELOPER',
                requiredCount: 1,
                techStack: [],
              },
              { shouldFocus: false }
            )
          }
        >
          Add one more
        </Button>
        {arrayError && <FieldError>{arrayError}</FieldError>}
      </CardFooter>
    </Card>
  );
};

export default RequirementsSection;
