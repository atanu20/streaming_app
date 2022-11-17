import { useRouter } from 'next/router';
import React from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const tags = [
  'Cricket',
  'Music',
  'Coding',
  'C Programming',
  'Web Development',
  'Cloud Compuitng',
  'Pubg',
  'Banana',
  'Orange',
  'Apple',
  'Mango',
];

const TagSlider = ({ tagsArray }) => {
  const router = useRouter();

  // console.log(router);

  SwiperCore.use([Autoplay]);
  const searchQuery = (v) => {
    // router.replace({
    //   query: { tag: v },
    // });
    window.location.replace(`?tag=${v.toLowerCase()}`);
  };
  return (
    <div className="mt-2 mb-2 tags">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={'auto'}
        // loop={true}
        //   autoplay={{ delay: 3000 }}
      >
        <SwiperSlide>
          <p
            className={
              Object.keys(router.query).length == 0 && 'fn_col font-weight-bold'
            }
            onClick={() => router.push('/')}
          >
            All
          </p>
        </SwiperSlide>

        {tagsArray?.map((val, ind) => {
          return (
            <SwiperSlide key={ind}>
              <p
                className={
                  router.query.tag === val.toLowerCase() &&
                  'fn_col font-weight-bold'
                }
                onClick={() => searchQuery(val)}
              >
                {val}
              </p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TagSlider;
