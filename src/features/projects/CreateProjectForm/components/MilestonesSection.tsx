'use client';

import { type Control, Controller, useFieldArray, useFormState } from 'react-hook-form';

import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

import type { FormParams } from '../types';

import { milestonesStatusLabels } from '@/lib/constants';
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
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Separator } from '@/shared/components/ui/separator';
import { Textarea } from '@/shared/components/ui/textarea';

import { defaultMilestonesField } from '../constants';

interface MilestonesSectionProps {
  control: Control<FormParams>;
}

const milestonesOptions = Object.entries(milestonesStatusLabels).map(([id, value]) => ({
  id,
  value,
}));

const MilestonesSection = ({ control }: MilestonesSectionProps) => {
  const { errors } = useFormState({ control, name: 'milestones' });

  const arrayError = errors.milestones?.message || errors.milestones?.root?.message;

  const milestonesFieldArray = useFieldArray({
    control,
    name: 'milestones',
  });

  return (
    <Card>
      <CardHeader className={'flex flex-col items-center justify-center'}>
        <CardDescription className={'text-xl'}>Create milestones to the project</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <div className={'flex flex-col gap-3'}>
            {milestonesFieldArray.fields.map((item, index) => {
              return (
                <Card
                  key={item.id}
                  className={'bg-muted/20 gap-4 rounded-md p-2 transition hover:shadow-md'}
                  size={'sm'}
                >
                  <CardHeader className={'flex flex-row items-center justify-between'}>
                    <Badge className='rounded-lg p-3' variant={'outline'}>
                      Step {index + 1}
                    </Badge>
                    <CardAction>
                      <div className={'flex gap-2'}>
                        <Button
                          type='button'
                          variant={'ghost'}
                          size={'icon'}
                          disabled={index <= 0}
                          aria-label='Move step up'
                          onClick={() =>
                            milestonesFieldArray.swap(index, index > 0 ? index - 1 : index)
                          }
                        >
                          <ChevronUp />
                        </Button>
                        <Button
                          type='button'
                          variant={'ghost'}
                          size={'icon'}
                          disabled={index >= milestonesFieldArray.fields.length - 1}
                          aria-label='Move step down'
                          onClick={() =>
                            milestonesFieldArray.swap(
                              index,
                              index < milestonesFieldArray.fields.length - 1 ? index + 1 : index
                            )
                          }
                        >
                          <ChevronDown />
                        </Button>
                        <Button
                          type='button'
                          variant='destructive'
                          size={'icon'}
                          aria-label='Remove milestone'
                          onClick={() => milestonesFieldArray.remove(index)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </CardAction>
                  </CardHeader>
                  <Separator className={'bg-input'} />
                  <CardContent className={'flex flex-col items-center gap-4'}>
                    <FieldGroup className={'grid sm:grid-cols-2'}>
                      <Controller
                        name={`milestones.${index}.title`}
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                            <Input
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder={'Type title of milestone'}
                              type={'text'}
                              {...field}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />

                      <Controller
                        name={`milestones.${index}.status`}
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Select status</FieldLabel>
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
                                <SelectValue placeholder={'Select milestone status'} />
                              </SelectTrigger>
                              <SelectContent position={'item-aligned'}>
                                {milestonesOptions.map(({ id, value }) => (
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
                    </FieldGroup>
                    <Controller
                      name={`milestones.${index}.description`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                          <Textarea
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder={'Type description of milestone'}
                            className={'min-h-15 min-w-1 resize-y wrap-anywhere'}
                            {...field}
                          />
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
          aria-label='Add one more card to milestones'
          onClick={() =>
            milestonesFieldArray.append(defaultMilestonesField, { shouldFocus: false })
          }
        >
          Add one more
        </Button>
        {arrayError && <FieldError>{arrayError}</FieldError>}
      </CardFooter>
    </Card>
  );
};

export default MilestonesSection;
