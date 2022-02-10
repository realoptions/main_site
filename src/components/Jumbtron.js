const Jumbotron = ({ children, style, className }) => {
    const newClassName = `bg-light mb-4 py-3 py-sm-5 ${className}`
    return <div className={newClassName} style={style}>{children}</div>
}

export default Jumbotron