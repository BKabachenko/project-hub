import { Skeleton } from '@/shared/components/ui/skeleton';

const DESKTOP_LINK_WIDTHS = ['w-11', 'w-9', 'w-12', 'w-16'] as const;

export const HeaderNavigationSkeleton = () => {
  return (
    <div aria-hidden={true}>
      <div className={'hidden justify-end pe-4 md:flex lg:pe-8'}>
        <div className={'flex min-h-9 items-center gap-6'}>
          {DESKTOP_LINK_WIDTHS.map((width, index) => (
            <Skeleton key={index} className={`h-4 ${width} rounded-sm`} />
          ))}
        </div>
      </div>

      <div className={'flex justify-center md:hidden'}>
        <Skeleton className={'h-9 w-20 rounded-lg'} />
      </div>
    </div>
  );
};

export default HeaderNavigationSkeleton;
