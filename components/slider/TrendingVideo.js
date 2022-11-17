import Link from 'next/link';
import React from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const trendingV = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
const TrendingVideo = ({ trendVideo }) => {
  SwiperCore.use([Autoplay]);
  return (
    <div className="trendingVideo">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={5}
        slidesPerView={'auto'}
        loop={true}
        autoplay={{ delay: 3000 }}
      >
        {trendVideo?.map((val, ind) => {
          return (
            <SwiperSlide key={ind}>
              <Link href={`/video/${val._id}`}>
                <a>
                  <img src={val.channelthumb} alt="" />
                  <div className="overlay">
                    <div>
                      <i className="fa fa-play-circle" aria-hidden="true"></i>
                    </div>
                  </div>
                </a>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TrendingVideo;
