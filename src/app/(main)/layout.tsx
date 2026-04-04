import Header from '@/components/layout/Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={'grid min-h-dvh grid-rows-[auto_1fr_auto]'}>
      <Header />
      <main className={'mx-auto mb-10 w-full max-w-5xl px-5'}>{children}</main>
    </div>
  );
};

export default MainLayout;
