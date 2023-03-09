import IconHeart from '../assets/svg/icon-heart';
import { useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";


export function ImageSlider({ stay, onAddToWishList }) {
    const user = useSelector(storeState => storeState.userModule.user)

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
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
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all 0.6s"
            transitionDuration={600}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["mobile"]}
            dotListClass="custom-dot"
        >
            {
                stay.imgUrls.map(imgUrl => {
                    return (
                        <section key={imgUrl} className="img-container">
                            <img src={imgUrl} alt="" />
                            <div className="wish-list" onClick={() => onAddToWishList(stay._id)} >
                                {heartStatus()}
                            </div>
                        </section>
                    )
                })
            }
        </Carousel>
    )
}