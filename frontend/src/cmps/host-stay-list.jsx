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
        {/* <img src="" alt="" /> */}
        <div>
          <h4>White City Villa</h4>
          <p>1901 thornoids sdiof sadisod </p>
        </div>
        <div>
          <p>for rent</p>
        </div>
        <div>
          56
          56
          |
          56
          <div>
            <span>
              <p>
                $48,000
              </p>
              <p>/year</p>
            </span>
          </div>
        </div>
      </div>
      <div className='host-stay'>hello</div>
    </section>
  )
}