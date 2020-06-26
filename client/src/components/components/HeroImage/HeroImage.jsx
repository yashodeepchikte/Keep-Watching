import React from "react"
import PropTypes from "prop-types"
import { StyledHeroImage } from "./StyledHeroImage"

const HeroImage = ({image, title, text}) => (
    <StyledHeroImage image={image}>
        <div className="heroimage-content">
            <div className="heroimage-text">
                    <h1>{title}</h1>
                    <p>{text}</p>
            </div>
        </div>
    </StyledHeroImage>
)

HeroImage.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string
}
export default HeroImage