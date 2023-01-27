import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export function HostStayList() {
  const user = useSelector(storeState => storeState.userModule.user)

  const [hostStays, setHostStays] = useState([])

  useEffect(() => {
    onLoadHostStays()
  }, [])

  async function onLoadHostStays() {
    console.log('hi')
  }

  // if (!user.isOwner) return <h2>you are not owner</h2>
  return (
    <section className='host-stay-list flex'>
      <div className='host-stay'>
        <div className='flex'>
          <img src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436917/mqkfjmfpmyqpqmzmqgau.jpg" alt="" />
          <span>
            <h4>White City Villa</h4>
            <p>1901 thornoids sdiof sadisod </p>
          </span>
        </div>
        <div>
          <p>for rent</p>
        </div>
        <div>
          56
          56
          |
          56
        </div>

        <div>
          <span className='flex'>
            <p>
              $48,000
            </p>
            <p>/year</p>
          </span>
        </div>
      </div>
      <div className='host-stay'>
        <div className='flex'>
          <img src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436204/wzbrvr4mcsuub6gvwbry.jpg" alt="" />
          <span>
            <h4>White City Villa</h4>
            <p>1901 thornoids sdiof sadisod </p>
          </span>
        </div>
        <div>
          <p>for rent</p>
        </div>
        <div>
          56
          56
          |
          56
        </div>

        <div>
          <span className='flex'>
            <p>
              $48,000
            </p>
            <p>/year</p>
          </span>
        </div>
      </div>
    </section >
  )
}