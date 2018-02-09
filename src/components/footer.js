import React, { Component } from 'react';

class Footer extends Component{

    
    render(){
        const dateObject = new Date();
        const year = dateObject.getFullYear();
        
        return(
            <div className="footer">
                Test Footer<br />
                <span className="copyright">Copyright &copy; {year} Goad Design</span>
            </div>
        );
    }
}

export default Footer;