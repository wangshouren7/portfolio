import { Balance } from "@/ui/balance";
import { MyTransactions } from "@/ui/my-transactions";
import { NewOrder } from "@/ui/new-order";
import { OrderBook } from "@/ui/order-book";
import { PriceChart } from "@/ui/price-chart";
import { Trades } from "@/ui/trades";

export default function Page() {
  return (
    <div className="gap-4 p-4 grid h-full min-h-[800px] min-w-[1600px] grid-cols-3 overflow-auto">
      <div className="gap-4 grid grid-rows-2 overflow-auto">
        <Balance />
        <NewOrder />
      </div>

      <div className="gap-4 grid grid-rows-2 overflow-auto">
        <OrderBook />
        <Trades />
      </div>

      <div className="gap-4 grid grid-rows-2 overflow-auto">
        <PriceChart />
        <MyTransactions />
      </div>
    </div>
  );
}
