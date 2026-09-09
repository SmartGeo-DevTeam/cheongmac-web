CREATE TABLE "doctor" (
  "id" TEXT NOT NULL,
  "legacyId" INTEGER,
  "slug" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "position" TEXT NOT NULL,
  "department" TEXT NOT NULL,
  "bio" TEXT,
  "reservationHref" TEXT NOT NULL DEFAULT '/',
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "doctor_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "doctor_legacyId_key" ON "doctor"("legacyId");
CREATE UNIQUE INDEX "doctor_slug_key" ON "doctor"("slug");
CREATE INDEX "doctor_displayOrder_idx" ON "doctor"("displayOrder");
CREATE INDEX "doctor_isVisible_displayOrder_idx" ON "doctor"("isVisible", "displayOrder");

CREATE TABLE "doctor_image" (
  "id" TEXT NOT NULL,
  "doctorId" TEXT NOT NULL,
  "kind" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "alt" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "doctor_image_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "doctor_image_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "doctor_image_doctorId_kind_key" ON "doctor_image"("doctorId", "kind");
CREATE INDEX "doctor_image_doctorId_sortOrder_idx" ON "doctor_image"("doctorId", "sortOrder");

CREATE TABLE "doctor_specialty" (
  "id" TEXT NOT NULL,
  "doctorId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "doctor_specialty_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "doctor_specialty_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "doctor_specialty_doctorId_sortOrder_idx" ON "doctor_specialty"("doctorId", "sortOrder");

CREATE TABLE "doctor_career" (
  "id" TEXT NOT NULL,
  "doctorId" TEXT NOT NULL,
  "kind" TEXT NOT NULL DEFAULT 'CAREER',
  "content" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "doctor_career_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "doctor_career_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "doctor_career_doctorId_sortOrder_idx" ON "doctor_career"("doctorId", "sortOrder");

CREATE TABLE "doctor_schedule" (
  "id" TEXT NOT NULL,
  "doctorId" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "mon" TEXT NOT NULL,
  "tue" TEXT NOT NULL,
  "wed" TEXT NOT NULL,
  "thu" TEXT NOT NULL,
  "fri" TEXT NOT NULL,
  "sat" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "doctor_schedule_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "doctor_schedule_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "doctor_schedule_doctorId_sortOrder_idx" ON "doctor_schedule"("doctorId", "sortOrder");

CREATE TABLE "doctor_presentation" (
  "id" TEXT NOT NULL,
  "doctorId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "organization" TEXT,
  "description" TEXT,
  "imageUrl" TEXT,
  "linkUrl" TEXT,
  "presentedAt" TIMESTAMP(3),
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "doctor_presentation_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "doctor_presentation_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "doctor_presentation_doctorId_sortOrder_idx" ON "doctor_presentation"("doctorId", "sortOrder");

CREATE TABLE "doctor_review" (
  "id" TEXT NOT NULL,
  "doctorId" TEXT NOT NULL,
  "patientName" TEXT NOT NULL,
  "age" INTEGER,
  "gender" TEXT,
  "treatment" TEXT,
  "content" TEXT,
  "imageUrl" TEXT,
  "reviewedAt" TIMESTAMP(3),
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "doctor_review_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "doctor_review_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "doctor_review_doctorId_sortOrder_idx" ON "doctor_review"("doctorId", "sortOrder");

CREATE TABLE "doctor_media" (
  "id" TEXT NOT NULL,
  "doctorId" TEXT NOT NULL,
  "kind" TEXT NOT NULL DEFAULT 'VIDEO',
  "title" TEXT NOT NULL,
  "source" TEXT,
  "thumbnailUrl" TEXT,
  "linkUrl" TEXT NOT NULL,
  "publishedAt" TIMESTAMP(3),
  "isFeatured" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isVisible" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "doctor_media_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "doctor_media_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "doctor_media_doctorId_sortOrder_idx" ON "doctor_media"("doctorId", "sortOrder");

CREATE TABLE "medical_consultation" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY,
  "doctorId" TEXT,
  "categoryPrimary" TEXT NOT NULL,
  "categorySecondary" TEXT NOT NULL DEFAULT '',
  "title" TEXT NOT NULL,
  "question" JSONB NOT NULL,
  "imageUrl" TEXT,
  "isPrivate" BOOLEAN NOT NULL DEFAULT false,
  "hasLinkIcon" BOOLEAN NOT NULL DEFAULT false,
  "answer" JSONB,
  "answerDate" TIMESTAMP(3),
  "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "isVisible" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "medical_consultation_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "medical_consultation_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX "medical_consultation_doctorId_publishedAt_idx" ON "medical_consultation"("doctorId", "publishedAt");
CREATE INDEX "medical_consultation_isVisible_publishedAt_idx" ON "medical_consultation"("isVisible", "publishedAt");


INSERT INTO "doctor" ("id","legacyId","slug","name","position","department","bio","reservationHref","displayOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom',1,'bak-yongbeom','박용범','원장','혈관외과 전문의',NULL,'/',0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-cover','doctor-bak-yongbeom','COVER','/assets/doctors/bak-profile-desktop.png','박용범 COVER', 0, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-profile','doctor-bak-yongbeom','PROFILE','/assets/doctors/bak-headshot-mobile.png','박용범 PROFILE', 1, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-cutout','doctor-bak-yongbeom','CUTOUT','/assets/doctors/bak-profile-transparent.png','박용범 CUTOUT', 2, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-motion','doctor-bak-yongbeom','MOTION','/assets/doctors/bak-motion.gif','박용범 MOTION', 3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_specialty" ("id","doctorId","name","description","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-specialty-1','doctor-bak-yongbeom','하지정맥류',NULL,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_specialty" ("id","doctorId","name","description","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-specialty-2','doctor-bak-yongbeom','정계정맥류',NULL,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_specialty" ("id","doctorId","name","description","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-specialty-3','doctor-bak-yongbeom','골반정맥류',NULL,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-career-1','doctor-bak-yongbeom','EDUCATION','부산대학교 의과대학 졸업',0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-career-2','doctor-bak-yongbeom','CAREER','양산부산대학교병원 혈관외과',1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-career-3','doctor-bak-yongbeom','CAREER','메리놀병원 외과 및 혈관외과',2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-career-4','doctor-bak-yongbeom','CAREER','국군 수도병원 혈관외과',3,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-career-5','doctor-bak-yongbeom','CAREER','대한혈관외과학회 상임이사',4,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-career-6','doctor-bak-yongbeom','CAREER','대한혈관외과학회 학술위원/기획위원',5,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-career-7','doctor-bak-yongbeom','CAREER','대한정맥학회 상임이사',6,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-career-8','doctor-bak-yongbeom','CAREER','대한외과학회 상임이사/평생회원',7,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-career-9','doctor-bak-yongbeom','CAREER','미국정맥학회 정회원',8,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_schedule" ("id","doctorId","label","mon","tue","wed","thu","fri","sat","sortOrder","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-schedule-1','doctor-bak-yongbeom','오전','진료','진료','진료','진료','진료','문의',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_schedule" ("id","doctorId","label","mon","tue","wed","thu","fri","sat","sortOrder","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-schedule-2','doctor-bak-yongbeom','오후','진료','진료','휴진','진료','진료','문의',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_review" ("id","doctorId","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-review-1','doctor-bak-yongbeom','김*숙 님',34,'여성','레이저 정맥 폐쇄술 + 경화요법',NULL,'/assets/images/home-review-after-1.png',NULL,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_review" ("id","doctorId","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-review-2','doctor-bak-yongbeom','김*숙 님',34,'여성','레이저 정맥 폐쇄술 + 경화요법',NULL,'/assets/images/home-review-before-1.png',NULL,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_review" ("id","doctorId","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-review-3','doctor-bak-yongbeom','김*숙 님',34,'여성','레이저 정맥 폐쇄술 + 경화요법',NULL,'/assets/images/home-review-after-1.png',NULL,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-media-1','doctor-bak-yongbeom','VIDEO','대표 영상',NULL,'/assets/doctors/temp-thumbnail-0.png','/',NULL,true,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-media-2','doctor-bak-yongbeom','VIDEO','하지정맥류 관리 말도 안되는 소리!',NULL,'/assets/doctors/temp-thumbnail-1.png','/',NULL,false,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-media-3','doctor-bak-yongbeom','VIDEO','일상을 바꾸다',NULL,'/assets/doctors/temp-thumbnail-2.png','/',NULL,false,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-media-4','doctor-bak-yongbeom','VIDEO','왜 해?! 자궁적출',NULL,'/assets/doctors/temp-thumbnail-3.png','/',NULL,false,3,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_presentation" ("id","doctorId","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-presentation-1','doctor-bak-yongbeom','대한정맥학회 학술지 논문 게재','대한정맥학회',NULL,'/assets/doctors/temp-thesis.png','/',NULL,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_presentation" ("id","doctorId","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-presentation-2','doctor-bak-yongbeom','대한정맥학회 학술지 논문 게재','대한정맥학회',NULL,'/assets/doctors/temp-thesis.png','/',NULL,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_presentation" ("id","doctorId","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bak-yongbeom-presentation-3','doctor-bak-yongbeom','대한정맥학회 학술지 논문 게재','대한정맥학회',NULL,'/assets/doctors/temp-thesis.png','/',NULL,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor" ("id","legacyId","slug","name","position","department","bio","reservationHref","displayOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon',2,'jeon-jinwon','전진원','원장','혈관외과 전문의',NULL,'/',1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-cover','doctor-jeon-jinwon','COVER','/assets/doctors/jeon-profile-desktop.png','전진원 COVER', 0, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-profile','doctor-jeon-jinwon','PROFILE','/assets/doctors/jeon-headshot-mobile.png','전진원 PROFILE', 1, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-cutout','doctor-jeon-jinwon','CUTOUT','/assets/doctors/jeon-profile-transparent.png','전진원 CUTOUT', 2, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-motion','doctor-jeon-jinwon','MOTION','/assets/doctors/jeon-motion.gif','전진원 MOTION', 3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_specialty" ("id","doctorId","name","description","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-specialty-1','doctor-jeon-jinwon','하지정맥류',NULL,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_specialty" ("id","doctorId","name","description","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-specialty-2','doctor-jeon-jinwon','정계정맥류',NULL,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_specialty" ("id","doctorId","name","description","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-specialty-3','doctor-jeon-jinwon','골반정맥류',NULL,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-career-1','doctor-jeon-jinwon','EDUCATION','부산대학교 의과대학 졸업',0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-career-2','doctor-jeon-jinwon','CAREER','부산대학교병원 외과 전공의 수료',1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-career-3','doctor-jeon-jinwon','CAREER','양산부산대학교병원 혈관외과',2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-career-4','doctor-jeon-jinwon','CAREER','대한혈관외과학회 정회원',3,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-career-5','doctor-jeon-jinwon','CAREER','대한정맥학회 정회원',4,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_schedule" ("id","doctorId","label","mon","tue","wed","thu","fri","sat","sortOrder","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-schedule-1','doctor-jeon-jinwon','오전','진료','진료','진료','진료','진료','문의',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_schedule" ("id","doctorId","label","mon","tue","wed","thu","fri","sat","sortOrder","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-schedule-2','doctor-jeon-jinwon','오후','진료','진료','휴진','진료','진료','문의',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_review" ("id","doctorId","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-review-1','doctor-jeon-jinwon','김*숙 님',34,'여성','레이저 정맥 폐쇄술 + 경화요법',NULL,'/assets/images/home-review-after-1.png',NULL,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_review" ("id","doctorId","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-review-2','doctor-jeon-jinwon','김*숙 님',34,'여성','레이저 정맥 폐쇄술 + 경화요법',NULL,'/assets/images/home-review-before-1.png',NULL,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_review" ("id","doctorId","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-review-3','doctor-jeon-jinwon','김*숙 님',34,'여성','레이저 정맥 폐쇄술 + 경화요법',NULL,'/assets/images/home-review-after-1.png',NULL,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-media-1','doctor-jeon-jinwon','VIDEO','대표 영상',NULL,'/assets/doctors/temp-thumbnail-0.png','/',NULL,true,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-media-2','doctor-jeon-jinwon','VIDEO','하지정맥류 관리 말도 안되는 소리!',NULL,'/assets/doctors/temp-thumbnail-1.png','/',NULL,false,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-media-3','doctor-jeon-jinwon','VIDEO','일상을 바꾸다',NULL,'/assets/doctors/temp-thumbnail-2.png','/',NULL,false,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-media-4','doctor-jeon-jinwon','VIDEO','왜 해?! 자궁적출',NULL,'/assets/doctors/temp-thumbnail-3.png','/',NULL,false,3,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_presentation" ("id","doctorId","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-presentation-1','doctor-jeon-jinwon','대한정맥학회 학술지 논문 게재','대한정맥학회',NULL,'/assets/doctors/temp-thesis.png','/',NULL,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_presentation" ("id","doctorId","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-presentation-2','doctor-jeon-jinwon','대한정맥학회 학술지 논문 게재','대한정맥학회',NULL,'/assets/doctors/temp-thesis.png','/',NULL,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_presentation" ("id","doctorId","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jeon-jinwon-presentation-3','doctor-jeon-jinwon','대한정맥학회 학술지 논문 게재','대한정맥학회',NULL,'/assets/doctors/temp-thesis.png','/',NULL,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor" ("id","legacyId","slug","name","position","department","bio","reservationHref","displayOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran',3,'jang-jiran','장지란','원장','혈관외과 전문의',NULL,'/',2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-cover','doctor-jang-jiran','COVER','/assets/doctors/jang-profile-desktop.png','장지란 COVER', 0, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-profile','doctor-jang-jiran','PROFILE','/assets/doctors/jang-headshot-mobile.png','장지란 PROFILE', 1, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-cutout','doctor-jang-jiran','CUTOUT','/assets/doctors/jang-profile-transparent.png','장지란 CUTOUT', 2, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-motion','doctor-jang-jiran','MOTION','/assets/doctors/jang-motion.gif','장지란 MOTION', 3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_specialty" ("id","doctorId","name","description","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-specialty-1','doctor-jang-jiran','하지정맥류',NULL,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_specialty" ("id","doctorId","name","description","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-specialty-2','doctor-jang-jiran','정계정맥류',NULL,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_specialty" ("id","doctorId","name","description","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-specialty-3','doctor-jang-jiran','골반정맥류',NULL,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-career-1','doctor-jang-jiran','EDUCATION','부산대학교 의과대학 졸업',0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-career-2','doctor-jang-jiran','CAREER','부산대학교병원 외과 전문의',1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-career-3','doctor-jang-jiran','CAREER','혈관외과 전임의 수료',2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-career-4','doctor-jang-jiran','CAREER','대한혈관외과학회 정회원',3,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-career-5','doctor-jang-jiran','CAREER','대한정맥학회 정회원',4,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_schedule" ("id","doctorId","label","mon","tue","wed","thu","fri","sat","sortOrder","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-schedule-1','doctor-jang-jiran','오전','진료','진료','진료','진료','진료','문의',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_schedule" ("id","doctorId","label","mon","tue","wed","thu","fri","sat","sortOrder","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-schedule-2','doctor-jang-jiran','오후','진료','진료','휴진','진료','진료','문의',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_review" ("id","doctorId","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-review-1','doctor-jang-jiran','김*숙 님',34,'여성','레이저 정맥 폐쇄술 + 경화요법',NULL,'/assets/images/home-review-after-1.png',NULL,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_review" ("id","doctorId","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-review-2','doctor-jang-jiran','김*숙 님',34,'여성','레이저 정맥 폐쇄술 + 경화요법',NULL,'/assets/images/home-review-before-1.png',NULL,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_review" ("id","doctorId","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-review-3','doctor-jang-jiran','김*숙 님',34,'여성','레이저 정맥 폐쇄술 + 경화요법',NULL,'/assets/images/home-review-after-1.png',NULL,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-media-1','doctor-jang-jiran','VIDEO','대표 영상',NULL,'/assets/doctors/temp-thumbnail-0.png','/',NULL,true,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-media-2','doctor-jang-jiran','VIDEO','하지정맥류 관리 말도 안되는 소리!',NULL,'/assets/doctors/temp-thumbnail-1.png','/',NULL,false,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-media-3','doctor-jang-jiran','VIDEO','일상을 바꾸다',NULL,'/assets/doctors/temp-thumbnail-2.png','/',NULL,false,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-media-4','doctor-jang-jiran','VIDEO','왜 해?! 자궁적출',NULL,'/assets/doctors/temp-thumbnail-3.png','/',NULL,false,3,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_presentation" ("id","doctorId","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-presentation-1','doctor-jang-jiran','대한정맥학회 학술지 논문 게재','대한정맥학회',NULL,'/assets/doctors/temp-thesis.png','/',NULL,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_presentation" ("id","doctorId","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-presentation-2','doctor-jang-jiran','대한정맥학회 학술지 논문 게재','대한정맥학회',NULL,'/assets/doctors/temp-thesis.png','/',NULL,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_presentation" ("id","doctorId","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-jang-jiran-presentation-3','doctor-jang-jiran','대한정맥학회 학술지 논문 게재','대한정맥학회',NULL,'/assets/doctors/temp-thesis.png','/',NULL,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor" ("id","legacyId","slug","name","position","department","bio","reservationHref","displayOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae',4,'byun-seungjae','변승재','원장','혈관외과 전문의',NULL,'/',3,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-cover','doctor-byun-seungjae','COVER','/assets/doctors/byun-profile-desktop.png','변승재 COVER', 0, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-profile','doctor-byun-seungjae','PROFILE','/assets/doctors/byun-headshot-mobile.png','변승재 PROFILE', 1, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-cutout','doctor-byun-seungjae','CUTOUT','/assets/doctors/byun-profile-transparent.png','변승재 CUTOUT', 2, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-motion','doctor-byun-seungjae','MOTION','/assets/doctors/byun-motion.gif','변승재 MOTION', 3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_specialty" ("id","doctorId","name","description","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-specialty-1','doctor-byun-seungjae','하지정맥류',NULL,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_specialty" ("id","doctorId","name","description","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-specialty-2','doctor-byun-seungjae','정계정맥류',NULL,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_specialty" ("id","doctorId","name","description","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-specialty-3','doctor-byun-seungjae','골반정맥류',NULL,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-career-1','doctor-byun-seungjae','EDUCATION','부산대학교 의과대학 졸업',0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-career-2','doctor-byun-seungjae','CAREER','부산대학교병원 외과 전문의',1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-career-3','doctor-byun-seungjae','CAREER','혈관외과 전임의 수료',2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-career-4','doctor-byun-seungjae','CAREER','대한혈관외과학회 정회원',3,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-career-5','doctor-byun-seungjae','CAREER','대한정맥학회 정회원',4,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_schedule" ("id","doctorId","label","mon","tue","wed","thu","fri","sat","sortOrder","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-schedule-1','doctor-byun-seungjae','오전','진료','진료','진료','진료','진료','문의',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_schedule" ("id","doctorId","label","mon","tue","wed","thu","fri","sat","sortOrder","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-schedule-2','doctor-byun-seungjae','오후','진료','진료','휴진','진료','진료','문의',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_review" ("id","doctorId","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-review-1','doctor-byun-seungjae','김*숙 님',34,'여성','레이저 정맥 폐쇄술 + 경화요법',NULL,'/assets/images/home-review-after-1.png',NULL,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_review" ("id","doctorId","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-review-2','doctor-byun-seungjae','김*숙 님',34,'여성','레이저 정맥 폐쇄술 + 경화요법',NULL,'/assets/images/home-review-before-1.png',NULL,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_review" ("id","doctorId","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-review-3','doctor-byun-seungjae','김*숙 님',34,'여성','레이저 정맥 폐쇄술 + 경화요법',NULL,'/assets/images/home-review-after-1.png',NULL,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-media-1','doctor-byun-seungjae','VIDEO','대표 영상',NULL,'/assets/doctors/temp-thumbnail-0.png','/',NULL,true,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-media-2','doctor-byun-seungjae','VIDEO','하지정맥류 관리 말도 안되는 소리!',NULL,'/assets/doctors/temp-thumbnail-1.png','/',NULL,false,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-media-3','doctor-byun-seungjae','VIDEO','일상을 바꾸다',NULL,'/assets/doctors/temp-thumbnail-2.png','/',NULL,false,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-media-4','doctor-byun-seungjae','VIDEO','왜 해?! 자궁적출',NULL,'/assets/doctors/temp-thumbnail-3.png','/',NULL,false,3,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_presentation" ("id","doctorId","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-presentation-1','doctor-byun-seungjae','대한정맥학회 학술지 논문 게재','대한정맥학회',NULL,'/assets/doctors/temp-thesis.png','/',NULL,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_presentation" ("id","doctorId","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-presentation-2','doctor-byun-seungjae','대한정맥학회 학술지 논문 게재','대한정맥학회',NULL,'/assets/doctors/temp-thesis.png','/',NULL,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_presentation" ("id","doctorId","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-byun-seungjae-presentation-3','doctor-byun-seungjae','대한정맥학회 학술지 논문 게재','대한정맥학회',NULL,'/assets/doctors/temp-thesis.png','/',NULL,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor" ("id","legacyId","slug","name","position","department","bio","reservationHref","displayOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho',5,'bae-byeongho','배병호','원장','영상의학과 전문의',NULL,'/',4,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-cover','doctor-bae-byeongho','COVER','/assets/doctors/bae-profile-desktop.png','배병호 COVER', 0, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-profile','doctor-bae-byeongho','PROFILE','/assets/doctors/bae-headshot-mobile.png','배병호 PROFILE', 1, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-cutout','doctor-bae-byeongho','CUTOUT','/assets/doctors/bae-profile-transparent.png','배병호 CUTOUT', 2, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-motion','doctor-bae-byeongho','MOTION','/assets/doctors/bae-motion.gif','배병호 MOTION', 3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_specialty" ("id","doctorId","name","description","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-specialty-1','doctor-bae-byeongho','하지정맥류',NULL,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_specialty" ("id","doctorId","name","description","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-specialty-2','doctor-bae-byeongho','정계정맥류',NULL,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_specialty" ("id","doctorId","name","description","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-specialty-3','doctor-bae-byeongho','골반정맥류',NULL,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-career-1','doctor-bae-byeongho','EDUCATION','부산대학교 의과대학 졸업',0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-career-2','doctor-bae-byeongho','CAREER','영상의학과 전문의',1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-career-3','doctor-bae-byeongho','CAREER','대한영상의학회 정회원',2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-career-4','doctor-bae-byeongho','CAREER','대한초음파의학회 정회원',3,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_schedule" ("id","doctorId","label","mon","tue","wed","thu","fri","sat","sortOrder","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-schedule-1','doctor-bae-byeongho','오전','진료','진료','진료','진료','진료','문의',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_schedule" ("id","doctorId","label","mon","tue","wed","thu","fri","sat","sortOrder","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-schedule-2','doctor-bae-byeongho','오후','진료','진료','휴진','진료','진료','문의',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_review" ("id","doctorId","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-review-1','doctor-bae-byeongho','김*숙 님',34,'여성','레이저 정맥 폐쇄술 + 경화요법',NULL,'/assets/images/home-review-after-1.png',NULL,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_review" ("id","doctorId","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-review-2','doctor-bae-byeongho','김*숙 님',34,'여성','레이저 정맥 폐쇄술 + 경화요법',NULL,'/assets/images/home-review-before-1.png',NULL,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_review" ("id","doctorId","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-review-3','doctor-bae-byeongho','김*숙 님',34,'여성','레이저 정맥 폐쇄술 + 경화요법',NULL,'/assets/images/home-review-after-1.png',NULL,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-media-1','doctor-bae-byeongho','VIDEO','대표 영상',NULL,'/assets/doctors/temp-thumbnail-0.png','/',NULL,true,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-media-2','doctor-bae-byeongho','VIDEO','하지정맥류 관리 말도 안되는 소리!',NULL,'/assets/doctors/temp-thumbnail-1.png','/',NULL,false,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-media-3','doctor-bae-byeongho','VIDEO','일상을 바꾸다',NULL,'/assets/doctors/temp-thumbnail-2.png','/',NULL,false,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-media-4','doctor-bae-byeongho','VIDEO','왜 해?! 자궁적출',NULL,'/assets/doctors/temp-thumbnail-3.png','/',NULL,false,3,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_presentation" ("id","doctorId","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-presentation-1','doctor-bae-byeongho','대한정맥학회 학술지 논문 게재','대한정맥학회',NULL,'/assets/doctors/temp-thesis.png','/',NULL,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_presentation" ("id","doctorId","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-presentation-2','doctor-bae-byeongho','대한정맥학회 학술지 논문 게재','대한정맥학회',NULL,'/assets/doctors/temp-thesis.png','/',NULL,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_presentation" ("id","doctorId","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-bae-byeongho-presentation-3','doctor-bae-byeongho','대한정맥학회 학술지 논문 게재','대한정맥학회',NULL,'/assets/doctors/temp-thesis.png','/',NULL,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor" ("id","legacyId","slug","name","position","department","bio","reservationHref","displayOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju',6,'kim-byeongju','김병주','원장','마취통증의학과 전문의',NULL,'/',5,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-cover','doctor-kim-byeongju','COVER','/assets/doctors/kim-profile-desktop.png','김병주 COVER', 0, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-profile','doctor-kim-byeongju','PROFILE','/assets/doctors/kim-headshot-mobile.png','김병주 PROFILE', 1, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-cutout','doctor-kim-byeongju','CUTOUT','/assets/doctors/kim-profile-transparent.png','김병주 CUTOUT', 2, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_image" ("id","doctorId","kind","url","alt","sortOrder","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-motion','doctor-kim-byeongju','MOTION','/assets/doctors/kim-motion.gif','김병주 MOTION', 3, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_specialty" ("id","doctorId","name","description","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-specialty-1','doctor-kim-byeongju','하지정맥류',NULL,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_specialty" ("id","doctorId","name","description","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-specialty-2','doctor-kim-byeongju','정계정맥류',NULL,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_specialty" ("id","doctorId","name","description","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-specialty-3','doctor-kim-byeongju','골반정맥류',NULL,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-career-1','doctor-kim-byeongju','EDUCATION','부산대학교 의과대학 졸업',0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-career-2','doctor-kim-byeongju','CAREER','마취통증의학과 전문의',1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-career-3','doctor-kim-byeongju','CAREER','대한마취통증의학회 정회원',2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_career" ("id","doctorId","kind","content","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-career-4','doctor-kim-byeongju','CAREER','대한통증학회 정회원',3,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_schedule" ("id","doctorId","label","mon","tue","wed","thu","fri","sat","sortOrder","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-schedule-1','doctor-kim-byeongju','오전','진료','진료','진료','진료','진료','문의',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_schedule" ("id","doctorId","label","mon","tue","wed","thu","fri","sat","sortOrder","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-schedule-2','doctor-kim-byeongju','오후','진료','진료','휴진','진료','진료','문의',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_review" ("id","doctorId","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-review-1','doctor-kim-byeongju','김*숙 님',34,'여성','레이저 정맥 폐쇄술 + 경화요법',NULL,'/assets/images/home-review-after-1.png',NULL,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_review" ("id","doctorId","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-review-2','doctor-kim-byeongju','김*숙 님',34,'여성','레이저 정맥 폐쇄술 + 경화요법',NULL,'/assets/images/home-review-before-1.png',NULL,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_review" ("id","doctorId","patientName","age","gender","treatment","content","imageUrl","reviewedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-review-3','doctor-kim-byeongju','김*숙 님',34,'여성','레이저 정맥 폐쇄술 + 경화요법',NULL,'/assets/images/home-review-after-1.png',NULL,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-media-1','doctor-kim-byeongju','VIDEO','대표 영상',NULL,'/assets/doctors/temp-thumbnail-0.png','/',NULL,true,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-media-2','doctor-kim-byeongju','VIDEO','하지정맥류 관리 말도 안되는 소리!',NULL,'/assets/doctors/temp-thumbnail-1.png','/',NULL,false,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-media-3','doctor-kim-byeongju','VIDEO','일상을 바꾸다',NULL,'/assets/doctors/temp-thumbnail-2.png','/',NULL,false,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_media" ("id","doctorId","kind","title","source","thumbnailUrl","linkUrl","publishedAt","isFeatured","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-media-4','doctor-kim-byeongju','VIDEO','왜 해?! 자궁적출',NULL,'/assets/doctors/temp-thumbnail-3.png','/',NULL,false,3,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_presentation" ("id","doctorId","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-presentation-1','doctor-kim-byeongju','대한정맥학회 학술지 논문 게재','대한정맥학회',NULL,'/assets/doctors/temp-thesis.png','/',NULL,0,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_presentation" ("id","doctorId","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-presentation-2','doctor-kim-byeongju','대한정맥학회 학술지 논문 게재','대한정맥학회',NULL,'/assets/doctors/temp-thesis.png','/',NULL,1,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "doctor_presentation" ("id","doctorId","title","organization","description","imageUrl","linkUrl","presentedAt","sortOrder","isVisible","createdAt","updatedAt")
VALUES ('doctor-kim-byeongju-presentation-3','doctor-kim-byeongju','대한정맥학회 학술지 논문 게재','대한정맥학회',NULL,'/assets/doctors/temp-thesis.png','/',NULL,2,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (1,'doctor-bak-yongbeom','정맥','하지정맥류','오래 서서 일하는데 저녁마다 다리가 무겁습니다','["안녕하세요 68세 남자입니다. 5년쯤 일주다리 정강이 밑에 가려워서 손톱는데 가느다란 줄이 터져서 검은반점이 크게 여러군데 있어요. 어떻게 하시면 좋을지 문의 부탁드립니다."]'::jsonb,'/assets/community/consultation/leg-question.webp',true,false,'["안녕하세요. 청맥병원 혈관외과 박용범 원장입니다.", "말씀해주신 내용만으로 정확한 원인을 단정하기는 어렵지만, 오래 서서 생활한 뒤 다리가 무겁고 피부 색이 변하거나 가려움이 반복된다면 정맥 순환 상태를 함께 확인해보는 것이 좋습니다.", "우선은 빠른 진료를 통해 현재 다리의 상태를 정확히 확인하는 것이 중요합니다. 병원으로 전화 주시면 진료에 도움이 될 수 있도록 안내를 드리겠습니다.", "다리에 더욱 악화되는 정맥증상이라 혹여 앉고 계시는 병이 악화되실까 염려스럽습니다. 하루 빨리 진료 보시기를 권유드립니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (2,'doctor-byun-seungjae','동맥','심부정맥혈전증','한쪽 다리만 붓는데 검사를 받아야 할까요?','["며칠 전부터 한쪽 다리만 붓고 묵직한 느낌이 있습니다. 혈전 검사가 필요한지 궁금합니다."]'::jsonb,NULL,true,false,'["한쪽 다리의 갑작스러운 부종은 여러 원인으로 발생할 수 있습니다. 증상이 지속되거나 통증, 열감, 피부색 변화가 동반된다면 혈관 상태를 확인하기 위한 진료가 권장됩니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (3,'doctor-jeon-jinwon','정맥','정계정맥류','정계정맥류 수술 비용이 궁금합니다','["정계정맥류 진단을 받았습니다. 치료 방법과 대략적인 비용이 궁금합니다."]'::jsonb,NULL,true,true,'["치료 방법과 비용은 검사 결과와 치료 방식에 따라 달라질 수 있어 진료 후 안내드리는 것이 가장 정확합니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,2,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (4,'doctor-jang-jiran','동맥','심부정맥혈전증','자궁근종색전술 치료 가능한가요?','["자궁근종 때문에 색전술을 알아보고 있습니다. 진료와 치료가 가능한지 궁금합니다."]'::jsonb,NULL,false,false,'["자궁근종의 크기와 위치, 증상 등을 확인한 뒤 색전술 적용 가능 여부를 판단할 수 있습니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,3,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (5,'doctor-jang-jiran','부인과','자궁근종','자궁근종색전술 치료 가능한가요?','["수술 대신 자궁근종색전술을 고려하고 있습니다. 상담을 받고 싶습니다."]'::jsonb,NULL,true,false,'["영상 검사와 현재 증상을 함께 확인하면 적절한 치료 방향을 안내드릴 수 있습니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,4,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (6,NULL,'기타','','하지동맥폐색, 하지정맥류 악화','["하지동맥과 정맥 관련 증상이 함께 있는 것 같아 어떤 검사를 받아야 할지 문의드립니다."]'::jsonb,NULL,true,false,NULL,NULL,TIMESTAMP '2026-10-28 09:00:00',true,5,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (7,'doctor-jeon-jinwon','정맥','하지정맥류','비용 문의','["하지정맥류 검사와 치료 비용이 궁금합니다."]'::jsonb,NULL,false,false,'["검사 범위와 치료 방식에 따라 비용이 달라질 수 있어 진료 후 정확하게 안내드릴 수 있습니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,6,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (8,'doctor-bak-yongbeom','정맥','하지정맥류','오래 서서 일하는데 저녁마다 다리가 무겁습니다','["안녕하세요 68세 남자입니다. 5년쯤 일주다리 정강이 밑에 가려워서 손톱는데 가느다란 줄이 터져서 검은반점이 크게 여러군데 있어요. 어떻게 하시면 좋을지 문의 부탁드립니다."]'::jsonb,'/assets/community/consultation/leg-question.webp',true,false,'["안녕하세요. 청맥병원 혈관외과 박용범 원장입니다.", "말씀해주신 내용만으로 정확한 원인을 단정하기는 어렵지만, 오래 서서 생활한 뒤 다리가 무겁고 피부 색이 변하거나 가려움이 반복된다면 정맥 순환 상태를 함께 확인해보는 것이 좋습니다.", "우선은 빠른 진료를 통해 현재 다리의 상태를 정확히 확인하는 것이 중요합니다. 병원으로 전화 주시면 진료에 도움이 될 수 있도록 안내를 드리겠습니다.", "다리에 더욱 악화되는 정맥증상이라 혹여 앉고 계시는 병이 악화되실까 염려스럽습니다. 하루 빨리 진료 보시기를 권유드립니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,7,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (9,'doctor-byun-seungjae','동맥','심부정맥혈전증','한쪽 다리만 붓는데 검사를 받아야 할까요?','["며칠 전부터 한쪽 다리만 붓고 묵직한 느낌이 있습니다. 혈전 검사가 필요한지 궁금합니다."]'::jsonb,NULL,true,false,'["한쪽 다리의 갑작스러운 부종은 여러 원인으로 발생할 수 있습니다. 증상이 지속되거나 통증, 열감, 피부색 변화가 동반된다면 혈관 상태를 확인하기 위한 진료가 권장됩니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,8,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (10,'doctor-jeon-jinwon','정맥','정계정맥류','정계정맥류 수술 비용이 궁금합니다','["정계정맥류 진단을 받았습니다. 치료 방법과 대략적인 비용이 궁금합니다."]'::jsonb,NULL,true,true,'["치료 방법과 비용은 검사 결과와 치료 방식에 따라 달라질 수 있어 진료 후 안내드리는 것이 가장 정확합니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,9,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (11,'doctor-jang-jiran','동맥','심부정맥혈전증','자궁근종색전술 치료 가능한가요?','["자궁근종 때문에 색전술을 알아보고 있습니다. 진료와 치료가 가능한지 궁금합니다."]'::jsonb,NULL,false,false,'["자궁근종의 크기와 위치, 증상 등을 확인한 뒤 색전술 적용 가능 여부를 판단할 수 있습니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,10,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (12,'doctor-jang-jiran','부인과','자궁근종','자궁근종색전술 치료 가능한가요?','["수술 대신 자궁근종색전술을 고려하고 있습니다. 상담을 받고 싶습니다."]'::jsonb,NULL,true,false,'["영상 검사와 현재 증상을 함께 확인하면 적절한 치료 방향을 안내드릴 수 있습니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,11,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (13,NULL,'기타','','하지동맥폐색, 하지정맥류 악화','["하지동맥과 정맥 관련 증상이 함께 있는 것 같아 어떤 검사를 받아야 할지 문의드립니다."]'::jsonb,NULL,true,false,NULL,NULL,TIMESTAMP '2026-10-28 09:00:00',true,12,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (14,'doctor-jeon-jinwon','정맥','하지정맥류','비용 문의','["하지정맥류 검사와 치료 비용이 궁금합니다."]'::jsonb,NULL,false,false,'["검사 범위와 치료 방식에 따라 비용이 달라질 수 있어 진료 후 정확하게 안내드릴 수 있습니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,13,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (15,'doctor-bak-yongbeom','정맥','하지정맥류','오래 서서 일하는데 저녁마다 다리가 무겁습니다','["안녕하세요 68세 남자입니다. 5년쯤 일주다리 정강이 밑에 가려워서 손톱는데 가느다란 줄이 터져서 검은반점이 크게 여러군데 있어요. 어떻게 하시면 좋을지 문의 부탁드립니다."]'::jsonb,'/assets/community/consultation/leg-question.webp',true,false,'["안녕하세요. 청맥병원 혈관외과 박용범 원장입니다.", "말씀해주신 내용만으로 정확한 원인을 단정하기는 어렵지만, 오래 서서 생활한 뒤 다리가 무겁고 피부 색이 변하거나 가려움이 반복된다면 정맥 순환 상태를 함께 확인해보는 것이 좋습니다.", "우선은 빠른 진료를 통해 현재 다리의 상태를 정확히 확인하는 것이 중요합니다. 병원으로 전화 주시면 진료에 도움이 될 수 있도록 안내를 드리겠습니다.", "다리에 더욱 악화되는 정맥증상이라 혹여 앉고 계시는 병이 악화되실까 염려스럽습니다. 하루 빨리 진료 보시기를 권유드립니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,14,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (16,'doctor-byun-seungjae','동맥','심부정맥혈전증','한쪽 다리만 붓는데 검사를 받아야 할까요?','["며칠 전부터 한쪽 다리만 붓고 묵직한 느낌이 있습니다. 혈전 검사가 필요한지 궁금합니다."]'::jsonb,NULL,true,false,'["한쪽 다리의 갑작스러운 부종은 여러 원인으로 발생할 수 있습니다. 증상이 지속되거나 통증, 열감, 피부색 변화가 동반된다면 혈관 상태를 확인하기 위한 진료가 권장됩니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,15,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (17,'doctor-jeon-jinwon','정맥','정계정맥류','정계정맥류 수술 비용이 궁금합니다','["정계정맥류 진단을 받았습니다. 치료 방법과 대략적인 비용이 궁금합니다."]'::jsonb,NULL,true,true,'["치료 방법과 비용은 검사 결과와 치료 방식에 따라 달라질 수 있어 진료 후 안내드리는 것이 가장 정확합니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,16,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (18,'doctor-jang-jiran','동맥','심부정맥혈전증','자궁근종색전술 치료 가능한가요?','["자궁근종 때문에 색전술을 알아보고 있습니다. 진료와 치료가 가능한지 궁금합니다."]'::jsonb,NULL,false,false,'["자궁근종의 크기와 위치, 증상 등을 확인한 뒤 색전술 적용 가능 여부를 판단할 수 있습니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,17,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (19,'doctor-jang-jiran','부인과','자궁근종','자궁근종색전술 치료 가능한가요?','["수술 대신 자궁근종색전술을 고려하고 있습니다. 상담을 받고 싶습니다."]'::jsonb,NULL,true,false,'["영상 검사와 현재 증상을 함께 확인하면 적절한 치료 방향을 안내드릴 수 있습니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,18,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (20,NULL,'기타','','하지동맥폐색, 하지정맥류 악화','["하지동맥과 정맥 관련 증상이 함께 있는 것 같아 어떤 검사를 받아야 할지 문의드립니다."]'::jsonb,NULL,true,false,NULL,NULL,TIMESTAMP '2026-10-28 09:00:00',true,19,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (21,'doctor-jeon-jinwon','정맥','하지정맥류','비용 문의','["하지정맥류 검사와 치료 비용이 궁금합니다."]'::jsonb,NULL,false,false,'["검사 범위와 치료 방식에 따라 비용이 달라질 수 있어 진료 후 정확하게 안내드릴 수 있습니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,20,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (22,'doctor-bak-yongbeom','정맥','하지정맥류','오래 서서 일하는데 저녁마다 다리가 무겁습니다','["안녕하세요 68세 남자입니다. 5년쯤 일주다리 정강이 밑에 가려워서 손톱는데 가느다란 줄이 터져서 검은반점이 크게 여러군데 있어요. 어떻게 하시면 좋을지 문의 부탁드립니다."]'::jsonb,'/assets/community/consultation/leg-question.webp',true,false,'["안녕하세요. 청맥병원 혈관외과 박용범 원장입니다.", "말씀해주신 내용만으로 정확한 원인을 단정하기는 어렵지만, 오래 서서 생활한 뒤 다리가 무겁고 피부 색이 변하거나 가려움이 반복된다면 정맥 순환 상태를 함께 확인해보는 것이 좋습니다.", "우선은 빠른 진료를 통해 현재 다리의 상태를 정확히 확인하는 것이 중요합니다. 병원으로 전화 주시면 진료에 도움이 될 수 있도록 안내를 드리겠습니다.", "다리에 더욱 악화되는 정맥증상이라 혹여 앉고 계시는 병이 악화되실까 염려스럽습니다. 하루 빨리 진료 보시기를 권유드립니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,21,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (23,'doctor-byun-seungjae','동맥','심부정맥혈전증','한쪽 다리만 붓는데 검사를 받아야 할까요?','["며칠 전부터 한쪽 다리만 붓고 묵직한 느낌이 있습니다. 혈전 검사가 필요한지 궁금합니다."]'::jsonb,NULL,true,false,'["한쪽 다리의 갑작스러운 부종은 여러 원인으로 발생할 수 있습니다. 증상이 지속되거나 통증, 열감, 피부색 변화가 동반된다면 혈관 상태를 확인하기 위한 진료가 권장됩니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,22,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (24,'doctor-jeon-jinwon','정맥','정계정맥류','정계정맥류 수술 비용이 궁금합니다','["정계정맥류 진단을 받았습니다. 치료 방법과 대략적인 비용이 궁금합니다."]'::jsonb,NULL,true,true,'["치료 방법과 비용은 검사 결과와 치료 방식에 따라 달라질 수 있어 진료 후 안내드리는 것이 가장 정확합니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,23,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (25,'doctor-jang-jiran','동맥','심부정맥혈전증','자궁근종색전술 치료 가능한가요?','["자궁근종 때문에 색전술을 알아보고 있습니다. 진료와 치료가 가능한지 궁금합니다."]'::jsonb,NULL,false,false,'["자궁근종의 크기와 위치, 증상 등을 확인한 뒤 색전술 적용 가능 여부를 판단할 수 있습니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,24,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (26,'doctor-jang-jiran','부인과','자궁근종','자궁근종색전술 치료 가능한가요?','["수술 대신 자궁근종색전술을 고려하고 있습니다. 상담을 받고 싶습니다."]'::jsonb,NULL,true,false,'["영상 검사와 현재 증상을 함께 확인하면 적절한 치료 방향을 안내드릴 수 있습니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,25,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (27,NULL,'기타','','하지동맥폐색, 하지정맥류 악화','["하지동맥과 정맥 관련 증상이 함께 있는 것 같아 어떤 검사를 받아야 할지 문의드립니다."]'::jsonb,NULL,true,false,NULL,NULL,TIMESTAMP '2026-10-28 09:00:00',true,26,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (28,'doctor-jeon-jinwon','정맥','하지정맥류','비용 문의','["하지정맥류 검사와 치료 비용이 궁금합니다."]'::jsonb,NULL,false,false,'["검사 범위와 치료 방식에 따라 비용이 달라질 수 있어 진료 후 정확하게 안내드릴 수 있습니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,27,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (29,'doctor-bak-yongbeom','정맥','하지정맥류','오래 서서 일하는데 저녁마다 다리가 무겁습니다','["안녕하세요 68세 남자입니다. 5년쯤 일주다리 정강이 밑에 가려워서 손톱는데 가느다란 줄이 터져서 검은반점이 크게 여러군데 있어요. 어떻게 하시면 좋을지 문의 부탁드립니다."]'::jsonb,'/assets/community/consultation/leg-question.webp',true,false,'["안녕하세요. 청맥병원 혈관외과 박용범 원장입니다.", "말씀해주신 내용만으로 정확한 원인을 단정하기는 어렵지만, 오래 서서 생활한 뒤 다리가 무겁고 피부 색이 변하거나 가려움이 반복된다면 정맥 순환 상태를 함께 확인해보는 것이 좋습니다.", "우선은 빠른 진료를 통해 현재 다리의 상태를 정확히 확인하는 것이 중요합니다. 병원으로 전화 주시면 진료에 도움이 될 수 있도록 안내를 드리겠습니다.", "다리에 더욱 악화되는 정맥증상이라 혹여 앉고 계시는 병이 악화되실까 염려스럽습니다. 하루 빨리 진료 보시기를 권유드립니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,28,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (30,'doctor-byun-seungjae','동맥','심부정맥혈전증','한쪽 다리만 붓는데 검사를 받아야 할까요?','["며칠 전부터 한쪽 다리만 붓고 묵직한 느낌이 있습니다. 혈전 검사가 필요한지 궁금합니다."]'::jsonb,NULL,true,false,'["한쪽 다리의 갑작스러운 부종은 여러 원인으로 발생할 수 있습니다. 증상이 지속되거나 통증, 열감, 피부색 변화가 동반된다면 혈관 상태를 확인하기 위한 진료가 권장됩니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,29,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (31,'doctor-jeon-jinwon','정맥','정계정맥류','정계정맥류 수술 비용이 궁금합니다','["정계정맥류 진단을 받았습니다. 치료 방법과 대략적인 비용이 궁금합니다."]'::jsonb,NULL,true,true,'["치료 방법과 비용은 검사 결과와 치료 방식에 따라 달라질 수 있어 진료 후 안내드리는 것이 가장 정확합니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,30,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (32,'doctor-jang-jiran','동맥','심부정맥혈전증','자궁근종색전술 치료 가능한가요?','["자궁근종 때문에 색전술을 알아보고 있습니다. 진료와 치료가 가능한지 궁금합니다."]'::jsonb,NULL,false,false,'["자궁근종의 크기와 위치, 증상 등을 확인한 뒤 색전술 적용 가능 여부를 판단할 수 있습니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,31,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (33,'doctor-jang-jiran','부인과','자궁근종','자궁근종색전술 치료 가능한가요?','["수술 대신 자궁근종색전술을 고려하고 있습니다. 상담을 받고 싶습니다."]'::jsonb,NULL,true,false,'["영상 검사와 현재 증상을 함께 확인하면 적절한 치료 방향을 안내드릴 수 있습니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,32,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (34,NULL,'기타','','하지동맥폐색, 하지정맥류 악화','["하지동맥과 정맥 관련 증상이 함께 있는 것 같아 어떤 검사를 받아야 할지 문의드립니다."]'::jsonb,NULL,true,false,NULL,NULL,TIMESTAMP '2026-10-28 09:00:00',true,33,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);


INSERT INTO "medical_consultation" ("id","doctorId","categoryPrimary","categorySecondary","title","question","imageUrl","isPrivate","hasLinkIcon","answer","answerDate","publishedAt","isVisible","sortOrder","createdAt","updatedAt")
VALUES (35,'doctor-jeon-jinwon','정맥','하지정맥류','비용 문의','["하지정맥류 검사와 치료 비용이 궁금합니다."]'::jsonb,NULL,false,false,'["검사 범위와 치료 방식에 따라 비용이 달라질 수 있어 진료 후 정확하게 안내드릴 수 있습니다."]'::jsonb,TIMESTAMP '2026-10-28 18:00:00',TIMESTAMP '2026-10-28 09:00:00',true,34,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

SELECT setval(pg_get_serial_sequence('"medical_consultation"', 'id'), 35, true);
