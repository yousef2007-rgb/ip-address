import './App.css';
import arrowIcon from './images/icon-arrow.svg';
import {useEffect,useState,useRef} from 'react';
import {MapContainer,TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import pointer from '../src/images/icon-location.svg';
import L from 'leaflet'
function App() {
  const [IpAdress, fetchIpAdress] = useState([]);
  const mapRef = useRef();
  const [IpInformation, fetchIpInformation] = useState({
    ip:'Loading',
    location:{
      city:'Loading',
      country:'Loading',
      timezone:'Loading',
      postalcode:'Loading',
      lat:0,
      lng:-0.09
    },
    isp:'Loading'
  });
  const [center, setCenter] = useState([IpInformation.location.lat, IpInformation.location.lng]);
  const [inputValue, setInputValue] = useState("");
  const getData = (IpAdress) =>{
    
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_AktzFzB2DzKkByWDRnqF5U9i9iKJV&ipAddress=${IpAdress}`)
    .then((res) => res.json())
    .then((res) => {
      if(res.code != 422){
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
  var markerIcon = L.icon({
    iconUrl: pointer,
    iconSize: [46, 56], 
    iconAnchor: [23, 55],
  });
  
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
      <MapContainer ref={mapRef} center={[IpInformation.location.lat, IpInformation.location.lng]}  zoom={13}  key={`${IpInformation.location.lat}${IpInformation.location.lng}`}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={[IpInformation.location.lat, IpInformation.location.lng]} icon={markerIcon}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
        </Marker>
      </MapContainer>
      </div>
      <div className='outputSection'>
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
  );
}
/*
      <MapContainer
        center={[IPdata.location?.lat, IPdata.location?.lng]}
        zoom={13}
        scrollWheelZoom={true}
        key={`${IPdata.location?.lat}${IPdata.location?.lng}`}
      >

*/
export default App;
