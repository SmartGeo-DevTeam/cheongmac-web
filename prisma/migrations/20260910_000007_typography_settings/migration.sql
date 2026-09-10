-- 본문 타이포그래피 전역 설정
CREATE TABLE "typography_setting" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "mobileFontSize" INTEGER NOT NULL,
    "mobileLineHeight" DOUBLE PRECISION NOT NULL,
    "desktopFontSize" INTEGER NOT NULL,
    "desktopLineHeight" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "typography_setting_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "typography_setting_tag_key"
ON "typography_setting"("tag");

INSERT INTO "typography_setting"
    ("id", "tag", "mobileFontSize", "mobileLineHeight", "desktopFontSize", "desktopLineHeight", "updatedAt")
VALUES
    ('typography-h1', 'h1', 26, 1.30, 50, 1.25, CURRENT_TIMESTAMP),
    ('typography-h2', 'h2', 24, 1.40, 36, 1.35, CURRENT_TIMESTAMP),
    ('typography-h3', 'h3', 22, 1.45, 32, 1.40, CURRENT_TIMESTAMP),
    ('typography-h4', 'h4', 20, 1.50, 28, 1.45, CURRENT_TIMESTAMP),
    ('typography-h5', 'h5', 18, 1.55, 24, 1.50, CURRENT_TIMESTAMP),
    ('typography-h6', 'h6', 16, 1.60, 20, 1.55, CURRENT_TIMESTAMP),
    ('typography-p',  'p',  16, 1.75, 20, 1.80, CURRENT_TIMESTAMP);
