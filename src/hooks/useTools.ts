import { useState, useEffect } from 'react';
import localToolsData from '../data/tools.json';

interface Tool {
  id: string;
  name: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  category: {
    en: string;
    zh: string;
  };
  remarks?: {
    en: string;
    zh: string;
  };
  features: {
    en: string[];
    zh: string[];
  };
  rating: number;
  url?: string;
  tutorialUrl?: string;
  icon: string;
}

interface ToolsData {
  tools: Tool[];
  lastUpdated: string;
}

export function useTools() {
  const [toolsData, setToolsData] = useState<ToolsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    try {
      setLoading(true);
      setDebugInfo('开始加载工具数据...');
      
      // 优先使用本地导入的数据
      let data: ToolsData | null = null;
      
      // 首先尝试使用本地导入的数据
      if (localToolsData && localToolsData.tools && localToolsData.tools.length > 0) {
        setDebugInfo(`✅ 使用本地导入数据，工具数量: ${localToolsData.tools.length}`);
        data = localToolsData;
      } else {
        setDebugInfo('⚠️ 本地导入数据为空，尝试远程数据源');
        
        // 如果本地数据为空，尝试远程数据源
        const urls = [
          `https://api.allorigins.win/get?url=${encodeURIComponent('https://raw.githubusercontent.com/Garena544/garena-ld-tools/main/src/data/tools.json')}&cache=${Date.now()}`,
          `https://corsproxy.io/?${encodeURIComponent('https://raw.githubusercontent.com/Garena544/garena-ld-tools/main/src/data/tools.json')}&cache=${Date.now()}`
        ];
        
        for (let i = 0; i < urls.length; i++) {
          const url = urls[i];
          try {
            setDebugInfo(`尝试远程数据源 ${i + 1}/${urls.length}: ${url}`);
            
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
              },
              cache: 'no-cache'
            });
            
            setDebugInfo(`远程数据源 ${i + 1} 响应状态: ${response.status}`);

            if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            let jsonData: any;
            
            // 如果是CORS代理，需要从contents字段获取数据
            if (url.includes('allorigins.win')) {
              const proxyResponse = await response.json();
              if (proxyResponse.status.http_code === 200) {
                jsonData = JSON.parse(proxyResponse.contents);
                setDebugInfo(`AllOrigins代理数据获取成功，工具数量: ${jsonData?.tools?.length || 0}`);
              } else {
                throw new Error(`代理服务错误: ${proxyResponse.status.http_code}`);
              }
            } else if (url.includes('corsproxy.io')) {
              const text = await response.text();
              jsonData = JSON.parse(text);
              setDebugInfo(`CorsProxy代理数据获取成功，工具数量: ${jsonData?.tools?.length || 0}`);
            }
            
            // 清理数据，移除isInternal字段并确保数据结构正确
            if (jsonData.tools && Array.isArray(jsonData.tools)) {
              jsonData.tools = jsonData.tools.map((tool: any) => {
                const { isInternal, ...cleanTool } = tool;
                return cleanTool;
              });
            }
            
            // 只有当数据有实际内容时才使用
            if (jsonData.tools && jsonData.tools.length > 0) {
              data = jsonData;
              break; // 成功获取数据，跳出循环
            } else {
              setDebugInfo(`远程数据源 ${i + 1} 返回空数据，尝试下一个数据源`);
              continue; // 尝试下一个数据源
            }
            
          } catch (fetchError) {
            const lastError = fetchError instanceof Error ? fetchError.message : String(fetchError);
            setDebugInfo(`远程数据源 ${i + 1} 失败: ${lastError}`);
            continue; // 尝试下一个数据源
          }
        }
      }
      
      if (!data) {
        throw new Error('无法从任何数据源获取数据');
      }
      // 验证数据完整性
      if (!data || typeof data !== 'object') {
        setDebugInfo('❌ 数据格式验证失败: 不是有效对象');
        throw new Error('数据格式不正确');
      }
      
      if (!data.tools) {
        setDebugInfo('❌ 数据格式验证失败: 缺少tools字段');
        throw new Error('数据中缺少tools字段');
      }
      
      if (!Array.isArray(data.tools)) {
        setDebugInfo('数据格式验证失败: tools不是数组');
        setDebugInfo(`实际类型: ${typeof data.tools}, 值: ${JSON.stringify(data.tools).substring(0, 200)}`);
        throw new Error('tools字段不是数组');
      }
      
      // 显示第一个工具的信息用于调试
      if (data.tools.length > 0) {
        const firstTool = data.tools[0];
        const toolName = firstTool?.name?.zh || firstTool?.name?.en || '无名称';
        setDebugInfo(`✅ 成功加载 ${data.tools.length} 个工具。第一个工具: ${toolName}`);
        
        // 显示第一个工具的完整结构用于调试
        console.log('第一个工具的完整数据:', firstTool);
      } else {
        setDebugInfo('⚠️ 成功加载数据，但工具列表为空');
        console.log('完整数据结构:', data);
      }
      
      setToolsData(data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('加载工具数据失败:', err);
      setError(errorMessage);
      setDebugInfo(`❌ 加载失败: ${errorMessage}`);
      
      // 使用本地导入数据作为备用
      if (localToolsData && localToolsData.tools && localToolsData.tools.length > 0) {
        setDebugInfo(`⚠️ 使用本地导入数据作为备用`);
        setToolsData(localToolsData);
        setError(null);
      } else {
        setDebugInfo(`⚠️ 使用空数据作为备用`);
        setToolsData({
          tools: [],
          lastUpdated: new Date().toISOString()
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshTools = () => {
    loadTools();
  };

  return {
    tools: toolsData?.tools || [],
    lastUpdated: toolsData?.lastUpdated,
    loading,
    error,
    refreshTools,
    debugInfo
  };
}