import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Search, BookOpen, Copy } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { regulatoryStandards, getStandardById, searchStandards } from '@/data/standards';
import type { RegulatoryStandard, StandardSection } from '@/types';

interface KnowledgeBrowserProps {
  onNavigate: (page: string, params?: any) => void;
  initialStandardId?: string;
}

export function KnowledgeBrowser({ onNavigate, initialStandardId }: KnowledgeBrowserProps) {
  const [selectedStandard, setSelectedStandard] = useState<RegulatoryStandard | null>(
    initialStandardId ? getStandardById(initialStandardId) || null : null
  );
  const [selectedSection, setSelectedSection] = useState<StandardSection | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<RegulatoryStandard[]>([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchStandards(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleCopyCitation = (section: StandardSection) => {
    const citation = `${selectedStandard?.name} - Section ${section.id}: ${section.title}`;
    navigator.clipboard.writeText(citation);
    toast.success('Citation copied to clipboard');
  };

  if (selectedSection && selectedStandard) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setSelectedSection(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to sections
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{selectedSection.title}</h1>
            <p className="text-muted-foreground">
              {selectedStandard.name} - Section {selectedSection.id}
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Section {selectedSection.id}
                </CardTitle>
                <CardDescription>{selectedSection.title}</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCopyCitation(selectedSection)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Citation
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap leading-relaxed">
                {selectedSection.content}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Related Sections */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Other Sections in {selectedStandard.name}</h3>
          <div className="grid gap-3">
            {selectedStandard.sections
              .filter(section => section.id !== selectedSection.id)
              .slice(0, 3)
              .map((section) => (
                <Card 
                  key={section.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedSection(section)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Section {section.id}</h4>
                        <p className="text-sm text-muted-foreground">{section.title}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    );
  }

  if (selectedStandard) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setSelectedStandard(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to standards
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{selectedStandard.name}</h1>
            <p className="text-muted-foreground">{selectedStandard.authority}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>About This Standard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{selectedStandard.description}</p>
            <div className="flex items-center gap-2">
              <Badge variant={
                selectedStandard.category === 'fda' ? 'default' :
                selectedStandard.category === 'iso' ? 'secondary' : 'outline'
              }>
                {selectedStandard.authority}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {selectedStandard.sections.length} sections available
              </span>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl font-semibold mb-4">Sections</h2>
          <div className="grid gap-3">
            {selectedStandard.sections.map((section) => (
              <Card 
                key={section.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedSection(section)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">Section {section.id}</h3>
                      <p className="text-sm text-muted-foreground">{section.title}</p>
                      <p className="text-xs text-muted-foreground overflow-hidden">
                        <span className="block truncate">
                          {section.content.substring(0, 150)}...
                        </span>
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => onNavigate('dashboard')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to dashboard
        </Button>
        <h1 className="text-2xl font-bold">Regulatory Knowledge Browser</h1>
      </div>

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList>
          <TabsTrigger value="browse">Browse Standards</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
        </TabsList>

        <TabsContent value="browse">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regulatoryStandards.map((standard) => (
              <Card 
                key={standard.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedStandard(standard)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{standard.name}</CardTitle>
                  <CardDescription>{standard.authority}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {standard.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant={
                      standard.category === 'fda' ? 'default' :
                      standard.category === 'iso' ? 'secondary' : 'outline'
                    }>
                      {standard.sections.length} sections
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Browse
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="search">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search regulations, sections, or requirements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {searchQuery && searchResults.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium">Search Results</h3>
                {searchResults.map((standard) => (
                  <Card 
                    key={standard.id}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedStandard(standard)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{standard.name}</h4>
                          <p className="text-sm text-muted-foreground">{standard.authority}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {searchQuery && searchResults.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">
                    No results found for "{searchQuery}". Try different keywords or browse standards directly.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}