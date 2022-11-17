import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import TagSlider from '../components/slider/TagSlider';
import VideoList from '../components/videos/VideoList';
import axios from 'axios';
import Cookies from 'js-cookie';
import { apilink } from '../utils/data';
import { useRouter } from 'next/router';

export default function Home({
  login,
  userInfo,
  allvideo,
  trendVideo,
  alltags,
  error,
}) {
  // console.log(alltags);
  // console.log(userInfo);
  useEffect(() => {
    if (!login) {
      Cookies.remove('_showbox_access_user_tokon_');
      localStorage.removeItem('_showbox_access_user_login');
      console.clear();
      window.location.href = `/login`;
    }
  }, []);

  if (error) {
    return (
      <>
        <Layout>
          <div className="account p-3">
            <div className="mt-4">
              <h4 className="text-danger">Something Wrong...</h4>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  const [allFavVideo, setAllFavVideo] = useState(allvideo);

  let arraytag = alltags.map((val) => val.tags).flat();
  // console.log(arraytag);
  let tagsArray = [...new Set(arraytag)];
  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  // console.log(tagsArray);

  const router = useRouter();
  // console.log();

  useEffect(() => {
    if (Object.keys(router.query).length == 0) {
      setAllFavVideo(allvideo);
    } else {
      setAllFavVideo(allvideo.filter((v) => v.tags.includes(router.query.tag)));
    }
  }, [router.query.tag]);

  return (
    <>
      <Layout>
        <div className="p-3">
          <TagSlider tagsArray={tagsArray} />
          <VideoList trendVideo={trendVideo} allvideo={allFavVideo} />
        </div>
        <Footer />
      </Layout>
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const tokon = req.cookies._showbox_access_user_tokon_
    ? req.cookies._showbox_access_user_tokon_
    : null;
  const ress = await axios.get(`${apilink}/auth/isVerify`, {
    headers: {
      Authorization: tokon,
    },
  });

  try {
    const resvideo = await axios.get(`${apilink}/api/user/getAllFavVideo`, {
      headers: {
        Authorization: tokon,
      },
    });
    const trenvideo = await axios.get(`${apilink}/api/user/getTrendingVideo`, {
      headers: {
        Authorization: tokon,
      },
    });
    const tagss = await axios.get(`${apilink}/api/user/getAllTags`, {
      headers: {
        Authorization: tokon,
      },
    });
    function shuffle(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    }

    let bestvedios = shuffle(resvideo.data.allvideo);
    // console.log(tagss.data.tags);

    // console.log(trenvideo.data);

    // console.log(resvideo.data);

    let tagArray = tagss.data.tags?.filter((v) => v != null);

    return {
      props: {
        login: ress.data.success,
        userInfo: ress.data.userInfo || [],
        allvideo: bestvedios || [],
        trendVideo: trenvideo.data.allvideo || [],
        alltags: tagArray || [],
        error: false,
      },
    };
  } catch (err) {
    return {
      props: {
        login: ress.data.success,
        userInfo: [],
        allvideo: [],
        trendVideo: [],
        alltags: [],
        error: true,
      },
    };
  }
};
