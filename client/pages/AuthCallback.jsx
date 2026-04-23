import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthCallback() {
    const navigate = useNavigate()

    useEffect(() => {
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''))
        const queryParams = new URLSearchParams(window.location.search)

        const accessToken = hashParams.get('access_token') || queryParams.get('access_token')

        if (accessToken) {
            localStorage.setItem('token', accessToken)
        }

        navigate('/dashboard', { replace: true })
    }, [navigate])

    return <p>Signing you in...</p>
}
