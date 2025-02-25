import { Input, Form, Select, Flex, Checkbox, Pagination } from 'antd'
import { useState } from 'react'
import './App.css'
import { ResourceType, Package, SearchRequest } from './Interfaces';
import { Asset } from './Asset';
import { AssetCompact } from './AssetCompact';
import { searchAPI } from './services/api';

const { Search } = Input;

interface SearchValues {
  search?: string;
  resourceType?: ResourceType[];
}

function App() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [packages, setPackages] = useState<Package[]>([])
  const [compactView, setCompactView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [totalResults, setTotalResults] = useState(0);
  
  // Maximum number of results to fetch
  const MAX_RESULTS = 1000;

  const resourceTypes = Array.from(Object.entries(ResourceType)).map(([key, value]) => ({ label: key, value }));
  const initialFormValues = {
    resourceType: resourceTypes.map(resource => resource.value)
  }

  const handleSearch = async (values: SearchValues) => {
    setLoading(true);
    setPackages([]);
    setCurrentPage(1);
    try {
      const requestBody: SearchRequest = {
        query: values.search || "",
        type_filter: values.resourceType ? values.resourceType : [],
        take: pageSize,
        skip: 0
      };

      const data = await searchAPI.search(requestBody);
      
      setPackages(data);
      // Set total to either the actual count or MAX_RESULTS
      setTotalResults(Math.min(data.length === pageSize ? MAX_RESULTS : data.length, MAX_RESULTS));
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }

  const handlePageChange = async (page: number, size?: number) => {
    const newPageSize = size || pageSize;
    
    if (size && size !== pageSize) {
      setPageSize(size);
    }
    
    setCurrentPage(page);
    setLoading(true);
    
    try {
      const values = form.getFieldsValue();
      const requestBody: SearchRequest = {
        query: values.search || "",
        type_filter: values.resourceType ? values.resourceType : [],
        take: newPageSize,
        skip: (page - 1) * newPageSize
      };

      const data = await searchAPI.search(requestBody);
      setPackages(data);
      
      if (data.length < newPageSize && (page - 1) * newPageSize + data.length < totalResults) {
        setTotalResults((page - 1) * newPageSize + data.length);
      }
    } catch (error) {
      console.error('Pagination error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form
      form={form}
      onFinish={handleSearch}
      initialValues={initialFormValues}
      >
        <Flex wrap gap="small" justify='center'>
          <Form.Item
            name="resourceType"
            className='resource-type-select'
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
            className='search-input'
          >
            <Search 
              placeholder="Input query here!" 
              loading={loading}
              onSearch={() => form.submit()}
            />
          </Form.Item>
          <Form.Item>
            <Checkbox className="compact-view-checkbox" onChange={(e) => setCompactView(e.target.checked)}>Compact View</Checkbox>
          </Form.Item>
        </Flex>
      </Form>

      <Flex wrap gap="small" justify='center'>
        {packages.map(asset => (
          compactView ? 
          <AssetCompact key={asset.id} asset={asset}/> :
          <Asset key={asset.id} asset={asset}/>
        ))}
      </Flex>
      
      {packages.length > 0 && (
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalResults}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={['25', '50', '100']}
            disabled={loading}
          />
        </div>
      )}
    </>
  )
}

export default App
