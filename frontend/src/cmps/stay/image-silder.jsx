import IconHeart from '../../assets/svg/icon-heart';
import { useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";


export function ImageSlider({ stay, onAddToWishList }) {
    const user = useSelector(storeState => storeState.userModule.user)

    const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
        const { carouselState: { currentSlide } } = rest;
        return (
            <div className="carousel-button-group">
                <button className={currentSlide === 0 ? '' : ''} onClick={() => previous()} />
                <button onClick={(e) => {
                    e.stopPropagation()
                    next()
                }} />
                <button onClick={() => goToSlide(currentSlide + 1)}>  </button>
            </div>
        );
    };


    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    }

    function heartStatus() {
        if (!user) {
            return <IconHeart fill={"#41454fd2"} />
        }
        else if (stay.likedByUsers.includes(user._id)) {
            return <IconHeart fill={"#FF385C"} />
        }
        else {
            return <IconHeart fill={"#41454fd2"} />
        }
    }

    return (
        <Carousel
            swipeable={true}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={6500}
            keyBoardControl={true}
            customTransition="all 0.6s"
            transitionDuration={600}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["mobile"]}
            dotListClass="custom-dot"
            // customButtonGroup={<ButtonGroup />}
            // renderButtonGroupOutside={true}

        >
            {
                stay.imgUrls.map(imgUrl => {
                    return (
                        <section key={imgUrl} className="img-container">
                            <img src={imgUrl} alt="" />
                            <div className="wish-list" onClick={(ev) => onAddToWishList(ev, stay._id)} >
                                {heartStatus()}
                            </div>
                        </section>
                    )
                })
            }
        </Carousel >
    )
}