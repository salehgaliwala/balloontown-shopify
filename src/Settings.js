import React, { useState, useEffect } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
 const [accessKey, setAccessKey] = useState('');
  const [token, setToken] = useState('');
  const [shippingData, setShippingData] = useState([
    { distanceFrom: '', distanceTo: '', shippingRate: '' },
  ]);


  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch('https://balloontown-node.vercel.app/getSettings'); // Modify this endpoint as needed
        const data = await response.json();

        if (response.ok) {
          setAccessKey(data.access_key);
          setToken(data.token);
          setShippingData(data.shippingData || []);
        } else {
          toast.error('Error fetching settings', {
            position: 'top-center',
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    }

    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = {
    access_key: accessKey,
    token: token,
    shippingData: shippingData,
  };
  try {
    const response = await fetch('https://balloontown-node.vercel.app/saveSettings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
       body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast.success('Settings saved successfully!', {
        position: 'top-center',
        autoClose: 3000,
      });
    } else {
      toast.error('Error saving settings', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('An error occurred', {
      position: 'top-center',
      autoClose: 3000,
    });
  }
};
const handleAddShippingData = () => {
    setShippingData([...shippingData, { distanceFrom: '', distanceTo: '', shippingRate: '' }]);
  };

  const handleShippingDataChange = (index, field, value) => {
    const updatedShippingData = [...shippingData];
    updatedShippingData[index][field] = value;
    setShippingData(updatedShippingData);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">  
          <div className="card">
            <div className="card-body">
             
              <form onSubmit={handleSubmit}>
                <h3 className="card-title">Shopify Keys</h3>
                <div className="mb-3">
                  <label htmlFor="accessKey" className="form-label">
                    Access Key:
                  </label>
                   <input
                    type="text"
                    className="form-control"
                    id="accessKey"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="token" className="form-label">
                    Token:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                  />
                </div>
                <div>
                  <h4>Shipping Data</h4>
                  {shippingData.map((data, index) => (
                    <div key={index} className="mb-3">
                      <div className="row">
                        <div className="col-4">
                           <label>Distance From:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={data.distanceFrom}
                        onChange={(e) =>
                          handleShippingDataChange(index, 'distanceFrom', e.target.value)
                        }
                      />
                        </div>
                     <div className="col-4">
                      <label>Distance To:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={data.distanceTo}
                        onChange={(e) =>
                          handleShippingDataChange(index, 'distanceTo', e.target.value)
                        }
                      />
                      </div>
                      <div className="col-4">
                      <label>Shipping Rate:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={data.shippingRate}
                        onChange={(e) =>
                          handleShippingDataChange(index, 'shippingRate', e.target.value)
                        }
                      />
                    </div>
                    </div>
                    </div>
                  ))}
                  <button type="button" className="btn btn-primary" onClick={handleAddShippingData}>
                    Add
                  </button>
                </div>
                <button type="submit" className="btn btn-primary">
                  Save Settings
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
        <ToastContainer />
    </div>
    
  );
}

export default App;
