import React from 'react';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import CardVideo from '../components/videos/CardVideo';

const liked_video = () => {
  return (
    <Layout>
      <div className="p-3">
        <br />
        <p>
          <b>Liked Video</b>
        </p>
        <CardVideo />
      </div>
      <Footer />
    </Layout>
  );
};

export default liked_video;
