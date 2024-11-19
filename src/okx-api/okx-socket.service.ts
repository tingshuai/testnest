import { Inject, Injectable } from '@nestjs/common';
import { RestClient, DefaultLogger, WebsocketClient } from 'okx-api';

@Injectable()
export class OkxSocketService {
  constructor() {
    this.initOkxteSocket().then((socket) => {
      this.WsOkx = socket;
    });
  }
  public WsOkx: WebsocketClient;
  public SwapCoins = {};

  async initOkxteSocket() {
    const logger = {
      ...DefaultLogger,
      // silly: (...params) => Logger.log('silly', ...params),
    };
    const wsClient = new WebsocketClient(
      {
        // The market defaults to "prod" for the live environment, but you can also ask to use the aws or demo environments:
        market: 'prod',
      },
      logger,
    );
    // Raw data will arrive on the 'update' event
    wsClient.on('update', (resData) => {
      const {
        data: [coinMsg],
        arg: { channel = null },
      } = resData;
      if (!channel) return;
      if (channel == 'mark-price') {
        if (coinMsg && ['SWAP', 'SPOT', 'MARGIN'].includes(coinMsg?.instType)) {
          this.SwapCoins[coinMsg.instId] = Number(coinMsg.markPx);
        }
      }
    });

    wsClient.on('open', (data) => { });

    // Replies (e.g. authenticating or subscribing to channels) will arrive on the 'response' event
    wsClient.on('response', (data) => {
      console.log('response', data);
    });

    wsClient.on('reconnect', (data) => {
      console.log('reconnect', data);
    });
    wsClient.on('reconnected', (data) => {
      console.log('reconnected', data);
      this.watchSwapPrice();
    });
    wsClient.on('close', (data) => {
      console.log('close', data);
      this.initOkxteSocket();
    });
    wsClient.on('error', (error) => {
      console.log('error', error);
    });
    setTimeout(() => {
      this.watchSwapPrice();
    }, 0);
    return wsClient;
  }

  watchSwapPrice() {
    //btc永续合约标记价格频道
    this.WsOkx.subscribe([
      {
        channel: 'mark-price',
        instId: `BTC-USDT`,
      },
    ]);
    ['BTC-USDT', 'ETH-USDT'].forEach((item) => {
      this.WsOkx.subscribe([
        {
          channel: 'mark-price',
          instId: `${item}-SWAP`,
        },
      ]);
    });
  }
}
