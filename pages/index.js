import Footer from '../components/Footer';
import Layout from '../components/Layout';
import TagSlider from '../components/slider/TagSlider';
import VideoList from '../components/videos/VideoList';

export default function Home() {
  return (
    <>
      <Layout>
        <div className="p-3">
          <TagSlider />
          <VideoList />
        </div>
        <Footer />
      </Layout>
    </>
  );
}
