import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { stayService } from "../services/stay.service.local.js"

export function StayDetails() {
    const [stay, setStay] = useState(null)
    const { stayId } = useParams()

    useEffect(() => {
        loadStay()
    }, [])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            console.log('Had issues in stay details', err)
            // navigate('/')
        }
    }
    if (!stay) return <div>Loading...</div>
    return <section className="stay-details">
        <h1>{stay.name}</h1>
    </section>
}