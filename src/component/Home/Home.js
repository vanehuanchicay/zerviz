import React, { useState } from 'react';
import { saveAs } from "file-saver";
import country from '../../assets/country.json';
import sport from '../../assets/sport.json';
import player from '../../assets/player.json';

const Home = () => {
  const [showPlayers, setShowPlayers] = useState(player);
  const [countryCode, setCountryCode] = useState('');
  const [urlImage, setUrlImage] = useState();

  const handleChangeCountry = (e) => {
    const playerArr = player.filter(elem => elem.country_code === parseInt(e.target.value, 10));
    setCountryCode(playerArr)
  }

  const handleChangeSport = (e) => {
    if (!countryCode) return
    const sportArr = countryCode.filter(elem => elem.sport_code === parseInt(e.target.value, 10));
    setShowPlayers(sportArr);
  }

  const saveFile = (e) => {
    e.preventDefault()
    saveAs(
      urlImage,
      "example.jpg"
    );
  };

  return (
    <div className="container mt-5">


      <form type="submit">
        <div className="row mb-5 d-flex justify-content-center">
          <div className="col-3">
            
            <select className="form-select" aria-label="Default select example"
              onChange={handleChangeCountry}
            >
              {country.map(op => (
                <option value={op.country_code} key={op.country_code}>{op.name}</option>
              ))}
            </select>
          </div>
          <div className="col-3">
            
            <select className="form-select" aria-label="Default select example"
              onChange={handleChangeSport}>
              {sport.map(op => (
                <option value={op.sport_code} key={op.sport_code}>{op.name}</option>
              ))}
            </select>
          </div>
          <div className="col-3" >
            
            <select className="form-select" aria-label="Default select example"
              onChange={(e) => setUrlImage(e.target.value)}
              disabled={!countryCode}
            >
              {showPlayers.map(op => (
                <option value={op.url_image} key={op.player_code}>{op.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-center mb-5">
            <img src={urlImage} onClick={saveFile} alt='' />
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <button onClick={saveFile} className="btn btn-outline-danger">
              Descargar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Home
