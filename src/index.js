import React from 'react';
import ReactDOM from 'react-dom/client';
//import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import Application from './Application';


/**
 * This is the main entry point of the portlet.
 *
 * See https://tinyurl.com/js-ext-portlet-entry-point for the most recent 
 * information on the signature of this function.
 *
 * @param  {Object} params a hash with values of interest to the portlet
 * @return {void}
 */
export default function main({portletNamespace, contextPath, portletElementId, configuration}) {
    console.log("viendo cosas");
    console.log(portletElementId);
    const root = ReactDOM.createRoot(document.getElementById(portletElementId));
    root.render(
        <Router>
            <Application />        
        </Router>
    );

  //  reportWebVitals();
}

