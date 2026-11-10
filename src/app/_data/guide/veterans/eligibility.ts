// 보훈위탁병원 디자인 시안의 문구를 옮긴 데이터입니다.
// TODO: 대상 자격·진료비 부담 기준은 실제 운영 정책 확인 후 확정하세요.
export const eligibilityLead =
  '국가 유공자 등 보훈병원에서 진료 시 국가가 진료비를 전액 부담하는 진료대상자 중 (진료감면 대상자 제외)';

export const eligibilityCases = [
  '전염병 환자 또는 전염병의사환자로서 보훈병원 내에서 진료가 곤란한 경우',
  '희귀난치성질환 또는 중증질환 등으로 보훈병원에서 진료가 곤란한 경우',
  '보훈병원에 진료과목이 없거나 설비의 미비 등으로 진료가 곤란한 경우',
];

export const eligibilityFeeRows = [
  {
    id: 'honored',
    bullets: [
      {
        title: '국가유공자 1~7급',
        description:
          '애국지사, 전·공상군경, 4·19혁명부상자, 공상공무원, 6·18자유상이자, 5·18민주화운동부상자, 지원공상군경, 지원공상공무원, 재해부상군경, 재해부상공무원 등',
      },
    ],
    fee: '면제',
  },
  {
    id: 'registered',
    bullets: [
      {
        title: '2012.7.1 이후 신규등록자',
        description: '국가유공자 7급',
      },
      {
        title: '2016.6.23 이후 신규 등록자',
        description:
          '고엽제후유의증(2세 포함) 경도, 특수임무부상자 중 7급, 5·18민주화운동부상자 중 12~14등급',
      },
    ],
    fee: '상이처\n(상이처 외 진료 시 10% 본인 부담)',
  },
  {
    id: 'orange-exempt',
    bullets: [{ title: '고엽제 후유(의)증' }],
    subjectRowSpan: 2,
    condition: '등급판정',
    fee: '면제',
  },
  {
    id: 'orange-approved',
    condition: '등급판정',
    fee: '승인질환',
  },
  {
    id: 'injured',
    bullets: [{ title: '경상이자' }],
    fee: '상이처',
  },
] as const;
