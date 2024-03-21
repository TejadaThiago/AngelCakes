import { useState, useEffect } from 'react';

export function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState<boolean>(
        window.matchMedia('(max-width: 768px)').matches
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobile;
}

