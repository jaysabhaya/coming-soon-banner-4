import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';


const SocialButton = ({ platform, onClick }) => {
    let icon;
    switch (platform) {
        case 'instagram':
            icon = <FontAwesomeIcon icon={faInstagram} />;
            break;
        case 'facebook':
            icon = <FontAwesomeIcon icon={faFacebookF} />;
            break;
        case 'linkedin':
            icon = <FontAwesomeIcon icon={faLinkedinIn} />;
            break;
        case 'twitter':
            icon = <FontAwesomeIcon icon={faXTwitter} />;
            break;
        default:
            icon = null;
    }

    return (
        <button className={`social-icons ${platform}`} onClick={() => onClick(platform)}>
            {icon}
        </button>
    );
};

export default SocialButton;
