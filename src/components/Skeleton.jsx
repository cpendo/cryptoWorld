import PropTypes from "prop-types";

const Skeleton = ({ className = "", rounded = "rounded" }) => (
  <div
    aria-hidden="true"
    className={`bg-zinc-100 animate-pulse ${rounded} ${className}`}
  />
);

Skeleton.propTypes = {
  className: PropTypes.string,
  rounded: PropTypes.string,
};

export default Skeleton;
