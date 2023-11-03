import { ClayVerticalNav } from '@clayui/nav';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { spritemap } from '../LiferayFunctions';

export const VerticalMenu = () => {
    const navigate = useNavigate();

    return (
        <ClayVerticalNav
          items={[
            {
              items: [
                <Link to="/proyectos" > Bla bla </Link> 
              ],
              label: "Home"
            },
            {
              initialExpanded: false,
              items: [
                {
                  active: false,
                  label: "Tipo",                  
                  onClick: () => navigate('/accionestipo')
                },
                {
                  active: false,
                  label: "Formación",                  
                  onClick: () => navigate('/accionestipoformacion')
                },
              ],
              label: "Acciones"
            },
            {
              initialExpanded: false,
              items: [
                {
                  active: false,
                  label: "Dispersion Geogr.",
                  onClick: () => navigate('/dgeografica')
                },
                {
                  active: false,
                  label: "Provincias",                  
                  onClick: () => navigate('/provincias')
                },
                {
                  active: false,
                  label: "Municipios",                  
                  onClick: () => navigate('/localidades')
                },
                {
                  active: false,
                  label: "Tipos Vía",                  
                  onClick: () => navigate('/tiposvia')
                },                
                {
                  active: false,
                  label: "Cofinanciadas",
                  onClick: () => navigate('/cofinanciadas')
                },                
                {
                  active: false,
                  label: "Lugares",
                  onClick: () => navigate('/lugares')
                }, 
                {
                  active: false,
                  label: "Ámbitos",
                  onClick: () => navigate('/ambitos')
                }, 
              ],
              label: "Sitios"
            },
            {
              initialExpanded: false,
              items: [
                {
                  active: false,
                  label: "Cnae's",
                  onClick: () => navigate('/cnaes')
                },
                {
                  active: false,
                  label: "Cno's",                  
                  onClick: () => navigate('/cnos')
                },
                {
                  active: false,
                  label: "Rangos Salariales",                  
                  onClick: () => navigate('/salarios')
                },
                {
                  active: false,
                  label: "Motivos de Baja",                  
                  onClick: () => navigate('/mbaja')
                },
                {
                  active: false,
                  label: "Horarios",                  
                  onClick: () => navigate('/horarios')
                },                
                {
                  active: false,
                  label: "Carnets",                  
                  onClick: () => navigate('/carnets')
                },
                {
                  active: false,
                  label: "Tipos Contrato",                  
                  onClick: () => navigate('/tipocontrato')
                },
                {
                  active: false,
                  label: "Experiencias",
                  onClick: () => navigate('/experiencias')
                },
                {
                  active: false,
                  label: "Prestaciones",
                  onClick: () => navigate('/prestaciones')
                },

              ],
              label: "Personal"
            },
            {
              initialExpanded: false,
              items: [
                {
                  active: false,
                  label: "Tipo",                  
                  onClick: () => navigate('/tittipo')
                },
                {
                  active: false,
                  label: "Nivel",                  
                  onClick: () => navigate('/titnivel')
                },
                {
                  active: false,
                  label: "Familias", 
                  onClick: () => navigate('/titulacionesf')
                },
                {
                  active: false,
                  label: "Titulaciones", 
                  onClick: () => navigate('/titulaciones')
                },
              ],
              label: "Titulaciones"
            },
            {
              initialExpanded: false,
              items: [
                {
                  active: false,
                  label: "Cnae's",
                  onClick: () => navigate('/cnaes')
                },
                {
                  active: false,
                  label: "Cno's",                  
                  onClick: () => navigate('/cnos')
                },
                {
                  active: false,
                  label: "Rangos Salariales",                  
                  onClick: () => navigate('/salarios')
                },
                {
                  active: false,
                  label: "Motivos de Baja",                  
                  onClick: () => navigate('/mbaja')
                },
                {
                  active: false,
                  label: "Horarios",                  
                  onClick: () => navigate('/horarios')
                },                
                {
                  active: false,
                  label: "Tipos Contrato",                  
                  onClick: () => navigate('/tipocontrato')
                },
                {
                  active: false,
                  label: "Experiencias",
                  onClick: () => navigate('/experiencias')
                },
                {
                  active: false,
                  label: "Prestaciones",
                  onClick: () => navigate('/prestaciones')
                },
                {
                  active: false,
                  label: "Colectivos",
                  onClick: () => navigate('/colectivos')
                },

              ],
              label: "Contratos"
            },
            {
              initialExpanded: false,
              items: [
                {
                  active: false,
                  label: "Plataformas",
                  onClick: () => navigate('/plataformas')
                },
                {
                  active: false,
                  label: "Estados",
                  onClick: () => navigate('/estados')
                },
                {
                  active: false,
                  label: "Técnicos",
                  onClick: () => navigate('/tecnicos')
                },
              ],
              label: "Otros"
            },

          ]}
          large={false}
          spritemap={spritemap}
        />
      );
}
