type CaseCategoryBadgeProps = {
  label: string;
  className?: string;
};

/** 치료 사례 목록과 진료 페이지에서 공유하는 진료분야 배지입니다. */
export default function CaseCategoryBadge({
  label,
  className = '',
}: CaseCategoryBadgeProps) {
  return (
    <span
      className={`inline-block rounded-lg bg-ai-subtle px-2.5 py-1.5 text-[14px] font-semibold text-brand xl:text-[18px] ${className}`}
    >
      {label}
    </span>
  );
}
