BEGIN;

CREATE TABLE "managed_page_item" (
  "id" TEXT NOT NULL,
  "pageKey" TEXT NOT NULL,
  "itemKey" TEXT NOT NULL,
  "itemType" TEXT NOT NULL DEFAULT 'item',
  "title" TEXT NOT NULL,
  "summary" TEXT,
  "category" TEXT,
  "imageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "data" JSONB NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "managed_page_item_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "managed_page_item_pageKey_itemKey_key"
  ON "managed_page_item"("pageKey", "itemKey");

CREATE INDEX "managed_page_item_pageKey_itemType_isVisible_sortOrder_idx"
  ON "managed_page_item"("pageKey", "itemType", "isVisible", "sortOrder");

CREATE INDEX "managed_page_item_pageKey_sortOrder_idx"
  ON "managed_page_item"("pageKey", "sortOrder");

CREATE TABLE "managed_page_seed" (
  "pageKey" TEXT NOT NULL,
  "version" INTEGER NOT NULL DEFAULT 1,
  "seededAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "managed_page_seed_pkey" PRIMARY KEY ("pageKey")
);

CREATE TABLE "customer_voice_submission" (
  "id" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "attachmentName" TEXT,
  "attachmentUrl" TEXT,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'RECEIVED',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "customer_voice_submission_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "customer_voice_submission_category_createdAt_idx"
  ON "customer_voice_submission"("category", "createdAt");

CREATE INDEX "customer_voice_submission_status_createdAt_idx"
  ON "customer_voice_submission"("status", "createdAt");

ALTER TABLE "medical_consultation"
  ADD COLUMN "patientName" TEXT,
  ADD COLUMN "phone" TEXT,
  ADD COLUMN "birthDate" TEXT,
  ADD COLUMN "phoneConsultRequested" BOOLEAN,
  ADD COLUMN "postPasswordHash" TEXT,
  ADD COLUMN "attachmentName" TEXT,
  ADD COLUMN "attachmentUrl" TEXT;

COMMIT;
