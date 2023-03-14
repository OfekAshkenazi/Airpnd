import { useNavigate } from "react-router-dom"

export function HostStayList() {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate("/host/edit-stay/63d1c75532f0de893dc0311a")} className="">
            hello
        </div>
    )
}