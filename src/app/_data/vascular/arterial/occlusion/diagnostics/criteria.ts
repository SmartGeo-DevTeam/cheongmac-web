import type { DiagnosticCriteriaSet } from '@/app/_types/clinic/diagnostics';

/** 원본 상세 페이지의 진단 기준 문구와 이미지를 유지합니다. */
export const occlusionDiagnosticCriteria: Record<'doppler' | 'ct' | 'angiography', DiagnosticCriteriaSet> = {
  doppler: {
    cards: [
      {
        image: "/vascular/arterial/occlusion/diagnostics/doppler/normal-flow.png",
        label: "정상 혈류",
        tone: "normal",
        items: ["혈관 내경이 깨끗하며 혈관벽이 얇고 매끈함", "색도플러상에서 붉은색/푸른색이 단색으로 선명하고 균일하게 표시됨", "파형 리듬이 일정하고 뾰족한 삼상성 파형 관찰됨"],
      },
      {
        image: "/vascular/arterial/occlusion/diagnostics/doppler/stenosis-flow.png",
        label: "협착 (좁아짐)",
        tone: "warning",
        items: ["플라크나 혈전이 쌓여 좁아진 부위의 혈류 속도 급증", "색도플러상에서 좁은 틈으로 혈류가 소용돌이치며 여러 색이 얼룩덜룩 섞임"],
      },
      {
        image: "/vascular/arterial/occlusion/diagnostics/doppler/occlusion-flow.png",
        label: "폐색 (막힘)",
        tone: "danger",
        items: ["색도플러상 폐색 구간에서 색상 신호가 사라져 검게 보임", "완전히 막힌 부위는 맥박 소리가 사라지거나 낮고, 완만하게 붕괴된 맥박 파형"],
      },
    ],
  },
  ct: {
    cards: [
      {
        image: "/vascular/arterial/occlusion/diagnostics/ct/normal.png",
        label: "정상 혈류",
        tone: "normal",
        items: ["혈관 내경이 매끈하고 조영제가 균일하게 채워짐"],
      },
      {
        image: "/vascular/arterial/occlusion/diagnostics/ct/stenosis-placeholder.png",
        label: "협착 (좁아짐)",
        tone: "warning",
        items: ["특정 구간에서 조영제가 채워진 폭이 좁아짐"],
      },
      {
        image: "/vascular/arterial/occlusion/diagnostics/ct/occlusion.png",
        label: "폐색 (막힘)",
        tone: "danger",
        items: ["조영제가 아래까지 흐르지 못하고 끊겨 보이는 음영"],
      },
    ],
  },
  angiography: {
    description: "실시간으로 흐르는 조영제의 양상을 보며 혈류가 차단된 폐색 부위를 최종 확진합니다. 진단과 동시에 막힌 부위에 풍선확장술, 스텐트 삽입술, 혹은 딱딱한 찌꺼기를 깎아내는 죽종제거술 등의 재개통 시술이 가능합니다.",
    cards: [
      {
        image: "/vascular/arterial/occlusion/diagnostics/angiography/normal-placeholder.png",
        label: "정상",
        tone: "normal",
        items: ["동맥 내경이 매끈하고 조영제가 균일하게 채워짐"],
      },
      {
        image: "/vascular/arterial/occlusion/diagnostics/angiography/stenosis-placeholder.png",
        label: "협착",
        tone: "warning",
        items: ["특정 구간에서 조영제가 채워진 폭이 좁아짐"],
      },
      {
        image: "/vascular/arterial/occlusion/diagnostics/angiography/occlusion-placeholder.png",
        label: "폐색",
        tone: "danger",
        items: ["조영제가 끊겨 그 아래로 이어지지 않음"],
      },
    ],
  },
};

export const occlusionAbiCriteria = {
  indexImage: "/vascular/arterial/occlusion/diagnostics/abi/index-range.png",
  resultImage: "/vascular/arterial/occlusion/diagnostics/abi/result-example.png",
  resultCaption: "실제 동맥 폐색 환자의 검사 결과",
  ranges: [
    { range: "0.5 미만", description: "중증 폐쇄 의심, 즉각 치료 필요", tone: "danger" },
    { range: "0.5~0.9", description: "하지동맥의 협착/폐색 의심", tone: "warning" },
    { range: "0.9~1.4", description: "정상 범위", tone: "normal" },
    { range: "1.4 초과", description: "동맥 석회화 의심, 혹은 수치 신뢰도 낮음", tone: "dark" },
  ],
} as const;
