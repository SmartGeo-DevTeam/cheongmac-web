import fs from 'node:fs';

const targets = [
  ['src/app/about/introduction/_components/about-introduction-content.tsx', '/admin/pages/about-introduction', '청맥병원 소개'],
  ['src/app/about/tour/_components/hospital-tour-content.tsx', '/admin/pages/tour', '병원 둘러보기'],
  ['src/app/about/equipment/_components/medical-equipment-content.tsx', '/admin/pages/equipment', '첨단의료장비'],
  ['src/app/about/doctors/_components/doctor-list-client.tsx', '/admin/doctors', '의료진'],
  ['src/app/education-research/society/_components/society-activities-content.tsx', '/admin/pages/society', '학회활동'],
  ['src/app/education-research/exchange/_components/academic-exchange-content.tsx', '/admin/pages/exchange', '학술교류'],
  ['src/app/community/cases/_components/treatment-case-list.tsx', '/admin/pages/cases', '치료사례'],
  ['src/app/community/consultation/_components/consultation-board.tsx', '/admin/content-relations/consultations', '의학상담'],
  ['src/app/community/customer-voice/_components/customer-voice-overview.tsx', '/admin/customer-voice', '고객의 소리'],
  ['src/app/community/notice/_components/notice-list.tsx', '/admin/pages/notice', '공지사항'],
  ['src/app/community/news/_components/news-board.tsx', '/admin/pages/news', '청맥뉴스'],
  ['src/app/guide/partner-hospital/_components/partner-hospital-content.tsx', '/admin/pages/partner-hospital', '의료협약병원'],
];

for (const [file, href, label] of targets) {
  if (!fs.existsSync(file)) {
    console.error(`❌ COLLECTION_ADMIN_FINAL_CHECK 파일 누락: ${file}`);
    process.exit(1);
  }

  const source = fs.readFileSync(file, 'utf8');
  for (const token of ['CollectionAdminEditButton', href, 'group/cms-collection']) {
    if (!source.includes(token)) {
      console.error(`❌ COLLECTION_ADMIN_FINAL_CHECK ${label} 전체관리 연결 누락: ${file} -> ${token}`);
      process.exit(1);
    }
  }
}

console.log(`COLLECTION_ADMIN_FINAL_CHECK_OK — ${targets.length}개 목록형 공개 영역 전체관리 직접 연결 확인`);
