'use client';

import { useRouter } from 'next/navigation';

import { ApplyToProjectForm } from './ApplyToProjectForm';
import { type Application, type ProjectRequirement } from '@/generated/prisma';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';

interface ModalContentProps {
  requirements: ProjectRequirement[];
  applications: Application[];
}

export const ModalContent = ({ requirements, applications }: ModalContentProps) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  if (!requirements) {
    return null;
  }

  return (
    <div>
      <Dialog
        defaultOpen={true}
        onOpenChange={(open) => {
          if (!open) handleClose();
        }}
      >
        <DialogContent className={'max-h-[calc(100lvh-100px)] overflow-y-scroll sm:max-w-150'}>
          <DialogHeader className={'flex items-center'}>
            <DialogTitle>Apply for project role</DialogTitle>
            <DialogDescription>Fill in the form to submit your application</DialogDescription>
          </DialogHeader>
          <ApplyToProjectForm requirements={requirements} applications={applications}>
            <DialogClose asChild>
              <Button variant='ghost'>Close</Button>
            </DialogClose>
          </ApplyToProjectForm>
        </DialogContent>
      </Dialog>
    </div>
  );
};
