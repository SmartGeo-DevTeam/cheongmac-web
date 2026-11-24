import type { LucideIcon } from 'lucide-react';
import type { ReactElement } from 'react';

type FooterCardTitleProps = {
  icon: LucideIcon;
  title: string;
};

export default function FooterCardTitle({
  icon: Icon,
  title,
}: FooterCardTitleProps): ReactElement {
  return (
    <div className="flex items-center gap-1">
      <Icon
        className="shrink-0 size-6
        xl:size-7"
      />
      <h4
        className="font-medium text-xl
        xl:text-2xl"
      >
        {title}
      </h4>
    </div>
  );
}
