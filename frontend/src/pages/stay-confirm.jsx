export function StayConfirm() {
    return <section className="stay-confirm">
        <div className="main-line"><button className="back-btn"> back</button> <h1>Request to book</h1></div>

        <div className="order-sum">
            <div className="left-side">
            <p>Your trip</p>
            <div className="dates"><div className="left">Dates <span>dates...</span> </div><button className="edit-btn">Edit</button>
            </div>
            <div className="guests"><div className="left">Guests <span>guests</span> </div><button className="edit-btn">Edit</button>
            </div>
            </div>
            <div className="modal">
                MODAL
            </div>
        </div>
    </section>
}