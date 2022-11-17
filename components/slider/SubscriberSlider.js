import React from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import SubScribeView from '../SubScribeView';

const SubscriberSlider = ({ notify, subscribedList }) => {
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
          {subscribedList?.map((val, ind) => {
            return (
              <SwiperSlide key={ind}>
                <SubScribeView notify={notify} channelid={val} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default SubscriberSlider;
