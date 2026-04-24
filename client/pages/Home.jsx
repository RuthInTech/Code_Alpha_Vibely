import { Link } from 'react-router-dom'
import heroImage from '../src/assets/hero.png'
import viteLogo from '../src/assets/vite.svg'

export default function Home() {
  return (
    <>
      <div id="center">
        <div className="hero" aria-hidden="true">
          <img className="base" src={heroImage} alt="" />
          <img className="vite" src={viteLogo} alt="" />
        </div>

        <div className="launch-copy">
          <p className="eyebrow">Launch Vibely</p>
          <h1>Start from the Vercel-style landing screen, then jump into auth.</h1>
          <p className="launch-description">
            Your frontend was routing straight to registration, so the starter hero never had a
            chance to render.
          </p>
        </div>

        <div className="launch-actions">
          <Link className="launch-button primary" to="/register">
            Create account
          </Link>
          <Link className="launch-button secondary" to="/login">
            Log in
          </Link>
        </div>
      </div>

      <div className="ticks" />
      <div id="spacer" />
    </>
  )
}
