import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import CircularStatic from '../components/videos/UploadProgress';

const upload_video = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [thumbnail, setThumbnail] = useState([]);
  const [video, setVideo] = useState([]);
  const [visibility, setVisibility] = useState(true);

  const onVideoUpload = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Layout>
        <div>
          <div className="p-3 upload_video">
            <div className="row">
              <div className="col-lg-8 col-md-10 col-12 mx-auto mb-2">
                <div className="card p-3">
                  <h5 className="fn_Col">Upload Your Video</h5>
                  <hr />
                  <form action="" onSubmit={onVideoUpload}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        placeholder="Write Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        maxLength={100}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="Write Description"
                        name="description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="tags"
                        placeholder="Write Tags (Like Video,Music,Song)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="">Visibility</label>
                      <select
                        className="form-control"
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value)}
                      >
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </select>
                    </div>
                    <label htmlFor="">Upload Thumbnail</label>
                    <div className="form-group ">
                      <input
                        type="file"
                        className="form-control"
                        name="thumbnail"
                        style={{ paddingBottom: '35px' }}
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.files[0])}
                        required
                      />
                    </div>
                    <label htmlFor="">Upload Video</label>
                    <div className="form-group ">
                      <input
                        type="file"
                        className="form-control "
                        style={{ paddingBottom: '35px' }}
                        name="video"
                        value={video}
                        onChange={(e) => setVideo(e.target.files[0])}
                        required
                      />
                    </div>
                    <br />
                    <div className="text-center">
                      <button className="btn btn-primary">Upload Video</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="upload_progress">
            <CircularStatic className="ml-5" uploadPercentage={10} />
            <p className="m-0">X</p>
          </div>
        </div>

        <Footer />
      </Layout>
    </>
  );
};

export default upload_video;
