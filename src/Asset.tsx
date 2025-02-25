import { Typography, Space } from 'antd'
import { Package } from "./Interfaces";
import { ExportOutlined } from '@ant-design/icons';

const { Title, Text, Link } = Typography;

export type AssetProps = {
    asset: Package;
}

export const Asset: React.FC<AssetProps> = ({ asset }) => {
    
    const generateFacepunchPackageUrl = (ident: string) => {
        const identParts = ident.split('.');
        
        if (identParts.length !== 2) {
            return '';
        }

        return `https://sbox.game/${identParts[0]}/${identParts[1]}`;
    }
    
    const capsFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div key={asset.id} className="package">
            <Space direction="vertical" size={1}>
                <Title level={5} className="package-title">{asset.metadata.Title}</Title>
                
                <Link href={generateFacepunchPackageUrl(asset.metadata.FullIdent)} target="_blank" underline>
                    <img 
                        src={asset.metadata.Thumb} 
                        alt={asset.metadata.Title}
                    />
                    View on sbox.game<ExportOutlined style={{marginLeft: 4}}/>
                </Link>

                <div className="type-id">
                    <Text italic>{capsFirstLetter(asset.metadata.Type)}</Text>
                    <Text copyable={{ text: asset.metadata.FullIdent }}>ID</Text>
                </div>
            </Space>
        </div>
    )
}
