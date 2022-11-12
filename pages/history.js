import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import CardVideo from '../components/videos/CardVideo';

const abc = () => {
  const r = useRouter();
  // console.log(r);
  return (
    <>
      <Layout>
        <div className="p-3">
          <br />
          <p>
            <b>History</b>
          </p>
          <CardVideo />
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default abc;
