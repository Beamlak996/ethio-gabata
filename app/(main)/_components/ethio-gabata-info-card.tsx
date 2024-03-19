import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export const EthioGabata = () => {
    return (
      <Card>
        <CardHeader className="">
          <CardTitle className="text-lg font-medium">
            Ethio <span className="text-emerald-500">ገበታ</span>
          </CardTitle>
          <CardDescription>
            Every information about ethio gabata is here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mt-10">
            <div>
              🤳Phone Number:{" "}
              <span className="text-muted-foreground">0919042420</span>
            </div>
            <div>
              💰Bank Account:{" "}
              <span className="text-muted-foreground">1000***99087</span>
            </div>
            <div>
              🏡Address:{" "}
              <span className="text-muted-foreground">Addis Ababa</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
}   