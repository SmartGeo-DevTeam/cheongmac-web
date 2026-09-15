-- 메인페이지 의료진 인용문을 Doctor canonical DB에서 관리합니다.
ALTER TABLE "doctor"
ADD COLUMN "homeQuote" TEXT;

UPDATE "doctor"
SET "homeQuote" = CASE "name"
  WHEN '박용범' THEN '끊임없는 연구를 통해 환자분들의 치유에 앞장서겠습니다'
  WHEN '전진원' THEN '정확한 진단과 섬세한 치료로 혈관 건강을 지키겠습니다'
  WHEN '장지란' THEN '영상 진단의 정확도를 높여 치료의 방향을 세우겠습니다'
  WHEN '변승재' THEN '환자분의 통증과 회복 과정을 세심하게 살피겠습니다'
  WHEN '배병호' THEN '환자에게 꼭 필요한 치료만 정직하게 제안하겠습니다'
  WHEN '김병주' THEN '작은 이상도 놓치지 않는 진단으로 함께하겠습니다'
  ELSE "homeQuote"
END
WHERE "name" IN ('박용범', '전진원', '장지란', '변승재', '배병호', '김병주');
