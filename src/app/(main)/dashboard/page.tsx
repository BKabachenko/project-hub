import Image from 'next/image';
import Link from 'next/link';

import { ChevronDown, FileUser, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const DashboardPage = () => {
  return (
    <div className={'flex flex-col gap-8 md:gap-12'}>
      <div className='flex flex-col gap-2'>
        <p className={'text-muted-foreground font-medium'}>DASHBOARD OVERVIEW</p>
        <h2 className={'text-4xl font-extrabold'}>Welcome back, Name!</h2>
        <p className={'text-muted-foreground'}>
          You have 4 pending reviews and 2 projects reaching milestones this week.
        </p>
      </div>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4'>
        <Card className={'relative shadow-md'}>
          <CardHeader>
            <CardTitle className={'text-muted-foreground'}>TOTAL PROJECTS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-extrabold'>99</div>
          </CardContent>
          <div className='absolute top-7 right-5 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-200'>
            <Users />
          </div>
        </Card>
        <Card className={'relative shadow-md'}>
          <CardHeader>
            <CardTitle className={'text-muted-foreground'}>ACTIVE ROLES</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-extrabold'>99</div>
          </CardContent>
          <div className='absolute top-7 right-5 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-200'>
            <Users />
          </div>
        </Card>
        <Card className={'relative shadow-md'}>
          <CardHeader>
            <CardTitle className={'text-muted-foreground'}>PENDING APPLICATIONS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-extrabold'>99</div>
          </CardContent>
          <div className='absolute top-7 right-5 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-200'>
            <Users />
          </div>
        </Card>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-row items-center justify-between'>
          <h3 className={'text-2xl font-bold'}>Projects I Manage</h3>
          <Link href={'#'} className={'text-muted-foreground font-bold'}>
            VIEW All
          </Link>
        </div>
        <div className='flex flex-col gap-2'>
          <Card className={'shadow-md'}>
            <CardHeader>
              <CardTitle className={'text-lg font-bold'}>Metropolis Tower</CardTitle>
              <CardDescription>Launched 2 week ago.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
                <span className={'text-muted-foreground text-xs font-medium'}>80% Hired</span>
                <Badge
                  variant={'ghost'}
                  className={
                    'flex flex-row items-center justify-between gap-1 bg-orange-200 px-3 py-1'
                  }
                >
                  <FileUser />
                  1 PENDING APPLICANT
                  <ChevronDown />
                </Badge>
              </div>
              <div className=''>
                <Separator className={'my-4'} />
                <div className='flex flex-col gap-2'>
                  <h4 className={'text-muted-foreground text-[10px] font-bold'}>PENDING REVIEW</h4>
                  <div className='flex flex-row items-center justify-between gap-4 align-middle'>
                    <div className={'flex flex-row items-center gap-2'}>
                      <div className='relative h-10 w-10 overflow-hidden'>
                        <Image
                          fill
                          src={
                            'https://lh3.googleusercontent.com/a/ACg8ocJAf4kfOZEVE0kvxFkWtMTz8hciWSa7RU1NPcHJDGe_vVLuPA=s96-c'
                          }
                          alt='User avatar'
                          className={'rounded-xl bg-transparent'}
                        />
                      </div>
                      <div className='flex flex-col'>
                        <p className={'text-sm font-bold'}>Elena Vance</p>
                        <p className={'flex flex-row flex-wrap gap-1 text-[10px] font-bold'}>
                          Structural Engineer
                          <span className={'text-muted-foreground text-[10px] font-normal'}>
                            {'• 2h ago'}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className='flex flex-col gap-2 sm:flex-row'>
                      <Button variant={'outline'} size={'sm'}>
                        DEATILS
                      </Button>
                      <Button variant={'default'} size={'sm'}>
                        APPROVE
                      </Button>
                      <Button variant={'outline'} size={'sm'}>
                        DECLINE
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className={'flex flex-col gap-4'}>
        <div className={''}>
          <h3 className={'text-2xl font-bold'}>Active Contributions</h3>
        </div>
        <div className={'grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4'}>
          <Card className={'max-w-120'}>
            <CardHeader>
              <CardTitle className={'text-lg font-bold'}>
                <Link href={'#'}>Summit Resort</Link>
              </CardTitle>
            </CardHeader>
            <CardContent className={'grid grid-cols-[1fr_70px] items-center justify-between gap-4'}>
              <div className={'flex flex-row flex-wrap gap-2'}>
                <Badge variant={'role'} className={'col-start-1'}>
                  Designer
                </Badge>
              </div>
              <Link href={'#'} className={'col-start-2 flex items-end justify-center'}>
                Details...
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
