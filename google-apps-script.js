// Google Apps Script - 工具和Showcase数据导出
// 功能：从Google Sheet读取数据并导出到GitHub

function onEdit(e) {
  // 当表格有任何编辑时自动触发
  exportToGitHub();
  exportShowcaseToGitHub();
}

function exportToGitHub() {
  // 配置信息
  const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN_HERE'; // 请替换为你的GitHub令牌
  const GITHUB_REPO = 'Garena544/garena-ld-tools';
  const FILE_PATH = 'src/data/tools.json';
  
  // 读取数据
  const toolsData = readToolsFromSheet();
  
  // 转换为JSON
  const jsonData = {
    tools: toolsData,
    lastUpdated: new Date().toISOString()
  };
  
  // 推送到GitHub
  updateGitHubFile(GITHUB_TOKEN, GITHUB_REPO, FILE_PATH, JSON.stringify(jsonData, null, 2));
}

function exportShowcaseToGitHub() {
  // 配置信息
  const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN_HERE'; // 请替换为你的GitHub令牌
  const GITHUB_REPO = 'Garena544/garena-ld-tools';
  const FILE_PATH = 'src/data/showcase.json';
  
  // 读取数据
  const showcaseData = readShowcaseFromSheet();
  
  // 转换为JSON
  const jsonData = {
    showcase: showcaseData,
    lastUpdated: new Date().toISOString()
  };
  
  // 推送到GitHub
  updateGitHubFile(GITHUB_TOKEN, GITHUB_REPO, FILE_PATH, JSON.stringify(jsonData, null, 2));
}

function readToolsFromSheet() {
  const SPREADSHEET_ID = '12eedRic5Qegy5O20tBxQeN3WZM1JtgWh2vyvWnFZ_bk';
  const TAB_NAME = 'Master';
  
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(TAB_NAME);
    
    if (!sheet) {
      throw new Error(`Sheet "${TAB_NAME}" not found in spreadsheet`);
    }
    
    const data = sheet.getDataRange().getValues();
    console.log(`读取到 ${data.length} 行工具数据`);
    
    const tools = [];
    
    // 跳过标题行，从第二行开始
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // 检查是否有必要的数据（中文工具名称和英文工具名称）
      if (!row[2] || !row[10]) {
        console.log(`跳过第${i+1}行: 缺少必要数据`);
        continue;
      }
      
      const tool = {
        id: generateId(row[10]), // 基于英文工具名称生成ID
        name: {
          zh: row[2], // C列：工具名称
          en: row[10] // K列：Tool Name
        },
        description: {
          zh: row[3], // D列：工具说明
          en: row[11] // L列：Description
        },
        category: {
          zh: row[1], // B列：类型
          en: row[9]  // J列：Type
        },
        features: {
          zh: extractFeatures(row[4]), // E列：主要功能
          en: extractFeatures(row[12]) // M列：Main Functions
        },
        remarks: {
          zh: row[5] || '', // F列：补充信息
          en: row[13] || '' // N列：Remarks
        },
        rating: 4, // 默认评分
        url: row[6] || row[14] || null, // G列或O列：链接
        tutorialUrl: row[7] || row[15] || null, // H列或P列：教学视频
        icon: determineIcon(row[9] || row[1]) // 基于英文或中文类型确定图标
      };
      
      tools.push(tool);
    }
    
    console.log(`成功读取 ${tools.length} 个工具`);
    return tools;
    
  } catch (error) {
    console.log('读取工具数据时出错:', error.toString());
    throw error;
  }
}

function readShowcaseFromSheet() {
  const SPREADSHEET_ID = '12eedRic5Qegy5O20tBxQeN3WZM1JtgWh2vyvWnFZ_bk';
  const TAB_NAME = 'best pratise showcase';
  
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // 首先列出所有表格名称，用于调试
    const sheets = spreadsheet.getSheets();
    console.log('Available sheets:');
    sheets.forEach(sheet => {
      console.log('- ' + sheet.getName());
    });
    
    const sheet = spreadsheet.getSheetByName(TAB_NAME);
    
    if (!sheet) {
      throw new Error(`Sheet "${TAB_NAME}" not found in spreadsheet`);
    }
    
    const data = sheet.getDataRange().getValues();
    console.log(`读取到 ${data.length} 行showcase数据`);
    
    const showcaseItems = [];
    
    // 跳过标题行，从第二行开始
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // 检查是否有必要的数据（showcase内容）
      if (!row[2]) {
        console.log(`跳过第${i+1}行: 缺少showcase内容`);
        continue;
      }
      
      const item = {
        id: generateId(row[2]),
        sn: row[0] || String(i).padStart(3, '0'),
        pic: row[1] || '', // B列：PIC (Person in Charge)
        showcase: row[2], // C列：showcase内容
        link: row[3] || '' // D列：link
      };
      
      showcaseItems.push(item);
    }
    
    console.log(`成功读取 ${showcaseItems.length} 个showcase项目`);
    return showcaseItems;
    
  } catch (error) {
    console.log('读取showcase数据时出错:', error.toString());
    throw error;
  }
}

