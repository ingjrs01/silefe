import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Acciones from './components/Acciones/Acciones';
import AccionesTipo from './components/AccionesTipo/AccionesTipo';
import AccionesTipoFormacion from './components/AccionesTipoFormacion/AccionesTipoFormacion';
import Ambitos from './components/Ambitos/Ambitos';
import Carnets from './components/Carnets/Carnets';
import Cnaes from './components/Cnaes/Cnaes';
import Cnos from './components/Cnos/Cnos';
import Cofinanciadas from './components/Cofinanciadas/Cofinanciadas';
import Colectivos from './components/Colectivos/Colectivos';
import Convocatorias from './components/Convocatorias/Convocatorias';
import DGeografica from './components/DGeografica/DGeografica';
import Docentes from './components/Docentes/Docentes';
import Edades from './components/Edades/Edades';
import Empresas from './components/Empresas/Empresas';
import Estados from './components/Estados/Estados';
import Experiencias from './components/Experiencias/Experiencias';
import Home from './components/Home/Home';
import Horarios from './components/Horarios/Horarios';
import Localidades from './components/Localidades/Localidades';
import Lugares from './components/Lugares/Lugares';
import MBaja from './components/MBaja/MBaja';
import Ofertas from './components/Ofertas/Ofertas';
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
import { VerticalMenu } from './includes/interface/VerticalMenu';

const queryClient = new QueryClient();

const Application = () => {

    return (
        <QueryClientProvider client={queryClient} >
        <div className="container">
            <div className="sheet">
            <div className="row">
                <div className='col-2'>
                    <div className="sheet-header">
                        <h2 className="sheet-title">Menú</h2>
                        <div className="sheet-text"><VMenu /></div>
                        <div className="sheet-text"><VerticalMenu /></div>
                    </div>
                </div>
                <div className='col-10'>
                    <div className="sheet-section">
                        <Routes>
                            <Route path='/home'             element={ <Home /> } />
                            <Route path='/titnivel'         element={ <TitulacionesNivel /> } />
                            <Route path='/tittipo'          element={ <TitulacionesTipo /> } />
                            <Route path='/titulaciones'     element={ <Titulaciones /> } />
                            <Route path='/docentes'         element={ <Docentes /> } />
                            <Route path='/colectivos'       element={ <Colectivos /> }   />
                            <Route path='/provincias'       element={ <Provincias /> }   />
                            <Route path='/cnaes'            element={ <Cnaes /> }   />
                            <Route path='/cnos'             element={ <Cnos /> }   />
                            <Route path='/experiencias'     element={ <Experiencias /> }   />
                            <Route path='/salarios'         element={ <Salarios /> }   />
                            <Route path='/mbaja'            element={ <MBaja /> }   />
                            <Route path='/horarios'         element={ <Horarios /> }   />
                            <Route path='/titulacionesf'    element={ <TitulacionesFam /> }   />
                            <Route path='/dgeografica'      element={ <DGeografica /> }   />
                            <Route path='/cofinanciadas'    element={ <Cofinanciadas /> }   />
                            <Route path='/tecnicos'         element={ <Tecnicos /> }   />
                            <Route path='/convocatorias'    element={ <Convocatorias /> }   />
                            <Route path='/proyecto/:id'     element={ <Proyectos /> }   />
                            <Route path='/proyectos'        element={ <Proyectos /> }   />
                            <Route path='/ambitos'          element={ <Ambitos /> }   />
                            <Route path='/participante/:id' element={ <Participantes /> }   />
                            <Route path='/participantes'    element={ <Participantes /> }   />
                            <Route path='/localidades'      element={ <Localidades /> } />
                            <Route path='/tiposvia'         element={ <TiposVia /> } />
                            <Route path='/tipocontrato'     element={ <TipoContrato /> } />
                            <Route path='/empresa/:id'      element={ <Empresas /> } />
                            <Route path='/empresas'         element={ <Empresas /> } />
                            <Route path='/oferta/:id'       element={ <Ofertas /> } />
                            <Route path='/ofertas'          element={ <Ofertas /> } />
                            <Route path='/edades'           element={ <Edades /> } />
                            <Route path='/carnets'          element={ <Carnets /> } />
                            <Route path='/estados'          element={ <Estados /> } />
                            <Route path='/prestaciones'     element={ <Prestaciones/>} />
                            <Route path='/plataformas'      element={ <Plataformas/>} />
                            <Route path='/accionestipo'     element={ <AccionesTipo /> } />
                            <Route path='/accion/:id'       element={ <Acciones /> } />
                            <Route path='/acciones'         element={ <Acciones /> } />
                            <Route path='/lugar:id'         element={ <Lugares /> } />
                            <Route path='/lugares'          element={ <Lugares /> } />
                            <Route path='AccionesTipoFormacion' element={<AccionesTipoFormacion />} />
                        </Routes>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </QueryClientProvider>
            
    )
}

export default Application;
