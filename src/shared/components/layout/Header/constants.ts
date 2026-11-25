export interface NAVLINKS {
  title: string;
  href: string;
  visibility: 'public' | 'private' | 'guest';
}

export const LINKS: NAVLINKS[] = [
  { title: 'Home', href: '/', visibility: 'public' },
  { title: 'Feed', href: '/feed', visibility: 'public' },
  { title: 'Impact', href: '/impact', visibility: 'public' },
  { title: 'Dashboard', href: '/dashboard', visibility: 'private' },
];

export const DESKTOP_NAV_MEDIA_QUERY = '(min-width: 48rem)';