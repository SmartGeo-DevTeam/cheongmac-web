CREATE TABLE "page_bottom_banner" (
    "id" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "iconColor" TEXT NOT NULL DEFAULT '#006651',
    "title" TEXT NOT NULL,
    "linkTitle" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "visiblePaths" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "page_bottom_banner_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "page_bottom_banner_sortOrder_idx"
ON "page_bottom_banner"("sortOrder");

INSERT INTO "page_bottom_banner"
    ("id", "emoji", "iconColor", "title", "linkTitle", "href", "sortOrder", "isVisible", "visiblePaths", "createdAt", "updatedAt")
VALUES
    ('common-bottom-banner-1', '📅', '#2DB400', '네이버예약', '예약하기', '/', 0, true, ARRAY['/about/doctors']::TEXT[], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('common-bottom-banner-2', '💬', '#FD7740', '빠른상담', '상담하기', '/', 1, true, ARRAY['/about/doctors']::TEXT[], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('common-bottom-banner-3', '📍', '#006651', '병원 이용안내', '바로가기', '/', 2, true, ARRAY['/about/doctors']::TEXT[], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
