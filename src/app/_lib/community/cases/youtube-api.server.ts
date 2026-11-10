import 'server-only';
import type { CasePost } from '@/app/_data/community/cases/cases';
import { isYouTubeThumbnailUrl, isYouTubeVideoId } from './youtube-thumbnail';

type Thumbnail = { url?: string };
type VideoResource = {
  id?: string;
  snippet?: {
    thumbnails?: Record<string, Thumbnail>;
  };
};
type YouTubeVideosResponse = { items?: VideoResource[] };

function pickThumbnail(video: VideoResource): string | undefined {
  const images = video.snippet?.thumbnails;
  if (!images) return undefined;
  for (const size of ['maxres', 'standard', 'high', 'medium', 'default']) {
    const url = images[size]?.url;
    if (isYouTubeThumbnailUrl(url)) return url;
  }
  return undefined;
}

/**
 * 서버 전용. YOUTUBE_API_KEY를 설정하면 YouTube Data API videos.list에서
 * 영상 썸네일을 일괄 조회합니다. API 장애/키 부재 시에도 목록이 깨지지 않으며,
 * 클라이언트의 getInterviewThumbnail()이 영상 ID 기반 주소로 대체합니다.
 */
export async function attachYouTubeThumbnails(
  posts: readonly CasePost[],
): Promise<CasePost[]> {
  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
  if (!apiKey) return [...posts];

  const ids = [...new Set(
    posts
      .filter((post) => post.kind === 'interviews')
      .map((post) => post.youtubeId)
      .filter(isYouTubeVideoId),
  )];
  if (ids.length === 0) return [...posts];

  const thumbnailById = new Map<string, string>();
  // videos.list는 한 요청에 최대 50개의 ID를 조회할 수 있습니다.
  for (let start = 0; start < ids.length; start += 50) {
    const url = new URL('https://www.googleapis.com/youtube/v3/videos');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('id', ids.slice(start, start + 50).join(','));
    url.searchParams.set('key', apiKey);

    try {
      const response = await fetch(url.toString(), {
        next: { revalidate: 60 * 60 },
      });
      if (!response.ok) continue;
      const result = (await response.json()) as YouTubeVideosResponse;
      for (const item of result.items ?? []) {
        if (!isYouTubeVideoId(item.id)) continue;
        const thumb = pickThumbnail(item);
        if (thumb) thumbnailById.set(item.id, thumb);
      }
    } catch {
      // 외부 API 장애 시에도 게시글 목록은 계속 렌더링합니다.
    }
  }

  return posts.map((post) =>
    post.kind === 'interviews' && post.youtubeId && thumbnailById.has(post.youtubeId)
      ? { ...post, youtubeThumbnailUrl: thumbnailById.get(post.youtubeId) }
      : post,
  );
}
