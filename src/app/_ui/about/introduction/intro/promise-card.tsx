type PromiseItemProps = {
  order: string;
  description: string;
};

export default function IntroductionIntroPromiseCard({ order, description }: PromiseItemProps) {
  return (
    <li
      className="px-8 py-5 border-b border-b-gray-50/50 last:border-b-0
      xl:px-15 xl:py-12 xl:space-y-2 xl:border-0 xl:rounded-lg xl:bg-white/90"
    >
      <p
        className="text-mo-heading-1 text-accent-ai
        xl:text-pc-heading-1 xl:text-accent-ai-strong"
      >
        {order}
      </p>
      <p
        className="text-mo-body-2 text-inverse
        xl:text-primary xl:text-pc-body-1"
      >
        {description}
      </p>
    </li>
  );
}
