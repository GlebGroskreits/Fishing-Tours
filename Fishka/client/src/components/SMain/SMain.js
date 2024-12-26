import React, { useEffect, useState } from 'react';
import './SMain.scss';

const SMain = ({children}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true); // Изменяем состояние, чтобы сделать содержимое видимым
        }, 0); // Задержка для плавного появления

        return () => clearTimeout(timer);
    }, []);

    return (
        <main className={`main ${isVisible ? 'visible' : ''}`}>
            {children}
        </main>
    );
}

export default SMain;