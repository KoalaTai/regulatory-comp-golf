import { useState } from 'react';
import { ChatMessage, Citation } from '@/types';
import { regulatoryStandards, findSection } from '@/data/standards';

export function useComplianceChat() {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string): Promise<ChatMessage> => {
    setIsLoading(true);
    
    try {
      // Create AI prompt with regulatory context
      const prompt = spark.llmPrompt`You are a regulatory compliance expert assistant for medical devices. 

Context: The user is asking about medical device regulations including FDA QSR (21 CFR 820), ISO 13485, and EU MDR.

Available regulatory standards context:
${JSON.stringify(regulatoryStandards.map(s => ({
  id: s.id,
  name: s.name,
  sections: s.sections.map(sec => ({ id: sec.id, title: sec.title }))
})))}

User question: ${message}

Provide a helpful, accurate response about medical device regulatory compliance. If you reference specific regulations, cite them properly (e.g., "21 CFR 820.30" or "ISO 13485:2016 Section 7.3"). Be specific and professional.

If the question relates to audit practices, quality systems, or compliance procedures, provide practical guidance while emphasizing the importance of consulting with qualified regulatory professionals for official guidance.`;

      const response = await spark.llm(prompt);
      
      // Extract potential citations from the response
      const citations = extractCitations(response);
      
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        citations,
        timestamp: new Date().toISOString()
      };
      
      return assistantMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      return {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble accessing my knowledge base right now. Please try again in a moment, or browse our regulatory standards directly for the information you need.',
        timestamp: new Date().toISOString()
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessage,
    isLoading
  };
}

function extractCitations(text: string): Citation[] {
  const citations: Citation[] = [];
  
  // Look for FDA citations (21 CFR 820.x)
  const fdaMatches = text.match(/21\s*CFR\s*820\.(\d+)/gi);
  if (fdaMatches) {
    fdaMatches.forEach(match => {
      const sectionId = match.match(/820\.(\d+)/i)?.[0];
      if (sectionId) {
        const section = findSection('fda-qsr', sectionId);
        if (section) {
          citations.push({
            standard: 'FDA QSR',
            section: sectionId,
            text: section.title
          });
        }
      }
    });
  }
  
  // Look for ISO citations
  const isoMatches = text.match(/ISO\s*13485[:\s]*(?:2016)?[,\s]*Section\s*(\d+\.?\d*)/gi);
  if (isoMatches) {
    isoMatches.forEach(match => {
      const sectionId = match.match(/Section\s*(\d+\.?\d*)/i)?.[1];
      if (sectionId) {
        const section = findSection('iso-13485', sectionId);
        if (section) {
          citations.push({
            standard: 'ISO 13485:2016',
            section: sectionId,
            text: section.title
          });
        }
      }
    });
  }
  
  // Look for EU MDR citations
  const euMatches = text.match(/(?:EU\s*MDR|MDR)\s*Article\s*(\d+)/gi);
  if (euMatches) {
    euMatches.forEach(match => {
      const articleNum = match.match(/Article\s*(\d+)/i)?.[1];
      if (articleNum) {
        const sectionId = `article-${articleNum}`;
        const section = findSection('eu-mdr', sectionId);
        if (section) {
          citations.push({
            standard: 'EU MDR',
            section: `Article ${articleNum}`,
            text: section.title
          });
        }
      }
    });
  }
  
  return citations;
}