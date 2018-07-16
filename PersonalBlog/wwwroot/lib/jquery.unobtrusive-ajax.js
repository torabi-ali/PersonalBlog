// Unobtrusive Ajax support library for jQuery
// Copyright (C) Microsoft Corporation. All rights reserved.
// @version v3.2.4
// 
// Microsoft grants you the right to use these script files for the sole
// purpose of either: (i) interacting through your browser with the Microsoft
// website or online service, subject to the applicable licensing or use
// terms; or (ii) using the files as included with a Microsoft product subject
// to that product's license terms. Microsoft reserves all other rights to the
// files not expressly granted by Microsoft, whether by implication, estoppel
// or otherwise. Insofar as a script file is dual licensed under GPL,
// Microsoft neither took the code under GPL nor distributes it thereunder but
// under the terms set out in this paragraph. All notices and licenses
// below are for informational purposes only.
! function(t) {
    function a(t, a) {
        for (var e = window, r = (t || "").split("."); e && r.length;) e = e[r.shift()];
        return "function" == typeof e ? e : (a.push(t), Function.constructor.apply(null, a))
    }

    function e(t) {
        return "GET" === t || "POST" === t
    }

    function r(t, a) {
        e(a) || t.setRequestHeader("X-HTTP-Method-Override", a)
    }

    function n(a, e, r) {
        var n;
        r.indexOf("application/x-javascript") === -1 && (n = (a.getAttribute("data-ajax-mode") || "").toUpperCase(), t(a.getAttribute("data-ajax-update")).each(function(a, r) {
            var i;
            switch (n) {
                case "BEFORE":
                    i = r.firstChild, t("<div />").html(e).contents().each(function() {
                        r.insertBefore(this, i)
                    });
                    break;
                case "AFTER":
                    t("<div />").html(e).contents().each(function() {
                        r.appendChild(this)
                    });
                    break;
                case "REPLACE-WITH":
                    t(r).replaceWith(e);
                    break;
                default:
                    t(r).html(e)
            }
        }))
    }

    function i(i, u) {
        var o, c, d, s;
        o = i.getAttribute("data-ajax-confirm"), o && !window.confirm(o) || (c = t(i.getAttribute("data-ajax-loading")), s = parseInt(i.getAttribute("data-ajax-loading-duration"), 10) || 0, t.extend(u, {
            type: i.getAttribute("data-ajax-method") || void 0,
            url: i.getAttribute("data-ajax-url") || void 0,
            cache: "true" === (i.getAttribute("data-ajax-cache") || "").toLowerCase(),
            beforeSend: function(t) {
                var e;
                return r(t, d), e = a(i.getAttribute("data-ajax-begin"), ["xhr"]).apply(i, arguments), e !== !1 && c.show(s), e
            },
            complete: function() {
                c.hide(s), a(i.getAttribute("data-ajax-complete"), ["xhr", "status"]).apply(i, arguments)
            },
            success: function(t, e, r) {
                n(i, t, r.getResponseHeader("Content-Type") || "text/html"), a(i.getAttribute("data-ajax-success"), ["data", "status", "xhr"]).apply(i, arguments)
            },
            error: function() {
                a(i.getAttribute("data-ajax-failure"), ["xhr", "status", "error"]).apply(i, arguments)
            }
        }), u.data.push({
            name: "X-Requested-With",
            value: "XMLHttpRequest"
        }), d = u.type.toUpperCase(), e(d) || (u.type = "POST", u.data.push({
            name: "X-HTTP-Method-Override",
            value: d
        })), t.ajax(u))
    }

    function u(a) {
        var e = t(a).data(d);
        return !e || !e.validate || e.validate()
    }
    var o = "unobtrusiveAjaxClick",
        c = "unobtrusiveAjaxClickTarget",
        d = "unobtrusiveValidation";
    t(document).on("click", "a[data-ajax=true]", function(t) {
        t.preventDefault(), i(this, {
            url: this.href,
            type: "GET",
            data: []
        })
    }), t(document).on("click", "form[data-ajax=true] input[type=image]", function(a) {
        var e = a.target.name,
            r = t(a.target),
            n = t(r.parents("form")[0]),
            i = r.offset();
        n.data(o, [{
            name: e + ".x",
            value: Math.round(a.pageX - i.left)
        }, {
            name: e + ".y",
            value: Math.round(a.pageY - i.top)
        }]), setTimeout(function() {
            n.removeData(o)
        }, 0)
    }), t(document).on("click", "form[data-ajax=true] :submit", function(a) {
        var e = a.currentTarget.name,
            r = t(a.target),
            n = t(r.parents("form")[0]);
        n.data(o, e ? [{
            name: e,
            value: a.currentTarget.value
        }] : []), n.data(c, r), setTimeout(function() {
            n.removeData(o), n.removeData(c)
        }, 0)
    }), t(document).on("submit", "form[data-ajax=true]", function(a) {
        var e = t(this).data(o) || [],
            r = t(this).data(c),
            n = r && (r.hasClass("cancel") || void 0 !== r.attr("formnovalidate"));
        a.preventDefault(), (n || u(this)) && i(this, {
            url: this.action,
            type: this.method || "GET",
            data: e.concat(t(this).serializeArray())
        })
    })
}(jQuery);