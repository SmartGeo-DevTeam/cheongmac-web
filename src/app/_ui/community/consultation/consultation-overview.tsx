import Inner from '@/app/_components/common/inner';
import { CircleAlertIcon } from 'lucide-react';
import ConsultationBoard, {
  type ConsultationFilters,
} from '@/app/_ui/community/consultation/consultation-board';
import { consultationCategories, consultationItems } from '@/app/_data/community/consultation/consultations';


type SearchParams = {
  category?: string | string[];
  q?: string | string[];
  page?: string | string[];
};

export default async function ConsultationOverview({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = typeof params.page === 'string' ? Number(params.page) : 1;
  const initialFilters: ConsultationFilters = {
    category:
      consultationCategories.find((item) => item.id === params.category)?.id ??
      'all',
    query: typeof params.q === 'string' ? params.q : '',
    page: Number.isSafeInteger(page) && page > 0 ? page : 1,
  };

  return (
    <>
      <section id="community-consultation-notice">
        <Inner>
          <div
            className="mt-5
            xl:mt-10 xl:px-50"
          >
            <div
              className="px-4 py-5 rounded-xl bg-[#E3F3EF]
              xl:px-21 xl:py-10 xl:rounded-[20px]"
            >
              <div className="flex justify-center">
                <CircleAlertIcon
                  strokeWidth={3}
                  className="size-4.5 rounded-full bg-green-600 stroke-white [&>circle]:stroke-transparent
                  xl:size-6"
                />
              </div>
              <ul
                className="mt-2.5 px-4 space-y-2.5 text-[12px]
                xl:mt-5 xl:space-y-5 xl:font-medium xl:text-[16px]"
              >
                <li>
                  ① 본 상담은 진료를 돕기 위한 보조적인 수단이며, 의료진의
                  직접적인 대면 진료를 대신할 수 없습니다. 정확한 진단과 치료
                  계획은 반드시 병원 내원을 통해 확인하시기 바랍니다.
                </li>
                <li>
                  ② 현직 전문의가 진료와 병행해 직접 답변을 작성하므로, 답변
                  완료까지 일정 시간이 소요될 수 있습니다. 신속함보다는 정확하고
                  깊이 있는 답변을 드리기 위함이니 너그러운 양해 부탁드립니다.
                </li>
                <li>
                  ③ 개인정보(성명, 연락처, 환자번호 등)가 포함된 문의나 민감한
                  상담 내용은 비공개 게시물로 작성해 주시기 바랍니다.
                </li>
              </ul>
            </div>
          </div>
        </Inner>
      </section>

      <section id="community-consultation-list">
        <ConsultationBoard
          items={consultationItems}
          initialFilters={initialFilters}
        />
      </section>
    </>
  );
}
