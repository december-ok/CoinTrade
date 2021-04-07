export type CoinType = {
  market: string;
  english_name: string;
  korean_name: string;
  simple_market: string;
  acc_trade_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume: number;
  acc_trade_volume_24h: number;
  change: string;
  change_price: number;
  change_rate: number;
  high_price: number;
  highest_52_week_date: Date;
  highest_52_week_price: number;
  low_price: number;
  lowest_52_week_date: Date;
  lowest_52_week_price: number;
  opening_price: number;
  prev_closing_price: number;
  signed_change_price: number;
  signed_change_rate: number;
  timestamp: Date;
  trade_date: string;
  trade_date_kst: string;
  trade_price: number;
  trade_time: string;
  trade_time_kst: string;
  trade_timestamp: Date;
  trade_volume: number;
  order_book?: OrderBookType;
};

export type OrderBookType = {
  code: string;
  length: number;
  stream_type: string;
  timestamp: Date;
  total_ask_size: number;
  total_bid_size: number;
  type: string;
  orderbook_units: {
    ask_price: number;
    bid_price: number;
    ask_size: number;
    bid_size: number;
  }[];
};
