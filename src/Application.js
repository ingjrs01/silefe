import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Liferay } from './common/services/liferay/liferay';
import Acciones from './components/Acciones/Acciones';
import AccionesTipo from './components/AccionesTipo/AccionesTipo';
import AccionesTipoFormacion from './components/AccionesTipoFormacion/AccionesTipoFormacion';
import Ambitos from './components/Ambitos/Ambitos';
import Carnets from './components/Carnets/Carnets';
import Citas from './components/Citas/Citas';
import Cnaes from './components/Cnaes/Cnaes';
import Cnos from './components/Cnos/Cnos';
import Cofinanciadas from './components/Cofinanciadas/Cofinanciadas';
import Colectivos from './components/Colectivos/Colectivos';
import Convocatorias from './components/Convocatorias/Convocatorias';
import DGeografica from './components/DGeografica/DGeografica';
import Discapacidad from './components/Discapacidad/Discapacidad';
import Docentes from './components/Docentes/Docentes';
import Edades from './components/Edades/Edades';
import Empresas from './components/Empresas/Empresas';
import Estados from './components/Estados/Estados';
import Experiencias from './components/Experiencias/Experiencias';
import Home from './components/Home/Home';
import Horarios from './components/Horarios/Horarios';
import Localidades from './components/Localidades/Localidades';
import { Login } from './components/Login/Login';
import Lugares from './components/Lugares/Lugares';
import MBaja from './components/MBaja/MBaja';
import Ofertas from './components/Ofertas/Ofertas';
import Pais from './components/Paises/Pais';
import Participantes from './components/Participantes/Participantes';
import Plataformas from './components/Plataforma/Plataformas';
import Prestaciones from './components/Prestaciones/Prestacion';
import Provincias from './components/Provincias/Provincia';
import Proyectos from './components/Proyectos/Proyectos';
import Salarios from './components/Salarios/Salarios';
import Tecnicos from './components/Tecnicos/Tecnicos';
import TipoContrato from './components/TipoContrato/TipoContrato';
import TiposVia from './components/TiposVia/TiposVia';
import Titulaciones from './components/Titulaciones/Titulaciones';
import TitulacionesFam from './components/TitulacionesFam/TitulacionesFam';
import TitulacionesNivel from './components/TitulacionesNivel/TitulacionesNivel';
import TitulacionesTipo from './components/TitulacionesTipo/TitulacionesTipo';
import VMenu from './components/VMenu';
import { ProtectRoute } from './includes/ProtectRoute';

