import React, { useState, useEffect } from 'react';
//import Table from './components/Table';
import VMenu from './components/VMenu';
import Titulaciones from './components/Titulaciones';
import Colectivos from './components/Colectivos/Colectivos';
import { Route, Routes } from 'react-router-dom';

const Application = () => {

    return (
        <div className="container">
            <div className="sheet">
            <div className="row">
                <div className='col-2'>
                    <div className="sheet-header">
                        <h2 className="sheet-title">Clay</h2>
                        <div className="sheet-text"><VMenu /></div>
                    </div>
                </div>
                <div className='col-8'>
                    <div className="sheet-section">
                        <Routes>
                            <Route path='/titulaciones' element={ <Titulaciones /> }   />
                            <Route path='/colectivos'   element={ <Colectivos /> }  />
                        </Routes>
                    </div>
                </div>
            </div>
            </div>
        </div>
            
    )
}

export default Application;