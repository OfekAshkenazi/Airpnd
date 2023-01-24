import IconMapPin from '../assets/svg/location-icon';


export function FilterWhereModal() {

  return (
    <section className='filter-where-modal'>
      <div className='common-searches'>
        <h4>Common search</h4>
        <div className='common-search'>
          <span className='place-icon'><IconMapPin /></span>
          <span className='place-content'>
            <p className='common-city'>Madrid</p>
            <p className='common-country'>Spain</p>
          </span>
        </div>

        <div className='common-search'>
          <span className='place-icon'><IconMapPin /></span>
          <span className='place-content'>
            <p className='common-city'>Rome</p>
            <p className='common-country'>Italy</p>
          </span>
        </div>

        <div className='common-search'>
          <span className='place-icon'><IconMapPin /></span>
          <span className='place-content'>
            <p className='common-city'>Lisbon</p>
            <p className='common-country'>Portugal</p>
          </span>
        </div>

        <div className='common-search'>
          <span className='place-icon'><IconMapPin /></span>
          <span className='place-content'>
            <p className='common-city'>Tokyo</p>
            <p className='common-country'>Japan</p>
          </span>
        </div>

      </div>

      <div className='search-by-regions'>
        <h4>Search by region</h4>

        <div className='regions-list'>
          <div className='region'>
            <img src={require(`../assets/img/regions/flexable.jpg`)} alt="flexable" />
            <p>I'm flexible</p>
          </div>
          <div className='region'>
            <img src={require(`../assets/img/regions/europe.webp`)} alt="europe" />
            <p>Europe</p>
          </div>
          <div className='region'>
            <img src={require(`../assets/img/regions/france.webp`)} alt="france" />
            <p>France</p>
          </div>

          <div className='region'>
            <img src={require(`../assets/img/regions/unitedStates.webp`)} alt="united States" />
            <p>United States</p>
          </div>

          <div className='region'>
            <img src={require(`../assets/img/regions/unitedKingdom.webp`)} alt="united Kingdom" />
            <p>United Kingdom</p>
          </div>

          <div className='region'>
            <img src={require(`../assets/img/regions/southAmerica.webp`)} alt="south America" />
            <p>South America</p>
          </div>

        </div>
      </div>
    </section>
  )
}