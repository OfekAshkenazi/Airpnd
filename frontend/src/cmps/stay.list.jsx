import { StayPreview } from "./stay-preview";

export function StayList({ stays }) {
    return (
        <section>
            <ul className="stay-list">
                {stays.map(stay => <li key={stay._id}>
                    <StayPreview stay={stay} />
                </li>)}
            </ul>
        </section>
    )
}