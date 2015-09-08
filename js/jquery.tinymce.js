!
function (e) {
	function t() {
		function t(e) {
			"remove" === e && this.each(function (e, t) {
				var n = r(t);
				n && n.remove()
			}), this.find("span.mceEditor,div.mceEditor").each(function (e, t) {
				var n = tinymce.get(t.id.replace(/_parent$/, ""));
				n && n.remove()
			})
		}
		function i(e) {
			var n, i = this;
			if (null != e) t.call(i), i.each(function (t, n) {
				var i;
				(i = tinymce.get(n.id)) && i.setContent(e)
			});
			else if (i.length > 0 && (n = tinymce.get(i[0].id))) return n.getContent()
		}
		function r(e) {
			var t = null;
			return e && e.id && a.tinymce && (t = tinymce.get(e.id)), t
		}
		function c(e) {
			return !!(e && e.length && a.tinymce && e.is(":tinymce"))
		}
		var o = {};
		e.each(["text", "html", "val"], function (t, a) {
			var u = o[a] = e.fn[a],
				s = "text" === a;
			e.fn[a] = function (t) {
				var a = this;
				if (!c(a)) return u.apply(a, arguments);
				if (t !== n) return i.call(a.filter(":tinymce"), t), u.apply(a.not(":tinymce"), arguments), a;
				var o = "",
					l = arguments;
				return (s ? a : a.eq(0)).each(function (t, n) {
					var i = r(n);
					o += i ? s ? i.getContent().replace(/<(?:"[^"]*"|'[^']*'|[^'">])*>/g, "") : i.getContent({
						save: !0
					}) : u.apply(e(n), l)
				}), o
			}
		}), e.each(["append", "prepend"], function (t, i) {
			var a = o[i] = e.fn[i],
				u = "prepend" === i;
			e.fn[i] = function (e) {
				var t = this;
				return c(t) ? e !== n ? (t.filter(":tinymce").each(function (t, n) {
					var i = r(n);
					i && i.setContent(u ? e + i.getContent() : i.getContent() + e)
				}), a.apply(t.not(":tinymce"), arguments), t) : void 0 : a.apply(t, arguments)
			}
		}), e.each(["remove", "replaceWith", "replaceAll", "empty"], function (n, i) {
			var r = o[i] = e.fn[i];
			e.fn[i] = function () {
				return t.call(this, i), r.apply(this, arguments)
			}
		}), o.attr = e.fn.attr, e.fn.attr = function (t, a) {
			var u = this,
				s = arguments;
			if (!t || "value" !== t || !c(u)) return a !== n ? o.attr.apply(u, s) : o.attr.apply(u, s);
			if (a !== n) return i.call(u.filter(":tinymce"), a), o.attr.apply(u.not(":tinymce"), s), u;
			var l = u[0],
				m = r(l);
			return m ? m.getContent({
				save: !0
			}) : o.attr.apply(e(l), s)
		}
	}
	var n, i, r = [],
		a = window;
	e.fn.tinymce = function (n) {
		function c() {
			var i = [],
				r = 0;
			l || (t(), l = !0), m.each(function (e, t) {
				var a, c = t.id,
					o = n.oninit;
				c || (t.id = c = tinymce.DOM.uniqueId()), tinymce.get(c) || (a = new tinymce.Editor(c, n, tinymce.EditorManager), i.push(a), a.on("init", function () {
					var e, t = o;
					m.css("visibility", ""), o && ++r == i.length && ("string" == typeof t && (e = -1 === t.indexOf(".") ? null : tinymce.resolve(t.replace(/\.\w+$/, "")), t = tinymce.resolve(t)), t.apply(e || tinymce, i))
				}))
			}), e.each(i, function (e, t) {
				t.render()
			})
		}
		var o, u, s, l, m = this,
			p = "";
		if (!m.length) return m;
		if (!n) return window.tinymce ? tinymce.get(m[0].id) : null;
		if (m.css("visibility", "hidden"), a.tinymce || i || !(o = n.script_url)) 1 === i ? r.push(c) : c();
		else {
			i = 1, u = o.substring(0, o.lastIndexOf("/")), -1 != o.indexOf(".min") && (p = ".min"), a.tinymce = a.tinyMCEPreInit || {
				base: u,
				suffix: p
			}, -1 != o.indexOf("gzip") && (s = n.language || "en", o = o + (/\?/.test(o) ? "&" : "?") + "js=true&core=true&suffix=" + escape(p) + "&themes=" + escape(n.theme || "modern") + "&plugins=" + escape(n.plugins || "") + "&languages=" + (s || ""), a.tinyMCE_GZ || (a.tinyMCE_GZ = {
				start: function () {
					function t(e) {
						tinymce.ScriptLoader.markDone(tinymce.baseURI.toAbsolute(e))
					}
					t("langs/" + s + ".js"), t("themes/" + n.theme + "/theme" + p + ".js"), t("themes/" + n.theme + "/langs/" + s + ".js"), e.each(n.plugins.split(","), function (e, n) {
						n && (t("plugins/" + n + "/plugin" + p + ".js"), t("plugins/" + n + "/langs/" + s + ".js"))
					})
				},
				end: function () {}
			}));
			var f = document.createElement("script");
			f.type = "text/javascript", f.onload = f.onreadystatechange = function (t) {
				t = t || window.event, 2 === i || "load" != t.type && !/complete|loaded/.test(f.readyState) || (tinymce.dom.Event.domLoaded = 1, i = 2, n.script_loaded && n.script_loaded(), c(), e.each(r, function (e, t) {
					t()
				}))
			}, f.src = o, document.body.appendChild(f)
		}
		return m
	}, e.extend(e.expr[":"], {
		tinymce: function (e) {
			return !!(e.id && "tinymce" in window && tinymce.get(e.id))
		}
	})
}(jQuery);