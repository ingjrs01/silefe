import React from 'react';
import {ClayVerticalNav} from '@clayui/nav';
import {Link, useNavigate} from 'react-router-dom';

const spritemap = "./o/my-project/icons.svg";

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
              href: "#2",
              label: "About"
            },
            {
              href: "#3",
              label: "Contact"
            },
            {
              initialExpanded: true,
              items: [
                {
                  active: true,
                  //href: "#5",
                  label: "Cinco 3",
                  route: "/proyectos",
                  onClick: () => {console.log("soy click"),navigate('/proyectos')}
                },
                {
                  href: "#6",
                  label: "Six"
                }
              ],
              label: "Projects"
            },
            {
              href: "#7",
              label: "Seven"
            }
          ]}
          large={false}
          spritemap={spritemap}
        />
      );
}