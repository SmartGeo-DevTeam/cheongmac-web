/** UI용 사례 타입. doctorId는 기존 의료진 데이터의 id를 참조합니다. */
export type ArterialBestCase = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  treatment: string;
  doctorId: string;
};
