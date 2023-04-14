import React from 'react';
import ClayAlert from '@clayui/alert';

const spritemap = "./o/my-project/icons.svg";


export const FAvisos = ({toastItems, setToastItems}) => {

    return (
        <>
            <ClayAlert.ToastContainer>
                {toastItems.map(value => (
                    <ClayAlert
                        autoClose={5000}
                        key={value}
                        onClose={() => {
                            setToastItems(prevItems =>
                                prevItems.filter(item => item !== value)
                            );
                        }}
                        spritemap={spritemap}
                        title={`${value.title}`}
                        displayType={value.type}
                        variant="inline"
                    >{`${value.text}`}</ClayAlert>
                ))}
            </ClayAlert.ToastContainer>

        </>

    )
}