function generateId(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractFeatures(functionsText) {
  if (!functionsText) return [];
  
  // 支持多种分隔符：分号、逗号、换行符、顿号
  const features = functionsText
    .split(/[;,\n、]/)
    .map(f => f.trim())
    .filter(f => f.length > 0 && f.length < 100) // 过滤掉太长或太短的内容
    .slice(0, 4); // 最多取4个功能
  
  return features;
}

function determineIcon(type) {
  const iconMap = {
    // 英文关键词
    'learning': 'BookOpen',
    'education': 'BookOpen',
    'communication': 'MessageSquare',
    'video': 'Video',
    'conference': 'Video',
    'analytics': 'BarChart3',
    'data': 'BarChart3',
    'collaboration': 'Users',
    'team': 'Users',
    'scheduling': 'Calendar',
    'calendar': 'Calendar',
    'development': 'Monitor',
    'coding': 'Monitor',
    'gaming': 'Gamepad2',
    'game': 'Gamepad2',
    'management': 'Brain',
    'assessment': 'Brain',
    'training': 'Presentation',
    'course': 'Presentation',
    'design': 'Presentation',
    
    // 中文关键词
    '学习': 'BookOpen',
    '教育': 'BookOpen',
    '沟通': 'MessageSquare',
    '交流': 'MessageSquare',
    '视频': 'Video',
    '会议': 'Video',
    '分析': 'BarChart3',
    '数据': 'BarChart3',
    '协作': 'Users',
    '团队': 'Users',
    '日程': 'Calendar',
    '排程': 'Calendar',
    '开发': 'Monitor',
    '编程': 'Monitor',
    '游戏': 'Gamepad2',
    '管理': 'Brain',
    '评估': 'Brain',
    '培训': 'Presentation',
    '课程': 'Presentation',
    '设计': 'Presentation'
  };
  
  const lowerType = (type || '').toLowerCase();
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowerType.includes(key)) {
      return icon;
    }
  }
  return 'Monitor'; // 默认图标
}

function updateGitHubFile(token, repo, path, content) {
  const baseUrl = `https://api.github.com/repos/${repo}/contents/${path}`;
  
  // 首先获取文件的SHA（如果文件存在）
  let sha = null;
  try {
    const getResponse = UrlFetchApp.fetch(baseUrl, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
    
    if (getResponse.getResponseCode() === 200) {
      const fileData = JSON.parse(getResponse.getContentText());
      sha = fileData.sha;
    }
  } catch (e) {
    console.log('File does not exist, will create new file');
  }
  
  // 更新或创建文件
  const payload = {
    message: `Update data - ${new Date().toISOString()}`,
    content: Utilities.base64Encode(content, Utilities.Charset.UTF_8),
    sha: sha
  };
  
  const options = {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json; charset=utf-8'
    },
    payload: JSON.stringify(payload)
  };
  
  try {
    const response = UrlFetchApp.fetch(baseUrl, options);
    if (response.getResponseCode() === 200 || response.getResponseCode() === 201) {
      console.log('Successfully updated GitHub file');
      
      // 可选：发送通知邮件
      sendNotificationEmail('Data updated successfully');
    } else {
      console.log('Error updating GitHub file:', response.getContentText());
      sendNotificationEmail('Error updating data: ' + response.getContentText());
    }
  } catch (error) {
    console.log('Error:', error.toString());
    sendNotificationEmail('Error updating data: ' + error.toString());
  }
}

function sendNotificationEmail(message) {
  // 可选：发送邮件通知
  try {
    MailApp.sendEmail({
      to: Session.getActiveUser().getEmail(),
      subject: 'L&D Data Update',
      body: message
    });
  } catch (e) {
    console.log('Could not send notification email');
  }
}

// 测试函数
function testExport() {
  exportToGitHub();
}

function testShowcaseExport() {
  exportShowcaseToGitHub();
}

function testBothExports() {
  exportToGitHub();
  exportShowcaseToGitHub();
}

// 预览JSON数据（用于调试）
function previewToolsJSON() {
  const toolsData = readToolsFromSheet();
  const jsonData = {
    tools: toolsData,
    lastUpdated: new Date().toISOString()
  };
  
  console.log(JSON.stringify(jsonData, null, 2));
}

function previewShowcaseJSON() {
  const showcaseData = readShowcaseFromSheet();
  const jsonData = {
    showcase: showcaseData,
    lastUpdated: new Date().toISOString()
  };
  
  console.log(JSON.stringify(jsonData, null, 2));
}