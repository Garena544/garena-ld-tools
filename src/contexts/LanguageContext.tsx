import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'header.title': 'Learning & Development',
    'header.subtitle': 'Tools & Resources',
    'header.internal': 'Internal Tools',
    'header.external': 'External Tools',
    'header.contact': 'Contact',

    // Hero
    'hero.title': 'Empowering Growth Through',
    'hero.titleHighlight': ' AI-Enhanced Learning',
    'hero.description': 'Discover how AI is transforming Learning & Development at Garena. Join us in leveraging AI tools to create engaging learning content, enhance training materials, and support collaborative learning across our organization.',
    'hero.exploreTools': 'Explore AI Tools',
    'hero.getStarted': 'Start Learning',
    'hero.feature1.title': 'AI Content Creation',
    'hero.feature1.desc': 'Use AI tools to create engaging learning materials and training content',
    'hero.feature2.title': 'Collaborative Learning',
    'hero.feature2.desc': 'Foster team learning through AI-enhanced collaboration and knowledge sharing',
    'hero.feature3.title': 'Enhanced Training',
    'hero.feature3.desc': 'Leverage AI to improve training effectiveness and learning outcomes',

    // Tools Section
    'tools.internal.title': 'Internal Development Tools',
    'tools.internal.desc': 'Proprietary solutions built specifically for Garena\'s unique learning and development needs, designed to integrate seamlessly with our company culture and workflows.',
    'tools.external.title': 'External Partner Tools',
    'tools.external.desc': 'Carefully selected third-party platforms and services that complement our internal tools, providing comprehensive learning experiences and industry-standard capabilities.',
    'tools.remarks': 'Remarks',
    'tools.features': 'Key Features:',
    'tools.noInternalTools': 'No internal tools available',
    'tools.noExternalTools': 'No external tools available',

    // Tools Explanation
    'tools.explanation.internal.title': 'Internal Tools',
    'tools.explanation.internal.description': 'Tools developed in-house by our company or customized from external solutions to meet our specific needs. These tools are fully integrated with our workflows and available to all employees.',
    'tools.explanation.external.title': 'External Tools',
    'tools.explanation.external.description': 'Third-party tools developed by external companies. Some tools may require account registration or approval before use. These tools complement our internal solutions.',

    // Internal Tools
    'tools.garenaHub.name': 'Garena Learning Hub',
    'tools.garenaHub.desc': 'Our proprietary learning management system designed specifically for Garena employees, featuring personalized learning paths and progress tracking.',
    'tools.garenaHub.category': 'Learning Management',
    'tools.garenaHub.feature1': 'Personalized learning paths',
    'tools.garenaHub.feature2': 'Progress tracking & analytics',
    'tools.garenaHub.feature3': 'Interactive assessments',
    'tools.garenaHub.feature4': 'Peer collaboration features',

    'tools.skillForge.name': 'SkillForge',
    'tools.skillForge.desc': 'Internal skill assessment and development platform that maps employee competencies and suggests targeted improvement areas.',
    'tools.skillForge.category': 'Skill Assessment',
    'tools.skillForge.feature1': '360-degree skill assessment',
    'tools.skillForge.feature2': 'Competency mapping',
    'tools.skillForge.feature3': 'Development recommendations',
    'tools.skillForge.feature4': 'Manager insights dashboard',

    'tools.teamSync.name': 'TeamSync Academy',
    'tools.teamSync.desc': 'Collaborative learning platform for team-based training sessions, workshops, and knowledge sharing initiatives.',
    'tools.teamSync.category': 'Team Learning',
    'tools.teamSync.feature1': 'Virtual workshop rooms',
    'tools.teamSync.feature2': 'Real-time collaboration',
    'tools.teamSync.feature3': 'Knowledge base integration',
    'tools.teamSync.feature4': 'Session recording & playback',

    'tools.gameDev.name': 'GameDev Simulator',
    'tools.gameDev.desc': 'Specialized training environment for game development teams to practice and learn new technologies in a safe sandbox environment.',
    'tools.gameDev.category': 'Technical Training',
    'tools.gameDev.feature1': 'Sandbox development environment',
    'tools.gameDev.feature2': 'Code review simulations',
    'tools.gameDev.feature3': 'Best practices tutorials',
    'tools.gameDev.feature4': 'Performance optimization labs',

    // External Tools
    'tools.linkedin.name': 'LinkedIn Learning',
    'tools.linkedin.desc': 'Professional development platform offering thousands of courses across business, technology, and creative skills.',
    'tools.linkedin.category': 'Online Learning',
    'tools.linkedin.feature1': 'Expert-led courses',
    'tools.linkedin.feature2': 'Skill assessments',
    'tools.linkedin.feature3': 'Learning paths',
    'tools.linkedin.feature4': 'Mobile accessibility',

    'tools.coursera.name': 'Coursera for Business',
    'tools.coursera.desc': 'University-level courses and specializations from top institutions, perfect for advanced skill development.',
    'tools.coursera.category': 'Academic Learning',
    'tools.coursera.feature1': 'University partnerships',
    'tools.coursera.feature2': 'Professional certificates',
    'tools.coursera.feature3': 'Hands-on projects',
    'tools.coursera.feature4': 'Peer-reviewed assignments',

    'tools.zoom.name': 'Zoom',
    'tools.zoom.desc': 'Video conferencing platform for virtual training sessions, webinars, and interactive learning experiences.',
    'tools.zoom.category': 'Communication',
    'tools.zoom.feature1': 'HD video conferencing',
    'tools.zoom.feature2': 'Screen sharing',
    'tools.zoom.feature3': 'Breakout rooms',
    'tools.zoom.feature4': 'Recording capabilities',

    'tools.slack.name': 'Slack',
    'tools.slack.desc': 'Team communication platform that facilitates knowledge sharing, mentoring, and collaborative learning.',
    'tools.slack.category': 'Collaboration',
    'tools.slack.feature1': 'Channel-based messaging',
    'tools.slack.feature2': 'File sharing',
    'tools.slack.feature3': 'Integration ecosystem',
    'tools.slack.feature4': 'Search functionality',

    'tools.calendly.name': 'Calendly',
    'tools.calendly.desc': 'Scheduling tool for organizing mentoring sessions, training appointments, and learning consultations.',
    'tools.calendly.category': 'Scheduling',
    'tools.calendly.feature1': 'Automated scheduling',
    'tools.calendly.feature2': 'Calendar integration',
    'tools.calendly.feature3': 'Reminder notifications',
    'tools.calendly.feature4': 'Time zone handling',

    'tools.tableau.name': 'Tableau',
    'tools.tableau.desc': 'Data visualization platform for learning analytics, training effectiveness measurement, and progress reporting.',
    'tools.tableau.category': 'Analytics',
    'tools.tableau.feature1': 'Interactive dashboards',
    'tools.tableau.feature2': 'Real-time data analysis',
    'tools.tableau.feature3': 'Custom visualizations',
    'tools.tableau.feature4': 'Collaboration features',

    // Footer
    'footer.description': 'Empowering our teams with cutting-edge learning tools and resources to drive innovation and excellence across all Garena divisions.',
    'footer.quickLinks': 'Quick Links',
    'footer.trainingCalendar': 'Training Calendar',
    'footer.resourceLibrary': 'Resource Library',
    'footer.contactTeam': 'Contact L&D Team',
    'footer.copyright': '© 2024 Garena. All rights reserved. | Learning & Development Division',

    // Sidebar
    'sidebar.navigation': 'Navigation',
    'sidebar.tools': 'Tools',
    'sidebar.internal-tools': 'Internal Tools',
    'sidebar.external-tools': 'External Tools',
    'sidebar.showcase': 'Best Practice Showcase',
    'sidebar.wishing-pool': 'Wishing Pool',
    'sidebar.learning-portal': 'Learning Portal',

    // Showcase
    'showcase.title': 'Best Practice Showcase',
    'showcase.description': 'Discover innovative learning practices and success stories from across our organization.',
    'showcase.pic': 'Person in Charge',
    'showcase.viewMore': 'View More',
    'showcase.retry': 'Retry',
    'showcase.noItems': 'No showcase items available',

    // Wishing Pool
    'wishingPool.title': 'Wishing Pool',
    'wishingPool.description': 'Share your learning wishes and suggestions. We\'ll review and consider implementing the most popular requests.',
    'wishingPool.submitTitle': 'Submit Your Wish',
    'wishingPool.listTitle': 'All Wishes',
    'wishingPool.submit': 'Submit Wish',
    'wishingPool.submitting': 'Submitting...',
    'wishingPool.successMessage': 'Your wish has been submitted successfully!',
    'wishingPool.noItems': 'No wishes submitted yet',
    'wishingPool.form.name': 'Name',
    'wishingPool.form.namePlaceholder': 'Enter your name',
    'wishingPool.form.wish': 'Wish',
    'wishingPool.form.wishPlaceholder': 'Describe your learning wish or suggestion...',
    'wishingPool.table.sn': 'S/N',
    'wishingPool.table.name': 'Name',
    'wishingPool.table.wish': 'Wish',
    'wishingPool.table.status': 'Status',
    'wishingPool.status.pending': 'Pending',
    'wishingPool.status.approved': 'Approved',
    'wishingPool.status.rejected': 'Rejected'
  },
  zh: {
    // Header
    'header.title': '学习与发展',
    'header.subtitle': '工具与资源',
    'header.internal': '内部工具',
    'header.external': '外部工具',
    'header.contact': '联系我们',

    // Hero
    'hero.title': '通过',
    'hero.titleHighlight': 'AI增强学习',
    'hero.description': '探索AI如何革新Garena的学习与发展。加入我们，利用AI工具创造引人入胜的学习内容，增强培训材料，支持整个组织的协作学习。',
    'hero.exploreTools': '探索AI工具',
    'hero.getStarted': '开始学习',
    'hero.feature1.title': 'AI内容创作',
    'hero.feature1.desc': '使用AI工具创造引人入胜的学习材料和培训内容',
    'hero.feature2.title': '协作学习',
    'hero.feature2.desc': '通过AI增强的协作和知识分享促进团队学习',
    'hero.feature3.title': '增强培训',
    'hero.feature3.desc': '利用AI提高培训效果和学习成果',

    // Tools Section
    'tools.internal.title': '内部开发工具',
    'tools.internal.desc': '专为Garena独特的学习和发展需求而构建的专有解决方案，旨在与我们的企业文化和工作流程无缝集成。',
    'tools.external.title': '外部合作工具',
    'tools.external.desc': '精心挑选的第三方平台和服务，补充我们的内部工具，提供全面的学习体验和行业标准功能。',
    'tools.remarks': '备注',
    'tools.features': '主要功能：',
    'tools.noInternalTools': '暂无内部工具',
    'tools.noExternalTools': '暂无外部工具',

    // Tools Explanation
    'tools.explanation.internal.title': '内部工具',
    'tools.explanation.internal.description': '由公司自主研发或基于外部工具二次开发而成的专属工具。这些工具与我们的工作流程深度集成，为所有员工提供便捷的使用体验。',
    'tools.explanation.external.title': '外部工具',
    'tools.explanation.external.description': '由外部公司开发的第三方工具。部分工具可能需要申请账号或获得批准后才能使用。这些工具是对我们内部解决方案的有益补充。',

    // Internal Tools
    'tools.garenaHub.name': 'Garena学习中心',
    'tools.garenaHub.desc': '专为Garena员工设计的专有学习管理系统，具有个性化学习路径和进度跟踪功能。',
    'tools.garenaHub.category': '学习管理',
    'tools.garenaHub.feature1': '个性化学习路径',
    'tools.garenaHub.feature2': '进度跟踪与分析',
    'tools.garenaHub.feature3': '互动评估',
    'tools.garenaHub.feature4': '同伴协作功能',

    'tools.skillForge.name': '技能锻造',
    'tools.skillForge.desc': '内部技能评估和发展平台，映射员工能力并建议有针对性的改进领域。',
    'tools.skillForge.category': '技能评估',
    'tools.skillForge.feature1': '360度技能评估',
    'tools.skillForge.feature2': '能力映射',
    'tools.skillForge.feature3': '发展建议',
    'tools.skillForge.feature4': '管理者洞察仪表板',

    'tools.teamSync.name': '团队同步学院',
    'tools.teamSync.desc': '用于团队培训课程、研讨会和知识分享活动的协作学习平台。',
    'tools.teamSync.category': '团队学习',
    'tools.teamSync.feature1': '虚拟研讨室',
    'tools.teamSync.feature2': '实时协作',
    'tools.teamSync.feature3': '知识库集成',
    'tools.teamSync.feature4': '会话录制与回放',

    'tools.gameDev.name': '游戏开发模拟器',
    'tools.gameDev.desc': '专为游戏开发团队设计的培训环境，在安全的沙盒环境中练习和学习新技术。',
    'tools.gameDev.category': '技术培训',
    'tools.gameDev.feature1': '沙盒开发环境',
    'tools.gameDev.feature2': '代码审查模拟',
    'tools.gameDev.feature3': '最佳实践教程',
    'tools.gameDev.feature4': '性能优化实验室',

    // External Tools
    'tools.linkedin.name': 'LinkedIn学习',
    'tools.linkedin.desc': '专业发展平台，提供涵盖商业、技术和创意技能的数千门课程。',
    'tools.linkedin.category': '在线学习',
    'tools.linkedin.feature1': '专家主导的课程',
    'tools.linkedin.feature2': '技能评估',
    'tools.linkedin.feature3': '学习路径',
    'tools.linkedin.feature4': '移动端访问',

    'tools.coursera.name': 'Coursera商业版',
    'tools.coursera.desc': '来自顶级机构的大学级课程和专业化课程，非常适合高级技能发展。',
    'tools.coursera.category': '学术学习',
    'tools.coursera.feature1': '大学合作伙伴',
    'tools.coursera.feature2': '专业证书',
    'tools.coursera.feature3': '实践项目',
    'tools.coursera.feature4': '同行评议作业',

    'tools.zoom.name': 'Zoom',
    'tools.zoom.desc': '用于虚拟培训课程、网络研讨会和互动学习体验的视频会议平台。',
    'tools.zoom.category': '通信',
    'tools.zoom.feature1': '高清视频会议',
    'tools.zoom.feature2': '屏幕共享',
    'tools.zoom.feature3': '分组讨论室',
    'tools.zoom.feature4': '录制功能',

    'tools.slack.name': 'Slack',
    'tools.slack.desc': '促进知识分享、指导和协作学习的团队沟通平台。',
    'tools.slack.category': '协作',
    'tools.slack.feature1': '基于频道的消息传递',
    'tools.slack.feature2': '文件共享',
    'tools.slack.feature3': '集成生态系统',
    'tools.slack.feature4': '搜索功能',

    'tools.calendly.name': 'Calendly',
    'tools.calendly.desc': '用于组织指导会议、培训预约和学习咨询的调度工具。',
    'tools.calendly.category': '调度',
    'tools.calendly.feature1': '自动调度',
    'tools.calendly.feature2': '日历集成',
    'tools.calendly.feature3': '提醒通知',
    'tools.calendly.feature4': '时区处理',

    'tools.tableau.name': 'Tableau',
    'tools.tableau.desc': '用于学习分析、培训效果测量和进度报告的数据可视化平台。',
    'tools.tableau.category': '分析',
    'tools.tableau.feature1': '交互式仪表板',
    'tools.tableau.feature2': '实时数据分析',
    'tools.tableau.feature3': '自定义可视化',
    'tools.tableau.feature4': '协作功能',

    // Footer
    'footer.description': '通过前沿的学习工具和资源赋能我们的团队，推动Garena各部门的创新和卓越。',
    'footer.quickLinks': '快速链接',
    'footer.trainingCalendar': '培训日历',
    'footer.resourceLibrary': '资源库',
    'footer.contactTeam': '联系L&D团队',
    'footer.copyright': '© 2024 Garena. 保留所有权利。| 学习与发展部门',

    // Sidebar
    'sidebar.navigation': '导航',
    'sidebar.tools': '工具',
    'sidebar.internal-tools': '内部工具',
    'sidebar.external-tools': '外部工具',
    'sidebar.showcase': '最佳实践展示',
    'sidebar.wishing-pool': '许愿池',
    'sidebar.learning-portal': '学习门户',

    // Showcase
    'showcase.title': '最佳实践展示',
    'showcase.description': '发现我们组织中的创新学习实践和成功案例。',
    'showcase.pic': '负责人',
    'showcase.viewMore': '查看更多',
    'showcase.retry': '重试',
    'showcase.noItems': '暂无展示项目',

    // Wishing Pool
    'wishingPool.title': '许愿池',
    'wishingPool.description': '分享你的学习愿望和建议。我们会审查并考虑实施最受欢迎的请求。',
    'wishingPool.submitTitle': '提交你的愿望',
    'wishingPool.listTitle': '所有愿望',
    'wishingPool.submit': '提交愿望',
    'wishingPool.submitting': '提交中...',
    'wishingPool.successMessage': '你的愿望已成功提交！',
    'wishingPool.noItems': '暂无愿望提交',
    'wishingPool.form.name': '姓名',
    'wishingPool.form.namePlaceholder': '输入你的姓名',
    'wishingPool.form.wish': '愿望',
    'wishingPool.form.wishPlaceholder': '描述你的学习愿望或建议...',
    'wishingPool.table.sn': '序号',
    'wishingPool.table.name': '姓名',
    'wishingPool.table.wish': '愿望',
    'wishingPool.table.status': '状态',
    'wishingPool.status.pending': '待处理',
    'wishingPool.status.approved': '已批准',
    'wishingPool.status.rejected': '已拒绝'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}