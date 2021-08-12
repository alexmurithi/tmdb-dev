import React from "react";
import PropTypes from "prop-types";
import Glide from "@glidejs/glide";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "../Assets/css/glide_core.css";

let resizeTimeOut = -1;
let mountTimeOut = -1;

export default class GlideComponent extends React.Component {
  static propTypes = {
    settings: PropTypes.shape({
      type: PropTypes.string,
      startAt: PropTypes.number,
      perView: PropTypes.number,
      focusAt: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
      gap: PropTypes.number,
      autoplay: PropTypes.number,
      hoverpause: PropTypes.bool,
      keyboard: PropTypes.bool,
      bound: PropTypes.bool,
      swipeThreshold: PropTypes.oneOf([PropTypes.number, PropTypes.bool]),
      dragThreshold: PropTypes.oneOf([PropTypes.number, PropTypes.bool]),
      perTouch: PropTypes.oneOf([PropTypes.number, PropTypes.bool]),
      touchRatio: PropTypes.number,
      touchAngle: PropTypes.number,
      animationDuration: PropTypes.number,
      rewind: PropTypes.bool,
      rewindDuration: PropTypes.number,
      animationTimingFunc: PropTypes.string,
      direction: PropTypes.string,
      peek: PropTypes.object,
      breakpoints: PropTypes.object,
      classes: PropTypes.object,
      throttle: PropTypes.number,
    }),
  };

  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
    this.renderDots = this.renderDots.bind(this);
  }

  componentDidMount() {
    this.initGlide();
  }

  componentDidUpdate() {
    this.destroyGlide();
    this.initGlide();
  }

  componentWillUnmount() {
    this.destroyGlide();
  }

  onResize() {
    clearTimeout(resizeTimeOut);
    resizeTimeOut = setTimeout(() => {
      this.glideCarousel.update();
      resizeTimeOut = -1;
    }, 500);
  }

  destroyGlide() {
    clearTimeout(resizeTimeOut);
    clearTimeout(mountTimeOut);
    if (this.glideCarousel) {
      this.glideCarousel.destroy();
    }
  }

  initGlide() {
    const { settings } = this.props;
    this.glideCarousel = new Glide(this.carousel, {
      ...settings,
      direction: "ltr",
    });
    this.glideCarousel.mount();
    this.glideCarousel.on("resize", this.onResize);
    mountTimeOut = setTimeout(() => {
      const event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 500);
  }

  renderDots() {
    const { children } = this.props;
    const total = React.Children.count(children);
    const dots = [];
    for (let i = 0; i < total; i += 1) {
      dots.push(
        // eslint-disable-next-line jsx-a11y/control-has-associated-label,react/button-has-type
        <button
          className="glide__bullet slider-dot"
          key={i}
          data-glide-dir={`=${i}`}
        />
      );
    }
    return dots;
  }

  render() {
    const { children, settings } = this.props;
    return (
      <div>
        {/* eslint-disable-next-line no-return-assign */}
        <div className="glide" ref={(node) => (this.carousel = node)}>
          <div data-glide-el="track" className="glide__track">
            <div className="glide__slides">{children}</div>
          </div>
          {!settings.hideNav && (
            <div className="glide__arrows slider-nav" data-glide-el="controls">
              <button
                type="button"
                className="glide__arrow glide__arrow--left left-arrow btn btn-link"
                data-glide-dir="<"
              >
                <ArrowBackIosIcon />
              </button>

              <div
                className="glide__bullets slider-dot-container"
                data-glide-el="controls[nav]"
              >
                {this.renderDots()}
              </div>

              <button
                type="button"
                className="glide__arrow glide__arrow--right right-arrow btn btn-link"
                data-glide-dir=">"
              >
                <ArrowForwardIosIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
