import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>
//);

reportWebVitals();
class WebComponent extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		createRoot(this).render(
			<App
			/>,
			this
		);

		//if (Liferay.ThemeDisplay.isSignedIn()) {
		//	api('o/headless-admin-user/v1.0/my-user-account')
		//		.then((response) => response.json())
		//		.then((response) => {
		//			if (response.givenName) {
		//				const nameElements = document.getElementsByClassName(
		//					'hello-world-name'
		//				);
		//				if (nameElements.length) {
		//					nameElements[0].innerHTML = response.givenName;
		//				}
		//			}
		//		});
		//}
	}
}

const ELEMENT_ID = 'silefe-front';

if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}
