import ContentDetailShareButton from '@/app/_components/content-detail/share-button';

/** 기존 import 경로를 사용하는 화면을 위한 호환 컴포넌트입니다. */
export default function CasesShare({ title = '치료 사례' }: { title?: string }) {
  return <ContentDetailShareButton title={title} ariaLabel="치료 사례 공유하기" />;
}
