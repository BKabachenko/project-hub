import SearchBlock from './SearchBlock';

export const HeroBlock = () => {
  return (
    <>
      <div className={'mb-4 flex flex-col text-center'}>
        <h1
          className={
            'text-accent-foreground mb-3 text-3xl leading-[1.12] font-bold tracking-tight sm:text-4xl lg:text-5xl'
          }
        >
          Find your missing piece.{' '}
          <span className={'underline decoration-blue-500/40 decoration-4 underline-offset-4'}>
          Build something that matters.
          </span>
        </h1>
        <div className={'flex justify-center'}>
          <div className={'items-center flex max-w-160 flex-col'}>
            <p
              className={
                'text-accent-foreground/80 mx-auto mb-4 max-w-2xl text-sm leading-relaxed sm:text-base'
              }
            >
              Whether you need a Figma designer, a lead engineer, a growth partner, or an extra pair
              of hands for a paid sprint — Project Hub connects creators across every discipline.
            </p>
            <SearchBlock />
          </div>
        </div>
      </div>
    </>
  );
};
