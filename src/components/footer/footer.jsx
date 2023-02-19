/* eslint-disable react/no-array-index-key */
import iconFaceBook from '../../assets/icons/link-social/icon-facebook.svg'
import iconInstagram from '../../assets/icons/link-social/icon-instagram.svg'
import iconVK from '../../assets/icons/link-social/icon-vk.svg'
import iconLinkedIn from '../../assets/icons/link-social/icon-linked-in.svg'

import { SocialIcon } from './social-icon/social-icon'

import './footer.css'

export const Footer = () => {
    const arraySocialIcons = [iconFaceBook, iconInstagram, iconVK, iconLinkedIn]

    return (
        <footer className='container-footer'>
            <div className='wrapper-footer'>
                <p className='text-copyright'>© 2020-2023 Cleverland. Все права защищены.</p>

                <div className='container-footer-social-icons'>
                    { arraySocialIcons.map((icon, i) => <SocialIcon icon={icon} key={`social-icon-${i}`} />) }
                </div>
            </div>
        </footer>
    )
}