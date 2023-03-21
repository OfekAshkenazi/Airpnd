import { useState } from 'react'

export function LoginSignup({ onLoginR, onSignupR }) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(false)

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        onLoginR(credentials)
        clearState()
    }

    function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        onSignupR(credentials)
        clearState()
    }

    function logAsGuest() {
        const GuestUser = {
            username: "Guest",
            password: "123"
        }
        onLoginR(GuestUser)
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    function handleSignUp() {
        toggleSignup()
        onSignup()
    }

    return (
        <section className="login-page">
            <h3>Welcome to Airpnd</h3>
            {!isSignup && (
                <section className='w-full'>
                    <div className="login-conatiner">
                        <form className="login-form" onSubmit={onLogin}>
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                placeholder="Username"
                                onChange={handleChange}
                                required
                                autoFocus
                            />
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                            <button></button>
                        </form>
                    </div>
                    <button className="btn-signup-login" onClick={onLogin}>Login!</button>
                </section>)}

            {isSignup && (
                <div className="signup">
                    <form className="signup-form" onSubmit={onSignup}>
                        <input
                            type="text"
                            name="fullname"
                            value={credentials.fullname}
                            placeholder="Fullname"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                    </form>
                    <button className="btn-signup-login" onClick={handleSignUp}>Signup</button>
                </div>)}

            <hr />

            <button className="btn-signup-login" onClick={toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>

            {!isSignup && <button className="btn-signup-login" onClick={logAsGuest}>Log In As Guest</button>}

        </section>
    )
}



