import React, { useState, useEffect } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
 const [accessKey, setAccessKey] = useState('');
 const [token, setToken] = useState('');
 const [storeAddress, setStoreAddress] = useState('');
 const [shippingData, setShippingData] = useState([
    { distanceFrom: '', distanceTo: '', shippingRate: '' },
  ]);
 const [selectedDays, setSelectedDays] = useState({
    sunday: true,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });

  const [selectedPeriods, setSelectedPeriods] = useState({
    am: false,
    pm: false,
  });
 const [dateFields, setDateFields] = useState([]);
 //Login system
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // New state variable

  
  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch('https://balloontown-node.vercel.app/getSettings'); // Modify this endpoint as needed
        const data = await response.json();

        if (response.ok) {
          setAccessKey(data.access_key);
          setToken(data.token);
          setStoreAddress(data.storeAddress || ''); // Initialize storeAddress
          setShippingData(data.shippingData || []);
          setSelectedDays(data.selectedDays || {});
          setSelectedPeriods(data.selectedPeriods || {});
          setDateFields(data.dateFields || {});
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

  const handleLogin = async() => {
    try {
      const response = await fetch('https://balloontown-node.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setLoggedIn(true); // Set loggedIn to true upon successful login
        toast.success(data.message, {
          position: 'top-center',
          autoClose: 3000,
        });
      } else {
        toast.error(data.message, {
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
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = {
    access_key: accessKey,
    token: token,
    shippingData: shippingData,
    storeAddress: storeAddress,
    selectedDays: selectedDays,
    selectedPeriods: selectedPeriods,
    dateFields:dateFields,
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

const handleDayCheckboxChange = (day) => {
    setSelectedDays((prevSelectedDays) => ({
      ...prevSelectedDays,
      [day]: !prevSelectedDays[day],
    }));
  };
const handlePeriodCheckboxChange = (period) => {
    setSelectedPeriods((prevSelectedPeriods) => ({
      ...prevSelectedPeriods,
      [period]: !prevSelectedPeriods[period],
    }));
  };

 
  const handleAddDateField = () => {
    setDateFields([...dateFields, '']);
  };

  const handleDateFieldChange = (index, value) => {
    const updatedDateFields = [...dateFields];
    updatedDateFields[index] = value;
    setDateFields(updatedDateFields);
  };

  const handleRemoveDateField = (index) => {
    const updatedDateFields = dateFields.filter((_, i) => i !== index);
    setDateFields(updatedDateFields);
  };
  if(loggedIn){
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">  
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
                <div className="mb-3">
                  <label htmlFor="storeAddress" className="form-label">
                    Store Address:
                  </label>
                  <textarea
                    className="form-control"
                    id="storeAddress"
                    value={storeAddress}
                    onChange={(e) => setStoreAddress(e.target.value)}
                  />
                </div>
                <div>
                  <h4>Shipping Rates By Distance</h4>
                  {shippingData.map((data, index) => (
                    <div key={index} className="mb-3">
                      <div className="row">
                        <div className="col-4">
                           <label>Distance From (Km):</label>
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
                      <label>Distance To (Km):</label>
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
                      <label>Shipping Rate (AU$):</label>
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
                <hr />
                <div className="mb-3 mt-5">
                  <h2>Delivery Date Settings</h2>
                  <h4>Block Weekdays</h4>
                
                  {Object.keys(selectedDays).map((day) => (
                    <div key={day} className="form-check-inline">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={day}
                        checked={selectedDays[day]}
                        onChange={() => handleDayCheckboxChange(day)}
                      />
                      <label className="form-check-label" htmlFor={day}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mb-3">
                  <h4>Block Same Day Period</h4>
                  {Object.keys(selectedPeriods).map((period) => (
                    <div key={period} className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={period}
                        checked={selectedPeriods[period]}
                        onChange={() => handlePeriodCheckboxChange(period)}
                      />
                      <label className="form-check-label" htmlFor={period}>
                        {period.toUpperCase()}
                      </label>
                    </div>
                  ))}
                </div>
                 
                <div className="mb-3">
                  <h4>Block Dates</h4>
                  <div className="row">
                    <div className="col-6 offset-md-3">
                      {dateFields.map((date, index) => (
                    
                        <div className="row mb-5">
                          <div className="col-8">
                          
                              <input
                                type="date"
                                className="form-control"
                                value={date}
                                onChange={(e) => handleDateFieldChange(index, e.target.value)}
                              />
                          </div>
                           <div className="col-4">
                             <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleRemoveDateField(index)}
                      >
                        Remove
                      </button>
                          </div>
                          
                     
                      
                    </div>  
                    ))}
                 </div>
                 </div>
                  <button type="button" className="btn btn-primary" onClick={handleAddDateField}>
                    Add Date Field
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
else
{
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Login Form</h3>
              {loggedIn ? (
                /* Render content when logged in */
                <div>
                  <h4>Welcome, {username}!</h4>
                  {/* Add your content here */}
                </div>
              ) : (
                /* Render login form when not logged in */
                <div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleLogin}>
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>);
}
}

export default App;
