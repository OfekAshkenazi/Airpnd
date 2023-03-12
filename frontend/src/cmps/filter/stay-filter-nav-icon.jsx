import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useSearchParams } from 'react-router-dom';

import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

import { labels, stayService } from '../../services/stay.service';
import { onSetFilter } from '../../store/stay.actions';

export function NavIconFilter() {

    const { isFilterExpanded } = useSelector(storeState => storeState.filterExpandedModule)
    const [searchParams, setSearchParams] = useSearchParams()
    const queryFilterBy = stayService.getFilterFromSearchParams(searchParams)
    const [filterByToEdit, setFilterByToEdit] = useState(queryFilterBy)

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 15,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 7,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3,
            slidesToSlide: 1 // optional, default to 1.
        }
    }

    function onFilterByLabel(Currlabel) {
        filterByToEdit.label = Currlabel
        console.log(filterByToEdit)
        setSearchParams(filterByToEdit)
        onSetFilter(filterByToEdit)
    }

    return (
        <div className='icon-nav'>
            <Carousel
                swipeable={true}
                draggable={true}
                // showDots={true}
                responsive={responsive}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all 0.3s"
                transitionDuration={600}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["mobile"]}
            >
                {
                    labels.map(label => {
                        return (
                            <div key={label} className='icon-preview' onClick={() => onFilterByLabel(label)}>
                                <img style={{ maxWidth: '30px' }} src={require(`../../assets/icon-nav-filter/${label}.png`)} alt="" />
                                <p onClick={() => onFilterByLabel(label)}>{`${label}`}</p>
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}
{/* <button className="btn-icon-filter"><IconFiltering /> Filters</button> */ }