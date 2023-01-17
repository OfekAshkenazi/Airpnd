import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { StayIndex } from './pages/stay-index.jsx'
import { ReviewIndex } from './pages/review-index.jsx'

const routes = [
    {
        path: '/',
        component: <StayIndex />,
        label: 'stays'
    },
    
]

export default routes