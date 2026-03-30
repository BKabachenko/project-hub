'use client'
import { useActionState } from 'react';

import { applyToProjectAction } from '@/features/projects/applyToProjectAction';
import { initialState } from '@/lib/constants';


const ApplyToProjectForm = ({ projectId }: { projectId: string }) => {
  const [state, applyAction, isPending] = useActionState(applyToProjectAction, initialState);

  return (
    <form action={applyAction}>
      <input type='text' name='projectId' id='projectId' hidden={true} value={projectId} readOnly={true}/>
      <select name='memberRole' id='memberRole' defaultValue={''}>
        <option value="" disabled>Choose role in project</option>
        <option value='FRONTEND_DEVELOPER'>FRONTEND_DEVELOPER</option>
        <option value='BACKEND_DEVELOPER'>BACKEND_DEVELOPER</option>
        <option value='FULLSTACK_DEVELOPER'>FULLSTACK_DEVELOPER</option>
        <option value='PROJECT_MANAGER'>PROJECT_MANAGER</option>
        <option value='UI_UX_DESIGNER'>UI_UX_DESIGNER</option>
        <option value='QA_ENGINEER'>QA_ENGINEER</option>
        <option value='DEVOPS_ENGINEER'>DEVOPS_ENGINEER</option>
        <option value='BUSINESS_ANALYST'>BUSINESS_ANALYST</option>
        <option value='DATA_SCIENTIST'>DATA_SCIENTIST</option>
        <option value='MARKETING_SPECIALIST'>MARKETING_SPECIALIST</option>
        <option value='WRONG'>WRONG</option>
      </select>
      {state.fieldErrors?.memberRole && <p>{state.fieldErrors.memberRole}</p>}
      <button className='cursor-pointer' type='submit' disabled={isPending}>
        {isPending ? 'Wait...' : 'Apply'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>

  );
};

export default ApplyToProjectForm;
