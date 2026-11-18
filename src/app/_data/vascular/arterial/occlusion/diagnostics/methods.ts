import type { DiagnosticMethod } from '@/app/_types/clinic/diagnostics';

/** 원본 상세 페이지의 검사 설명·시간·특징 값을 유지합니다. */
export const occlusionDiagnosticMethods: readonly DiagnosticMethod[] = [
  {
    id: "abi",
    tabLabel: "ABI 검사",
    eyebrow: "Ankle-Brachial IndexTest",
    title: "발목상완지수 검사 (ABI 검사)",
    description: "팔과 다리의 혈압을 측정하여 비교하는 간단하고 비침습적인 동맥경화도 검사로, 말초동맥폐쇄증의 진단 및 중증도 평가에 가장 기본적으로 사용됩니다.",
    image: "/vascular/arterial/occlusion/diagnostics/abi/examination.png",
    infoGroups: [
      { label: "검사정보", items: ["약 15분 소요"] },
      { label: "검사과정", items: ["양팔과 양쪽 발목에 커프 착용 후 혈압 측정"] },
      { label: "특징", items: ["동맥질환, 혈관나이, 동맥경화도 진단 가능", "혈관성 환자 판별하는 국제적 표준 선별 검사"] },
    ],
  },
  {
    id: "doppler",
    tabLabel: "도플러 초음파 검사",
    eyebrow: "Doppler Ultrasonography",
    title: "도플러 초음파 검사",
    description: "초음파를 이용해 혈관 속 상태를 실시간으로 파악하고 혈전의 유무 및 폐색 부위를 확인할 수 있는 기본 검사로, 다리 혈관의 좁아진 정도와 혈류의 속도 및 파형을 동시에 평가하여 진단을 내립니다.",
    image: "/vascular/arterial/occlusion/diagnostics/doppler/examination.png",
    infoGroups: [
      { label: "검사정보", items: ["약 20분~40분 소요"] },
      { label: "검사과정", items: ["혈관 경로를 따라 이동하며 혈류·정체·역류 구간 모니터링"] },
      { label: "특징", items: ["혈액 흐름, 속도, 역류를 실시간으로 확인하는 정맥 혈류 분석 검사", "방사선 노출/조영제 투여 부담 없는 비침습 검사"] },
    ],
  },
  {
    id: "ct",
    tabLabel: "혈관 CT",
    eyebrow: "Whole Body CT Scan",
    title: "혈관 CT",
    description: "혈관의 해부학적 위치, 주위 장기의 관계, 동맥의 폐색 정도 및 상태를 파악하며 치료 계획 수립을 위한 유용한 검사 방법입니다. 얇은 단층부터 3D 혈관 구조까지 입체적으로 파악할 수 있어 혈관의 막힘 정도나 모양, 길이를 정밀하게 계측합니다.",
    image: "/vascular/arterial/occlusion/diagnostics/ct/examination.png",
    notice: "신장 기능이 저하된 환자는 사전에 의료진과 상의가 필요합니다.",
    infoGroups: [
      { label: "검사정보", items: ["준비 포함 약 20분 소요"] },
      { label: "검사과정", items: ["검사 4~6시간 전 금식 필요", "팔 정맥으로 조영제를 주입하며 촬영한 영상을 3D 입체로 재구성 판독"] },
      { label: "특징", items: ["고해상도 이미지로 미세혈관과 병변 위치 및 길이를 입체적으로 파악", "촬영 범위 내 장기의 질환과 이상소견까지 동반 파악 가능"] },
    ],
  },
  {
    id: "angiography",
    tabLabel: "혈관 조영술",
    eyebrow: "Angiography",
    title: "혈관 조영술 검사 (인터벤션)",
    description: "카테터를 혈관에 직접 삽입해 조영제를 주입하며 실시간으로 혈관을 확인하는 검사로, 진단과 동시에 풍선확장술이나 스텐트 시술 등 치료까지 이어질 수 있는 것이 가장 큰 특징입니다.",
    image: "/vascular/arterial/occlusion/diagnostics/angiography/examination.png",
    notice: "안전한 지혈을 위해 검사 후 최소 4시간 이상 안정이 필요합니다.",
    infoGroups: [
      { label: "검사정보", items: ["약 30분~1시간 소요 (치료 병행 시 연장)"] },
      { label: "검사과정", items: ["사타구니 또는 손목 동맥에 국소마취 후 얇은 관(카테터)을 삽입하여 조영제를 주입하며 실시간 영상 확인"] },
      { label: "특징", items: ["병변 확인 즉시 시술/수술 병행이 가능한 하이브리드 치료", "혈관 내부를 고해상도로 실시간 확인"] },
    ],
  },
];
