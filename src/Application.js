import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import VMenu from './components/VMenu';
import Titulaciones from './components/Titulaciones/Titulaciones';
import Colectivos from './components/Colectivos/Colectivos';
import Provincias from './components/Provincias/Provincia';
import Cnaes from './components/Cnaes/Cnaes';
import Cnos from './components/Cnos/Cnos';
import Experiencias from './components/Experiencias/Experiencias';

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
                            <Route path='/titulaciones' element={ <Titulaciones /> } />
                            <Route path='/colectivos'   element={ <Colectivos /> }   />
                            <Route path='/provincias'   element={ <Provincias /> }   />
                            <Route path='/cnaes'        element={ <Cnaes /> }   />
                            <Route path='/cnos'         element={ <Cnos /> }   />
                            <Route path='/experiencias' element={ <Experiencias /> }   />
                        </Routes>
                    </div>
                </div>
            </div>
            </div>
        </div>
            
    )
}

export default Application;