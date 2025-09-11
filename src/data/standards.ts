import { RegulatoryStandard } from '@/types';

export const regulatoryStandards: RegulatoryStandard[] = [
  {
    id: 'fda-qsr',
    name: 'FDA Quality System Regulation (21 CFR Part 820)',
    description: 'Comprehensive quality system requirements for medical device manufacturers in the United States.',
    authority: 'U.S. Food and Drug Administration',
    category: 'fda',
    sections: [
      {
        id: '820.1',
        title: 'Scope',
        content: 'This part contains the quality system regulation for medical devices. The regulation in this part supplements regulations in other parts of this chapter except where explicitly stated otherwise.'
      },
      {
        id: '820.3',
        title: 'Definitions',
        content: 'As used in this part: (a) Act means the Federal Food, Drug, and Cosmetic Act. (b) Complaint means any written, electronic, or oral communication that alleges deficiencies related to the identity, quality, durability, reliability, safety, effectiveness, or performance of a device after it is released for distribution.'
      },
      {
        id: '820.20',
        title: 'Management Responsibility',
        content: 'Each manufacturer shall establish and maintain an adequate quality system. The quality system shall be appropriate for the specific medical device(s) designed, manufactured, packaged, labeled, stored, installed, and serviced.'
      },
      {
        id: '820.22',
        title: 'Quality Audit',
        content: 'Each manufacturer shall establish procedures for quality audits and conduct such audits to assure that the quality system is in compliance with the established quality system requirements and to determine the effectiveness of the quality system.'
      },
      {
        id: '820.30',
        title: 'Design Controls',
        content: 'Each manufacturer of any class II or class III device, and the class I devices listed in paragraph (a)(2) of this section, shall establish and maintain procedures to control the design of the device in order to ensure that specified design requirements are met.'
      },
      {
        id: '820.50',
        title: 'Purchasing Controls',
        content: 'Each manufacturer shall establish and maintain procedures to ensure that all purchased or otherwise received product and services conform to specified requirements.'
      },
      {
        id: '820.70',
        title: 'Production and Process Controls',
        content: 'Each manufacturer shall develop, conduct, control, and monitor production processes to ensure that a device conforms to its specified requirements.'
      },
      {
        id: '820.100',
        title: 'Corrective and Preventive Action',
        content: 'Each manufacturer shall establish and maintain procedures for implementing corrective and preventive action. The procedures shall include requirements for: (a) Analyzing processes, work operations, concessions, quality audit reports, quality records, service records, complaints, returned product, and other sources of quality data to identify existing and potential causes of nonconforming product.'
      }
    ]
  },
  {
    id: 'iso-13485',
    name: 'ISO 13485:2016 Medical Devices Quality Management',
    description: 'International standard for quality management systems in medical device organizations.',
    authority: 'International Organization for Standardization',
    category: 'iso',
    sections: [
      {
        id: '4.1',
        title: 'General Requirements',
        content: 'The organization shall establish, document, implement and maintain a quality management system and maintain its effectiveness in accordance with the requirements of this International Standard.'
      },
      {
        id: '4.2',
        title: 'Documentation Requirements',
        content: 'The quality management system documentation shall include: documented statements of a quality policy and quality objectives, a quality manual, documented procedures and records required by this International Standard.'
      },
      {
        id: '5.1',
        title: 'Management Commitment',
        content: 'Top management shall provide evidence of its commitment to the development and implementation of the quality management system and to maintaining its effectiveness.'
      },
      {
        id: '7.3',
        title: 'Design and Development',
        content: 'The organization shall plan and control the design and development of the medical device. Design and development planning shall determine the design and development stages, the review, verification and validation that are appropriate to each design and development stage.'
      },
      {
        id: '8.2.1',
        title: 'Feedback',
        content: 'As one of the measurements of the performance of the quality management system, the organization shall monitor information relating to customer perception as to whether the organization has met customer requirements.'
      },
      {
        id: '8.5',
        title: 'Improvement',
        content: 'The organization shall continually improve the effectiveness of the quality management system through the use of the quality policy, quality objectives, audit results, analysis of data, corrective actions, preventive actions and management review.'
      }
    ]
  },
  {
    id: 'eu-mdr',
    name: 'EU Medical Device Regulation (2017/745)',
    description: 'European Union regulation governing medical devices to ensure safety and performance.',
    authority: 'European Commission',
    category: 'eu',
    sections: [
      {
        id: 'article-1',
        title: 'Subject Matter and Scope',
        content: 'This Regulation lays down rules concerning the placing on the market, making available on the market or putting into service of medical devices for human use and accessories for such devices in the Union.'
      },
      {
        id: 'article-10',
        title: 'General Obligations of Manufacturers',
        content: 'When placing their devices on the market or putting them into service, manufacturers shall ensure that they have been designed and manufactured in accordance with the requirements of this Regulation.'
      },
      {
        id: 'article-61',
        title: 'Clinical Evaluation',
        content: 'Clinical evaluation shall be based on clinical data providing sufficient clinical evidence to demonstrate conformity with the relevant general safety and performance requirements.'
      },
      {
        id: 'article-83',
        title: 'Post-Market Surveillance System',
        content: 'Manufacturers shall plan, establish, document, implement, maintain and update a post-market surveillance system which shall be proportionate to the risk class and appropriate for the type of device.'
      },
      {
        id: 'article-87',
        title: 'Reporting of Serious Incidents',
        content: 'Manufacturers shall report to the competent authority of the Member State in which the incident occurred any serious incident involving devices made available by them on the Union market.'
      }
    ]
  }
];

export const getStandardById = (id: string): RegulatoryStandard | undefined => {
  return regulatoryStandards.find(standard => standard.id === id);
};

export const searchStandards = (query: string): RegulatoryStandard[] => {
  const lowercaseQuery = query.toLowerCase();
  return regulatoryStandards.filter(standard => 
    standard.name.toLowerCase().includes(lowercaseQuery) ||
    standard.description.toLowerCase().includes(lowercaseQuery) ||
    standard.sections.some(section => 
      section.title.toLowerCase().includes(lowercaseQuery) ||
      section.content.toLowerCase().includes(lowercaseQuery)
    )
  );
};

export const findSection = (standardId: string, sectionId: string) => {
  const standard = getStandardById(standardId);
  return standard?.sections.find(section => section.id === sectionId);
};