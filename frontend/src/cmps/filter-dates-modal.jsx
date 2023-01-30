import { addDays } from 'date-fns';
import { differenceInCalendarDays } from 'date-fns';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { useSelector } from 'react-redux';

import { updateOrder } from '../store/order.action';

export function FilterDatesModal() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const order = useSelector(storeState => storeState.orderModule.order)


  function handleDateChange(range) {
    const orderToSave = structuredClone(order)
    const { startDate, endDate } = range.range1
    orderToSave.startDate = startDate
    orderToSave.endDate = endDate
    updateOrder(orderToSave)
  }

  return (
    <div className='filter-dates-modal'>
      <DateRange
        editableDateInputs={true}
        onChange={(range) => {
          handleDateChange(range)
        }
        }
        ranges={[{ startDate: order.startDate, endDate: order.endDate }]}
        months={2}
        direction={'horizontal'}
        className='date-range'
      />
    </div>
  )
}