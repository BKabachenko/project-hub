'use client';

import { type Control, Controller } from 'react-hook-form';

import type { FormParams } from '../types';

import { projectCategoryLabels, projectTypeLabels } from '@/lib/constants';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/shared/components/ui/input-group';
import { MultiSelect } from '@/shared/components/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

import { CREATION_PROJECT_SCHEMA_LIMITS } from '../schema';

interface BasicInfoSectionProps {
  control: Control<FormParams>;
}

const multiSelectOptions = Object.entries(projectTypeLabels).map(([value, label]) => ({
  value,
  label,
}));

const BasicInfoSection = ({ control }: BasicInfoSectionProps) => {
  return (
    <Card>
      <CardHeader className={'flex flex-col items-center justify-center'}>
        <CardTitle className={'text-2xl'}>Create new project</CardTitle>
        <CardDescription className={'text-xl'}>Form to creating new project</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <FieldGroup>
            <Controller
              name={'title'}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Input
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder={'Type title of project...'}
                    {...field}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name={'description'}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      id={field.name}
                      placeholder='Type project description.'
                      rows={8}
                      className='min-h-24 resize-none'
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    <InputGroupAddon align='block-end'>
                      <InputGroupText className='tabular-nums'>
                        {`${field.value.length} / ${CREATION_PROJECT_SCHEMA_LIMITS.DESCRIPTION_MAX} characters`}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name={'gitUrl'}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Git url</FieldLabel>
                  <Input
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder={'Type url of project if you have...'}
                    {...field}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name={'category'}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Project category</FieldLabel>
                  <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder={'Select project category'} />
                    </SelectTrigger>
                    <SelectContent position={'item-aligned'}>
                      {Object.entries(projectCategoryLabels).map(([id, value]) => (
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
              name={'type'}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Project type</FieldLabel>
                  <MultiSelect
                    options={multiSelectOptions}
                    onValueChange={field.onChange}
                    defaultValue={field.value || []}
                    searchable={false}
                    hideSelectAll={true}
                    responsive={true}
                    className={'border-input border'}
                    {...field}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  );
};

export default BasicInfoSection;
