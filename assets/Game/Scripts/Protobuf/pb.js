/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal.js";
import Long from 'long';
$protobuf.default.util.Long = Long;
$protobuf.default.configure();

const $Reader = $protobuf.default.Reader, $Writer = $protobuf.default.Writer, $util = $protobuf.default.util;

const $root = {};

export const PushDownGoods = $root.PushDownGoods = (() => {

    function PushDownGoods(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    PushDownGoods.prototype.type = 0;
    PushDownGoods.prototype.goodsId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    PushDownGoods.prototype.goodsNum = 0;

    PushDownGoods.create = function create(properties) {
        return new PushDownGoods(properties);
    };

    PushDownGoods.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        if (m.type != null && Object.hasOwnProperty.call(m, "type"))
            w.uint32(8).int32(m.type);
        if (m.goodsId != null && Object.hasOwnProperty.call(m, "goodsId"))
            w.uint32(16).int64(m.goodsId);
        if (m.goodsNum != null && Object.hasOwnProperty.call(m, "goodsNum"))
            w.uint32(24).int32(m.goodsNum);
        return w;
    };

    PushDownGoods.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.PushDownGoods();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1: {
                    m.type = r.int32();
                    break;
                }
            case 2: {
                    m.goodsId = r.int64();
                    break;
                }
            case 3: {
                    m.goodsNum = r.int32();
                    break;
                }
            default:
                r.skipType(t & 7);
                break;
            }
        }
        return m;
    };

    PushDownGoods.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/PushDownGoods";
    };

    return PushDownGoods;
})();

export const ReportGameProgressData = $root.ReportGameProgressData = (() => {

    function ReportGameProgressData(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    ReportGameProgressData.prototype.ext = "";

    ReportGameProgressData.create = function create(properties) {
        return new ReportGameProgressData(properties);
    };

    ReportGameProgressData.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        if (m.ext != null && Object.hasOwnProperty.call(m, "ext"))
            w.uint32(10).string(m.ext);
        return w;
    };

    ReportGameProgressData.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.ReportGameProgressData();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1: {
                    m.ext = r.string();
                    break;
                }
            default:
                r.skipType(t & 7);
                break;
            }
        }
        return m;
    };

    ReportGameProgressData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/ReportGameProgressData";
    };

    return ReportGameProgressData;
})();

export const ResponseData = $root.ResponseData = (() => {

    function ResponseData(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    ResponseData.prototype.success = false;

    ResponseData.create = function create(properties) {
        return new ResponseData(properties);
    };

    ResponseData.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        if (m.success != null && Object.hasOwnProperty.call(m, "success"))
            w.uint32(8).bool(m.success);
        return w;
    };

    ResponseData.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.ResponseData();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1: {
                    m.success = r.bool();
                    break;
                }
            default:
                r.skipType(t & 7);
                break;
            }
        }
        return m;
    };

    ResponseData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/ResponseData";
    };

    return ResponseData;
})();

export const UseMyGoods = $root.UseMyGoods = (() => {

    function UseMyGoods(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    UseMyGoods.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    UseMyGoods.create = function create(properties) {
        return new UseMyGoods(properties);
    };

    UseMyGoods.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        if (m.id != null && Object.hasOwnProperty.call(m, "id"))
            w.uint32(8).int64(m.id);
        return w;
    };

    UseMyGoods.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.UseMyGoods();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1: {
                    m.id = r.int64();
                    break;
                }
            default:
                r.skipType(t & 7);
                break;
            }
        }
        return m;
    };

    UseMyGoods.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/UseMyGoods";
    };

    return UseMyGoods;
})();

export const WechatMiniLogin = $root.WechatMiniLogin = (() => {

    function WechatMiniLogin(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    WechatMiniLogin.prototype.code = "";
    WechatMiniLogin.prototype.encryptedData = "";
    WechatMiniLogin.prototype.vi = "";

    WechatMiniLogin.create = function create(properties) {
        return new WechatMiniLogin(properties);
    };

    WechatMiniLogin.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        if (m.code != null && Object.hasOwnProperty.call(m, "code"))
            w.uint32(10).string(m.code);
        if (m.encryptedData != null && Object.hasOwnProperty.call(m, "encryptedData"))
            w.uint32(18).string(m.encryptedData);
        if (m.vi != null && Object.hasOwnProperty.call(m, "vi"))
            w.uint32(26).string(m.vi);
        return w;
    };

    WechatMiniLogin.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.WechatMiniLogin();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1: {
                    m.code = r.string();
                    break;
                }
            case 2: {
                    m.encryptedData = r.string();
                    break;
                }
            case 3: {
                    m.vi = r.string();
                    break;
                }
            default:
                r.skipType(t & 7);
                break;
            }
        }
        return m;
    };

    WechatMiniLogin.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/WechatMiniLogin";
    };

    return WechatMiniLogin;
})();

export { $root as default };
