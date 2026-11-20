/** 여러 진료 페이지가 공유하는 의료진 소개 콘텐츠의 구조입니다. */
export type ClinicSpecialistLink = {
  id: string;
  title: string;
  href: string;
};

export type ClinicSpecialistsContent = {
  label: string;
  title: {
    intro: string;
    emphasis: readonly string[];
  };
  description: string;
  links: readonly ClinicSpecialistLink[];
};

/** 공통 의료진 UI에 전달하는 표시용 데이터입니다. */
export type ClinicSpecialistData = {
  id: string;
  name: string;
  imageSrc: string;
  specialistTitle: string;
  detailHref: string;
};
