import { addDays } from 'date-fns';
import { differenceInCalendarDays } from 'date-fns';
import { useState } from 'react';
import { DateRange } from 'react-date-range';

export function FilterDatesModal() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [order, setOrder] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 6),
      key: 'selection'
    }
  ])

  function numericDate(date) {
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric",
    })
    return formattedDate
  }

  function handleDateChange(range) {
    const { startDate, endDate } = range
    setOrder(prevOrder => [{ ...prevOrder[0], startDate, endDate }])
  }

  return (
    <section className='filter-dates-modal'>
      <div>
        <p>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => {
              setOrder([item.selection])
              handleDateChange(item.selection)
            }
            }
            ranges={order}
            months={2}
            direction={'horizontal'}
            className='date-modal'
          />

        </p>
      </div>
    </section>
  )
}