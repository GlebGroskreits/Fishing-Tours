import React, { useEffect, useState } from 'react';
import './SMain.scss';

const SMain = ({children}) => {

    return (
            <main className='main fade_in'>
                {children}
            </main>
    );
}

export default SMain;