import type { StaticImageData } from 'next/image';
import medicalCenterSample from '@/app/_assets/images/community/notice/medical-center-sample.png';
import naverReservationSample from '@/app/_assets/images/community/notice/naver-reservation-sample.png';

/** 휴진 일정(Off)은 기존 community/notice/data.ts에서 별도 관리합니다. */
export type NoticeCategory = 'notice' | 'holiday';

export type NoticeAttachment = {
  name: string;
  /** 실제 파일을 업로드한 뒤 파일 URL을 지정합니다. href가 없으면 다운로드하지 않습니다. */
  href?: string;
};

export type NoticeDetailContent = {
  image?: StaticImageData;
  imageAlt?: string;
  imageSize?: 'regular' | 'narrow';
  statement?: string;
  paragraphs?: string[];
  facts?: { label: string; value: string }[];
  attachments?: NoticeAttachment[];
};

export type NoticeItemType = {
  id: string;
  category: NoticeCategory;
  title: string;
  date: string; // YYYY-MM-DD (게시일)
  isPinned?: boolean;
  /** 외부 사이트나 이미 존재하는 다른 상세 페이지 URL을 지정할 때만 사용합니다. */
  href?: string;
  isExternal?: boolean;
  detail?: NoticeDetailContent;
};

/**
 * 디자인 확인용 예시 공지입니다. 아래 이미지 두 장은 사용자 제공 시안에서
 * 예시 게시물의 본문 이미지 영역만 추출한 것입니다. 실제 운영 공지가 아닙니다.
 * DB 연결 후에는 본문/이미지/첨부파일 URL을 실제 게시물 데이터로 대체하세요.
 */
const demoNotices: NoticeItemType[] = [
  {
    id: 'demo-notice-01',
    category: 'notice',
    title: '네이버 예약 OPEN',
    date: '2026-10-28',
    isPinned: true,
    detail: {
      image: naverReservationSample,
      imageAlt: '청맥병원 네이버 예약 오픈 안내 이미지',
      imageSize: 'regular',
      paragraphs: [
        '청맥병원을 찾아주시는 환자 및 보호자 여러분께 한층 더 편리한 의료 서비스를 제공해 드리고자 네이버 예약 서비스를 정식 오픈하였습니다.',
        "이제 별도의 전화 문의나 번잡한 절차 없이, 언제 어디서나 모바일과 PC를 통해 간편하게 진료 및 상담 예약을 진행하실 수 있습니다. 네이버 검색창에 ‘청맥병원’을 검색하신 후, ‘예약’ 버튼을 눌러 원하시는 진료 과목과 일정을 선택해 주시기 바랍니다.",
        '청맥병원은 앞으로도 환자분들의 이용 편의를 최우선으로 생각하며, 보다 쾌적하고 신뢰받는 진료 환경을 조성하기 위해 최선을 다하겠습니다. 많은 이용 부탁드립니다.',
      ],
      facts: [{ label: '네이버예약 서비스 오픈일', value: '2027년 1월 1일' }],
      attachments: [
        { name: '첨부파일명.xls' },
        { name: '첨부파일명.pdf' },
      ],
    },
  },
  {
    id: 'demo-notice-02',
    category: 'notice',
    title: '서면 메디컬센터 확장 이전 안내',
    date: '2026-10-28',
    isPinned: true,
    detail: {
      image: medicalCenterSample,
      imageAlt: '청맥병원 서면 메디컬센터 확장 이전 안내 포스터',
      imageSize: 'narrow',
      statement: '대한민국 혈관특별시,\n그 중심에는 청맥병원이 있습니다.',
      paragraphs: [
        '혈관질환 진료와 치료를 넘어 대한민국 혈관 의료의 발전과 올바른 의료문화 형성에\n책임을 다하는 청맥병원이 2027년 확장이전 오픈합니다.',
        '부산 최대 규모 혈관 중점 메디컬 센터로서,\n20인 전문의의 분과별 협진 시스템으로\n규모와 전문성을 대폭 강화하여 더 쾌적한 공간에서 깊이 있는 진료로 보답하겠습니다.',
      ],
      facts: [
        { label: '확장이전 오픈일', value: '2027년 1월 1일' },
        { label: '위치', value: '부산진구 서전로 4 (서면역 6번 출구 100m 이내)' },
        { label: '진료과목', value: '혈관외과, 심장혈관흉부외과, 순환기내과, 신장내과, 외과, 비뇨의학과, 산부인과, 가정의학과, 영상의학과, 마취통증의학과' },
      ],
      attachments: [
        { name: '첨부파일명.xls' },
        { name: '첨부파일명.pdf' },
      ],
    },
  },
  { id: 'demo-notice-03', category: 'notice', title: '일반 공지사항 예시 1', date: '2026-10-26' },
  { id: 'demo-notice-04', category: 'holiday', title: '휴진 공지사항 예시 1', date: '2026-10-25' },
  { id: 'demo-notice-05', category: 'notice', title: '일반 공지사항 예시 2', date: '2026-10-24' },
  { id: 'demo-notice-06', category: 'notice', title: '일반 공지사항 예시 3', date: '2026-10-23' },
  { id: 'demo-notice-07', category: 'holiday', title: '휴진 공지사항 예시 2', date: '2026-10-22' },
  { id: 'demo-notice-08', category: 'notice', title: '일반 공지사항 예시 4', date: '2026-10-21' },
  { id: 'demo-notice-09', category: 'notice', title: '일반 공지사항 예시 5', date: '2026-10-20' },
  { id: 'demo-notice-10', category: 'notice', title: '일반 공지사항 예시 6', date: '2026-10-19' },
  { id: 'demo-notice-11', category: 'holiday', title: '휴진 공지사항 예시 3', date: '2026-10-18' },
  { id: 'demo-notice-12', category: 'notice', title: '일반 공지사항 예시 7', date: '2026-10-17' },
];

/** 추후 DB 연결 시 이 함수만 실제 조회로 교체하면 목록과 상세가 함께 변경됩니다. */
export async function getNotices(): Promise<NoticeItemType[]> {
  // 화면 확인용 가상 공지가 실제 병원 공지로 노출되지 않도록 운영 환경에서는 빈 목록입니다.
  if (process.env.NODE_ENV === 'production') return [];
  return demoNotices;
}