const Application = () => {
    const url = "/";
    const allow = true;
    const [user, setUser] = useState({userId: 0, roles: []});
    
    useEffect(()=>{
        Liferay.Service('/role/get-user-roles',  { userId: Liferay.ThemeDisplay.getUserId()},response => {
              var roles = [];
              if (response !== 'undefined'  && response !== null) {
                  //console.debug(response);
                  response.forEach(function(e){
                      roles.push(e.name);
                  });  
                  setUser({userId: Liferay.ThemeDisplay.getUserId(), roles: roles})
              }
            }
          );        
    }, []);
    

    return (
        <BrowserRouter>
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
                                        <Route path='/home'                 element={<Home />} />
                                        <Route path='/titnivel'             element={<ProtectRoute isAllowed={true} redirectTo={url}> <TitulacionesNivel /> </ProtectRoute> } />
                                        <Route path='/tittipo'              element={<ProtectRoute isAllowed={true} redirectTo={url}><TitulacionesTipo /></ProtectRoute> } />
                                        <Route path='/titulaciones'         element={<ProtectRoute isAllowed={true} redirectTo={url}><Titulaciones /></ProtectRoute> } />
                                        <Route path='/docente/:id'          element={<ProtectRoute isAllowed={true} redirectTo={url}><Docentes user={user} /></ProtectRoute> } />
                                        <Route path='/docentes'             element={<ProtectRoute isAllowed={true} redirectTo={url}><Docentes user={user} /></ProtectRoute> } />
                                        <Route path='/colectivos'           element={<ProtectRoute isAllowed={true} redirectTo={url}><Colectivos /></ProtectRoute> } />
                                        <Route path='/provincias'           element={<ProtectRoute isAllowed={true} redirectTo={url}><Provincias /></ProtectRoute> } />
                                        <Route path='/cnaes'                element={<ProtectRoute isAllowed={true} redirectTo={url}><Cnaes /></ProtectRoute> } />
                                        <Route path='/cnos'                 element={<ProtectRoute isAllowed={true} redirectTo={url}><Cnos /></ProtectRoute> } />
                                        <Route path='/experiencias'         element={<ProtectRoute isAllowed={true} redirectTo={url}><Experiencias /></ProtectRoute> } />
                                        <Route path='/salarios'             element={<ProtectRoute isAllowed={true} redirectTo={url}><Salarios /></ProtectRoute> } />
                                        <Route path='/mbaja'                element={<ProtectRoute isAllowed={true} redirectTo={url}><MBaja /></ProtectRoute> } />
                                        <Route path='/horarios'             element={<ProtectRoute isAllowed={true} redirectTo={url}><Horarios /></ProtectRoute> } />
                                        <Route path='/titulacionesf'        element={<ProtectRoute isAllowed={true} redirectTo={url}><TitulacionesFam /></ProtectRoute> } />
                                        <Route path='/dgeografica'          element={<ProtectRoute isAllowed={true} redirectTo={url}><DGeografica /></ProtectRoute> } />
                                        <Route path='/cofinanciadas'        element={<ProtectRoute isAllowed={true} redirectTo={url}><Cofinanciadas /></ProtectRoute> } />
                                        <Route path='/tecnicos'             element={<ProtectRoute isAllowed={true} redirectTo={url}><Tecnicos /></ProtectRoute> } />
                                        <Route path='/convocatorias'        element={<ProtectRoute isAllowed={true} redirectTo={url}><Convocatorias /></ProtectRoute> } />
                                        <Route path='/proyecto/:id'         element={<ProtectRoute isAllowed={true} redirectTo={url}><Proyectos user={user} /></ProtectRoute> } />
                                        <Route path='/ambitos'              element={<ProtectRoute isAllowed={true} redirectTo={url}><Ambitos /></ProtectRoute> } />
                                        <Route path='/participante/:id'     element={<ProtectRoute isAllowed={true} redirectTo={url}><Participantes user={user} /></ProtectRoute> } />
                                        <Route path='/participantes'        element={<ProtectRoute isAllowed={true} redirectTo={url}><Participantes user={user} /></ProtectRoute> } />
                                        <Route path='/localidades'          element={<ProtectRoute isAllowed={true} redirectTo={url}><Localidades /></ProtectRoute> } />
                                        <Route path='/tiposvia'             element={<ProtectRoute isAllowed={true} redirectTo={url}><TiposVia /></ProtectRoute> } />
                                        <Route path='/tipocontrato'         element={<ProtectRoute isAllowed={true} redirectTo={url}><TipoContrato /></ProtectRoute> } />
                                        <Route path='/empresa/:id'          element={<ProtectRoute isAllowed={true} redirectTo={url}><Empresas user={user} /></ProtectRoute> } />
                                        <Route path='/empresas'             element={<ProtectRoute isAllowed={true} redirectTo={url}><Empresas user={user} /></ProtectRoute> } />
                                        <Route path='/oferta/:id'           element={<ProtectRoute isAllowed={true} redirectTo={url}><Ofertas user={user} /></ProtectRoute> } />
                                        <Route path='/ofertas'              element={<ProtectRoute isAllowed={true} redirectTo={url}><Ofertas user={user} /></ProtectRoute> } />
                                        <Route path='/edades'               element={<ProtectRoute isAllowed={true} redirectTo={url}><Edades /></ProtectRoute> } />
                                        <Route path='/carnets'              element={<ProtectRoute isAllowed={true} redirectTo={url}><Carnets /></ProtectRoute> } />
                                        <Route path='/estados'              element={<ProtectRoute isAllowed={true} redirectTo={url}><Estados /></ProtectRoute> } />
                                        <Route path='/prestaciones'         element={<ProtectRoute isAllowed={true} redirectTo={url}><Prestaciones /></ProtectRoute> } />
                                        <Route path='/plataformas'          element={<ProtectRoute isAllowed={true} redirectTo={url}><Plataformas /></ProtectRoute> } />
                                        <Route path='/accionestipo'         element={<ProtectRoute isAllowed={true} redirectTo={url}><AccionesTipo /></ProtectRoute> } />
                                        <Route path='/accion/:id'           element={<ProtectRoute isAllowed={true} redirectTo={url}><Acciones user={user} /></ProtectRoute> } />
                                        <Route path='/acciones'             element={<ProtectRoute isAllowed={true} redirectTo={url}><Acciones user={user} /></ProtectRoute> } />
                                        <Route path='/lugar/:id'            element={<ProtectRoute isAllowed={true} redirectTo={url}><Lugares /></ProtectRoute> } />
                                        <Route path='/lugares'              element={<ProtectRoute isAllowed={true} redirectTo={url}><Lugares /></ProtectRoute> } />
                                        <Route path='AccionesTipoFormacion' element={<ProtectRoute isAllowed={true} redirectTo={url}><AccionesTipoFormacion /></ProtectRoute> } />
                                        <Route path='/login'                element={<ProtectRoute isAllowed={true} redirectTo={url}><Login /></ProtectRoute> } />
                                        <Route path='/proyectos'            element={<ProtectRoute isAllowed={allow} redirectTo={url}><Proyectos user={user} /> </ProtectRoute> } />
                                        <Route path='/citas'                element={<ProtectRoute isAllowed={allow} redirectTo={url}><Citas /> </ProtectRoute> } />
                                        <Route path='/discapacidad'         element={<ProtectRoute isAllowed={allow} redirectTo={url}><Discapacidad /> </ProtectRoute> } />
                                        <Route path='/tecnicos'             element={<ProtectRoute isAllowed={allow} redirectTo={url}><Tecnicos /> </ProtectRoute> } />
                                        <Route path='/paises'               element={<ProtectRoute isAllowed={allow} redirectTo={url}><Pais></Pais></ProtectRoute>} />
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
    )
}

export default Application;
