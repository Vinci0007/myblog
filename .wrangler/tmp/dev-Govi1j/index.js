"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // ../../../../Program_install/nvm/v20.19.2/node_modules/wrangler/templates/middleware/common.ts
  var __facade_middleware__ = [];
  function __facade_register__(...args) {
    __facade_middleware__.push(...args.flat());
  }
  __name(__facade_register__, "__facade_register__");
  function __facade_registerInternal__(...args) {
    __facade_middleware__.unshift(...args.flat());
  }
  __name(__facade_registerInternal__, "__facade_registerInternal__");
  function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
    const [head, ...tail] = middlewareChain;
    const middlewareCtx = {
      dispatch,
      next(newRequest, newEnv) {
        return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
      }
    };
    return head(request, env, ctx, middlewareCtx);
  }
  __name(__facade_invokeChain__, "__facade_invokeChain__");
  function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
    return __facade_invokeChain__(request, env, ctx, dispatch, [
      ...__facade_middleware__,
      finalMiddleware
    ]);
  }
  __name(__facade_invoke__, "__facade_invoke__");

  // ../../../../Program_install/nvm/v20.19.2/node_modules/wrangler/templates/middleware/loader-sw.ts
  var __FACADE_EVENT_TARGET__;
  if (globalThis.MINIFLARE) {
    __FACADE_EVENT_TARGET__ = new (Object.getPrototypeOf(WorkerGlobalScope))();
  } else {
    __FACADE_EVENT_TARGET__ = new EventTarget();
  }
  function __facade_isSpecialEvent__(type) {
    return type === "fetch" || type === "scheduled";
  }
  __name(__facade_isSpecialEvent__, "__facade_isSpecialEvent__");
  var __facade__originalAddEventListener__ = globalThis.addEventListener;
  var __facade__originalRemoveEventListener__ = globalThis.removeEventListener;
  var __facade__originalDispatchEvent__ = globalThis.dispatchEvent;
  globalThis.addEventListener = function(type, listener, options) {
    if (__facade_isSpecialEvent__(type)) {
      __FACADE_EVENT_TARGET__.addEventListener(
        type,
        listener,
        options
      );
    } else {
      __facade__originalAddEventListener__(type, listener, options);
    }
  };
  globalThis.removeEventListener = function(type, listener, options) {
    if (__facade_isSpecialEvent__(type)) {
      __FACADE_EVENT_TARGET__.removeEventListener(
        type,
        listener,
        options
      );
    } else {
      __facade__originalRemoveEventListener__(type, listener, options);
    }
  };
  globalThis.dispatchEvent = function(event) {
    if (__facade_isSpecialEvent__(event.type)) {
      return __FACADE_EVENT_TARGET__.dispatchEvent(event);
    } else {
      return __facade__originalDispatchEvent__(event);
    }
  };
  globalThis.addMiddleware = __facade_register__;
  globalThis.addMiddlewareInternal = __facade_registerInternal__;
  var __facade_waitUntil__ = Symbol("__facade_waitUntil__");
  var __facade_response__ = Symbol("__facade_response__");
  var __facade_dispatched__ = Symbol("__facade_dispatched__");
  var __Facade_ExtendableEvent__ = class ___Facade_ExtendableEvent__ extends Event {
    static {
      __name(this, "__Facade_ExtendableEvent__");
    }
    [__facade_waitUntil__] = [];
    waitUntil(promise) {
      if (!(this instanceof ___Facade_ExtendableEvent__)) {
        throw new TypeError("Illegal invocation");
      }
      this[__facade_waitUntil__].push(promise);
    }
  };
  var __Facade_FetchEvent__ = class ___Facade_FetchEvent__ extends __Facade_ExtendableEvent__ {
    static {
      __name(this, "__Facade_FetchEvent__");
    }
    #request;
    #passThroughOnException;
    [__facade_response__];
    [__facade_dispatched__] = false;
    constructor(type, init) {
      super(type);
      this.#request = init.request;
      this.#passThroughOnException = init.passThroughOnException;
    }
    get request() {
      return this.#request;
    }
    respondWith(response) {
      if (!(this instanceof ___Facade_FetchEvent__)) {
        throw new TypeError("Illegal invocation");
      }
      if (this[__facade_response__] !== void 0) {
        throw new DOMException(
          "FetchEvent.respondWith() has already been called; it can only be called once.",
          "InvalidStateError"
        );
      }
      if (this[__facade_dispatched__]) {
        throw new DOMException(
          "Too late to call FetchEvent.respondWith(). It must be called synchronously in the event handler.",
          "InvalidStateError"
        );
      }
      this.stopImmediatePropagation();
      this[__facade_response__] = response;
    }
    passThroughOnException() {
      if (!(this instanceof ___Facade_FetchEvent__)) {
        throw new TypeError("Illegal invocation");
      }
      this.#passThroughOnException();
    }
  };
  var __Facade_ScheduledEvent__ = class ___Facade_ScheduledEvent__ extends __Facade_ExtendableEvent__ {
    static {
      __name(this, "__Facade_ScheduledEvent__");
    }
    #scheduledTime;
    #cron;
    #noRetry;
    constructor(type, init) {
      super(type);
      this.#scheduledTime = init.scheduledTime;
      this.#cron = init.cron;
      this.#noRetry = init.noRetry;
    }
    get scheduledTime() {
      return this.#scheduledTime;
    }
    get cron() {
      return this.#cron;
    }
    noRetry() {
      if (!(this instanceof ___Facade_ScheduledEvent__)) {
        throw new TypeError("Illegal invocation");
      }
      this.#noRetry();
    }
  };
  __facade__originalAddEventListener__("fetch", (event) => {
    const ctx = {
      waitUntil: event.waitUntil.bind(event),
      passThroughOnException: event.passThroughOnException.bind(event)
    };
    const __facade_sw_dispatch__ = /* @__PURE__ */ __name(function(type, init) {
      if (type === "scheduled") {
        const facadeEvent = new __Facade_ScheduledEvent__("scheduled", {
          scheduledTime: Date.now(),
          cron: init.cron ?? "",
          noRetry() {
          }
        });
        __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
        event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
      }
    }, "__facade_sw_dispatch__");
    const __facade_sw_fetch__ = /* @__PURE__ */ __name(function(request, _env, ctx2) {
      const facadeEvent = new __Facade_FetchEvent__("fetch", {
        request,
        passThroughOnException: ctx2.passThroughOnException
      });
      __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
      facadeEvent[__facade_dispatched__] = true;
      event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
      const response = facadeEvent[__facade_response__];
      if (response === void 0) {
        throw new Error("No response!");
      }
      return response;
    }, "__facade_sw_fetch__");
    event.respondWith(
      __facade_invoke__(
        event.request,
        globalThis,
        ctx,
        __facade_sw_dispatch__,
        __facade_sw_fetch__
      )
    );
  });
  __facade__originalAddEventListener__("scheduled", (event) => {
    const facadeEvent = new __Facade_ScheduledEvent__("scheduled", {
      scheduledTime: event.scheduledTime,
      cron: event.cron,
      noRetry: event.noRetry.bind(event)
    });
    __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
    event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
  });

  // ../../../../Program_install/nvm/v20.19.2/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
  var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
    try {
      return await middlewareCtx.next(request, env);
    } finally {
      try {
        if (request.body !== null && !request.bodyUsed) {
          const reader = request.body.getReader();
          while (!(await reader.read()).done) {
          }
        }
      } catch (e) {
        console.error("Failed to drain the unused request body.", e);
      }
    }
  }, "drainBody");
  var middleware_ensure_req_body_drained_default = drainBody;

  // ../../../../Program_install/nvm/v20.19.2/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
  function reduceError(e) {
    return {
      name: e?.name,
      message: e?.message ?? String(e),
      stack: e?.stack,
      cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
    };
  }
  __name(reduceError, "reduceError");
  var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
    try {
      return await middlewareCtx.next(request, env);
    } catch (e) {
      const error = reduceError(e);
      return Response.json(error, {
        status: 500,
        headers: { "MF-Experimental-Error-Stack": "true" }
      });
    }
  }, "jsonError");
  var middleware_miniflare3_json_error_default = jsonError;

  // .wrangler/tmp/bundle-DN6t3N/middleware-insertion-facade.js
  __facade_registerInternal__([middleware_ensure_req_body_drained_default, middleware_miniflare3_json_error_default]);

  // index.js
  var OPT = {
    "user": "admin",
    //后台密码请修改
    "password": "123qwe123QWE.",
    //后台密码
    "siteDomain": "youngoodtech.dpdns.org",
    // 域名(不带https 也不带/)
    "siteName": "Tourist Blog",
    //博客名称
    "siteDescription": "A Blog Powered By Cloudflare Workers and KV",
    //博客描述
    "keyWords": "cloudflare,KV,workers,blog",
    //关键字
    "cacheZoneId": "1761026a50d758727704a518e2204d0f",
    //清理缓存用 cf区域 ID
    "cacheToken": "cWm2hinU33YlcjsFBo7o3GIbCwPb6OzMCbLwH_NX",
    //清理缓存用 cf API token
    "pageSize": 5,
    //每页文章数
    "recentlySize": 6,
    //最近文章数
    "readMoreLength": 150,
    //阅读更多截取长度	
    "cacheTime": 60 * 60 * 24 * 0.5,
    //网页缓存时长(秒),建议=文章更新频率
    "themeURL": "https://youngoodtech.dpdns.org/themes/default2.0/",
    // 模板地址,以 "/"" 结尾
    "html404": `<b>404</b>`,
    //404页面代码
    "codeBeforHead": ``,
    //其他代码,显示在</head>前
    "codeBeforBody": ``,
    //其他代码,显示在</body>前
    "commentCode": ``,
    //评论区代码
    "widgetOther": ``,
    //20201224新增参数,用于右侧 小部件扩展
    "otherCodeA": ``,
    //其他参数A,可设置为 "阅读次数:"四个大字
    "otherCodeB": ``,
    //其他参数A
    "otherCodeC": ``,
    //其他参数A
    "otherCodeD": ``,
    //其他参数A
    "otherCodeE": ``,
    //其他参数A
    "copyRight": `Powered by <a href="https://www.cloudflare.com">CF Workers</a> & <a href="https://blog.gezhong.vip">CF-Blog </a>`,
    //自定义版权信息,建议保留大公无私的 Coudflare 和 作者 的链接
    "robots": `User-agent: *
Disallow: /admin`
    //robots.txt设置
  };
  !function(t) {
    var e = {};
    function r(n) {
      if (e[n]) return e[n].exports;
      var a = e[n] = { i: n, l: false, exports: {} };
      return t[n].call(a.exports, a, a.exports, r), a.l = true, a.exports;
    }
    __name(r, "r");
    r.m = t, r.c = e, r.d = function(t2, e2, n) {
      r.o(t2, e2) || Object.defineProperty(t2, e2, { enumerable: true, get: n });
    }, r.r = function(t2) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
    }, r.t = function(t2, e2) {
      if (1 & e2 && (t2 = r(t2)), 8 & e2) return t2;
      if (4 & e2 && "object" == typeof t2 && t2 && t2.__esModule) return t2;
      var n = /* @__PURE__ */ Object.create(null);
      if (r.r(n), Object.defineProperty(n, "default", { enumerable: true, value: t2 }), 2 & e2 && "string" != typeof t2) for (var a in t2) r.d(n, a, function(e3) {
        return t2[e3];
      }.bind(null, a));
      return n;
    }, r.n = function(t2) {
      var e2 = t2 && t2.__esModule ? function() {
        return t2.default;
      } : function() {
        return t2;
      };
      return r.d(e2, "a", e2), e2;
    }, r.o = function(t2, e2) {
      return Object.prototype.hasOwnProperty.call(t2, e2);
    }, r.p = "", r(r.s = 0);
  }([function(t, e, r) {
    t.exports = r(1);
  }, function(t, e, r) {
    "use strict";
    const n = r(2);
    async function a(t2, e2, r2) {
      e2 = decodeURI(e2);
      let a2 = await g("index"), s2 = await l("SYSTEM_VALUE_WidgetMenu", true), o2 = await l("SYSTEM_VALUE_WidgetCategory", true), c2 = await l("SYSTEM_VALUE_WidgetTags", true), u2 = await l("SYSTEM_VALUE_WidgetLink", true), p2 = (await l("SYSTEM_INDEX_LIST", true)).slice(0, OPT.recentlySize);
      for (var h2 = 0; h2 < p2.length; h2++) p2[h2].createDate10 = p2[h2].createDate.substr(0, 10), p2[h2].url = "/article/" + p2[h2].id + "/" + p2[h2].link + ".html";
      let f2 = await i(e2, r2), d = f2[0], w = f2[1];
      for (h2 = 0; h2 < d.length; h2++) d[h2].createDate10 = d[h2].createDate.substr(0, 10), d[h2].createDateYear = d[h2].createDate.substr(0, 4), d[h2].createDateMonth = d[h2].createDate.substr(5, 7), d[h2].createDateDay = d[h2].createDate.substr(8, 10), d[h2].contentLength = d[h2].contentText.length, d[h2].url = "/article/" + d[h2].id + "/" + d[h2].link + ".html";
      let y = [{ title: "\u4E0A\u4E00\u9875", url: "/" + t2 + "/" + e2 + "/" + (r2 - 1) }];
      1 == r2 && (y = []);
      let m = [{ title: "\u4E0B\u4E00\u9875", url: "/" + t2 + "/" + e2 + "/" + (r2 + 1) }];
      w && (m = []);
      let S = e2 + " - " + OPT.siteName, T = e2, v = {};
      v.widgetMenuList = s2, v.widgetCategoryList = o2, v.widgetTagsList = c2, v.widgetLinkList = u2, v.widgetRecentlyList = p2, v.articleList = d, v.pageNewer = y, v.pageOlder = m, v.title = S, v.keyWords = T;
      let O = Object.assign({}, OPT);
      return O.password = "", O.user = "", O.cacheToken = "", O.cacheZoneId = "", v.OPT = O, n.render(a2, v);
    }
    __name(a, "a");
    async function i(t2, e2, r2 = OPT.pageSize) {
      t2 = decodeURI(t2), console.log("\u8FDB\u5165\u51FD\u6570: getKVArticleCategory", t2, e2, r2), e2 = e2 <= 1 ? 1 : e2;
      let n2 = await l("SYSTEM_INDEX_LIST", true), a2 = [];
      for (var i2 = 0, s2 = n2.length; i2 < s2; i2++) (n2[i2].tags.indexOf(t2) > -1 || n2[i2].category.indexOf(t2) > -1) && a2.push(n2[i2]);
      a2 = p(a2, "id");
      let o2 = !(a2.length > r2 * e2), c2 = [];
      for (i2 = (e2 - 1) * r2, s2 = Math.min(e2 * r2, a2.length); i2 < s2; i2++) c2.push(a2[i2]);
      return c2 = p(c2, "id"), [c2, o2];
    }
    __name(i, "i");
    async function s(t2) {
      t2 = ("00000" + parseInt(t2)).substr(-6);
      let e2 = await l("SYSTEM_INDEX_LIST", true), r2 = -1;
      for (var n2 = 0, a2 = e2.length; n2 < a2; n2++) if (e2[n2].id == t2) {
        r2 = n2;
        break;
      }
      let i2 = await l(t2, true);
      return null == i2 || 0 === i2.length ? [void 0, void 0, void 0] : [e2[r2 - 1], i2, e2[r2 + 1]];
    }
    __name(s, "s");
    async function o(t2, e2 = OPT.pageSize) {
      t2 = t2 <= 1 ? 1 : t2;
      let r2 = await l("SYSTEM_INDEX_LIST", true), n2 = !(r2.length > e2 * t2), a2 = [];
      for (var i2 = (t2 - 1) * e2, s2 = Math.min(t2 * e2, r2.length); i2 < s2; i2++) a2.push(r2[i2]);
      return a2 = p(a2, "id"), [a2, n2];
    }
    __name(o, "o");
    async function l(t2, e2 = false) {
      console.log("------------KV\u8BFB\u53D6---------------------:", t2, e2);
      let r2 = await CFBLOG.get(t2);
      if (!e2) return null == r2 ? "[]" : r2;
      try {
        return null == r2 ? [] : JSON.parse(r2);
      } catch (t3) {
        return [];
      }
    }
    __name(l, "l");
    async function c(t2, e2) {
      return null != e2 && null != e2 && ("object" == typeof e2 && (e2 = JSON.stringify(e2)), await CFBLOG.put(t2, e2));
    }
    __name(c, "c");
    function u(t2) {
      return t2 >= 0 && t2 <= 9 ? "0" + t2 : t2;
    }
    __name(u, "u");
    async function g(t2) {
      return t2 = t2.replace(".html", ""), (await fetch(OPT.themeURL + t2 + ".html", { cf: { cacheTtl: 600 } })).text();
    }
    __name(g, "g");
    function p(t2, e2, r2 = true) {
      return t2.sort(function(t3, n2) {
        var a2 = t3[e2], i2 = n2[e2];
        return r2 ? a2 > i2 ? -1 : a2 < i2 ? 1 : 0 : a2 < i2 ? -1 : a2 > i2 ? 1 : 0;
      });
    }
    __name(p, "p");
    function h(t2) {
      if ("string" == typeof t2) try {
        var e2 = JSON.parse(t2);
        return !("object" != typeof e2 || !e2);
      } catch (t3) {
        return false;
      }
      return !("object" != typeof t2 || !t2);
    }
    __name(h, "h");
    async function f(t2) {
      const { headers: e2 } = t2, r2 = e2.get("content-type") || "";
      if (r2.includes("application/json")) {
        let e3 = JSON.stringify(await t2.json()), r3 = JSON.parse(e3), a2 = { category: [] };
        for (var n2 = 0; n2 < r3.length; n2++) "tags" == r3[n2].name ? a2[r3[n2].name] = r3[n2].value.split(",") : r3[n2].name.includes("category") ? a2.category.push(r3[n2].value) : a2[r3[n2].name] = r3[n2].value;
        return a2;
      }
      if (r2.includes("application/text")) return await t2.text();
      if (r2.includes("text/html")) return await t2.text();
      if (r2.includes("form")) {
        const e3 = await t2.formData(), r3 = {};
        for (const t3 of e3.entries()) r3[t3[0]] = t3[1];
        return JSON.stringify(r3);
      }
      {
        const e3 = await t2.blob();
        return URL.createObjectURL(e3);
      }
    }
    __name(f, "f");
    addEventListener("fetch", (t2) => {
      t2.respondWith(async function(t3) {
        let e2 = t3.request, r2 = new URL(t3.request.url);
        null == OPT.privateBlog && (OPT.privateBlog = false);
        let i2 = r2.pathname.trim("/").split("/");
        if (("admin" === i2[0] || true === OPT.privateBlog) && !function(t4) {
          const e3 = t4.headers.get("Authorization");
          if (!e3 || !/^Basic [A-Za-z0-9._~+/-]+=*$/i.test(e3)) return false;
          const [r3, n2] = function(t5) {
            try {
              return atob(t5.split(" ").pop()).split(":");
            } catch (t6) {
              return [];
            }
          }(e3);
          return console.log("-----parseBasicAuth----- ", r3, n2), r3 === OPT.user && n2 === OPT.password;
        }(t3.request)) return new Response("Unauthorized", { headers: { "WWW-Authenticate": 'Basic realm="cfblog"', "Access-Control-Allow-Origin": "*" }, status: 401 });
        if ("admin" === i2[0] && "export" === i2[1]) {
          console.log("\u5F00\u59CB\u5BFC\u51FA");
          let t4 = await (/* @__PURE__ */ __name(async function t5(e3 = [], r3 = "", n2 = 1) {
            const a2 = await CFBLOG.list({ limit: n2, cursor: r3 });
            if (false in a2) return {};
            if (e3 = e3.concat(a2.keys), console.log("\u5BFC\u51FA: ", typeof a2, JSON.stringify(a2)), a2.list_complete) {
              let t6 = { OPT };
              for (let r4 = 0; r4 < e3.length; ++r4) {
                const n3 = await CFBLOG.get(e3[r4].name);
                null != n3 && (t6[e3[r4].name] = h(n3) ? JSON.parse(n3) : n3);
              }
              return t6;
            }
            return await t5(e3, a2.cursor, n2);
          }, "t"))();
          return new Response(JSON.stringify(t4), { headers: { "content-type": "application/octet-stream;charset=utf-8", "Content-Disposition": "attachment; filename=cfblog-" + (d = /* @__PURE__ */ new Date(), w = u(d.getMonth() + 1), y = u(d.getDate()), m = u(d.getHours()), S = u(d.getMinutes()), T = u(d.getSeconds()), v = d.getFullYear() + "-" + w + "-" + y + "T" + m + ":" + S + ":" + T, v + ".json") } });
        }
        var d, w, y, m, S, T, v;
        console.log(r2.pathname);
        let O = r2.searchParams.get("theme"), E = r2.searchParams.get("pageSize");
        O && (OPT.themeURL = "https://raw.githubusercontent.com/gdtool/cloudflare-workers-blog/master/themes/" + O + "/");
        E && (OPT.pageSize = parseInt(E));
        "https://raw.githubusercontent.com/gdtool/cloudflare-workers-blog/master/themes/default/" == OPT.themeURL && (OPT.themeURL = "https://raw.githubusercontent.com/gdtool/cloudflare-workers-blog/master/themes/default2.0/");
        if (console.log("theme pageSize", OPT.pageSize, OPT.themeURL), "/robots.txt" == r2.pathname) return new Response(OPT.robots + "\nSitemap: https://" + OPT.siteDomain + "/sitemap.xml", { headers: { "content-type": "text/plain;charset=UTF-8" }, status: 200 });
        if ("/favicon.ico" == r2.pathname) return new Response("404", { headers: { "content-type": "text/plain;charset=UTF-8" }, status: 404 });
        let _ = "", b = "", L = "";
        0 == i2.length || "" == i2[0] ? (_ = "page", b = "1") : (_ = i2[0], b = void 0 === i2[1] ? 1 : i2[1], L = void 0 === i2[2] ? 1 : i2[2]);
        const D = caches.default, M = "https://" + OPT.siteDomain + "/" + _ + "/" + b + "/" + L, x = new Request(M, e2);
        console.log("cacheFullPath:", M);
        let k = await D.match(x);
        if (k) return k;
        if ("sitemap.xml" == _) k = new Response(await async function() {
          console.log("\u8FDB\u5165\u51FD\u6570 getSiteMap");
          let t4 = await l("SYSTEM_INDEX_LIST", true), e3 = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
          for (var r3 = 0, n2 = t4.length; r3 < n2; r3++) e3 += "\n	<url>", e3 += "\n		<loc>https://" + OPT.siteDomain + "/article/" + t4[r3].id + "/" + t4[r3].link + ".html</loc>", e3 += "\n		<lastmod>" + t4[r3].createDate.substr(0, 10) + "</lastmod>", e3 += "\n		<changefreq>" + (void 0 === t4[r3].changefreq ? "daily" : t4[r3].changefreq) + "</changefreq>", e3 += "\n		<priority>" + (void 0 === t4[r3].priority ? "0.5" : t4[r3].priority) + "</priority>", e3 += "\n	</url>";
          return e3 += "\n</urlset>", e3;
        }(), { headers: { "content-type": "text/xml;charset=UTF-8" }, status: 200 });
        else {
          let e3 = await async function(t4) {
            let e4 = new URL(t4.url).pathname.trim("/").split("/"), r3 = "", i3 = "", u2 = "";
            0 == e4.length || "" == e4[0] ? (r3 = "page", i3 = "1") : (r3 = e4[0], i3 = void 0 === e4[1] ? 1 : e4[1], u2 = void 0 === e4[2] ? 1 : e4[2]);
            if ("page" == r3 && parseInt(i3) > 0) return await async function(t5, e5) {
              let r4 = await g("index"), a2 = await l("SYSTEM_VALUE_WidgetMenu", true), i4 = await l("SYSTEM_VALUE_WidgetCategory", true), s2 = await l("SYSTEM_VALUE_WidgetTags", true), o2 = await l("SYSTEM_VALUE_WidgetLink", true), c2 = await l("SYSTEM_INDEX_LIST", true), u3 = c2.slice(0, OPT.recentlySize);
              for (var p2 = 0; p2 < u3.length; p2++) u3[p2].createDate10 = u3[p2].createDate.substr(0, 10), u3[p2].url = "/article/" + u3[p2].id + "/" + u3[p2].link + ".html";
              let h2 = c2.slice((e5 - 1) * OPT.pageSize, e5 * OPT.pageSize);
              for (p2 = 0; p2 < h2.length; p2++) h2[p2].createDate10 = h2[p2].createDate.substr(0, 10), h2[p2].createDateYear = h2[p2].createDate.substr(0, 4), h2[p2].createDateMonth = h2[p2].createDate.substr(5, 7), h2[p2].createDateDay = h2[p2].createDate.substr(8, 10), h2[p2].contentLength = h2[p2].contentText.length, h2[p2].url = "/article/" + h2[p2].id + "/" + h2[p2].link + ".html";
              let f2 = [{ title: "\u4E0A\u4E00\u9875", url: "/page/" + (e5 - 1) }];
              1 == e5 && (f2 = []);
              let d2 = [{ title: "\u4E0B\u4E00\u9875", url: "/page/" + (e5 + 1) }];
              e5 * OPT.pageSize >= c2.length && (d2 = []);
              let w2 = (e5 > 1 ? "page " + e5 + " - " : "") + OPT.siteName, y2 = OPT.keyWords, m2 = {};
              m2.widgetMenuList = a2, m2.widgetCategoryList = i4, m2.widgetTagsList = s2, m2.widgetLinkList = o2, m2.widgetRecentlyList = u3, m2.articleList = h2, m2.pageNewer = f2, m2.pageOlder = d2, m2.title = w2, m2.keyWords = y2;
              let S2 = Object.assign({}, OPT);
              return S2.password = "", S2.user = "", S2.cacheToken = "", S2.cacheZoneId = "", m2.OPT = S2, n.render(r4, m2);
            }(0, parseInt(i3));
            if ("category" == r3 && i3.length > 0) return await a(r3, i3, parseInt(u2));
            if ("tags" == r3 && i3.length > 0) return await a(r3, i3, parseInt(u2));
            if ("article" == r3 && i3.length > 0) return await async function(t5, e5, r4) {
              let a2 = await g("article"), i4 = await l("SYSTEM_VALUE_WidgetMenu", true), o2 = await l("SYSTEM_VALUE_WidgetCategory", true), c2 = await l("SYSTEM_VALUE_WidgetTags", true), u3 = await l("SYSTEM_VALUE_WidgetLink", true), p2 = (await l("SYSTEM_INDEX_LIST", true)).slice(0, OPT.recentlySize);
              for (var h2 = 0; h2 < p2.length; h2++) p2[h2].createDate10 = p2[h2].createDate.substr(0, 10), p2[h2].url = "/article/" + p2[h2].id + "/" + (void 0 === p2[h2].link ? "detail" : p2[h2].link) + ".html";
              let f2 = await s(e5);
              for (h2 = 0; h2 < f2.length; h2++) f2[h2] && (f2[h2].createDate10 = f2[h2].createDate.substr(0, 10), f2[h2].contentLength = f2[h2].contentText.length, f2[h2].url = "/article/" + f2[h2].id + "/" + (void 0 === f2[h2].link ? "detail" : f2[h2].link) + ".html");
              let d2 = f2[1];
              d2 && (d2.createDate10 = d2.createDate.substr(0, 10), d2.createDateYear = d2.createDate.substr(0, 4), d2.createDateMonth = d2.createDate.substr(5, 7), d2.createDateDay = d2.createDate.substr(8, 10), d2.contentLength = d2.contentText.length);
              let w2 = [], y2 = [];
              f2[0] && w2.push(f2[0]);
              f2[2] && y2.push(f2[2]);
              let m2 = d2.title + " - " + OPT.siteName, S2 = d2.tags.concat(d2.category).join(","), T2 = {};
              T2.widgetMenuList = i4, T2.widgetCategoryList = o2, T2.widgetTagsList = c2, T2.widgetLinkList = u3, T2.widgetRecentlyList = p2, T2.articleSingle = d2, T2.articleNewer = w2, T2.articleOlder = y2, T2.title = m2, T2.keyWords = S2;
              let v2 = Object.assign({}, OPT);
              return v2.password = "", v2.user = "", v2.cacheToken = "", v2.cacheZoneId = "", T2.OPT = v2, n.render(a2, T2);
            }(0, i3);
            if ("search" != r3) return "admin" == r3 ? await async function(t5, e5) {
              new URL(t5.url);
              if (1 == e5.length || "list" == e5[1]) {
                let t6 = await g("admin/index"), e6 = await l("SYSTEM_VALUE_WidgetCategory", true), r5 = await l("SYSTEM_VALUE_WidgetMenu", true), n3 = await l("SYSTEM_VALUE_WidgetLink", true);
                return t6.r("categoryJson", JSON.stringify(e6)).r("menuJson", JSON.stringify(r5)).r("linkJson", JSON.stringify(n3));
              }
              if ("publish" == e5[1]) {
                let t6 = await l("SYSTEM_INDEX_LIST", true), e6 = [];
                for (var r4 = 0; r4 < t6.length; r4++) if ("object" == typeof t6[r4].tags) for (var n2 = 0; n2 < t6[r4].tags.length; n2++) -1 == e6.indexOf(t6[r4].tags[n2]) && e6.push(t6[r4].tags[n2]);
                return await c("SYSTEM_VALUE_WidgetTags", JSON.stringify(e6)), await async function(t7 = OPT.cacheZoneId, e7 = OPT.cacheToken) {
                  if (null == t7 || null == e7 || t7.length < 5 || e7.length < 5) return false;
                  let r5 = await fetch(`https://api.cloudflare.com/client/v4/zones/${t7}/purge_cache`, { method: "POST", headers: { Authorization: "Bearer " + e7, "Content-Type": "application/json" }, body: '{"purge_everything":true}' });
                  return (await r5.json()).success;
                }() ? '{"msg":"published ,purge Cache true","rst":true}' : '{"msg":"published ,buuuuuuuuuuuut purge Cache false !!!!!!","rst":true}';
              }
              if ("getList" == e5[1]) {
                let t6 = void 0 === e5[2] ? 1 : parseInt(e5[2]), r5 = await o(t6, 20);
                return JSON.stringify(r5[0]);
              }
              if ("edit" == e5[1]) {
                let t6 = e5[2], r5 = await g("admin/edit"), n3 = await l("SYSTEM_VALUE_WidgetCategory"), a2 = await l(t6);
                return r5.r("categoryJson", n3).r("articleJson", a2.replaceAll("script>", "script\uFF1E"));
              }
              if ("saveConfig" == e5[1]) {
                const e6 = await f(t5);
                let r5 = e6.WidgetCategory, n3 = e6.WidgetMenu, a2 = e6.WidgetLink;
                return h(r5) && h(n3) ? (await c("SYSTEM_VALUE_WidgetCategory", r5), await c("SYSTEM_VALUE_WidgetMenu", n3), await c("SYSTEM_VALUE_WidgetLink", a2), '{"msg":"saved","rst":true}') : '{"msg":"Not a JSON object","rst":false}';
              }
              if ("import" == e5[1]) {
                let e6 = (await f(t5)).importJson;
                if (console.log("\u5F00\u59CB\u5BFC\u5165", typeof e6), h(e6)) {
                  let t6 = JSON.parse(e6), r5 = Object.keys(t6);
                  for (let e7 = 0; e7 < r5.length; ++e7) console.log(r5[e7], t6[r5[e7]]), await c(r5[e7], t6[r5[e7]]);
                  return '{"msg":"import success!","rst":true}';
                }
                return '{"msg":" importJson Not a JSON object","rst":false}';
              }
              if ("saveAddNew" == e5[1]) {
                const e6 = await f(t5);
                let r5 = e6.title, n3 = e6.img, a2 = e6.link, i4 = e6.createDate, s2 = e6.category, o2 = e6.tags, u3 = void 0 === e6.priority ? "0.5" : e6.priority, g2 = void 0 === e6.changefreq ? "daily" : e6.changefreq, h2 = e6["content-markdown-doc"], d2 = e6["content-html-code"], w2 = "", y2 = "";
                if (r5.length > 0 && i4.length > 0 && s2.length > 0 && h2.length > 0 && d2.length > 0) {
                  y2 = await async function() {
                    let t7 = await l("SYSTEM_INDEX_NUM");
                    return "" === t7 || null === t7 || "[]" === t7 || void 0 === t7 ? (await c("SYSTEM_INDEX_NUM", 1), "000001") : (await c("SYSTEM_INDEX_NUM", parseInt(t7) + 1), ("00000" + (parseInt(t7) + 1)).substr(-6));
                  }(), w2 = d2.replace(/<\/?[^>]*>/g, "").trim().substring(0, OPT.readMoreLength);
                  let t6 = { id: y2, title: r5, img: n3, link: a2, createDate: i4, category: s2, tags: o2, contentMD: h2, contentHtml: d2, contentText: w2, priority: u3, changefreq: g2 };
                  await c(y2, JSON.stringify(t6));
                  let e7 = { id: y2, title: r5, img: n3, link: a2, createDate: i4, category: s2, tags: o2, contentText: w2, priority: u3, changefreq: g2 }, f2 = await l("SYSTEM_INDEX_LIST", true), m2 = [];
                  return m2.push(e7), m2 = m2.concat(f2), m2 = p(m2, "id"), await c("SYSTEM_INDEX_LIST", JSON.stringify(m2)), '{"msg":"added OK","rst":true,"id":"' + y2 + '"}';
                }
                return '{"msg":"\u4FE1\u606F\u4E0D\u5168","rst":false}';
              }
              if ("delete" == e5[1]) {
                let t6 = e5[2];
                if (6 == t6.length) {
                  await CFBLOG.delete(t6);
                  let e6 = await l("SYSTEM_INDEX_LIST", true);
                  for (r4 = 0; r4 < e6.length; r4++) t6 == e6[r4].id && e6.splice(r4, 1);
                  return await c("SYSTEM_INDEX_LIST", JSON.stringify(e6)), '{"msg":"Delete (' + t6 + ')  OK","rst":true,"id":"' + t6 + '"}';
                }
                return '{"msg":"Delete  false ","rst":false,"id":"' + t6 + '"}';
              }
              if ("saveEdit" == e5[1]) {
                const e6 = await f(t5);
                let n3 = e6.title, a2 = e6.img, i4 = e6.link, s2 = e6.createDate, o2 = e6.category, u3 = e6.tags, g2 = e6["content-markdown-doc"], h2 = e6["content-html-code"], d2 = void 0 === e6.priority ? "0.5" : e6.priority, w2 = void 0 === e6.changefreq ? "daily" : e6.changefreq, y2 = "", m2 = e6.id;
                if (n3.length > 0 && s2.length > 0 && o2.length > 0 && g2.length > 0 && h2.length > 0) {
                  y2 = h2.replace(/<\/?[^>]*>/g, "").trim().substring(0, OPT.readMoreLength);
                  let t6 = { id: m2, title: n3, img: a2, link: i4, createDate: s2, category: o2, tags: u3, contentMD: g2, contentHtml: h2, contentText: y2, priority: d2, changefreq: w2 };
                  await c(m2, JSON.stringify(t6));
                  let e7 = { id: m2, title: n3, img: a2, link: i4, createDate: s2, category: o2, tags: u3, contentText: y2, priority: d2, changefreq: w2 }, f2 = await l("SYSTEM_INDEX_LIST", true);
                  for (r4 = 0; r4 < f2.length; r4++) m2 == f2[r4].id && f2.splice(r4, 1);
                  return f2.push(e7), f2 = p(f2, "id"), await c("SYSTEM_INDEX_LIST", JSON.stringify(f2)), '{"msg":"Edit OK","rst":true,"id":"' + m2 + '"}';
                }
                return '{"msg":"\u4FE1\u606F\u4E0D\u5168","rst":false}';
              }
              return '{"msg":"some errors","rst":false}';
            }(t4, e4) : OPT.html404;
            return OPT.html404;
          }(t3.request);
          k = new Response(e3, { headers: { "content-type": "text/html;charset=UTF-8" }, status: 200 });
        }
        "admin" == _ ? k.headers.set("Cache-Control", "no-store") : (k.headers.set("Cache-Control", "public, max-age=" + OPT.cacheTime), t3.waitUntil(D.put(M, k.clone())));
        return k;
      }(t2));
    }), String.prototype.trim = function(t2) {
      return t2 ? this.replace(new RegExp("^\\" + t2 + "+|\\" + t2 + "+$", "g"), "") : this.replace(/^\s+|\s+$/g, "");
    }, String.prototype.r = function(t2, e2) {
      return null != e2 && (e2 = e2.replace(new RegExp("[$]", "g"), "$$$$")), this.replace(new RegExp("<!--{" + t2 + "}-->", "g"), e2);
    }, String.prototype.replaceAll = function(t2, e2) {
      return this.replace(new RegExp(t2, "g"), e2);
    };
  }, function(t, e, r) {
    t.exports = function() {
      "use strict";
      var t2 = Object.prototype.toString, e2 = Array.isArray || function(e3) {
        return "[object Array]" === t2.call(e3);
      };
      function r2(t3) {
        return "function" == typeof t3;
      }
      __name(r2, "r");
      function n(t3) {
        return t3.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
      }
      __name(n, "n");
      function a(t3, e3) {
        return null != t3 && "object" == typeof t3 && e3 in t3;
      }
      __name(a, "a");
      var i = RegExp.prototype.test, s = /\S/;
      function o(t3) {
        return !function(t4, e3) {
          return i.call(t4, e3);
        }(s, t3);
      }
      __name(o, "o");
      var l = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;", "`": "&#x60;", "=": "&#x3D;" }, c = /\s*/, u = /\s+/, g = /\s*=/, p = /\s*\}/, h = /#|\^|\/|>|\{|&|=|!/;
      function f(t3) {
        this.string = t3, this.tail = t3, this.pos = 0;
      }
      __name(f, "f");
      function d(t3, e3) {
        this.view = t3, this.cache = { ".": this.view }, this.parent = e3;
      }
      __name(d, "d");
      function w() {
        this.templateCache = { _cache: {}, set: /* @__PURE__ */ __name(function(t3, e3) {
          this._cache[t3] = e3;
        }, "set"), get: /* @__PURE__ */ __name(function(t3) {
          return this._cache[t3];
        }, "get"), clear: /* @__PURE__ */ __name(function() {
          this._cache = {};
        }, "clear") };
      }
      __name(w, "w");
      f.prototype.eos = function() {
        return "" === this.tail;
      }, f.prototype.scan = function(t3) {
        var e3 = this.tail.match(t3);
        if (!e3 || 0 !== e3.index) return "";
        var r3 = e3[0];
        return this.tail = this.tail.substring(r3.length), this.pos += r3.length, r3;
      }, f.prototype.scanUntil = function(t3) {
        var e3, r3 = this.tail.search(t3);
        switch (r3) {
          case -1:
            e3 = this.tail, this.tail = "";
            break;
          case 0:
            e3 = "";
            break;
          default:
            e3 = this.tail.substring(0, r3), this.tail = this.tail.substring(r3);
        }
        return this.pos += e3.length, e3;
      }, d.prototype.push = function(t3) {
        return new d(t3, this);
      }, d.prototype.lookup = function(t3) {
        var e3, n2, i2, s2 = this.cache;
        if (s2.hasOwnProperty(t3)) e3 = s2[t3];
        else {
          for (var o2, l2, c2, u2 = this, g2 = false; u2; ) {
            if (t3.indexOf(".") > 0) for (o2 = u2.view, l2 = t3.split("."), c2 = 0; null != o2 && c2 < l2.length; ) c2 === l2.length - 1 && (g2 = a(o2, l2[c2]) || (n2 = o2, i2 = l2[c2], null != n2 && "object" != typeof n2 && n2.hasOwnProperty && n2.hasOwnProperty(i2))), o2 = o2[l2[c2++]];
            else o2 = u2.view[t3], g2 = a(u2.view, t3);
            if (g2) {
              e3 = o2;
              break;
            }
            u2 = u2.parent;
          }
          s2[t3] = e3;
        }
        return r2(e3) && (e3 = e3.call(this.view)), e3;
      }, w.prototype.clearCache = function() {
        void 0 !== this.templateCache && this.templateCache.clear();
      }, w.prototype.parse = function(t3, r3) {
        var a2 = this.templateCache, i2 = t3 + ":" + (r3 || y.tags).join(":"), s2 = void 0 !== a2, l2 = s2 ? a2.get(i2) : void 0;
        return null == l2 && (l2 = function(t4, r4) {
          if (!t4) return [];
          var a3, i3, s3, l3 = false, d2 = [], w2 = [], m2 = [], S = false, T = false, v = "", O = 0;
          function E() {
            if (S && !T) for (; m2.length; ) delete w2[m2.pop()];
            else m2 = [];
            S = false, T = false;
          }
          __name(E, "E");
          function _(t5) {
            if ("string" == typeof t5 && (t5 = t5.split(u, 2)), !e2(t5) || 2 !== t5.length) throw new Error("Invalid tags: " + t5);
            a3 = new RegExp(n(t5[0]) + "\\s*"), i3 = new RegExp("\\s*" + n(t5[1])), s3 = new RegExp("\\s*" + n("}" + t5[1]));
          }
          __name(_, "_");
          _(r4 || y.tags);
          for (var b, L, D, M, x, k, P = new f(t4); !P.eos(); ) {
            if (b = P.pos, D = P.scanUntil(a3)) for (var U = 0, N = D.length; U < N; ++U) o(M = D.charAt(U)) ? (m2.push(w2.length), v += M) : (T = true, l3 = true, v += " "), w2.push(["text", M, b, b + 1]), b += 1, "\n" === M && (E(), v = "", O = 0, l3 = false);
            if (!P.scan(a3)) break;
            if (S = true, L = P.scan(h) || "name", P.scan(c), "=" === L ? (D = P.scanUntil(g), P.scan(g), P.scanUntil(i3)) : "{" === L ? (D = P.scanUntil(s3), P.scan(p), P.scanUntil(i3), L = "&") : D = P.scanUntil(i3), !P.scan(i3)) throw new Error("Unclosed tag at " + P.pos);
            if (x = ">" == L ? [L, D, b, P.pos, v, O, l3] : [L, D, b, P.pos], O++, w2.push(x), "#" === L || "^" === L) d2.push(x);
            else if ("/" === L) {
              if (!(k = d2.pop())) throw new Error('Unopened section "' + D + '" at ' + b);
              if (k[1] !== D) throw new Error('Unclosed section "' + k[1] + '" at ' + b);
            } else "name" === L || "{" === L || "&" === L ? T = true : "=" === L && _(D);
          }
          if (E(), k = d2.pop()) throw new Error('Unclosed section "' + k[1] + '" at ' + P.pos);
          return function(t5) {
            for (var e3, r5 = [], n2 = r5, a4 = [], i4 = 0, s4 = t5.length; i4 < s4; ++i4) switch ((e3 = t5[i4])[0]) {
              case "#":
              case "^":
                n2.push(e3), a4.push(e3), n2 = e3[4] = [];
                break;
              case "/":
                a4.pop()[5] = e3[2], n2 = a4.length > 0 ? a4[a4.length - 1][4] : r5;
                break;
              default:
                n2.push(e3);
            }
            return r5;
          }(function(t5) {
            for (var e3, r5, n2 = [], a4 = 0, i4 = t5.length; a4 < i4; ++a4) (e3 = t5[a4]) && ("text" === e3[0] && r5 && "text" === r5[0] ? (r5[1] += e3[1], r5[3] = e3[3]) : (n2.push(e3), r5 = e3));
            return n2;
          }(w2));
        }(t3, r3), s2 && a2.set(i2, l2)), l2;
      }, w.prototype.render = function(t3, e3, r3, n2) {
        var a2 = this.getConfigTags(n2), i2 = this.parse(t3, a2), s2 = e3 instanceof d ? e3 : new d(e3, void 0);
        return this.renderTokens(i2, s2, r3, t3, n2);
      }, w.prototype.renderTokens = function(t3, e3, r3, n2, a2) {
        for (var i2, s2, o2, l2 = "", c2 = 0, u2 = t3.length; c2 < u2; ++c2) o2 = void 0, "#" === (s2 = (i2 = t3[c2])[0]) ? o2 = this.renderSection(i2, e3, r3, n2, a2) : "^" === s2 ? o2 = this.renderInverted(i2, e3, r3, n2, a2) : ">" === s2 ? o2 = this.renderPartial(i2, e3, r3, a2) : "&" === s2 ? o2 = this.unescapedValue(i2, e3) : "name" === s2 ? o2 = this.escapedValue(i2, e3, a2) : "text" === s2 && (o2 = this.rawValue(i2)), void 0 !== o2 && (l2 += o2);
        return l2;
      }, w.prototype.renderSection = function(t3, n2, a2, i2, s2) {
        var o2 = this, l2 = "", c2 = n2.lookup(t3[1]);
        if (c2) {
          if (e2(c2)) for (var u2 = 0, g2 = c2.length; u2 < g2; ++u2) l2 += this.renderTokens(t3[4], n2.push(c2[u2]), a2, i2, s2);
          else if ("object" == typeof c2 || "string" == typeof c2 || "number" == typeof c2) l2 += this.renderTokens(t3[4], n2.push(c2), a2, i2, s2);
          else if (r2(c2)) {
            if ("string" != typeof i2) throw new Error("Cannot use higher-order sections without the original template");
            null != (c2 = c2.call(n2.view, i2.slice(t3[3], t3[5]), function(t4) {
              return o2.render(t4, n2, a2, s2);
            })) && (l2 += c2);
          } else l2 += this.renderTokens(t3[4], n2, a2, i2, s2);
          return l2;
        }
      }, w.prototype.renderInverted = function(t3, r3, n2, a2, i2) {
        var s2 = r3.lookup(t3[1]);
        if (!s2 || e2(s2) && 0 === s2.length) return this.renderTokens(t3[4], r3, n2, a2, i2);
      }, w.prototype.indentPartial = function(t3, e3, r3) {
        for (var n2 = e3.replace(/[^ \t]/g, ""), a2 = t3.split("\n"), i2 = 0; i2 < a2.length; i2++) a2[i2].length && (i2 > 0 || !r3) && (a2[i2] = n2 + a2[i2]);
        return a2.join("\n");
      }, w.prototype.renderPartial = function(t3, e3, n2, a2) {
        if (n2) {
          var i2 = this.getConfigTags(a2), s2 = r2(n2) ? n2(t3[1]) : n2[t3[1]];
          if (null != s2) {
            var o2 = t3[6], l2 = t3[5], c2 = t3[4], u2 = s2;
            0 == l2 && c2 && (u2 = this.indentPartial(s2, c2, o2));
            var g2 = this.parse(u2, i2);
            return this.renderTokens(g2, e3, n2, u2, a2);
          }
        }
      }, w.prototype.unescapedValue = function(t3, e3) {
        var r3 = e3.lookup(t3[1]);
        if (null != r3) return r3;
      }, w.prototype.escapedValue = function(t3, e3, r3) {
        var n2 = this.getConfigEscape(r3) || y.escape, a2 = e3.lookup(t3[1]);
        if (null != a2) return "number" == typeof a2 && n2 === y.escape ? String(a2) : n2(a2);
      }, w.prototype.rawValue = function(t3) {
        return t3[1];
      }, w.prototype.getConfigTags = function(t3) {
        return e2(t3) ? t3 : t3 && "object" == typeof t3 ? t3.tags : void 0;
      }, w.prototype.getConfigEscape = function(t3) {
        return t3 && "object" == typeof t3 && !e2(t3) ? t3.escape : void 0;
      };
      var y = { name: "mustache.js", version: "4.1.0", tags: ["{{", "}}"], clearCache: void 0, escape: void 0, parse: void 0, render: void 0, Scanner: void 0, Context: void 0, Writer: void 0, set templateCache(t3) {
        m.templateCache = t3;
      }, get templateCache() {
        return m.templateCache;
      } }, m = new w();
      return y.clearCache = function() {
        return m.clearCache();
      }, y.parse = function(t3, e3) {
        return m.parse(t3, e3);
      }, y.render = function(t3, r3, n2, a2) {
        if ("string" != typeof t3) throw new TypeError('Invalid template! Template should be a "string" but "' + (e2(i2 = t3) ? "array" : typeof i2) + '" was given as the first argument for mustache#render(template, view, partials)');
        var i2;
        return m.render(t3, r3, n2, a2);
      }, y.escape = function(t3) {
        return String(t3).replace(/[&<>"'`=\/]/g, function(t4) {
          return l[t4];
        });
      }, y.Scanner = f, y.Context = d, y.Writer = w, y;
    }();
  }]);
})();
/*!
   * mustache.js - Logic-less {{mustache}} templates with JavaScript
   * http://github.com/janl/mustache.js
   */
//# sourceMappingURL=index.js.map
