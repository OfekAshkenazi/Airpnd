export function EditStay() {
    return (
        <section className="edit-stay">
            <section className="images-area">
                <img className="grid-img-1" src="" alt="Upload Image" />
                <img className="grid-img-2" src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg" alt="" />
                <img className="grid-img-3" src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg" alt="" />
                <img className="grid-img-4" src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg" alt="" />
                <img className="grid-img-5" src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg" alt="" />
            </section>
            <section className="stay-main-details flex align-center g10">

                <label>
                    Capacity
                    <input type="text" />
                </label>

                <label>
                    {/* roomType */}
                    stay type:
                    <select name="" id="">
                        <option value="">Entire place</option>
                        <option value="">Private room</option>
                        <option value="">Shared room</option>
                    </select>
                </label>

                <label>
                    {/* roomType */}
                    Property type:
                    <select name="" id="">
                        <option value="">stay</option>
                        <option value="">Apartment</option>
                        <option value="">Guest house</option>
                        <option value="">Hotel</option>
                    </select>
                </label>

                <label>
                    Price
                    <input type="text" />
                    /night
                </label>


            </section>
            <section className="stay-edit-desc">
                <label>
                    Description
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </label>
            </section>

            <section className="amenities-edit-stay">
                <label>
                    <img src={require('../../assets/img/amenities/24-hour.png')} alt="" />
                </label>
            </section>

        </section>
    )
}