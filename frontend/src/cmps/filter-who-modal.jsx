import IconArrows_circle_minus from '../assets/svg/minus-icon.jsx';
import IconArrows_circle_plus from '../assets/svg/plus-icon.jsx';
import { BasicSelect } from '../cmps/select-dropdown.jsx';



export function FilterWhoModal() {

  return (
    <section className='filter-who-modal'>
      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Adults</p>
          <p>Ages 13 or above</p>
        </div>
        <div className='modal-btn-group '>
          <button><IconArrows_circle_minus /></button>
          <span>1</span>
          <button><IconArrows_circle_plus /></button>
        </div>
      </div>

      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Children</p>
          <p>Ages 2–12</p>
        </div>
        <div className='modal-btn-group'>
          <button><IconArrows_circle_minus /></button>
          <span>0</span>
          <button><IconArrows_circle_plus /></button>
        </div>
      </div>

      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Infants</p>
          <p>Under 2</p>
        </div>
        <div className='modal-btn-group'>
          <button><IconArrows_circle_minus /></button>
          <span>0</span>
          <button><IconArrows_circle_plus /></button>
        </div>
      </div>

      <div className='guest-select flex'>
        <div className='guest-select-contant'>
          <p>Pets</p>
          <p className='flex'>Bringing a service animal?</p>
        </div>
        <div className='modal-btn-group'>
          <button><IconArrows_circle_minus /></button>
          <span>0</span>
          <button><IconArrows_circle_plus /></button>
        </div>
      </div>
    </section>
  )
}