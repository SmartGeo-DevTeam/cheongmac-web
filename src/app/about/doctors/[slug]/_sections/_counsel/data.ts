export type CounselType = {
  id: number;
  category: string;
  date: string;
  title: string;
  href: string;
};

export const counsels: CounselType[] = [
  {
    id: 1,
    category: '정맥 | 하지정맥류',
    date: '2026.10.20',
    title: '오래 서서 일하는데 저녁마다 다리가 무겁습니다',
    href: '/',
  },
  {
    id: 2,
    category: '정맥 | 하지정맥류',
    date: '2026.10.18',
    title: '하지정맥류 치료 후 일상생활은 언제부터 가능한가요?',
    href: '/',
  },
  {
    id: 3,
    category: '정맥 | 하지정맥류',
    date: '2026.10.15',
    title: '다리에 혈관이 튀어나오고 통증이 있는데 치료가 필요할까요?',
    href: '/',
  },
];
