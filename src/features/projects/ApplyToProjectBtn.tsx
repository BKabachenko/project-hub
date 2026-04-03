'use client';
import { useActionState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { applyToProjectAction } from '@/features/projects/applyToProjectAction';
import { initialState } from '@/lib/constants';

const ApplyToProjectForm = ({ projectId }: { projectId: string }) => {
  const [state, applyAction, isPending] = useActionState(applyToProjectAction, initialState);

  return (
    <form action={applyAction}>
      <input
        type='text'
        name='projectId'
        id='projectId'
        hidden={true}
        value={projectId}
        readOnly={true}
      />
      <Select name='memberRole' defaultValue={''}>
        <SelectTrigger className='w-100'>
          <SelectValue placeholder='Choose role in project' />
        </SelectTrigger>
        <SelectContent position={'popper'}>
          <SelectGroup>
            <SelectItem value='FRONTEND_DEVELOPER'>FRONTEND_DEVELOPER</SelectItem>
            <SelectItem value='BACKEND_DEVELOPER'>BACKEND_DEVELOPER</SelectItem>
            <SelectItem value='FULLSTACK_DEVELOPER'>FULLSTACK_DEVELOPER</SelectItem>
            <SelectItem value='PROJECT_MANAGER'>PROJECT_MANAGER</SelectItem>
            <SelectItem value='UI_UX_DESIGNER'>UI_UX_DESIGNER</SelectItem>
            <SelectItem value='QA_ENGINEER'>QA_ENGINEER</SelectItem>
            <SelectItem value='DEVOPS_ENGINEER'>DEVOPS_ENGINEER</SelectItem>
            <SelectItem value='BUSINESS_ANALYST'>BUSINESS_ANALYST</SelectItem>
            <SelectItem value='DATA_SCIENTIST'>DATA_SCIENTIST</SelectItem>
            <SelectItem value='MARKETING_SPECIALIST'>MARKETING_SPECIALIST</SelectItem>
            <SelectItem value='WRONG'>WRONG</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {state.fieldErrors?.memberRole && <p>{state.fieldErrors.memberRole}</p>}
      <Button variant={'default'} type='submit' disabled={isPending}>
        {isPending ? 'Wait...' : 'Apply'}
      </Button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
};

export default ApplyToProjectForm;
