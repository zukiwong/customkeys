import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Upload, Star, Clock, X } from "lucide-react";
import { Button } from "./ui/button";

interface AssetLibraryProps {
  onClose?: () => void;
}

export function AssetLibrary({ onClose }: AssetLibraryProps) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="p-6 border-b border-gray-800/50 flex items-start justify-between flex-shrink-0">
        <div className="flex-1">
          <h3 className="mb-1">Asset Library</h3>
          <p className="text-sm text-gray-500">Drag assets onto keycaps</p>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white -mt-1 -mr-2"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <Tabs defaultValue="local" className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <TabsList className="mx-6 mt-4 bg-gray-800/50 flex-shrink-0">
          <TabsTrigger value="local" className="text-xs">
            <Upload className="w-3 h-3 mr-2" />
            Local
          </TabsTrigger>
          <TabsTrigger value="recent" className="text-xs">
            <Clock className="w-3 h-3 mr-2" />
            Recent
          </TabsTrigger>
          <TabsTrigger value="favorites" className="text-xs">
            <Star className="w-3 h-3 mr-2" />
            Favorites
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1 min-h-0">
          <TabsContent value="local" className="p-6 mt-0">
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 mx-auto mb-3 text-gray-600" />
              <p className="text-sm text-gray-500 mb-2">Drop files here</p>
              <p className="text-xs text-gray-600">or click to browse</p>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-xs text-gray-600 uppercase tracking-wider">Sample Assets</p>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-colors cursor-grab active:cursor-grabbing"
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recent" className="p-6 mt-0">
            <p className="text-sm text-gray-600 text-center py-8">No recent assets</p>
          </TabsContent>

          <TabsContent value="favorites" className="p-6 mt-0">
            <p className="text-sm text-gray-600 text-center py-8">No favorites yet</p>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
