import './social-icon.css'

export const SocialIcon = ({ icon }) => (
    <a className='wrapper-social-icons'>
        <img className='social-icons' src={icon} alt="Социальная сеть" />
    </a>
)
