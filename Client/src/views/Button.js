const Button = ({ color, icon, onClick }) => (
    <button className={`btn btn-${color}`} onClick={onClick}>
        <i className={`fa fa-${icon}`} aria-hidden="true"></i>
    </button>
);

export default Button;