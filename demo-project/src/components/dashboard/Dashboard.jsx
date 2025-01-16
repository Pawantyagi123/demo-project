import { useTheme } from '@/context/ThemeContext';
import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertCircle, 
  Plus, 
  Trash2, 
  Code, 
  Send, 
  Save, 
  LogOut, 
  ChevronDown, 
  FileJson, 
  Upload, 
  Download, 
  Copy 
} from 'lucide-react';

function Dashboard() {
      const { theme } = useTheme();
    const [apiConfig, setApiConfig] = useState({
        name: '',
        url: '',
        method: 'GET'
      });
      const [parameters, setParameters] = useState([{ key: '', value: '' }]);
      const [activeTab, setActiveTab] = useState('configure');
      const [selectedLanguage, setSelectedLanguage] = useState('python');
      const [bodyType, setBodyType] = useState('json');
      const [requestHistory, setRequestHistory] = useState([]);
      const [generatedCode, setGeneratedCode] = useState('');
      const [apiType, setApiType] = useState('rest');
      const [schemaDefinition, setSchemaDefinition] = useState('');
      const [authentication, setAuthentication] = useState({
        type: 'none',
        apiKey: '',
        bearerToken: '',
        username: '',
        password: ''
      });
      const [headers, setHeaders] = useState([{ key: '', value: '' }]);
      const [wsEvents, setWsEvents] = useState([{ name: '', data: '' }]);
      const [soapAction, setSoapAction] = useState('');
      const [soapVersion, setSoapVersion] = useState('1.1');
    
    
    
      const supportedLanguages = {
        python: 'Python',
        javascript: 'JavaScript',
        java: 'Java',
        php: 'PHP',
        csharp: 'C#',
        ruby: 'Ruby',
        go: 'Go',
        rust: 'Rust'
      };
    
      const apiTypes = {
        rest: 'REST API',
        graphql: 'GraphQL API',
        websocket: 'WebSocket',
        soap: 'SOAP API'
      };
    
      const authTypes = {
        none: 'No Auth',
        apiKey: 'API Key',
        bearer: 'Bearer Token',
        basic: 'Basic Auth',
        oauth2: 'OAuth 2.0'
      };
    
      const bodyTypes = {
        json: 'JSON',
        raw: 'Raw',
        formData: 'Form Data',
        xWwwFormUrlencoded: 'x-www-form-urlencoded'
      };
    
      const generateCode = (language, config) => {
        const codeSnippets = {
          python: `import requests
    
    url = "${config.url}"
    payload = {
    ${parameters.map(p => `    "${p.key}": "${p.value}"`).join(',\n')}
    }
    headers = {
        "Content-Type": "application/json"
    }
    
    response = requests.${config.method.toLowerCase()}(url, json=payload, headers=headers)
    print(response.json())`,
          javascript: `fetch("${config.url}", {
      method: "${config.method}",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
    ${parameters.map(p => `    ${p.key}: "${p.value}"`).join(',\n')}
      })
    })
    .then(response => response.json())
    .then(data => console.log(data));`
        };
    
        return codeSnippets[language] || '// Code generation not implemented for this language yet';
      };
  return (
    <>
    <div className={`container p-4 mx-auto ${theme === "light" ? "bg-gray-800 text-white" : " bg-white text-black"}`}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">API Code Generator</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" /> Import
          </Button>
          <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex gap-2 mb-4">
          <TabsTrigger value="configure" className={`${theme === "light" ? "bg-white text-black" : "bg-gray-500 text-white"}`}>Configure</TabsTrigger>
          <TabsTrigger value="test" className={`${theme === "light" ? "bg-white text-black" : "bg-gray-500 text-white"}`}>Generated Code</TabsTrigger>
          <TabsTrigger value="history" className={`${theme === "light" ? "bg-white text-black" : "bg-gray-500 text-white"}`}>History</TabsTrigger>
        </TabsList>

        <TabsContent value="configure">
          <Card className="w-100">
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
              <div className='flex flex-wrap gap-4'>
                <div>
                  <label className="block mb-1 text-sm font-medium">API Type</label>
                  <Select value={apiType} onValueChange={setApiType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select API type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-200">
                      {Object.entries(apiTypes).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">Authentication</label>
                  <Select value={authentication.type} onValueChange={(value) => 
                    setAuthentication({ ...authentication, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select authentication type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-200">
                      {Object.entries(authTypes).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Body Type</label>
                  <Select value={bodyType} onValueChange={setBodyType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Body type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-200">
                      {Object.entries(bodyTypes).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                </div>
                {apiType === 'graphql' && (
                  <div>
                    <label className="block mb-1 text-sm font-medium">GraphQL Schema</label>
                    <Textarea
                      placeholder="type Query { ... }"
                      value={schemaDefinition}
                      onChange={(e) => setSchemaDefinition(e.target.value)}
                      className="h-40"
                    />
                  </div>
                )}

                <div>
                  <label className="block mb-1 text-sm font-medium">Headers</label>
                  {headers.map((header, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        placeholder="Header Key"
                        value={header.key}
                        onChange={(e) => {
                          const newHeaders = [...headers];
                          newHeaders[index].key = e.target.value;
                          setHeaders(newHeaders);
                        }}
                      />
                      <Input
                        placeholder="Header Value"
                        value={header.value}
                        onChange={(e) => {
                          const newHeaders = [...headers];
                          newHeaders[index].value = e.target.value;
                          setHeaders(newHeaders);
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newHeaders = headers.filter((_, i) => i !== index);
                          setHeaders(newHeaders);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setHeaders([...headers, { key: '', value: '' }])}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Header
                  </Button>
                </div>

                <div className="flex justify-end gap-2">
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {Object.entries(supportedLanguages).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={() => {
                    const code = generateCode(selectedLanguage, apiConfig);
                    setGeneratedCode(code);
                    setActiveTab('test');
                    setRequestHistory([
                      {
                        timestamp: new Date(),
                        config: { ...apiConfig },
                        language: selectedLanguage,
                        code
                      },
                      ...requestHistory
                    ]);
                  }}>
                    <Code className="w-4 h-4 mr-2" /> Generate Code
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test">
          <Card className="flex flex-col items-center justify-center text-center">
            <CardHeader>
              <CardTitle>Generated Code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-muted">
                <pre className="text-sm whitespace-pre-wrap">{generatedCode}</pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Generation History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {requestHistory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{item.config.method} {item.config.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(item.timestamp).toLocaleString()} - {supportedLanguages[item.language]}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setGeneratedCode(item.code);
                        setActiveTab('test');
                      }}
                    >
                      View Code
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </>
  )
}

export default Dashboard
