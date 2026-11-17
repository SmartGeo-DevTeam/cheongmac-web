// CHEONGMAC_BODY_IMAGE_COORDINATES_V1
// 동맥 점은 원본 인체 이미지(612×1438) 기준의 공통 좌표를 사용합니다.
export type BodyPoint = { x: number; y: number };

type MapPosition = {
  labelX: number;
  labelY: number;
  elbowX: number;
  side: 'left' | 'right';
};

type ArterialDiseasePoint = {
  id: string;
  title: string;
  href: string;
  body: BodyPoint;
  mobile: MapPosition;
  desktop: MapPosition;
  additionalPoint?: {
    body: BodyPoint;
    mobile: { elbowX: number };
    desktop: { elbowX: number };
  };
};

// 각 좌표는 모바일 335×425, PC 900×840 SVG 캔버스 기준입니다.
// 디자인 시안의 버튼 계단식 배치, 점 위치, 연결선 굴절을 기기별로 지정합니다.
// 경동맥·관상동맥·신장동맥질환 href는 아직 생성되지 않은 예정 경로입니다.
export const arterialDiseasePoints: ArterialDiseasePoint[] = [
  {
    id: 'carotid',
    title: '경동맥질환',
    href: '/vascular/arterial/carotid',
    body: { x: 277, y: 225 },
    mobile: { labelX: 77, labelY: 60, elbowX: 130, side: 'left' },
    desktop: { labelX: 299, labelY: 103, elbowX: 381, side: 'left' },
  },
  {
    id: 'coronary',
    title: '관상동맥질환',
    href: '/vascular/arterial/coronary',
    body: { x: 318, y: 346 },
    mobile: { labelX: 250, labelY: 68, elbowX: 207, side: 'right' },
    desktop: { labelX: 595, labelY: 123, elbowX: 524, side: 'right' },
  },
  {
    id: 'renal',
    title: '신장동맥질환',
    href: '/vascular/arterial/renal',
    body: { x: 311, y: 477 },
    mobile: { labelX: 87, labelY: 145, elbowX: 132, side: 'left' },
    desktop: { labelX: 254, labelY: 274, elbowX: 380, side: 'left' },
  },
  {
    id: 'aneurysm',
    title: '복부 대동맥류',
    href: '/vascular/arterial/aneurysm',
    body: { x: 311, y: 540 },
    mobile: { labelX: 248, labelY: 145, elbowX: 219, side: 'right' },
    desktop: { labelX: 641, labelY: 274, elbowX: 549, side: 'right' },
  },
  {
    id: 'raynaud',
    title: '레이노증후군',
    href: '/vascular/special/raynaud',
    body: { x: 555, y: 765 },
    mobile: { labelX: 250, labelY: 214, elbowX: 254, side: 'right' },
    desktop: { labelX: 675, labelY: 420, elbowX: 654, side: 'right' },
  },
  {
    id: 'occlusion',
    title: '하지동맥폐색증',
    href: '/vascular/arterial/occlusion',
    body: { x: 237, y: 907 },
    mobile: { labelX: 97, labelY: 243, elbowX: 115, side: 'left' },
    desktop: { labelX: 226, labelY: 477, elbowX: 314, side: 'left' },
    additionalPoint: {
      body: { x: 104, y: 612 },
      mobile: { elbowX: 107 },
      desktop: { elbowX: 294 },
    },
  },
  {
    id: 'diabetic-foot',
    title: '당뇨발',
    href: '/vascular/arterial/foot',
    body: { x: 370, y: 1339 },
    mobile: { labelX: 280, labelY: 377, elbowX: 223, side: 'right' },
    desktop: { labelX: 598, labelY: 750, elbowX: 542, side: 'right' },
  },
];
