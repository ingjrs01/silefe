import React from 'react';
import { Route, Routes } from 'react-router-dom';
import VMenu from './components/VMenu';
import Titulaciones from './components/Titulaciones/Titulaciones';
import Colectivos from './components/Colectivos/Colectivos';
import Provincias from './components/Provincias/Provincia';
import Cnaes from './components/Cnaes/Cnaes';
import Cnos from './components/Cnos/Cnos';
import Experiencias from './components/Experiencias/Experiencias';
import Salarios from './components/Salarios/Salarios';
import MBaja from './components/MBaja/MBaja';
import Horarios from './components/Horarios/Horarios';
import TitulacionesFam from './components/TitulacionesFam/TitulacionesFam';
import DGeografica from './components/DGeografica/DGeografica';
import TitulacionesTipo from './components/TitulacionesTipo/TitulacionesTipo';
import TitulacionesNivel from './components/TitulacionesNivel/TitulacionesNivel';
import Cofinanciadas from './components/Cofinanciadas/Cofinanciadas';
import Tecnicos from './components/Tecnicos/Tecnicos';
import Convocatorias from './components/Convocatorias/Convocatorias';
import Proyectos from './components/Proyectos/Proyectos';
import Ambitos from './components/Ambitos/Ambitos';
import Participantes from './components/Participantes/Participantes';
import Localidades from './components/Localidades/Localidades';
import TiposVia from './components/TiposVia/TiposVia';
import TipoContrato from './components/TipoContrato/TipoContrato';

const Application = () => {

    return (
        <div className="container">
            <div className="sheet">
            <div className="row">
                <div className='col-2'>
                    <div className="sheet-header">
                        <h2 className="sheet-title">Menú</h2>
                        <div className="sheet-text"><VMenu /></div>
                    </div>
                </div>
                <div className='col-10'>
                    <div className="sheet-section">
                        <Routes>
                            <Route path='/titnivel'      element={ <TitulacionesNivel /> } />
                            <Route path='/tittipo'       element={ <TitulacionesTipo /> } />
                            <Route path='/titulaciones'  element={ <Titulaciones /> } />
                            <Route path='/colectivos'    element={ <Colectivos /> }   />
                            <Route path='/provincias'    element={ <Provincias /> }   />
                            <Route path='/cnaes'         element={ <Cnaes /> }   />
                            <Route path='/cnos'          element={ <Cnos /> }   />
                            <Route path='/experiencias'  element={ <Experiencias /> }   />
                            <Route path='/salarios'      element={ <Salarios /> }   />
                            <Route path='/mbaja'         element={ <MBaja /> }   />
                            <Route path='/horarios'      element={ <Horarios /> }   />
                            <Route path='/titulacionesf' element={ <TitulacionesFam /> }   />
                            <Route path='/dgeografica'   element={ <DGeografica /> }   />                            
                            <Route path='/cofinanciadas' element={ <Cofinanciadas /> }   />
                            <Route path='/tecnicos'      element={ <Tecnicos /> }   />
                            <Route path='/convocatorias' element={ <Convocatorias /> }   />
                            <Route path='/proyectos'     element={ <Proyectos /> }   />
                            <Route path='/ambitos'       element={ <Ambitos /> }   />
                            <Route path='/participantes' element={ <Participantes /> }   />
                            <Route path='/localidades'   element={ <Localidades /> } />
                            <Route path='/tiposvia'      element={ <TiposVia /> } />
                            <Route path='/tipocontrato'  element={ <TipoContrato /> } />
                        </Routes>
                    </div>
                </div>
            </div>
            </div>
        </div>
            
    )
}

export default Application;
