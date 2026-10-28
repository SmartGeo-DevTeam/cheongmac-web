import type { ImageProps } from 'next/image';
import legBefore from '../_assets/detail-leg-before.webp';
import ctBefore from '../_assets/detail-ct-before.webp';
import type { CasePost } from '../data';

/** 입력하지 않은 정보는 상세 화면에서 렌더링하지 않습니다. */
export type CaseDetailPublic = {
  patientInfo?: string;
  diagnosis?: string;
  treatmentInfo?: string;
  beforeTreatment?: string;
  beforeImage?: ImageProps['src'];
  beforeImageAlt?: string;
  diagnosticBeforeImage?: ImageProps['src'];
};

/** 현재 예시 중 전후 비교 사진을 따로 준비한 사례만 지정합니다. */
const detailOverrides: Partial<Record<string, Partial<CaseDetailPublic>>> = {
  'case-002': {
    beforeTreatment:
      '오래 서 있거나 걸은 뒤 다리가 무겁고 저리는 불편감을 호소하여 내원한 예시입니다. 진찰 및 혈관 초음파 결과를 토대로 치료 방법을 상담하였습니다. 실제 환자 기록이 아닌 디자인용 가상 내용입니다.',
    beforeImage: legBefore,
    beforeImageAlt: '치료 전 다리 사진 시안 예시',
    diagnosticBeforeImage: ctBefore,
  },
};

export function getPublicCaseDetail(post: CasePost): CaseDetailPublic {
  const patientInfo = post.patient
    ? `${post.patient}${post.age != null || post.sex ? ` (${[post.age != null ? `${post.age}세` : null, post.sex].filter(Boolean).join(' · ')})` : ''}`
    : undefined;

  return {
    patientInfo,
    diagnosis: post.diagnosis,
    treatmentInfo: post.treatmentInfo,
    beforeTreatment: post.beforeTreatment,
    beforeImage: post.kind !== 'interviews' ? post.image : undefined,
    beforeImageAlt: post.kind !== 'interviews' ? post.imageAlt : undefined,
    ...(post.kind === 'before-after' ? detailOverrides[post.id] : {}),
  };
}
