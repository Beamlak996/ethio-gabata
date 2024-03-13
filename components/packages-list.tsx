import { PackageCard } from "./package-card";


export const PackagesList = () => {
    const items = [] 

    return (
      <div>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            
        </div>
        {items.length === 0 && (
          <div className="text-center text-lg text-muted-foreground mt-20">
            No packages found
          </div>
        )}
      </div>
    );
}