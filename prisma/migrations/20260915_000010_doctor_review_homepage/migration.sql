-- DoctorReview를 메인페이지 치료후기의 canonical source로 확장합니다.
ALTER TABLE "doctor_review"
ADD COLUMN "category" TEXT,
ADD COLUMN "beforeImageUrl" TEXT,
ADD COLUMN "afterImageUrl" TEXT,
ADD COLUMN "linkUrl" TEXT,
ADD COLUMN "keywords" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "isHomeVisible" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX "doctor_review_isHomeVisible_sortOrder_idx"
ON "doctor_review"("isHomeVisible", "sortOrder");
