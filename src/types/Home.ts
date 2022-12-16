export interface Home {
  consumptionNow: Array<{ block: string; potency: number }>
  dailyConsumption: Array<{ hour: string; totalPotency: number }>
  monthConsumption: Array<{ month: number; totalPotency: number }>
}
