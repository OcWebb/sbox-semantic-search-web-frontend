import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorText: '#D1D2D5',
                    colorLink: '#D1D2D5'
                }
            }}>
            {children}
        </ConfigProvider>
    );
};