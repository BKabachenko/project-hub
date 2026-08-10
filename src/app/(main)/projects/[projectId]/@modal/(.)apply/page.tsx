'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import ApplyToProjectForm from '@/features/applications/components/applyToProjectForm';

const ModalPage = () => {
  const router = useRouter();

  const closeHandles = () => {
    router.back();
  };

  return (
    <div>
      <Dialog defaultOpen={true} onOpenChange={() => closeHandles()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>
              Decription
            </DialogDescription>
          </DialogHeader>
          <ApplyToProjectForm/>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalPage;
