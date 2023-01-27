import IconMapPin from '../assets/svg/location-icon';
import { utilService } from '../services/util.service';

const commonCities = ['Maui', 'Rio De Janeiro', 'Barcelona', 'Istanbul']
const commonCountries = ['United States', 'Brazil', 'Spain', 'Turkey', 'Canada']
const manyPlaces = ['United States', 'Brazil', 'Spain', 'Turkey', 'Canada', 'Maui', 'Rio De Janeiro', 'Barcelona', 'Istanbul', 'New York', 'Porto']
export function FilterWhereModal({ setFilterByToEdit }) {

  function onCommonSearch(place) {
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, txt: `${place}` }))
  }

  function onFlexAble(manyPlaces) {
    const randomIdx = utilService.getRandomIntInclusive(0, manyPlaces.length - 1)
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, txt: `${manyPlaces[randomIdx]}` }))
  }

  return (
    <section className='filter-where-modal'>
      <div className='common-searches'>
        <h4>Common search cities</h4>
        {commonCities.map((city, idx) => {
          return <div key={city} className='common-cities' onClick={() => onCommonSearch(city)}>
            <span className='place-icon'><IconMapPin /></span>
            <span className='place-content'>
              <p className='common-city'>{city}</p>
              <p className='common-country'>{commonCountries[idx]}</p>
            </span>
          </div>

        })}
      </div>

      <div className='common-countries'>
        <h4>Common search countries</h4>

        <div className='countries-list'>
          <div className='country' onClick={() => onFlexAble(manyPlaces)}>
            <img src={require(`../assets/img/countries/flexable.png`)} alt="flexable" />
            <p>I'm flexible</p>
          </div>

          {commonCountries.map((country, idx) => {
            return <div key={country} className='country' onClick={() => onCommonSearch(country)}>
              <img src={require(`../assets/img/countries/${country}.png`)} alt={country} />
              <p>{country}</p>
            </div>

          })}

        </div>
      </div>
    </section>
  )
}