// DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run build:types'.

export = pb;

declare namespace pb {


    interface IPushDownGoods {
        type?: (number|null);
        goodsId?: (Long|null);
        goodsNum?: (number|null);
    }

    class PushDownGoods implements IPushDownGoods {
        constructor(p?: IPushDownGoods);
        public type: number;
        public goodsId: Long;
        public goodsNum: number;
        public static create(properties?: IPushDownGoods): PushDownGoods;
        public static encode(m: PushDownGoods, w?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): PushDownGoods;
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    interface IReportGameProgressData {
        ext?: (string|null);
    }

    class ReportGameProgressData implements IReportGameProgressData {
        constructor(p?: IReportGameProgressData);
        public ext: string;
        public static create(properties?: IReportGameProgressData): ReportGameProgressData;
        public static encode(m: ReportGameProgressData, w?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): ReportGameProgressData;
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    interface IResponseData {
        success?: (boolean|null);
    }

    class ResponseData implements IResponseData {
        constructor(p?: IResponseData);
        public success: boolean;
        public static create(properties?: IResponseData): ResponseData;
        public static encode(m: ResponseData, w?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): ResponseData;
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    interface IUseMyGoods {
        id?: (Long|null);
    }

    class UseMyGoods implements IUseMyGoods {
        constructor(p?: IUseMyGoods);
        public id: Long;
        public static create(properties?: IUseMyGoods): UseMyGoods;
        public static encode(m: UseMyGoods, w?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): UseMyGoods;
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    interface IWechatMiniLogin {
        code?: (string|null);
        encryptedData?: (string|null);
        vi?: (string|null);
    }

    class WechatMiniLogin implements IWechatMiniLogin {
        constructor(p?: IWechatMiniLogin);
        public code: string;
        public encryptedData: string;
        public vi: string;
        public static create(properties?: IWechatMiniLogin): WechatMiniLogin;
        public static encode(m: WechatMiniLogin, w?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): WechatMiniLogin;
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
