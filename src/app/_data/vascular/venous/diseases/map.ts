/**
 * 지도 좌표는 동맥 지도와 동일한 논리 인체 캔버스(612 × 1438)를 사용합니다.
 * 정맥 원본 이미지는 306 × 719로 정확히 절반 크기이며 종횡비가 같습니다.
 *
 * labelX / labelY / elbowX 는 모바일 335px 기준 디자인 좌표입니다.
 * 데스크톱도 같은 비율을 사용하여 반응형으로 표시합니다.
 * UI 미세 조정이 필요하면 이 파일의 좌표만 바꾸면 됩니다.
 */
export type BodyPoint = { x: number; y: number };
type LabelPosition = {
  labelX: number;
  labelY: number;
  elbowX: number;
  side: 'left' | 'right';
};
export type VenousDiseasePoint = {
  id: string;
  title: string;
  href: string;
  body: BodyPoint;
  mobile: LabelPosition;
};

export const venousDiseasePoints: VenousDiseasePoint[] = [
  {
    id: 'nutcracker',
    title: '호두까기증후군',
    href: '/vascular/special/nutcracker',
    body: { x: 322, y: 490 },
    mobile: { labelX: 93, labelY: 119, elbowX: 127, side: 'left' },
  },
  {
    id: 'pelvic',
    title: '골반정맥류',
    href: '/vascular/venous/pelvic',
    body: { x: 284, y: 570 },
    mobile: { labelX: 76, labelY: 167, elbowX: 120, side: 'left' },
  },
  {
    id: 'maythurner',
    title: '메이터너증후군',
    href: '/vascular/special/maythurner',
    body: { x: 334, y: 582 },
    mobile: { labelX: 241, labelY: 170, elbowX: 213, side: 'right' },
  },
  {
    id: 'varicocele',
    title: '정계정맥류',
    href: '/vascular/venous/varicocele',
    body: { x: 302, y: 646 },
    mobile: { labelX: 76, labelY: 216, elbowX: 132, side: 'left' },
  },
  {
    id: 'thrombosis',
    title: '심부정맥혈전증',
    href: '/vascular/venous/thrombosis',
    body: { x: 368, y: 924 },
    mobile: { labelX: 241, labelY: 289, elbowX: 205, side: 'right' },
  },
  {
    id: 'varicose',
    title: '하지정맥류',
    href: '/vascular/venous/varicose',
    body: { x: 234, y: 970 },
    mobile: { labelX: 76, labelY: 318, elbowX: 128, side: 'left' },
  },
  {
    id: 'kt',
    title: 'KT증후군',
    href: '/vascular/special/kt',
    body: { x: 366, y: 1156 },
    mobile: { labelX: 261, labelY: 364, elbowX: 218, side: 'right' },
  },
];
