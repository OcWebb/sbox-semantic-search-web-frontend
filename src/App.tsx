import { Input, Form, Select } from 'antd'
import { useState } from 'react'
import './App.css'

const { Search } = Input;

interface Package {
  id: string;
  metadata: {
    Created: number;
    FullIdent: string;
    Summary: string;
    Tags: string[];
    Thumb: string;
    Title: string;
    Type: string;
    Updated: number;
  };
}


const resourceTypes = [
  { value: 'model', label: 'Model' },
  { value: 'material', label: 'Material' },
  { value: 'sound', label: 'Sound' },
  { value: 'library', label: 'Library' },
  { value: 'map', label: 'Map' },
  { value: 'game', label: 'Game' },
  { value: 'prefab', label: 'Prefab' }
];

const initialValues = {
  resourceType: resourceTypes.map(resource => resource.value)
}

function App() {
  
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [packages, setPackages] = useState<Package[]>([])

  const handleSearch = async (values) => {
    setLoading(true);
    setPackages([]);
    try {
      const requestBody = {
        query: values.search || "",
        type_filter: values.resourceType ? values.resourceType : [],
        take: 5,
        skip: 0
      };

      const response = await fetch('/api/search/', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = (await response.json()) as Package[];

      setPackages(data)
      console.log('Search results:', data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form
      form={form}
      onFinish={handleSearch}
      style={{ margin: '0 auto', padding: '10px' }}
      initialValues={initialValues}
      >
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Form.Item
            name="resourceType"
            style={{width: '250px', marginBottom: 0 }}
          >
            <Select
              mode="multiple"
              placeholder="Resource Type"
              options={resourceTypes}
              maxTagCount={'responsive'}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="search"
            style={{ flex: 1, marginBottom: 0, minWidth: 200, maxWidth: 600 }}
          >
            <Search 
              placeholder="Input query here!" 
              loading={loading}
              onSearch={() => form.submit()}
            />
          </Form.Item>
        </div>
      </Form>
      {packages.map(asset => 
        <div style={{ display: 'flex',}}>{asset.metadata.Title}</div>
      )}
    </>
  )
}

export default App
