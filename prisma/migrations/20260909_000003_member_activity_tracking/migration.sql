CREATE TABLE "user_login_log" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "authSessionId" TEXT NOT NULL,
    "provider" TEXT,
    "deviceType" TEXT,
    "userAgent" TEXT,
    "loggedInAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_login_log_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "user_activity_session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "authSessionId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastActiveAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "pageViewCount" INTEGER NOT NULL DEFAULT 0,
    "engagedSeconds" INTEGER NOT NULL DEFAULT 0,
    "entryPath" TEXT,
    "exitPath" TEXT,
    "deviceType" TEXT,
    "userAgent" TEXT,
    CONSTRAINT "user_activity_session_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "user_page_view" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "activitySessionId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "pageTitle" TEXT,
    "referrerPath" TEXT,
    "nextPath" TEXT,
    "enteredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),
    "engagedSeconds" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "user_page_view_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "user_activity_event" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "activitySessionId" TEXT NOT NULL,
    "pageViewId" TEXT,
    "eventType" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "targetId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_activity_event_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "user_login_log_authSessionId_key"
ON "user_login_log"("authSessionId");

CREATE INDEX "user_login_log_userId_loggedInAt_idx"
ON "user_login_log"("userId", "loggedInAt");

CREATE INDEX "user_activity_session_userId_startedAt_idx"
ON "user_activity_session"("userId", "startedAt");

CREATE INDEX "user_activity_session_authSessionId_idx"
ON "user_activity_session"("authSessionId");

CREATE INDEX "user_page_view_userId_enteredAt_idx"
ON "user_page_view"("userId", "enteredAt");

CREATE INDEX "user_page_view_activitySessionId_enteredAt_idx"
ON "user_page_view"("activitySessionId", "enteredAt");

CREATE INDEX "user_page_view_path_idx"
ON "user_page_view"("path");

CREATE INDEX "user_activity_event_userId_createdAt_idx"
ON "user_activity_event"("userId", "createdAt");

CREATE INDEX "user_activity_event_activitySessionId_createdAt_idx"
ON "user_activity_event"("activitySessionId", "createdAt");

CREATE INDEX "user_activity_event_eventType_createdAt_idx"
ON "user_activity_event"("eventType", "createdAt");

CREATE INDEX "user_activity_event_path_idx"
ON "user_activity_event"("path");

ALTER TABLE "user_login_log"
ADD CONSTRAINT "user_login_log_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "user"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_activity_session"
ADD CONSTRAINT "user_activity_session_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "user"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_page_view"
ADD CONSTRAINT "user_page_view_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "user"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_page_view"
ADD CONSTRAINT "user_page_view_activitySessionId_fkey"
FOREIGN KEY ("activitySessionId") REFERENCES "user_activity_session"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_activity_event"
ADD CONSTRAINT "user_activity_event_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "user"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_activity_event"
ADD CONSTRAINT "user_activity_event_activitySessionId_fkey"
FOREIGN KEY ("activitySessionId") REFERENCES "user_activity_session"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_activity_event"
ADD CONSTRAINT "user_activity_event_pageViewId_fkey"
FOREIGN KEY ("pageViewId") REFERENCES "user_page_view"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
