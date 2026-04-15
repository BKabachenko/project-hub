import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';

const FilterBlock = () => {
  const labelStyles = 'font-regular text-muted-foreground';
  return (
    <div className='border-border min-w-66 rounded-md border bg-transparent p-4'>
      <FieldGroup>
        <div className='flex flex-row items-baseline justify-between'>
          <h3 className={'font-semibold'}>FILTERS</h3>
          <Button
            type={'button'}
            variant={'ghost'}
            className={'text-muted-foreground text-xs underline'}
          >
            Clear all
          </Button>
        </div>
        <FieldSet>
          <FieldGroup className={'gap-3'}>
            <FieldLegend variant={'label'} className={labelStyles}>
              Project Type
            </FieldLegend>
            <Field orientation={'horizontal'}>
              <Checkbox id={'charity'} />
              <FieldLabel className={labelStyles} htmlFor={'charity'}>
                Charity
              </FieldLabel>
            </Field>
            <Field orientation={'horizontal'}>
              <Checkbox id={'pet'} />
              <FieldLabel className={labelStyles} htmlFor={'pet'}>
                Pet Project
              </FieldLabel>
            </Field>
            <Field orientation={'horizontal'}>
              <Checkbox id={'commercial'} />
              <FieldLabel className={labelStyles} htmlFor={'commercial'}>
                Commercial
              </FieldLabel>
            </Field>
            <Field orientation={'horizontal'}>
              <Checkbox id={'opensource'} />
              <FieldLabel className={labelStyles} htmlFor={'opensource'}>
                Open Source
              </FieldLabel>
            </Field>
          </FieldGroup>

          <FieldSeparator />

          <FieldGroup className={'gap-3'}>
            <FieldLegend variant={'label'} className={labelStyles}>
              Roles Needed
            </FieldLegend>
            <Field orientation={'horizontal'}>
              <Checkbox id={'1'} />
              <FieldLabel className={labelStyles} htmlFor={'1'}>
                Test 1
              </FieldLabel>
            </Field>
            <Field orientation={'horizontal'}>
              <Checkbox id={'2'} />
              <FieldLabel className={labelStyles} htmlFor={'2'}>
                Test 2
              </FieldLabel>
            </Field>
            <Field orientation={'horizontal'}>
              <Checkbox id={'3'} />
              <FieldLabel className={labelStyles} htmlFor={'3'}>
                Test 3
              </FieldLabel>
            </Field>
            <Field orientation={'horizontal'}>
              <Checkbox id={'4'} />
              <FieldLabel className={labelStyles} htmlFor={'4'}>
                Test 4
              </FieldLabel>
            </Field>
            <Field orientation={'horizontal'}>
              <Checkbox id={'5'} />
              <FieldLabel className={labelStyles} htmlFor={'5'}>
                Test 5
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  );
};

export default FilterBlock;
