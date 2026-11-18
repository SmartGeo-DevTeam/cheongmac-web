import MaskedName from '@/app/_components/common/masked-name';

type CasePatientMetaProps = {
  patient?: string;
  views?: number;
  age?: number;
  sex?: '남성' | '여성';
  className?: string;
};

/** views가 필요 없는 진료 페이지에서는 생략할 수 있습니다. */
export default function CasePatientMeta({
  patient,
  views,
  age,
  sex,
  className = '',
}: CasePatientMetaProps) {
  if (!patient && views == null && age == null && !sex) return null;

  return (
    <div
      className={`flex min-w-0 flex-wrap items-center gap-1 text-tertiary text-mo-body-2
        [&>span+span]:inline-flex [&>span+span]:items-center
        [&>span+span]:before:mr-1 [&>span+span]:before:size-1
        [&>span+span]:before:shrink-0 [&>span+span]:before:rounded-full
        [&>span+span]:before:bg-default
        xl:gap-1.5 xl:text-[18px]
        xl:[&>span+span]:before:mr-1.5 xl:[&>span+span]:before:size-1.5 ${className}`}
    >
      {patient && <MaskedName name={patient} />}
      {views != null && <span>{views}회</span>}
      {age != null && <span>{age}세</span>}
      {sex && <span>{sex}</span>}
    </div>
  );
}
