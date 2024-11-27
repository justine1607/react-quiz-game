import '../styles/error.scss'

function NotFound(){
    return(
        <div className="theme-container">
            <div className="container">
                <div className="error-wrapper">
                    <div className="error">404 not found</div>
                    <img src="/images/icon-error.svg" alt="icon-error"/>
                </div>
                <div className="go-back">back to<a href="/"> Hompgae </a> </div>
            </div>
        </div>
    )
}

export default NotFound