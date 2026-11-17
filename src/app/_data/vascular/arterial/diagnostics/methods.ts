import type { ArterialDiagnosticMethod } from '@/app/_types/vascular/arterial/diagnostics';

export const arterialDiagnosticMethods: ArterialDiagnosticMethod[] = [
  {
    id: 'abi',
    title: '발목상완지수 검사 (ABI 검사)',
    image: '/vascular/arterial/diagnostics/ankle-brachial-index.png',
    time: '약 10분',
    method: '양팔·양발 혈압을 동시에 측정해 수치를 비교',
    feature: '동맥경화 진행 여부를 가장 빠르게 확인 가능',
  },
  {
    id: 'doppler',
    title: '도플러 초음파 검사',
    image: '/vascular/arterial/diagnostics/doppler-ultrasound.png',
    time: '약 20분',
    method: '프로브를 밀착해 천천히 이동하며 실시간 확인',
    feature: '혈류 상태를 방사선 노출 없이 측정',
  },
  {
    id: 'ct',
    title: '혈관 CT',
    image: '/vascular/arterial/diagnostics/vascular-ct.png',
    time: '약 10분',
    method: '정맥에 조영제를 주사한 뒤 전신 혈관 촬영',
    feature: '전신 혈관의 구조와 경로를 3D로 정밀 확인 가능',
  },
  {
    id: 'angiography',
    title: '혈관 조영술',
    image: '/vascular/arterial/diagnostics/angiography.png',
    time: '약 30분~1시간',
    method: '혈관 카테터로 조영제를 주입하며 실시간 촬영',
    feature: '진단과 동시에 시술 치료 병행 가능',
  },
];
