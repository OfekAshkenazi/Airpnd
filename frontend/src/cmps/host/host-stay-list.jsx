import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';

import { showErrorMsg } from '../../services/event-bus.service.js';
import { stayService } from '../../services/stay.service.js';
import { cleanFilter, getHostOrderFilter } from '../../services/wishList.service.js';
import { HostStayPreview } from './host-stay-preview.jsx';


export function HostStayList() {
  const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
  const user = useSelector(storeState => storeState.userModule.user)
  const [hostStays, setHostStays] = useState([])


  useEffect(() => {
    getHostOrderFilter(user)
    onLoadHostStays()
    
    return () => {
      cleanFilter()
    }
  }, [])


  async function onLoadHostStays() {
    try {
      const dataStays = await stayService.query(filterBy)

      setHostStays(dataStays)
    } catch (err) {
      console.log(err)
      showErrorMsg('Cannot load orders')
    }
  }
  // console.log(hostStays.length)
  if (hostStays.length > 15) return


  if(!hostStays.length) return 

  return (
    <section className='host-list-container'>
      <h2>Your properties</h2>
      <ul className="host-stay-list flex column">
        {hostStays.map(stay => <li key={stay._id}>
          <HostStayPreview stay={stay} />
        </li>)}
      </ul>
    </section >
  )
}

