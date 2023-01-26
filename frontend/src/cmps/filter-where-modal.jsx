import IconMapPin from '../assets/svg/location-icon';

const commonCities = ['Maui', 'Rio De Janeiro', 'Barcelona', 'Istanbul']
const commonCountries = ['United States', 'Brazil', 'Spain', 'Turkey', 'Canada']

export function FilterWhereModal({ setFilterByToEdit }) {

  function onCommonSearch(place) {
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, txt: `${place}` }))
  }

  return (
    <section className='filter-where-modal'>
      <div className='common-searches'>
        <h4>Common search</h4>
        {commonCities.map((city, idx) => {
          return <div key={city} className='common-search' onClick={() => onCommonSearch(city)}>
            <span className='place-icon'><IconMapPin /></span>
            <span className='place-content'>
              <p className='common-city'>{city}</p>
              <p className='common-country'>{commonCountries[idx]}</p>
            </span>
          </div>

        })}
      </div>

      <div className='common-countries'>
        <h4>Search by region</h4>

        <div className='countries-list'>
          <div className='country'>
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