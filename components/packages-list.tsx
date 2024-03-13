import { db } from "@/lib/db";
import { PackageCard } from "./package-card";

export const PackagesList = async () => {
  const items = await db.package.findMany();

  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <PackageCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            price={item.price}
            commission={item?.commission || 0}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-lg text-muted-foreground mt-20">
          No packages found
        </div>
      )}
    </div>
  );
};
