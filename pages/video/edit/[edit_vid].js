import React, { useState } from 'react';
import Footer from '../../../components/Footer';
import Layout from '../../../components/Layout';
const Edit_vid = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const [visibility, setVisibility] = useState(true);

  const onVideoUpload = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Layout>
        <div className="p-3 upload_video">
          <div className="row">
            <div className="col-lg-8 col-md-10 col-12 mx-auto mb-2">
              <div className="card p-3">
                <h5 className="fn_Col">Update Your Video</h5>
                <hr />
                <form action="" onSubmit={onVideoUpload}>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="title"
                      placeholder="Write Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      maxLength={100}
                    />
                  </div>
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      placeholder="Write Description"
                      name="description"
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="tags"
                      placeholder="Write Tags (Like Video,Music,Song)"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label htmlFor="">Visibility</label>
                    <select
                      class="form-control"
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value)}
                    >
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>
                  </div>

                  <br />
                  <div className="text-center">
                    <button className="btn btn-primary">Save Video</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default Edit_vid;
