import React, { useState, useEffect } from 'react';

const Gallery: React.FC = () => {
  const role = localStorage.getItem('role')
  const [showPopup, setShowPopup] = useState(false);
  const [urlmage, setUrlmage] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<any[]>([]);

  const GRAPHQL_ENDPOINT = 'http://localhost:5000/graphql'; 

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSave = async () => {
    if (!urlmage || !description) {
      alert('Please fill in all fields');
      return;
    }

    const mutation = `
      mutation {
        addImage(urlmage: "${urlmage}", description: "${description}")
      }
    `;

    try {
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: mutation }),
      });

      const result = await response.json();
      if (result.data.addImage === 'done') {
        setUrlmage('');
        setDescription('');
        togglePopup();
        fetchImages();
      } else {
        alert('Failed to save image');
      }
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Error saving image');
    }
  };

  const fetchImages = async () => {
    const query = `
      query {
        getAllImage {
          id
          urlmage
          description
        }
      }
    `;
    try {
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();
      setImages(result.data.getAllImage);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []); 

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-white">Gallery</h1>
      {role === 'admin' &&<button
        onClick={togglePopup}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 focus:outline-none"
      >
        Add Image
      </button>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {images.map((image: any) => (
          <div key={image.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img
              src={image.urlmage}
              alt={image.description}
              className="w-full h-48 object-cover mb-2"
            />
            <p className="text-white text-sm p-2">{image.description}</p>
          </div>
        ))}
      </div>


      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Image</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={urlmage}
                onChange={(e) => setUrlmage(e.target.value)}
                placeholder="Enter image URL"
                className="w-full p-2.5 text-sm rounded-lg border bg-gray-700 text-gray-300 border-gray-600 focus:ring-4 focus:ring-gray-600 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-full p-2.5 text-sm rounded-lg border bg-gray-700 text-gray-300 border-gray-600 focus:ring-4 focus:ring-gray-600 focus:outline-none"
              ></textarea>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={togglePopup}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 focus:outline-none"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
