import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function GuestPicker({ guests, setGuests, handleGuestChange }) {
  const handleIncrement = (name) => {
    setGuests({
      ...guests,
      [name]: guests[name] + 1,
    })
    handleGuestChange(guests)
  }

  const handleDecrement = (name) => {
    if (guests[name] > 0) {
      setGuests({
        ...guests,
        [name]: guests[name] - 1,
      })
    }
    handleGuestChange(guests)
  }

  return (
    <section className='dropdown'>
      <div className='guest-type'>
        <div className="content">Adults <span className="description">Age 13+</span> </div>
        <div className='btns'>
          <button className={`guest-btn ${guests.adults === 0 ? 'disabled' : ''}`} 
           onClick={() => handleDecrement('adults')}><FontAwesomeIcon icon={faMinus} /></button>
          <span>{guests.adults}</span>
          <button className='guest-btn' onClick={() => handleIncrement('adults')}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
      </div>
      <div className='guest-type'>
        <div className="content">Childern <span className="description">Age 2-12</span> </div>
        <div className='btns'>
          <button className={`guest-btn ${guests.children === 0 ? 'disabled' : ''}`} 
           onClick={() => handleDecrement('children')}><FontAwesomeIcon icon={faMinus} /></button>
          <span>{guests.children}</span>
          <button className='guest-btn' onClick={() => handleIncrement('children')}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
      </div>
      <div className='guest-type'>
        <div className="content">Infants <span className="description">Under 2</span> </div>
        <div className='btns'>
          <button className={`guest-btn ${guests.infants === 0 ? 'disabled' : ''}`} 
           onClick={() => handleDecrement('infants')}><FontAwesomeIcon icon={faMinus} /></button>
          <span>{guests.infants}</span>
          <button className='guest-btn' onClick={() => handleIncrement('infants')}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
      </div>
      <div className='guest-type'>
        <div className="content">Pets <span className="description-pets">Bringing a service animal?</span> </div>
        <div className='btns'>
          <button className={`guest-btn ${guests.pets === 0 ? 'disabled' : ''}`} 
           onClick={() => handleDecrement('pets')}><FontAwesomeIcon icon={faMinus} /></button>
          <span>{guests.pets}</span>
          <button className='guest-btn' onClick={() => handleIncrement('pets')}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
      </div>
    </section >
  )
}

