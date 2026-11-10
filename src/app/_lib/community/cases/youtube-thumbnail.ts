import type { CasePost } from '@/app/_data/community/cases/cases';

/** 클라이언트와 서버가 공유하는 YouTube 영상 ID 및 공개 썸네일 유틸리티. */
export function isYouTubeVideoId(value: unknown): value is string {
  return typeof value === 'string' && /^[A-Za-z0-9_-]{11}$/.test(value);
}

/** YouTube 서버가 아닌 임의 주소를 Image에 전달하지 않도록 제한합니다. */
export function isYouTubeThumbnailUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' &&
      (url.hostname === 'i.ytimg.com' || url.hostname === 'img.youtube.com');
  } catch {
    return false;
  }
}

export function getInterviewThumbnail(
  post: Extract<CasePost, { kind: 'interviews' }>,
): string | undefined {
  if (!isYouTubeVideoId(post.youtubeId)) return undefined;
  if (isYouTubeThumbnailUrl(post.youtubeThumbnailUrl)) {
    return post.youtubeThumbnailUrl;
  }
  // API 키가 없더라도 영상 ID만 등록하면 기본 썸네일을 표시합니다.
  // maxresdefault는 없는 영상도 있으므로 hqdefault를 기본으로 사용합니다.
  return `https://i.ytimg.com/vi/${post.youtubeId}/hqdefault.jpg`;
}
