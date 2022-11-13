import React from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';

const SubscriberSlider = () => {
  SwiperCore.use([Autoplay]);
  return (
    <>
      <div className="subscriber_slider">
        <Swiper
          modules={[Autoplay]}
          grabCursor={true}
          spaceBetween={15}
          slidesPerView={'auto'}
          // loop={true}
          //   autoplay={{ delay: 3000 }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 89, 9, 1, 2, 5, 5, 5, 6]?.map((val, ind) => {
            return (
              <SwiperSlide key={ind}>
                <Link href="/">
                  <a>
                    <img
                      src="https://static-cse.canva.com/blob/951430/1600w-wK95f3XNRaM.jpg"
                      alt=""
                      className="subscriber_img"
                    />
                  </a>
                </Link>
                <p className="m-0 fn_10">Atanu Jana</p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default SubscriberSlider;
