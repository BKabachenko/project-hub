'use client';

import { useActionState } from 'react';

import { createProjectAction } from './actions';
import { initialState } from '@/lib/constants';

const CreateProjectForm = () => {
  const [state, formAction, isPending] = useActionState(createProjectAction, initialState);

  return (
    <div className='bg-gray-500'>
      <form action={formAction} className='flex flex-col'>
        <label htmlFor='title'>Title</label>
        <input type='text' name='title' id='title' />
        {state.fieldErrors?.title && <p>{state.fieldErrors.title}</p>}

        <label htmlFor='description'>Description</label>
        <input type='text' name='description' id='description' />
        {state.fieldErrors?.description && <p>{state.fieldErrors.description}</p>}

        <label htmlFor='category'>Category</label>
        <select name='category' id='category'>
          <option value='FITNESS'>Fitness</option>
          <option value='VIDEO'>Video</option>
          <option value='TRAVEL'>Travel</option>
          <option value='E_COMMERCE'>E_COMMERCE</option>
          <option value='EDUCATION'>EDUCATION</option>
          <option value='HEALTHCARE'>HEALTHCARE</option>
          <option value='WRONG'>WRONG</option>
        </select>
        {state.fieldErrors?.category && <p>{state.fieldErrors.category}</p>}

        <label htmlFor='requiredParticipants'>Number</label>
        <input type='number' name='requiredParticipants' id='requiredParticipants' />
        {state.fieldErrors?.requiredParticipants && <p>{state.fieldErrors.requiredParticipants}</p>}

        <button type='submit' disabled={isPending}>
          Create project
        </button>
      </form>
    </div>
  );
};

export default CreateProjectForm;
