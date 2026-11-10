import Inner from '@/app/_components/common/inner';
import ConsultationForm from '@/app/_ui/community/consultation/write/consultation-form';

const guidance = [
  '공개글 등록 시 이름은 일부 가림 처리되어 노출됩니다.',
  '검사 결과 등 특정 정보 분석이 필요한 문의는 답변이 제한될 수 있습니다.',
  '광고성 글·비방글·중복 게시물은 사전 고지 없이 삭제될 수 있습니다.',
  '게시글 수정·삭제 시 비밀번호 입력이 필요합니다.',
  '상담 내용의 저작권은 본원에 귀속되며, 네이버 지식iN 등 외부 채널에 공유될 수 있습니다.',
];


export default function ConsultationWriteContent() {
  return (
    <>
      <section id="community-consultation-write-notice">
        <Inner>
          <div
            className="mt-5
            xl:mt-10 xl:px-50"
          >
            <div
              className="px-4 py-5 rounded-xl bg-gray-50
              xl:px-21 xl:py-10 xl:rounded-[20px]"
            >
              <ul
                className="mt-2.5 px-4 space-y-2.5 text-gray-700 text-[12px]
                xl:mt-5 xl:space-y-2 xl:font-medium xl:text-[16px]"
              >
                {guidance.map((text) => (
                  <li
                    key={text}
                    className="relative pl-2
                  before:absolute before:left-0 before:top-2.5 before:size-0.5 before:rounded-full before:bg-gray-700"
                  >
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Inner>
      </section>

      <section id="community-consultation-write">
        <Inner>
          <ConsultationForm />
        </Inner>
      </section>
    </>
  );
}
