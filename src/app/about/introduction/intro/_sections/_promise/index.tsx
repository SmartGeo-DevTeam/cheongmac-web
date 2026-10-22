import Inner from '@/app/_components/common/inner';
import PromiseItem from './_components/promise-item';
import { promiseItems } from './data';

export default function Promise() {
  return (
    <section id="introduction-intro-promise">
      <div
        className="mt-5
        xl:my-30"
      >
        <Inner>
          <div
            className="pt-20 pb-11 rounded-[20px] bg-[url('/introduction/intro/promise-m.png')] bg-cover bg-center bg-no-repeat text-white
          xl:py-40 xl:bg-[url('/introduction/intro/promise-pc.png')]"
          >
            <div className="px-5 text-center space-y-1">
              <p
                className="text-mo-body-1
              xl:text-pc-body-1"
              >
                대한민국 혈관특별시 그 중심에서
              </p>
              <h2
                className="text-mo-title-1

            xl:text-pc-title-1"
              >
                청맥이 드리는 약속
              </h2>
            </div>

            <ul
              className="mt-5 px-5
            xl:mt-20 xl:px-21 xl:grid xl:grid-cols-3 xl:gap-5"
            >
              {promiseItems.map((promise) => (
                <PromiseItem
                  key={promise.id}
                  order={promise.order}
                  description={promise.description}
                />
              ))}
            </ul>
          </div>
        </Inner>
      </div>
    </section>
  );
}
