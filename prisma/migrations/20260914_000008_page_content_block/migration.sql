CREATE TABLE "page_content_block" (
    "id" TEXT NOT NULL,
    "pageKey" TEXT NOT NULL,
    "sectionKey" TEXT NOT NULL,
    "label" TEXT,
    "data" JSONB NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "page_content_block_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "page_content_block_pageKey_sectionKey_key"
ON "page_content_block"("pageKey", "sectionKey");

CREATE INDEX "page_content_block_pageKey_idx"
ON "page_content_block"("pageKey");
