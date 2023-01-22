import { StayIndex } from './pages/stay-index.jsx'
import { StayDetails } from './pages/stay-details.jsx'

const routes = [
    {
        path: '/',
        component: <StayIndex />,
        label: 'stays'
    },
    {
        path: '/stay/:stayId',
        component: <StayDetails />,
    },
   
]

export default routes