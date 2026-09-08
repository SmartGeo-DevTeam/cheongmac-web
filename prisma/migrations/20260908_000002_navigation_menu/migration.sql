CREATE TABLE "navigation_menu" (
    "id" TEXT NOT NULL,
    "parentId" TEXT,
    "title" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "navigation_menu_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "navigation_menu_parentId_sortOrder_idx"
ON "navigation_menu"("parentId", "sortOrder");

ALTER TABLE "navigation_menu"
ADD CONSTRAINT "navigation_menu_parentId_fkey"
FOREIGN KEY ("parentId") REFERENCES "navigation_menu"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "navigation_menu"
    ("id", "parentId", "title", "href", "sortOrder", "isVisible", "createdAt", "updatedAt")
VALUES
    ('about', NULL, '병원 소개', '/about/doctors', 0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('education-research', NULL, '교육·연구', '/education-research/exchange', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('communication', NULL, '소통공간', '/community/cases', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('hospital-news', NULL, '병원소식', '/community/notice', 3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('guide', NULL, '이용안내', '/guide/partner-hospital', 4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO "navigation_menu"
    ("id", "parentId", "title", "href", "sortOrder", "isVisible", "createdAt", "updatedAt")
VALUES
    ('about-doctors', 'about', '의료진/진료과', '/about/doctors', 0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('about-tour', 'about', '병원 둘러보기', '/about/tour', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('about-equipment', 'about', '첨단의료장비', '/about/equipment', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('education-research-exchange', 'education-research', '학술교류', '/education-research/exchange', 0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('education-research-society', 'education-research', '학회활동', '/education-research/society', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('communication-cases', 'communication', '치료사례', '/community/cases', 0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('communication-consultation', 'communication', '의학상담', '/community/consultation', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('communication-customer-voice', 'communication', '고객의 소리', '/community/customer-voice', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('hospital-news-notice', 'hospital-news', '공지사항', '/community/notice', 0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('hospital-news-news', 'hospital-news', '청맥뉴스', '/community/news', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('guide-partner-hospital', 'guide', '의료협약병원', '/guide/partner-hospital', 0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
