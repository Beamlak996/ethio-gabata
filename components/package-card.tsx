import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type PackageCardProps = {
  id: string;
  title: string;
  price: number;
  description: string;
};

export const PackageCard = ({
  id,
  title,
  price,
  description,
}: PackageCardProps) => {
  

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <Button variant="secondary">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
          explicabo!
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>Price</div>
        <div>commision</div>
      </CardFooter>
    </Card>
  );
};
