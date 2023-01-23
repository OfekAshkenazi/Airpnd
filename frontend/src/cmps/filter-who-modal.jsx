import { BasicSelect } from '../cmps/select-dropdown.jsx';



export function FilterWhoModal() {

  return (
    <section className='filter-who-modal'>
      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Adults</p>
          <p>Ages 13 or above</p>
        </div>
        <div className='modal-btn-group'>
          <button>➖</button>
          <span>0</span>
          <button>➕</button>
        </div>
      </div>

      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Children</p>
          <p>Ages 2–12</p>
        </div>
        <div className='modal-btn-group'>
          <button>➖</button>
          <span>0</span>
          <button>➕</button>
        </div>
      </div>

      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Infants</p>
          <p>Under 2</p>
        </div>
        <div className='modal-btn-group'>
          <button>➖</button>
          <span>0</span>
          <button>➕</button>
        </div>
      </div>

      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Pets</p>
          <p>Bringing a service animal?</p>
        </div>
        <div className='modal-btn-group'>
          <button>➖</button>
          <span>0</span>
          <button>➕</button>
        </div>
      </div>

    </section>
  )
}