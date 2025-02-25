import { Typography } from 'antd'
import { Package } from "./Interfaces";
import { useState } from 'react';

const { Text } = Typography;

export type AssetProps = {
    asset: Package;
}

export const AssetCompact: React.FC<AssetProps> = ({ asset }) => {
    const [hover, setHover] = useState(false);
    
    const generateFacepunchPackageUrl = (ident: string) => {
        const identParts = ident.split('.');
        
        if (identParts.length !== 2) {
            return '';
        }

        return `https://sbox.game/${identParts[0]}/${identParts[1]}`;
    }

    return (
        <div 
            key={asset.id} 
            className="package-compact" 
            style={{ position: 'relative' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <a href={generateFacepunchPackageUrl(asset.metadata.FullIdent)} target="_blank">
                <div style={{ position: 'relative' }}>
                    {hover && 
                        <Text strong className='package-compact-text'>
                            {asset.metadata.Title}
                        </Text>
                    }
                    <img 
                        src={asset.metadata.Thumb} 
                        alt={asset.metadata.Title}
                    />
                </div>
            </a>
        </div>
    )
}