import type { ClinicDiseaseCardData } from '@/app/_types/vascular/disease-card';

export const arterialDiseaseCards: ClinicDiseaseCardData[] = [
  {
    id: 'occlusion',
    title: '하지동맥폐색증',
    href: '/vascular/arterial/occlusion',
    image: '/vascular/arterial/diseases/occlusion-symptoms.png',
    tags: ['#걸을때 종아리 통증', '#간헐적 파행', '#다리 쥐·경련'],
  },
  {
    id: 'aneurysm',
    title: '복부 대동맥류',
    href: '/vascular/arterial/aneurysm',
    image: '/vascular/arterial/diseases/aneurysm-symptoms.png',
    tags: ['#무증상', '#복부 두근거림', '#배·등 통증'],
  },
  {
    id: 'diabetic-foot',
    title: '당뇨발',
    href: '/vascular/arterial/foot',
    image: '/vascular/arterial/diseases/diabetic-foot-symptoms.png',
    tags: ['#발저림·화끈거림', '#궤양', '#족부 피부 변화'],
  },
];
