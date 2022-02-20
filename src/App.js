import './App.css';
import arrowIcon from './images/icon-arrow.svg';
import {useEffect,useState} from 'react';
import {MapContainer,TileLayer, Marker, Popup} from 'react-leaflet';
import pointer from '../src/images/icon-location.svg';
function App() {
  const [IpAdress, fetchIpAdress] = useState([]);
  const [IpInformation, fetchIpInformation] = useState({
    ip:'Loading',
    location:{
      city:'Loading',
      country:'Loading',
      timezone:'Loading',
      postalcode:'Loading'
    },
    isp:'Loading'
  });
  const [inputValue, setInputValue] = useState("");
  const getData = (IpAdress) =>{
    
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_AktzFzB2DzKkByWDRnqF5U9i9iKJV&ipAddress=${IpAdress}`)
    .then((res) => res.json())
    .then((res) => {
      if(res.code != 422){
        console.log(res)
        fetchIpInformation(res)
      }else{
        alert('the ip address you enterd is wrong');
      }
    });
  
  }
  const getIp = () => {
    fetch('https://api.ipify.org/?format=json')
      .then((res) => res.json())
      .then((res) => {
        console.log(res.ip)
        fetchIpAdress(res.ip)
      });
  }
  
  useEffect(() => {
    getIp();
    getData(IpAdress);
  }, {});
  const changeInput = (event) => {
    setInputValue(event.target.value);
  }
  const handleKeypress = (event) => {
    if (event.charCode === 13) {
      getData(inputValue)
    }
  }; 
  const position = [51.505, -0.09]
  return (
    <div className="App">
      <div className='inputSection'>
      <h1>IP Address Trakcer</h1>
      <div className='inputContainer'>
        <input type="text" placeholder='Search for any IP address or domain' onKeyPress={handleKeypress} onChange={changeInput}/>
        <div onClick={()=>{getData(inputValue)}} className='submitBtn'>
          <img src={arrowIcon} alt="arrow icon" />
        </div>
      </div>
      </div>
     <div id='map'>
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
        </Marker>
      </MapContainer>
      </div>
      <div className='outputSection'>
        <div className='fuck'>
        <div className='information'>
          <span>ip address</span>
          <p>{IpInformation.ip}</p>
        </div>
        <div className='information'>
          <span>location</span>
          <p>{IpInformation.location.city},{IpInformation.location.country},{IpInformation.location.postalcode}</p>
        </div>
        <div className='information'>
          <span>timezone</span>
          <p>{IpInformation.location.timezone}</p>
        </div>
        <div className='information'>
          <span>ISP</span>
          <p>{IpInformation.isp}</p>
        </div>
      </div>
      </div>
     
    </div>
  );
}

export default App;
