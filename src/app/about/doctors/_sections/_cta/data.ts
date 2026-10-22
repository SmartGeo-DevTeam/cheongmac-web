export type CTAType = {
  id: string;
  href: string;
  title: string[];
  description: string;
  backgroundColor: string;
  imageSrc: string;
};

export const ctas: CTAType[] = [
  {
    id: 'diet',
    href: '/',
    title: ['다이어트도 청맥에서', '위고비 출시'],
    description: '다이어트 알아보기',
    backgroundColor: '#FFEDB2',
    imageSrc: '/doctors/temp-icon.png',
  },
  {
    id: 'cta-2',
    href: '/',
    title: ['다이어트도 청맥에서', '위고비 출시'],
    description: '다이어트 알아보기',
    backgroundColor: '#E6F5D2',
    imageSrc: '/doctors/temp-icon.png',
  },
  {
    id: 'cta-3',
    href: '/',
    title: ['다이어트도 청맥에서', '위고비 출시'],
    description: '다이어트 알아보기',
    backgroundColor: '#DFEDFF',
    imageSrc: '/doctors/temp-icon.png',
  },
];
