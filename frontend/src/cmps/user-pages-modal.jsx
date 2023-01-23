import { Link } from "react-router-dom";

export function UserPagesModal() {
    return (
        <section className="user-page-modal">
            <section className="bold">
                <div className="page-item flex bold"><Link>Messages</Link></div>
                <div className="page-item flex bold"><Link>Notifications</Link></div>
                <div className="page-item flex bold"><Link>Trips</Link></div>
                <div className="page-item flex bold"><Link>Wishlist</Link></div>
            </section>
            <hr />
            <section className="grey">
                <div className="page-item flex grey"><Link>Airpnd your home</Link></div>
                <div className="page-item flex grey"><Link>Host an experience</Link></div>
                <div className="page-item flex grey"><Link>Refer a host</Link></div>
                <div className="page-item flex grey"><Link>Account</Link></div>
            </section>
            <hr />
            <section className="grey">
                <div className="page-item flex grey"><Link>Help</Link></div>
                <div className="page-item flex grey">Log out</div>
            </section>
        </section>
    )
}