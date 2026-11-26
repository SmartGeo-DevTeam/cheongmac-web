import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import { thrombosisMechanismContent } from '@/app/_data/vascular/venous/thrombosis/mechanism/content';
import Image from 'next/image';

type ThrombosisMechanismProps = {
  id: string;
};

export default function ThrombosisMechanism({ id }: ThrombosisMechanismProps) {
  const { label, title, emphasizedTitle, image, paragraphs } =
    thrombosisMechanismContent;

  return (
    <section id={id}>
      <div>
        <Inner>
          <SectionHeading
            mtVariant="lg"
            label={label}
            labelVariant="accent"
            title={
              <>
                {title}
                <br />
                <b>{emphasizedTitle}</b>
              </>
            }
          />

          <div
            className={`mt-5 grid
              xl:mt-25 xl:grid-cols-2 xl:justify-center xl:items-center xl:gap-10`}
          >
            <div
              className={`relative w-full aspect-350/465 rounded-xl overflow-clip border border-default
                xl:rounded-[20px]`}
            >
              <Image src={image.src} alt={image.alt} fill />
            </div>
            <div
              className={`mt-5 space-y-2 text-mo-body-1 text-secondary
                xl:space-y-5 xl:text-pc-body-1`}
            >
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Inner>
      </div>
    </section>
  );
}
