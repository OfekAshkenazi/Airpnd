import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import IconMapPin from '../assets/svg/location-icon';
import { getActionFilterExpanded } from '../store/filter.expanded.action';

export function StayFilterPlaceTaker() {
  return (
    <section className="stay-filter-place-taker">
      <button className="stays"> Stays</button>
      <button className="experiences">Experiences</button>
      <button className="Online-Experiences">Online Experiences</button>

    </section>
  )
}
