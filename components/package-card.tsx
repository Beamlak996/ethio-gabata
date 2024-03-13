"use client";
import { Package } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { PackageActions } from "@/app/(main)/admin/_components/package-actions";

type PackageCardProps = {
  id: string;
  title: string;
  price: number;
  description: string;
  commission?: number;
};

export const PackageCard = ({
  id,
  title,
  price,
  description,
  commission,
}: PackageCardProps) => {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <PackageActions
            id={id}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full">{description}</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>{price}</div>
        <div>{commission}</div>
      </CardFooter>
    </Card>
  );
};
