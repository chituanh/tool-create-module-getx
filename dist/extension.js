;(() => {
	var t = {
			630: (t, e, n) => {
				'use strict'
				const r = n(997),
					i = n(622),
					o = n(56).mkdirsSync,
					c = n(465).utimesMillisSync,
					s = n(520)
				function u(t, e, n, o) {
					if (!o.filter || o.filter(e, n))
						return (function (t, e, n, o) {
							const c = (o.dereference ? r.statSync : r.lstatSync)(e)
							return c.isDirectory()
								? (function (t, e, n, i, o) {
										if (!e)
											return (function (t, e, n, i) {
												return r.mkdirSync(n), f(e, n, i), r.chmodSync(n, t.mode)
											})(t, n, i, o)
										if (e && !e.isDirectory())
											throw new Error(`Cannot overwrite non-directory '${i}' with directory '${n}'.`)
										return f(n, i, o)
								  })(c, t, e, n, o)
								: c.isFile() || c.isCharacterDevice() || c.isBlockDevice()
								? (function (t, e, n, i, o) {
										return e
											? (function (t, e, n, i) {
													if (i.overwrite) return r.unlinkSync(n), a(t, e, n, i)
													if (i.errorOnExist) throw new Error(`'${n}' already exists`)
											  })(t, n, i, o)
											: a(t, n, i, o)
								  })(c, t, e, n, o)
								: c.isSymbolicLink()
								? (function (t, e, n, o) {
										let c = r.readlinkSync(e)
										if ((o.dereference && (c = i.resolve(process.cwd(), c)), t)) {
											let t
											try {
												t = r.readlinkSync(n)
											} catch (t) {
												if ('EINVAL' === t.code || 'UNKNOWN' === t.code) return r.symlinkSync(c, n)
												throw t
											}
											if ((o.dereference && (t = i.resolve(process.cwd(), t)), s.isSrcSubdir(c, t)))
												throw new Error(`Cannot copy '${c}' to a subdirectory of itself, '${t}'.`)
											if (r.statSync(n).isDirectory() && s.isSrcSubdir(t, c))
												throw new Error(`Cannot overwrite '${t}' with '${c}'.`)
											return (function (t, e) {
												return r.unlinkSync(e), r.symlinkSync(t, e)
											})(c, n)
										}
										return r.symlinkSync(c, n)
								  })(t, e, n, o)
								: void 0
						})(t, e, n, o)
				}
				function a(t, e, i, o) {
					return 'function' == typeof r.copyFileSync
						? (r.copyFileSync(e, i), r.chmodSync(i, t.mode), o.preserveTimestamps ? c(i, t.atime, t.mtime) : void 0)
						: (function (t, e, i, o) {
								const c = n(674)(65536),
									s = r.openSync(e, 'r'),
									u = r.openSync(i, 'w', t.mode)
								let a = 0
								for (; a < t.size; ) {
									const t = r.readSync(s, c, 0, 65536, a)
									r.writeSync(u, c, 0, t), (a += t)
								}
								o.preserveTimestamps && r.futimesSync(u, t.atime, t.mtime), r.closeSync(s), r.closeSync(u)
						  })(t, e, i, o)
				}
				function f(t, e, n) {
					r.readdirSync(t).forEach((r) =>
						(function (t, e, n, r) {
							const o = i.join(e, t),
								c = i.join(n, t),
								{ destStat: a } = s.checkPathsSync(o, c, 'copy')
							return u(a, o, c, r)
						})(r, t, e, n)
					)
				}
				t.exports = function (t, e, n) {
					'function' == typeof n && (n = { filter: n }),
						((n = n || {}).clobber = !('clobber' in n) || !!n.clobber),
						(n.overwrite = 'overwrite' in n ? !!n.overwrite : n.clobber),
						n.preserveTimestamps &&
							'ia32' === process.arch &&
							console.warn(
								'fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n\n    see https://github.com/jprichardson/node-fs-extra/issues/269'
							)
					const { srcStat: c, destStat: a } = s.checkPathsSync(t, e, 'copy')
					return (
						s.checkParentPathsSync(t, c, e, 'copy'),
						(function (t, e, n, c) {
							if (c.filter && !c.filter(e, n)) return
							const s = i.dirname(n)
							return r.existsSync(s) || o(s), u(t, e, n, c)
						})(a, t, e, n)
					)
				}
			},
			931: (t, e, n) => {
				'use strict'
				t.exports = { copySync: n(630) }
			},
			629: (t, e, n) => {
				'use strict'
				const r = n(997),
					i = n(622),
					o = n(56).mkdirs,
					c = n(705).pathExists,
					s = n(465).utimesMillis,
					u = n(520)
				function a(t, e, n, r, s) {
					const u = i.dirname(n)
					c(u, (i, c) => (i ? s(i) : c ? l(t, e, n, r, s) : void o(u, (i) => (i ? s(i) : l(t, e, n, r, s)))))
				}
				function f(t, e, n, r, i, o) {
					Promise.resolve(i.filter(n, r)).then(
						(c) => (c ? t(e, n, r, i, o) : o()),
						(t) => o(t)
					)
				}
				function l(t, e, n, r, i) {
					return r.filter ? f(d, t, e, n, r, i) : d(t, e, n, r, i)
				}
				function d(t, e, n, o, c) {
					;(o.dereference ? r.stat : r.lstat)(e, (s, a) =>
						s
							? c(s)
							: a.isDirectory()
							? (function (t, e, n, i, o, c) {
									return e
										? e && !e.isDirectory()
											? c(new Error(`Cannot overwrite non-directory '${i}' with directory '${n}'.`))
											: m(n, i, o, c)
										: (function (t, e, n, i, o) {
												r.mkdir(n, (c) => {
													if (c) return o(c)
													m(e, n, i, (e) => (e ? o(e) : r.chmod(n, t.mode, o)))
												})
										  })(t, n, i, o, c)
							  })(a, t, e, n, o, c)
							: a.isFile() || a.isCharacterDevice() || a.isBlockDevice()
							? (function (t, e, n, i, o, c) {
									return e
										? (function (t, e, n, i, o) {
												if (!i.overwrite) return i.errorOnExist ? o(new Error(`'${n}' already exists`)) : o()
												r.unlink(n, (r) => (r ? o(r) : p(t, e, n, i, o)))
										  })(t, n, i, o, c)
										: p(t, n, i, o, c)
							  })(a, t, e, n, o, c)
							: a.isSymbolicLink()
							? (function (t, e, n, o, c) {
									r.readlink(e, (e, s) =>
										e
											? c(e)
											: (o.dereference && (s = i.resolve(process.cwd(), s)),
											  t
													? void r.readlink(n, (e, a) =>
															e
																? 'EINVAL' === e.code || 'UNKNOWN' === e.code
																	? r.symlink(s, n, c)
																	: c(e)
																: (o.dereference && (a = i.resolve(process.cwd(), a)),
																  u.isSrcSubdir(s, a)
																		? c(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${a}'.`))
																		: t.isDirectory() && u.isSrcSubdir(a, s)
																		? c(new Error(`Cannot overwrite '${a}' with '${s}'.`))
																		: (function (t, e, n) {
																				r.unlink(e, (i) => (i ? n(i) : r.symlink(t, e, n)))
																		  })(s, n, c))
													  )
													: r.symlink(s, n, c))
									)
							  })(t, e, n, o, c)
							: void 0
					)
				}
				function p(t, e, n, i, o) {
					return 'function' == typeof r.copyFile
						? r.copyFile(e, n, (e) => (e ? o(e) : y(t, n, i, o)))
						: (function (t, e, n, i, o) {
								const c = r.createReadStream(e)
								c.on('error', (t) => o(t)).once('open', () => {
									const e = r.createWriteStream(n, { mode: t.mode })
									e.on('error', (t) => o(t))
										.on('open', () => c.pipe(e))
										.once('close', () => y(t, n, i, o))
								})
						  })(t, e, n, i, o)
				}
				function y(t, e, n, i) {
					r.chmod(e, t.mode, (r) => (r ? i(r) : n.preserveTimestamps ? s(e, t.atime, t.mtime, i) : i()))
				}
				function m(t, e, n, i) {
					r.readdir(t, (r, o) => (r ? i(r) : h(o, t, e, n, i)))
				}
				function h(t, e, n, r, o) {
					const c = t.pop()
					return c
						? (function (t, e, n, r, o, c) {
								const s = i.join(n, e),
									a = i.join(r, e)
								u.checkPaths(s, a, 'copy', (e, i) => {
									if (e) return c(e)
									const { destStat: u } = i
									l(u, s, a, o, (e) => (e ? c(e) : h(t, n, r, o, c)))
								})
						  })(t, c, e, n, r, o)
						: o()
				}
				t.exports = function (t, e, n, r) {
					'function' != typeof n || r ? 'function' == typeof n && (n = { filter: n }) : ((r = n), (n = {})),
						(r = r || function () {}),
						((n = n || {}).clobber = !('clobber' in n) || !!n.clobber),
						(n.overwrite = 'overwrite' in n ? !!n.overwrite : n.clobber),
						n.preserveTimestamps &&
							'ia32' === process.arch &&
							console.warn(
								'fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n\n    see https://github.com/jprichardson/node-fs-extra/issues/269'
							),
						u.checkPaths(t, e, 'copy', (i, o) => {
							if (i) return r(i)
							const { srcStat: c, destStat: s } = o
							u.checkParentPaths(t, c, e, 'copy', (i) => (i ? r(i) : n.filter ? f(a, s, t, e, n, r) : a(s, t, e, n, r)))
						})
				}
			},
			627: (t, e, n) => {
				'use strict'
				const r = n(767).E
				t.exports = { copy: r(n(629)) }
			},
			983: (t, e, n) => {
				'use strict'
				const r = n(767).E,
					i = n(997),
					o = n(622),
					c = n(56),
					s = n(222),
					u = r(function (t, e) {
						;(e = e || function () {}),
							i.readdir(t, (n, r) => {
								if (n) return c.mkdirs(t, e)
								;(r = r.map((e) => o.join(t, e))),
									(function t() {
										const n = r.pop()
										if (!n) return e()
										s.remove(n, (n) => {
											if (n) return e(n)
											t()
										})
									})()
							})
					})
				function a(t) {
					let e
					try {
						e = i.readdirSync(t)
					} catch (e) {
						return c.mkdirsSync(t)
					}
					e.forEach((e) => {
						;(e = o.join(t, e)), s.removeSync(e)
					})
				}
				t.exports = { emptyDirSync: a, emptydirSync: a, emptyDir: u, emptydir: u }
			},
			113: (t, e, n) => {
				'use strict'
				const r = n(767).E,
					i = n(622),
					o = n(997),
					c = n(56),
					s = n(705).pathExists
				t.exports = {
					createFile: r(function (t, e) {
						function n() {
							o.writeFile(t, '', (t) => {
								if (t) return e(t)
								e()
							})
						}
						o.stat(t, (r, o) => {
							if (!r && o.isFile()) return e()
							const u = i.dirname(t)
							s(u, (t, r) =>
								t
									? e(t)
									: r
									? n()
									: void c.mkdirs(u, (t) => {
											if (t) return e(t)
											n()
									  })
							)
						})
					}),
					createFileSync: function (t) {
						let e
						try {
							e = o.statSync(t)
						} catch (t) {}
						if (e && e.isFile()) return
						const n = i.dirname(t)
						o.existsSync(n) || c.mkdirsSync(n), o.writeFileSync(t, '')
					}
				}
			},
			966: (t, e, n) => {
				'use strict'
				const r = n(113),
					i = n(467),
					o = n(813)
				t.exports = {
					createFile: r.createFile,
					createFileSync: r.createFileSync,
					ensureFile: r.createFile,
					ensureFileSync: r.createFileSync,
					createLink: i.createLink,
					createLinkSync: i.createLinkSync,
					ensureLink: i.createLink,
					ensureLinkSync: i.createLinkSync,
					createSymlink: o.createSymlink,
					createSymlinkSync: o.createSymlinkSync,
					ensureSymlink: o.createSymlink,
					ensureSymlinkSync: o.createSymlinkSync
				}
			},
			467: (t, e, n) => {
				'use strict'
				const r = n(767).E,
					i = n(622),
					o = n(997),
					c = n(56),
					s = n(705).pathExists
				t.exports = {
					createLink: r(function (t, e, n) {
						function r(t, e) {
							o.link(t, e, (t) => {
								if (t) return n(t)
								n(null)
							})
						}
						s(e, (u, a) =>
							u
								? n(u)
								: a
								? n(null)
								: void o.lstat(t, (o) => {
										if (o) return (o.message = o.message.replace('lstat', 'ensureLink')), n(o)
										const u = i.dirname(e)
										s(u, (i, o) =>
											i
												? n(i)
												: o
												? r(t, e)
												: void c.mkdirs(u, (i) => {
														if (i) return n(i)
														r(t, e)
												  })
										)
								  })
						)
					}),
					createLinkSync: function (t, e) {
						if (o.existsSync(e)) return
						try {
							o.lstatSync(t)
						} catch (t) {
							throw ((t.message = t.message.replace('lstat', 'ensureLink')), t)
						}
						const n = i.dirname(e)
						return o.existsSync(n) || c.mkdirsSync(n), o.linkSync(t, e)
					}
				}
			},
			460: (t, e, n) => {
				'use strict'
				const r = n(622),
					i = n(997),
					o = n(705).pathExists
				t.exports = {
					symlinkPaths: function (t, e, n) {
						if (r.isAbsolute(t))
							return i.lstat(t, (e) =>
								e ? ((e.message = e.message.replace('lstat', 'ensureSymlink')), n(e)) : n(null, { toCwd: t, toDst: t })
							)
						{
							const c = r.dirname(e),
								s = r.join(c, t)
							return o(s, (e, o) =>
								e
									? n(e)
									: o
									? n(null, { toCwd: s, toDst: t })
									: i.lstat(t, (e) =>
											e
												? ((e.message = e.message.replace('lstat', 'ensureSymlink')), n(e))
												: n(null, { toCwd: t, toDst: r.relative(c, t) })
									  )
							)
						}
					},
					symlinkPathsSync: function (t, e) {
						let n
						if (r.isAbsolute(t)) {
							if (((n = i.existsSync(t)), !n)) throw new Error('absolute srcpath does not exist')
							return { toCwd: t, toDst: t }
						}
						{
							const o = r.dirname(e),
								c = r.join(o, t)
							if (((n = i.existsSync(c)), n)) return { toCwd: c, toDst: t }
							if (((n = i.existsSync(t)), !n)) throw new Error('relative srcpath does not exist')
							return { toCwd: t, toDst: r.relative(o, t) }
						}
					}
				}
			},
			2: (t, e, n) => {
				'use strict'
				const r = n(997)
				t.exports = {
					symlinkType: function (t, e, n) {
						if (((n = 'function' == typeof e ? e : n), (e = 'function' != typeof e && e))) return n(null, e)
						r.lstat(t, (t, r) => {
							if (t) return n(null, 'file')
							;(e = r && r.isDirectory() ? 'dir' : 'file'), n(null, e)
						})
					},
					symlinkTypeSync: function (t, e) {
						let n
						if (e) return e
						try {
							n = r.lstatSync(t)
						} catch (t) {
							return 'file'
						}
						return n && n.isDirectory() ? 'dir' : 'file'
					}
				}
			},
			813: (t, e, n) => {
				'use strict'
				const r = n(767).E,
					i = n(622),
					o = n(997),
					c = n(56),
					s = c.mkdirs,
					u = c.mkdirsSync,
					a = n(460),
					f = a.symlinkPaths,
					l = a.symlinkPathsSync,
					d = n(2),
					p = d.symlinkType,
					y = d.symlinkTypeSync,
					m = n(705).pathExists
				t.exports = {
					createSymlink: r(function (t, e, n, r) {
						;(r = 'function' == typeof n ? n : r),
							(n = 'function' != typeof n && n),
							m(e, (c, u) =>
								c
									? r(c)
									: u
									? r(null)
									: void f(t, e, (c, u) => {
											if (c) return r(c)
											;(t = u.toDst),
												p(u.toCwd, n, (n, c) => {
													if (n) return r(n)
													const u = i.dirname(e)
													m(u, (n, i) =>
														n
															? r(n)
															: i
															? o.symlink(t, e, c, r)
															: void s(u, (n) => {
																	if (n) return r(n)
																	o.symlink(t, e, c, r)
															  })
													)
												})
									  })
							)
					}),
					createSymlinkSync: function (t, e, n) {
						if (o.existsSync(e)) return
						const r = l(t, e)
						;(t = r.toDst), (n = y(r.toCwd, n))
						const c = i.dirname(e)
						return o.existsSync(c) || u(c), o.symlinkSync(t, e, n)
					}
				}
			},
			109: (t, e, n) => {
				'use strict'
				const r = n(767).E,
					i = n(997),
					o = [
						'access',
						'appendFile',
						'chmod',
						'chown',
						'close',
						'copyFile',
						'fchmod',
						'fchown',
						'fdatasync',
						'fstat',
						'fsync',
						'ftruncate',
						'futimes',
						'lchown',
						'lchmod',
						'link',
						'lstat',
						'mkdir',
						'mkdtemp',
						'open',
						'readFile',
						'readdir',
						'readlink',
						'realpath',
						'rename',
						'rmdir',
						'stat',
						'symlink',
						'truncate',
						'unlink',
						'utimes',
						'writeFile'
					].filter((t) => 'function' == typeof i[t])
				Object.keys(i).forEach((t) => {
					'promises' !== t && (e[t] = i[t])
				}),
					o.forEach((t) => {
						e[t] = r(i[t])
					}),
					(e.exists = function (t, e) {
						return 'function' == typeof e ? i.exists(t, e) : new Promise((e) => i.exists(t, e))
					}),
					(e.read = function (t, e, n, r, o, c) {
						return 'function' == typeof c
							? i.read(t, e, n, r, o, c)
							: new Promise((c, s) => {
									i.read(t, e, n, r, o, (t, e, n) => {
										if (t) return s(t)
										c({ bytesRead: e, buffer: n })
									})
							  })
					}),
					(e.write = function (t, e, ...n) {
						return 'function' == typeof n[n.length - 1]
							? i.write(t, e, ...n)
							: new Promise((r, o) => {
									i.write(t, e, ...n, (t, e, n) => {
										if (t) return o(t)
										r({ bytesWritten: e, buffer: n })
									})
							  })
					}),
					'function' == typeof i.realpath.native && (e.realpath.native = r(i.realpath.native))
			},
			978: (t, e, n) => {
				'use strict'
				t.exports = Object.assign(
					{},
					n(109),
					n(931),
					n(627),
					n(983),
					n(966),
					n(916),
					n(56),
					n(121),
					n(784),
					n(587),
					n(705),
					n(222)
				)
				const r = n(747)
				Object.getOwnPropertyDescriptor(r, 'promises') &&
					Object.defineProperty(t.exports, 'promises', { get: () => r.promises })
			},
			916: (t, e, n) => {
				'use strict'
				const r = n(767).E,
					i = n(548)
				;(i.outputJson = r(n(394))),
					(i.outputJsonSync = n(154)),
					(i.outputJSON = i.outputJson),
					(i.outputJSONSync = i.outputJsonSync),
					(i.writeJSON = i.writeJson),
					(i.writeJSONSync = i.writeJsonSync),
					(i.readJSON = i.readJson),
					(i.readJSONSync = i.readJsonSync),
					(t.exports = i)
			},
			548: (t, e, n) => {
				'use strict'
				const r = n(767).E,
					i = n(173)
				t.exports = {
					readJson: r(i.readFile),
					readJsonSync: i.readFileSync,
					writeJson: r(i.writeFile),
					writeJsonSync: i.writeFileSync
				}
			},
			154: (t, e, n) => {
				'use strict'
				const r = n(997),
					i = n(622),
					o = n(56),
					c = n(548)
				t.exports = function (t, e, n) {
					const s = i.dirname(t)
					r.existsSync(s) || o.mkdirsSync(s), c.writeJsonSync(t, e, n)
				}
			},
			394: (t, e, n) => {
				'use strict'
				const r = n(622),
					i = n(56),
					o = n(705).pathExists,
					c = n(548)
				t.exports = function (t, e, n, s) {
					'function' == typeof n && ((s = n), (n = {}))
					const u = r.dirname(t)
					o(u, (r, o) =>
						r
							? s(r)
							: o
							? c.writeJson(t, e, n, s)
							: void i.mkdirs(u, (r) => {
									if (r) return s(r)
									c.writeJson(t, e, n, s)
							  })
					)
				}
			},
			56: (t, e, n) => {
				'use strict'
				const r = (0, n(767).E)(n(981)),
					i = n(135)
				t.exports = { mkdirs: r, mkdirsSync: i, mkdirp: r, mkdirpSync: i, ensureDir: r, ensureDirSync: i }
			},
			135: (t, e, n) => {
				'use strict'
				const r = n(997),
					i = n(622),
					o = n(704).invalidWin32Path,
					c = parseInt('0777', 8)
				t.exports = function t(e, n, s) {
					;(n && 'object' == typeof n) || (n = { mode: n })
					let u = n.mode
					const a = n.fs || r
					if ('win32' === process.platform && o(e)) {
						const t = new Error(e + ' contains invalid WIN32 path characters.')
						throw ((t.code = 'EINVAL'), t)
					}
					void 0 === u && (u = c & ~process.umask()), s || (s = null), (e = i.resolve(e))
					try {
						a.mkdirSync(e, u), (s = s || e)
					} catch (r) {
						if ('ENOENT' === r.code) {
							if (i.dirname(e) === e) throw r
							;(s = t(i.dirname(e), n, s)), t(e, n, s)
						} else {
							let t
							try {
								t = a.statSync(e)
							} catch (t) {
								throw r
							}
							if (!t.isDirectory()) throw r
						}
					}
					return s
				}
			},
			981: (t, e, n) => {
				'use strict'
				const r = n(997),
					i = n(622),
					o = n(704).invalidWin32Path,
					c = parseInt('0777', 8)
				t.exports = function t(e, n, s, u) {
					if (
						('function' == typeof n ? ((s = n), (n = {})) : (n && 'object' == typeof n) || (n = { mode: n }),
						'win32' === process.platform && o(e))
					) {
						const t = new Error(e + ' contains invalid WIN32 path characters.')
						return (t.code = 'EINVAL'), s(t)
					}
					let a = n.mode
					const f = n.fs || r
					void 0 === a && (a = c & ~process.umask()),
						u || (u = null),
						(s = s || function () {}),
						(e = i.resolve(e)),
						f.mkdir(e, a, (r) => {
							if (!r) return s(null, (u = u || e))
							switch (r.code) {
								case 'ENOENT':
									if (i.dirname(e) === e) return s(r)
									t(i.dirname(e), n, (r, i) => {
										r ? s(r, i) : t(e, n, s, i)
									})
									break
								default:
									f.stat(e, (t, e) => {
										t || !e.isDirectory() ? s(r, u) : s(null, u)
									})
							}
						})
				}
			},
			704: (t, e, n) => {
				'use strict'
				const r = n(622)
				function i(t) {
					return (t = r.normalize(r.resolve(t)).split(r.sep)).length > 0 ? t[0] : null
				}
				const o = /[<>:"|?*]/
				t.exports = {
					getRootPath: i,
					invalidWin32Path: function (t) {
						const e = i(t)
						return (t = t.replace(e, '')), o.test(t)
					}
				}
			},
			121: (t, e, n) => {
				'use strict'
				t.exports = { moveSync: n(472) }
			},
			472: (t, e, n) => {
				'use strict'
				const r = n(997),
					i = n(622),
					o = n(931).copySync,
					c = n(222).removeSync,
					s = n(56).mkdirpSync,
					u = n(520)
				function a(t, e, n) {
					try {
						r.renameSync(t, e)
					} catch (r) {
						if ('EXDEV' !== r.code) throw r
						return (function (t, e, n) {
							return o(t, e, { overwrite: n, errorOnExist: !0 }), c(t)
						})(t, e, n)
					}
				}
				t.exports = function (t, e, n) {
					const o = (n = n || {}).overwrite || n.clobber || !1,
						{ srcStat: f } = u.checkPathsSync(t, e, 'move')
					return (
						u.checkParentPathsSync(t, f, e, 'move'),
						s(i.dirname(e)),
						(function (t, e, n) {
							if (n) return c(e), a(t, e, n)
							if (r.existsSync(e)) throw new Error('dest already exists.')
							return a(t, e, n)
						})(t, e, o)
					)
				}
			},
			784: (t, e, n) => {
				'use strict'
				const r = n(767).E
				t.exports = { move: r(n(450)) }
			},
			450: (t, e, n) => {
				'use strict'
				const r = n(997),
					i = n(622),
					o = n(627).copy,
					c = n(222).remove,
					s = n(56).mkdirp,
					u = n(705).pathExists,
					a = n(520)
				function f(t, e, n, i) {
					r.rename(t, e, (r) =>
						r
							? 'EXDEV' !== r.code
								? i(r)
								: (function (t, e, n, r) {
										o(t, e, { overwrite: n, errorOnExist: !0 }, (e) => (e ? r(e) : c(t, r)))
								  })(t, e, n, i)
							: i()
					)
				}
				t.exports = function (t, e, n, r) {
					'function' == typeof n && ((r = n), (n = {}))
					const o = n.overwrite || n.clobber || !1
					a.checkPaths(t, e, 'move', (n, l) => {
						if (n) return r(n)
						const { srcStat: d } = l
						a.checkParentPaths(t, d, e, 'move', (n) => {
							if (n) return r(n)
							s(i.dirname(e), (n) =>
								n
									? r(n)
									: (function (t, e, n, r) {
											if (n) return c(e, (i) => (i ? r(i) : f(t, e, n, r)))
											u(e, (i, o) => (i ? r(i) : o ? r(new Error('dest already exists.')) : f(t, e, n, r)))
									  })(t, e, o, r)
							)
						})
					})
				}
			},
			587: (t, e, n) => {
				'use strict'
				const r = n(767).E,
					i = n(997),
					o = n(622),
					c = n(56),
					s = n(705).pathExists
				t.exports = {
					outputFile: r(function (t, e, n, r) {
						'function' == typeof n && ((r = n), (n = 'utf8'))
						const u = o.dirname(t)
						s(u, (o, s) =>
							o
								? r(o)
								: s
								? i.writeFile(t, e, n, r)
								: void c.mkdirs(u, (o) => {
										if (o) return r(o)
										i.writeFile(t, e, n, r)
								  })
						)
					}),
					outputFileSync: function (t, ...e) {
						const n = o.dirname(t)
						if (i.existsSync(n)) return i.writeFileSync(t, ...e)
						c.mkdirsSync(n), i.writeFileSync(t, ...e)
					}
				}
			},
			705: (t, e, n) => {
				'use strict'
				const r = n(767).p,
					i = n(109)
				t.exports = {
					pathExists: r(function (t) {
						return i
							.access(t)
							.then(() => !0)
							.catch(() => !1)
					}),
					pathExistsSync: i.existsSync
				}
			},
			222: (t, e, n) => {
				'use strict'
				const r = n(767).E,
					i = n(180)
				t.exports = { remove: r(i), removeSync: i.sync }
			},
			180: (t, e, n) => {
				'use strict'
				const r = n(997),
					i = n(622),
					o = n(357),
					c = 'win32' === process.platform
				function s(t) {
					;['unlink', 'chmod', 'stat', 'lstat', 'rmdir', 'readdir'].forEach((e) => {
						;(t[e] = t[e] || r[e]), (t[(e += 'Sync')] = t[e] || r[e])
					}),
						(t.maxBusyTries = t.maxBusyTries || 3)
				}
				function u(t, e, n) {
					let r = 0
					'function' == typeof e && ((n = e), (e = {})),
						o(t, 'rimraf: missing path'),
						o.strictEqual(typeof t, 'string', 'rimraf: path should be a string'),
						o.strictEqual(typeof n, 'function', 'rimraf: callback function required'),
						o(e, 'rimraf: invalid options argument provided'),
						o.strictEqual(typeof e, 'object', 'rimraf: options should be object'),
						s(e),
						a(t, e, function i(o) {
							if (o) {
								if (('EBUSY' === o.code || 'ENOTEMPTY' === o.code || 'EPERM' === o.code) && r < e.maxBusyTries)
									return r++, setTimeout(() => a(t, e, i), 100 * r)
								'ENOENT' === o.code && (o = null)
							}
							n(o)
						})
				}
				function a(t, e, n) {
					o(t),
						o(e),
						o('function' == typeof n),
						e.lstat(t, (r, i) =>
							r && 'ENOENT' === r.code
								? n(null)
								: r && 'EPERM' === r.code && c
								? f(t, e, r, n)
								: i && i.isDirectory()
								? d(t, e, r, n)
								: void e.unlink(t, (r) => {
										if (r) {
											if ('ENOENT' === r.code) return n(null)
											if ('EPERM' === r.code) return c ? f(t, e, r, n) : d(t, e, r, n)
											if ('EISDIR' === r.code) return d(t, e, r, n)
										}
										return n(r)
								  })
						)
				}
				function f(t, e, n, r) {
					o(t),
						o(e),
						o('function' == typeof r),
						n && o(n instanceof Error),
						e.chmod(t, 438, (i) => {
							i
								? r('ENOENT' === i.code ? null : n)
								: e.stat(t, (i, o) => {
										i ? r('ENOENT' === i.code ? null : n) : o.isDirectory() ? d(t, e, n, r) : e.unlink(t, r)
								  })
						})
				}
				function l(t, e, n) {
					let r
					o(t), o(e), n && o(n instanceof Error)
					try {
						e.chmodSync(t, 438)
					} catch (t) {
						if ('ENOENT' === t.code) return
						throw n
					}
					try {
						r = e.statSync(t)
					} catch (t) {
						if ('ENOENT' === t.code) return
						throw n
					}
					r.isDirectory() ? y(t, e, n) : e.unlinkSync(t)
				}
				function d(t, e, n, r) {
					o(t),
						o(e),
						n && o(n instanceof Error),
						o('function' == typeof r),
						e.rmdir(t, (c) => {
							!c || ('ENOTEMPTY' !== c.code && 'EEXIST' !== c.code && 'EPERM' !== c.code)
								? c && 'ENOTDIR' === c.code
									? r(n)
									: r(c)
								: (function (t, e, n) {
										o(t),
											o(e),
											o('function' == typeof n),
											e.readdir(t, (r, o) => {
												if (r) return n(r)
												let c,
													s = o.length
												if (0 === s) return e.rmdir(t, n)
												o.forEach((r) => {
													u(i.join(t, r), e, (r) => {
														if (!c) return r ? n((c = r)) : void (0 == --s && e.rmdir(t, n))
													})
												})
											})
								  })(t, e, r)
						})
				}
				function p(t, e) {
					let n
					s((e = e || {})),
						o(t, 'rimraf: missing path'),
						o.strictEqual(typeof t, 'string', 'rimraf: path should be a string'),
						o(e, 'rimraf: missing options'),
						o.strictEqual(typeof e, 'object', 'rimraf: options should be object')
					try {
						n = e.lstatSync(t)
					} catch (n) {
						if ('ENOENT' === n.code) return
						'EPERM' === n.code && c && l(t, e, n)
					}
					try {
						n && n.isDirectory() ? y(t, e, null) : e.unlinkSync(t)
					} catch (n) {
						if ('ENOENT' === n.code) return
						if ('EPERM' === n.code) return c ? l(t, e, n) : y(t, e, n)
						if ('EISDIR' !== n.code) throw n
						y(t, e, n)
					}
				}
				function y(t, e, n) {
					o(t), o(e), n && o(n instanceof Error)
					try {
						e.rmdirSync(t)
					} catch (r) {
						if ('ENOTDIR' === r.code) throw n
						if ('ENOTEMPTY' === r.code || 'EEXIST' === r.code || 'EPERM' === r.code)
							!(function (t, e) {
								if ((o(t), o(e), e.readdirSync(t).forEach((n) => p(i.join(t, n), e)), !c)) return e.rmdirSync(t, e)
								{
									const n = Date.now()
									do {
										try {
											return e.rmdirSync(t, e)
										} catch (t) {}
									} while (Date.now() - n < 500)
								}
							})(t, e)
						else if ('ENOENT' !== r.code) throw r
					}
				}
				;(t.exports = u), (u.sync = p)
			},
			674: (t) => {
				'use strict'
				t.exports = function (t) {
					if ('function' == typeof Buffer.allocUnsafe)
						try {
							return Buffer.allocUnsafe(t)
						} catch (e) {
							return new Buffer(t)
						}
					return new Buffer(t)
				}
			},
			520: (t, e, n) => {
				'use strict'
				const r = n(997),
					i = n(622),
					o = process.versions.node.split('.'),
					c = Number.parseInt(o[0], 10),
					s = Number.parseInt(o[1], 10),
					u = Number.parseInt(o[2], 10)
				function a() {
					if (c > 10) return !0
					if (10 === c) {
						if (s > 5) return !0
						if (5 === s && u >= 0) return !0
					}
					return !1
				}
				function f(t, e) {
					const n = i
							.resolve(t)
							.split(i.sep)
							.filter((t) => t),
						r = i
							.resolve(e)
							.split(i.sep)
							.filter((t) => t)
					return n.reduce((t, e, n) => t && r[n] === e, !0)
				}
				function l(t, e, n) {
					return `Cannot ${n} '${t}' to a subdirectory of itself, '${e}'.`
				}
				t.exports = {
					checkPaths: function (t, e, n, i) {
						!(function (t, e, n) {
							a()
								? r.stat(t, { bigint: !0 }, (t, i) => {
										if (t) return n(t)
										r.stat(e, { bigint: !0 }, (t, e) =>
											t
												? 'ENOENT' === t.code
													? n(null, { srcStat: i, destStat: null })
													: n(t)
												: n(null, { srcStat: i, destStat: e })
										)
								  })
								: r.stat(t, (t, i) => {
										if (t) return n(t)
										r.stat(e, (t, e) =>
											t
												? 'ENOENT' === t.code
													? n(null, { srcStat: i, destStat: null })
													: n(t)
												: n(null, { srcStat: i, destStat: e })
										)
								  })
						})(t, e, (r, o) => {
							if (r) return i(r)
							const { srcStat: c, destStat: s } = o
							return s && s.ino && s.dev && s.ino === c.ino && s.dev === c.dev
								? i(new Error('Source and destination must not be the same.'))
								: c.isDirectory() && f(t, e)
								? i(new Error(l(t, e, n)))
								: i(null, { srcStat: c, destStat: s })
						})
					},
					checkPathsSync: function (t, e, n) {
						const { srcStat: i, destStat: o } = (function (t, e) {
							let n, i
							n = a() ? r.statSync(t, { bigint: !0 }) : r.statSync(t)
							try {
								i = a() ? r.statSync(e, { bigint: !0 }) : r.statSync(e)
							} catch (t) {
								if ('ENOENT' === t.code) return { srcStat: n, destStat: null }
								throw t
							}
							return { srcStat: n, destStat: i }
						})(t, e)
						if (o && o.ino && o.dev && o.ino === i.ino && o.dev === i.dev)
							throw new Error('Source and destination must not be the same.')
						if (i.isDirectory() && f(t, e)) throw new Error(l(t, e, n))
						return { srcStat: i, destStat: o }
					},
					checkParentPaths: function t(e, n, o, c, s) {
						const u = i.resolve(i.dirname(e)),
							f = i.resolve(i.dirname(o))
						if (f === u || f === i.parse(f).root) return s()
						a()
							? r.stat(f, { bigint: !0 }, (r, i) =>
									r
										? 'ENOENT' === r.code
											? s()
											: s(r)
										: i.ino && i.dev && i.ino === n.ino && i.dev === n.dev
										? s(new Error(l(e, o, c)))
										: t(e, n, f, c, s)
							  )
							: r.stat(f, (r, i) =>
									r
										? 'ENOENT' === r.code
											? s()
											: s(r)
										: i.ino && i.dev && i.ino === n.ino && i.dev === n.dev
										? s(new Error(l(e, o, c)))
										: t(e, n, f, c, s)
							  )
					},
					checkParentPathsSync: function t(e, n, o, c) {
						const s = i.resolve(i.dirname(e)),
							u = i.resolve(i.dirname(o))
						if (u === s || u === i.parse(u).root) return
						let f
						try {
							f = a() ? r.statSync(u, { bigint: !0 }) : r.statSync(u)
						} catch (t) {
							if ('ENOENT' === t.code) return
							throw t
						}
						if (f.ino && f.dev && f.ino === n.ino && f.dev === n.dev) throw new Error(l(e, o, c))
						return t(e, n, u, c)
					},
					isSrcSubdir: f
				}
			},
			465: (t, e, n) => {
				'use strict'
				const r = n(997),
					i = n(87),
					o = n(622)
				t.exports = {
					hasMillisRes: function (t) {
						let e = o.join('millis-test' + Date.now().toString() + Math.random().toString().slice(2))
						e = o.join(i.tmpdir(), e)
						const n = new Date(1435410243862)
						r.writeFile(e, 'https://github.com/jprichardson/node-fs-extra/pull/141', (i) => {
							if (i) return t(i)
							r.open(e, 'r+', (i, o) => {
								if (i) return t(i)
								r.futimes(o, n, n, (n) => {
									if (n) return t(n)
									r.close(o, (n) => {
										if (n) return t(n)
										r.stat(e, (e, n) => {
											if (e) return t(e)
											t(null, n.mtime > 1435410243e3)
										})
									})
								})
							})
						})
					},
					hasMillisResSync: function () {
						let t = o.join('millis-test-sync' + Date.now().toString() + Math.random().toString().slice(2))
						t = o.join(i.tmpdir(), t)
						const e = new Date(1435410243862)
						r.writeFileSync(t, 'https://github.com/jprichardson/node-fs-extra/pull/141')
						const n = r.openSync(t, 'r+')
						return r.futimesSync(n, e, e), r.closeSync(n), r.statSync(t).mtime > 1435410243e3
					},
					timeRemoveMillis: function (t) {
						if ('number' == typeof t) return 1e3 * Math.floor(t / 1e3)
						if (t instanceof Date) return new Date(1e3 * Math.floor(t.getTime() / 1e3))
						throw new Error('fs-extra: timeRemoveMillis() unknown parameter type')
					},
					utimesMillis: function (t, e, n, i) {
						r.open(t, 'r+', (t, o) => {
							if (t) return i(t)
							r.futimes(o, e, n, (t) => {
								r.close(o, (e) => {
									i && i(t || e)
								})
							})
						})
					},
					utimesMillisSync: function (t, e, n) {
						const i = r.openSync(t, 'r+')
						return r.futimesSync(i, e, n), r.closeSync(i)
					}
				}
			},
			770: (t) => {
				'use strict'
				t.exports = function (t) {
					if (null === t || 'object' != typeof t) return t
					if (t instanceof Object) var e = { __proto__: t.__proto__ }
					else e = Object.create(null)
					return (
						Object.getOwnPropertyNames(t).forEach(function (n) {
							Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
						}),
						e
					)
				}
			},
			997: (t, e, n) => {
				var r,
					i,
					o = n(747),
					c = n(825),
					s = n(877),
					u = n(770),
					a = n(669)
				'function' == typeof Symbol && 'function' == typeof Symbol.for
					? ((r = Symbol.for('graceful-fs.queue')), (i = Symbol.for('graceful-fs.previous')))
					: ((r = '___graceful-fs.queue'), (i = '___graceful-fs.previous'))
				var f = function () {}
				if (
					(a.debuglog
						? (f = a.debuglog('gfs4'))
						: /\bgfs4\b/i.test(process.env.NODE_DEBUG || '') &&
						  (f = function () {
								var t = a.format.apply(a, arguments)
								;(t = 'GFS4: ' + t.split(/\n/).join('\nGFS4: ')), console.error(t)
						  }),
					!global[r])
				) {
					var l = []
					Object.defineProperty(global, r, {
						get: function () {
							return l
						}
					}),
						(o.close = (function (t) {
							function e(e, n) {
								return t.call(o, e, function (t) {
									t || y(), 'function' == typeof n && n.apply(this, arguments)
								})
							}
							return Object.defineProperty(e, i, { value: t }), e
						})(o.close)),
						(o.closeSync = (function (t) {
							function e(e) {
								t.apply(o, arguments), y()
							}
							return Object.defineProperty(e, i, { value: t }), e
						})(o.closeSync)),
						/\bgfs4\b/i.test(process.env.NODE_DEBUG || '') &&
							process.on('exit', function () {
								f(global[r]), n(357).equal(global[r].length, 0)
							})
				}
				function d(t) {
					c(t),
						(t.gracefulify = d),
						(t.createReadStream = function (e, n) {
							return new t.ReadStream(e, n)
						}),
						(t.createWriteStream = function (e, n) {
							return new t.WriteStream(e, n)
						})
					var e = t.readFile
					t.readFile = function (t, n, r) {
						return (
							'function' == typeof n && ((r = n), (n = null)),
							(function t(n, r, i) {
								return e(n, r, function (e) {
									!e || ('EMFILE' !== e.code && 'ENFILE' !== e.code)
										? ('function' == typeof i && i.apply(this, arguments), y())
										: p([t, [n, r, i]])
								})
							})(t, n, r)
						)
					}
					var n = t.writeFile
					t.writeFile = function (t, e, r, i) {
						return (
							'function' == typeof r && ((i = r), (r = null)),
							(function t(e, r, i, o) {
								return n(e, r, i, function (n) {
									!n || ('EMFILE' !== n.code && 'ENFILE' !== n.code)
										? ('function' == typeof o && o.apply(this, arguments), y())
										: p([t, [e, r, i, o]])
								})
							})(t, e, r, i)
						)
					}
					var r = t.appendFile
					r &&
						(t.appendFile = function (t, e, n, i) {
							return (
								'function' == typeof n && ((i = n), (n = null)),
								(function t(e, n, i, o) {
									return r(e, n, i, function (r) {
										!r || ('EMFILE' !== r.code && 'ENFILE' !== r.code)
											? ('function' == typeof o && o.apply(this, arguments), y())
											: p([t, [e, n, i, o]])
									})
								})(t, e, n, i)
							)
						})
					var i = t.readdir
					function o(e) {
						return i.apply(t, e)
					}
					if (
						((t.readdir = function (t, e, n) {
							var r = [t]
							return (
								'function' != typeof e ? r.push(e) : (n = e),
								r.push(function (t, e) {
									e && e.sort && e.sort(),
										!t || ('EMFILE' !== t.code && 'ENFILE' !== t.code)
											? ('function' == typeof n && n.apply(this, arguments), y())
											: p([o, [r]])
								}),
								o(r)
							)
						}),
						'v0.8' === process.version.substr(0, 4))
					) {
						var u = s(t)
						;(h = u.ReadStream), (S = u.WriteStream)
					}
					var a = t.ReadStream
					a &&
						((h.prototype = Object.create(a.prototype)),
						(h.prototype.open = function () {
							var t = this
							v(t.path, t.flags, t.mode, function (e, n) {
								e ? (t.autoClose && t.destroy(), t.emit('error', e)) : ((t.fd = n), t.emit('open', n), t.read())
							})
						}))
					var f = t.WriteStream
					f &&
						((S.prototype = Object.create(f.prototype)),
						(S.prototype.open = function () {
							var t = this
							v(t.path, t.flags, t.mode, function (e, n) {
								e ? (t.destroy(), t.emit('error', e)) : ((t.fd = n), t.emit('open', n))
							})
						})),
						Object.defineProperty(t, 'ReadStream', {
							get: function () {
								return h
							},
							set: function (t) {
								h = t
							},
							enumerable: !0,
							configurable: !0
						}),
						Object.defineProperty(t, 'WriteStream', {
							get: function () {
								return S
							},
							set: function (t) {
								S = t
							},
							enumerable: !0,
							configurable: !0
						})
					var l = h
					Object.defineProperty(t, 'FileReadStream', {
						get: function () {
							return l
						},
						set: function (t) {
							l = t
						},
						enumerable: !0,
						configurable: !0
					})
					var m = S
					function h(t, e) {
						return this instanceof h ? (a.apply(this, arguments), this) : h.apply(Object.create(h.prototype), arguments)
					}
					function S(t, e) {
						return this instanceof S ? (f.apply(this, arguments), this) : S.apply(Object.create(S.prototype), arguments)
					}
					Object.defineProperty(t, 'FileWriteStream', {
						get: function () {
							return m
						},
						set: function (t) {
							m = t
						},
						enumerable: !0,
						configurable: !0
					})
					var w = t.open
					function v(t, e, n, r) {
						return (
							'function' == typeof n && ((r = n), (n = null)),
							(function t(e, n, r, i) {
								return w(e, n, r, function (o, c) {
									!o || ('EMFILE' !== o.code && 'ENFILE' !== o.code)
										? ('function' == typeof i && i.apply(this, arguments), y())
										: p([t, [e, n, r, i]])
								})
							})(t, e, n, r)
						)
					}
					return (t.open = v), t
				}
				function p(t) {
					f('ENQUEUE', t[0].name, t[1]), global[r].push(t)
				}
				function y() {
					var t = global[r].shift()
					t && (f('RETRY', t[0].name, t[1]), t[0].apply(null, t[1]))
				}
				;(t.exports = d(u(o))),
					process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !o.__patched && ((t.exports = d(o)), (o.__patched = !0))
			},
			877: (t, e, n) => {
				var r = n(413).Stream
				t.exports = function (t) {
					return {
						ReadStream: function e(n, i) {
							if (!(this instanceof e)) return new e(n, i)
							r.call(this)
							var o = this
							;(this.path = n),
								(this.fd = null),
								(this.readable = !0),
								(this.paused = !1),
								(this.flags = 'r'),
								(this.mode = 438),
								(this.bufferSize = 65536),
								(i = i || {})
							for (var c = Object.keys(i), s = 0, u = c.length; s < u; s++) {
								var a = c[s]
								this[a] = i[a]
							}
							if ((this.encoding && this.setEncoding(this.encoding), void 0 !== this.start)) {
								if ('number' != typeof this.start) throw TypeError('start must be a Number')
								if (void 0 === this.end) this.end = 1 / 0
								else if ('number' != typeof this.end) throw TypeError('end must be a Number')
								if (this.start > this.end) throw new Error('start must be <= end')
								this.pos = this.start
							}
							null === this.fd
								? t.open(this.path, this.flags, this.mode, function (t, e) {
										if (t) return o.emit('error', t), void (o.readable = !1)
										;(o.fd = e), o.emit('open', e), o._read()
								  })
								: process.nextTick(function () {
										o._read()
								  })
						},
						WriteStream: function e(n, i) {
							if (!(this instanceof e)) return new e(n, i)
							r.call(this),
								(this.path = n),
								(this.fd = null),
								(this.writable = !0),
								(this.flags = 'w'),
								(this.encoding = 'binary'),
								(this.mode = 438),
								(this.bytesWritten = 0),
								(i = i || {})
							for (var o = Object.keys(i), c = 0, s = o.length; c < s; c++) {
								var u = o[c]
								this[u] = i[u]
							}
							if (void 0 !== this.start) {
								if ('number' != typeof this.start) throw TypeError('start must be a Number')
								if (this.start < 0) throw new Error('start must be >= zero')
								this.pos = this.start
							}
							;(this.busy = !1),
								(this._queue = []),
								null === this.fd &&
									((this._open = t.open),
									this._queue.push([this._open, this.path, this.flags, this.mode, void 0]),
									this.flush())
						}
					}
				}
			},
			825: (t, e, n) => {
				var r = n(619),
					i = process.cwd,
					o = null,
					c = process.env.GRACEFUL_FS_PLATFORM || process.platform
				process.cwd = function () {
					return o || (o = i.call(process)), o
				}
				try {
					process.cwd()
				} catch (t) {}
				var s = process.chdir
				;(process.chdir = function (t) {
					;(o = null), s.call(process, t)
				}),
					(t.exports = function (t) {
						var e, n
						function i(e) {
							return e
								? function (n, r, i) {
										return e.call(t, n, r, function (t) {
											l(t) && (t = null), i && i.apply(this, arguments)
										})
								  }
								: e
						}
						function o(e) {
							return e
								? function (n, r) {
										try {
											return e.call(t, n, r)
										} catch (t) {
											if (!l(t)) throw t
										}
								  }
								: e
						}
						function s(e) {
							return e
								? function (n, r, i, o) {
										return e.call(t, n, r, i, function (t) {
											l(t) && (t = null), o && o.apply(this, arguments)
										})
								  }
								: e
						}
						function u(e) {
							return e
								? function (n, r, i) {
										try {
											return e.call(t, n, r, i)
										} catch (t) {
											if (!l(t)) throw t
										}
								  }
								: e
						}
						function a(e) {
							return e
								? function (n, r, i) {
										function o(t, e) {
											e && (e.uid < 0 && (e.uid += 4294967296), e.gid < 0 && (e.gid += 4294967296)),
												i && i.apply(this, arguments)
										}
										return 'function' == typeof r && ((i = r), (r = null)), r ? e.call(t, n, r, o) : e.call(t, n, o)
								  }
								: e
						}
						function f(e) {
							return e
								? function (n, r) {
										var i = r ? e.call(t, n, r) : e.call(t, n)
										return i.uid < 0 && (i.uid += 4294967296), i.gid < 0 && (i.gid += 4294967296), i
								  }
								: e
						}
						function l(t) {
							return (
								!t ||
								'ENOSYS' === t.code ||
								!((process.getuid && 0 === process.getuid()) || ('EINVAL' !== t.code && 'EPERM' !== t.code))
							)
						}
						r.hasOwnProperty('O_SYMLINK') &&
							process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) &&
							(function (t) {
								;(t.lchmod = function (e, n, i) {
									t.open(e, r.O_WRONLY | r.O_SYMLINK, n, function (e, r) {
										e
											? i && i(e)
											: t.fchmod(r, n, function (e) {
													t.close(r, function (t) {
														i && i(e || t)
													})
											  })
									})
								}),
									(t.lchmodSync = function (e, n) {
										var i,
											o = t.openSync(e, r.O_WRONLY | r.O_SYMLINK, n),
											c = !0
										try {
											;(i = t.fchmodSync(o, n)), (c = !1)
										} finally {
											if (c)
												try {
													t.closeSync(o)
												} catch (t) {}
											else t.closeSync(o)
										}
										return i
									})
							})(t),
							t.lutimes ||
								(function (t) {
									r.hasOwnProperty('O_SYMLINK')
										? ((t.lutimes = function (e, n, i, o) {
												t.open(e, r.O_SYMLINK, function (e, r) {
													e
														? o && o(e)
														: t.futimes(r, n, i, function (e) {
																t.close(r, function (t) {
																	o && o(e || t)
																})
														  })
												})
										  }),
										  (t.lutimesSync = function (e, n, i) {
												var o,
													c = t.openSync(e, r.O_SYMLINK),
													s = !0
												try {
													;(o = t.futimesSync(c, n, i)), (s = !1)
												} finally {
													if (s)
														try {
															t.closeSync(c)
														} catch (t) {}
													else t.closeSync(c)
												}
												return o
										  }))
										: ((t.lutimes = function (t, e, n, r) {
												r && process.nextTick(r)
										  }),
										  (t.lutimesSync = function () {}))
								})(t),
							(t.chown = s(t.chown)),
							(t.fchown = s(t.fchown)),
							(t.lchown = s(t.lchown)),
							(t.chmod = i(t.chmod)),
							(t.fchmod = i(t.fchmod)),
							(t.lchmod = i(t.lchmod)),
							(t.chownSync = u(t.chownSync)),
							(t.fchownSync = u(t.fchownSync)),
							(t.lchownSync = u(t.lchownSync)),
							(t.chmodSync = o(t.chmodSync)),
							(t.fchmodSync = o(t.fchmodSync)),
							(t.lchmodSync = o(t.lchmodSync)),
							(t.stat = a(t.stat)),
							(t.fstat = a(t.fstat)),
							(t.lstat = a(t.lstat)),
							(t.statSync = f(t.statSync)),
							(t.fstatSync = f(t.fstatSync)),
							(t.lstatSync = f(t.lstatSync)),
							t.lchmod ||
								((t.lchmod = function (t, e, n) {
									n && process.nextTick(n)
								}),
								(t.lchmodSync = function () {})),
							t.lchown ||
								((t.lchown = function (t, e, n, r) {
									r && process.nextTick(r)
								}),
								(t.lchownSync = function () {})),
							'win32' === c &&
								(t.rename =
									((e = t.rename),
									function (n, r, i) {
										var o = Date.now(),
											c = 0
										e(n, r, function s(u) {
											if (u && ('EACCES' === u.code || 'EPERM' === u.code) && Date.now() - o < 6e4)
												return (
													setTimeout(function () {
														t.stat(r, function (t, o) {
															t && 'ENOENT' === t.code ? e(n, r, s) : i(u)
														})
													}, c),
													void (c < 100 && (c += 10))
												)
											i && i(u)
										})
									})),
							(t.read = (function (e) {
								function n(n, r, i, o, c, s) {
									var u
									if (s && 'function' == typeof s) {
										var a = 0
										u = function (f, l, d) {
											if (f && 'EAGAIN' === f.code && a < 10) return a++, e.call(t, n, r, i, o, c, u)
											s.apply(this, arguments)
										}
									}
									return e.call(t, n, r, i, o, c, u)
								}
								return (n.__proto__ = e), n
							})(t.read)),
							(t.readSync =
								((n = t.readSync),
								function (e, r, i, o, c) {
									for (var s = 0; ; )
										try {
											return n.call(t, e, r, i, o, c)
										} catch (t) {
											if ('EAGAIN' === t.code && s < 10) {
												s++
												continue
											}
											throw t
										}
								}))
					})
			},
			173: (t, e, n) => {
				var r
				try {
					r = n(997)
				} catch (t) {
					r = n(747)
				}
				function i(t, e) {
					var n,
						r = '\n'
					return (
						'object' == typeof e && null !== e && (e.spaces && (n = e.spaces), e.EOL && (r = e.EOL)),
						JSON.stringify(t, e ? e.replacer : null, n).replace(/\n/g, r) + r
					)
				}
				function o(t) {
					return Buffer.isBuffer(t) && (t = t.toString('utf8')), t.replace(/^\uFEFF/, '')
				}
				var c = {
					readFile: function (t, e, n) {
						null == n && ((n = e), (e = {})), 'string' == typeof e && (e = { encoding: e })
						var i = (e = e || {}).fs || r,
							c = !0
						'throws' in e && (c = e.throws),
							i.readFile(t, e, function (r, i) {
								if (r) return n(r)
								var s
								i = o(i)
								try {
									s = JSON.parse(i, e ? e.reviver : null)
								} catch (e) {
									return c ? ((e.message = t + ': ' + e.message), n(e)) : n(null, null)
								}
								n(null, s)
							})
					},
					readFileSync: function (t, e) {
						'string' == typeof (e = e || {}) && (e = { encoding: e })
						var n = e.fs || r,
							i = !0
						'throws' in e && (i = e.throws)
						try {
							var c = n.readFileSync(t, e)
							return (c = o(c)), JSON.parse(c, e.reviver)
						} catch (e) {
							if (i) throw ((e.message = t + ': ' + e.message), e)
							return null
						}
					},
					writeFile: function (t, e, n, o) {
						null == o && ((o = n), (n = {}))
						var c = (n = n || {}).fs || r,
							s = ''
						try {
							s = i(e, n)
						} catch (t) {
							return void (o && o(t, null))
						}
						c.writeFile(t, s, n, o)
					},
					writeFileSync: function (t, e, n) {
						var o = (n = n || {}).fs || r,
							c = i(e, n)
						return o.writeFileSync(t, c, n)
					}
				}
				t.exports = c
			},
			767: (t, e) => {
				'use strict'
				;(e.E = function (t) {
					return Object.defineProperty(
						function () {
							if ('function' != typeof arguments[arguments.length - 1])
								return new Promise((e, n) => {
									;(arguments[arguments.length] = (t, r) => {
										if (t) return n(t)
										e(r)
									}),
										arguments.length++,
										t.apply(this, arguments)
								})
							t.apply(this, arguments)
						},
						'name',
						{ value: t.name }
					)
				}),
					(e.p = function (t) {
						return Object.defineProperty(
							function () {
								const e = arguments[arguments.length - 1]
								if ('function' != typeof e) return t.apply(this, arguments)
								t.apply(this, arguments).then((t) => e(null, t), e)
							},
							'name',
							{ value: t.name }
						)
					})
			},
			793: function (t, e, n) {
				'use strict'
				var r =
					(this && this.__awaiter) ||
					function (t, e, n, r) {
						return new (n || (n = Promise))(function (i, o) {
							function c(t) {
								try {
									u(r.next(t))
								} catch (t) {
									o(t)
								}
							}
							function s(t) {
								try {
									u(r.throw(t))
								} catch (t) {
									o(t)
								}
							}
							function u(t) {
								var e
								t.done
									? i(t.value)
									: ((e = t.value),
									  e instanceof n
											? e
											: new n(function (t) {
													t(e)
											  })).then(c, s)
							}
							u((r = r.apply(t, e || [])).next())
						})
					}
				Object.defineProperty(e, '__esModule', { value: !0 })
				const i = n(978),
					o = n(549),
					c = n(147),
					s = n(928)
				e.default = function () {
					return r(this, void 0, void 0, function* () {
						const t = yield s.promptForPageName()
						if (!t || '' === t) return void o.window.showErrorMessage('The name must not be empty')
						const e = s.toBottomLine(t),
							n = o.workspace.rootPath
						if (!i.existsSync(`${n}/lib/app/modules`))
							return void o.window.showErrorMessage(`The ${n}/lib/app/modules lib must not be empty`)
						const r = `${n}/lib/app/modules/${e}`
						s.makeDirSync(r)
						const u = c.pageView(t),
							a = c.pageController(t),
							f = c.pageBindings(t),
							l = c.pageModel()
                            // s.writeFileSync(`${r}/${e}_model.dart`, l)
                            s.makeDirSync(`${r}/view`)
						    s.writeFileSync(`${r}/view/${e}_view.dart`, u)
                            s.makeDirSync(`${r}/controller`)
							s.writeFileSync(`${r}/controller/${e}_controller.dart`, a)
                            s.makeDirSync(`${r}/binding`)
							s.writeFileSync(`${r}/binding/${e}_binding.dart`, f)
						
							o.window.showInformationMessage(`🎉 Successfully generate page ${t}.`)
					})
				}
			},
			147: (t, e, n) => {
				'use strict'
				Object.defineProperty(e, '__esModule', { value: !0 }),
					(e.pageModel = e.pageBindings = e.pageController = e.pageView = void 0)
				const r = n(928)
				;(e.pageView = (t) => {
					const e = r.toBigHump(t)
					return `import 'package:flutter/material.dart';\nimport 'package:get/get.dart';\nimport '../controller/${r.toBottomLine(
						t
					)}_controller.dart';\n\nclass ${e}Page extends GetView<${e}Controller> {\n    const ${e}Page({Key? key}) : super(key: key);\n\n    @override\n    Widget build(BuildContext context) {\n    return Scaffold(\n        body: Container(),\n    );\n    }\n}\n`
				}),
					(e.pageController = (t) =>
						`import 'package:get/get.dart';\n\nclass ${r.toBigHump(
							t
						)}Controller extends GetxController {\n\n    @override\n    void onInit() {\n    super.onInit();\n    }\n\n    @override\n    void onReady() {  }\n\n    @override\n    void onClose() { \nsuper.onClose(); \n }\n\n   }\n`),
					(e.pageBindings = (t) => {
						const e = r.toBigHump(t)
						return `import 'package:get/get.dart';\nimport '../controller/${r.toBottomLine(
							t
						)}_controller.dart';\n\nclass ${e}Binding extends Bindings {\n    @override\n    void dependencies() {\n    Get.lazyPut<${e}Controller>(() => ${e}Controller());\n    }\n}\n`
					}),
					(e.pageModel = () => '')
			},
			928: (t, e, n) => {
				'use strict'
				Object.defineProperty(e, '__esModule', { value: !0 }),
					(e.writeFileSync =
						e.makeDirSync =
						e.toBottomLine =
						e.toBigHump =
						e.promptForPageName =
						e.generateStatusBar =
							void 0)
				const r = n(549),
					i = n(978),
					o = n(549)
				;(e.generateStatusBar = (t, e) => {
					const n = r.window.createStatusBarItem(r.StatusBarAlignment.Left)
					;(n.text = t),
						(n.tooltip = 'Generate new flutter getx page from monia.'),
						(n.color = '#fdcb6e'),
						(n.command = e),
						n.show()
				}),
					(e.promptForPageName = () => o.window.showInputBox({ prompt: 'Input Page Name' })),
					(e.toBigHump = (t) => {
						let e = t
						if (t.includes('_')) {
							const n = t.split('_')
							for (let t = 1; t < n.length; t++) n[t] = n[t].charAt(0).toUpperCase() + n[t].substring(1)
							e = n.join('')
						}
						return /[a-z]/.test(e[0]) && (e = e[0].toUpperCase() + e.substr(1)), e
					}),
					(e.toBottomLine = (t) => {
						let e = t
						return (
							/[A-Z]/.test(t[0]) && (e = t[0].toLowerCase() + e.substr(1)), e.replace(/([A-Z])/g, '_$1').toLowerCase()
						)
					}),
					(e.makeDirSync = (t) => {
						try {
							i.mkdirSync(t)
						} catch (t) {
							console.error(t)
						}
					}),
					(e.writeFileSync = (t, e) => {
						try {
							i.writeFileSync(t, e)
						} catch (t) {
							console.error(t)
						}
					})
			},
			357: (t) => {
				'use strict'
				t.exports = require('assert')
			},
			619: (t) => {
				'use strict'
				t.exports = require('constants')
			},
			747: (t) => {
				'use strict'
				t.exports = require('fs')
			},
			87: (t) => {
				'use strict'
				t.exports = require('os')
			},
			622: (t) => {
				'use strict'
				t.exports = require('path')
			},
			413: (t) => {
				'use strict'
				t.exports = require('stream')
			},
			669: (t) => {
				'use strict'
				t.exports = require('util')
			},
			549: (t) => {
				'use strict'
				t.exports = require('vscode')
			}
		},
		e = {}
	function n(r) {
		var i = e[r]
		if (void 0 !== i) return i.exports
		var o = (e[r] = { exports: {} })
		return t[r].call(o.exports, o, o.exports, n), o.exports
	}
	var r = {}
	;(() => {
		'use strict'
		var t = r
		Object.defineProperty(t, '__esModule', { value: !0 }), (t.deactivate = t.activate = void 0)
		const e = n(549),
			i = n(928),
			o = n(793)
		;(t.activate = function ({ subscriptions: t }) {
			i.generateStatusBar('chituanh', 'monia:generate')
			const n = e.commands.registerCommand('monia:generate', o.default)
			t.push(n)
		}),
			(t.deactivate = function () {})
	})(),
		(module.exports = r)
})()
