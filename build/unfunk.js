var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var unfunk;
(function (unfunk) {
    (function (writer) {
        var BaseWriter = (function () {
            function BaseWriter() {
                this.lineBuffer = '';
            }
            BaseWriter.prototype.start = function () {
                this.lineBuffer = '';
            };
            BaseWriter.prototype.write = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                if(args.length > 0) {
                    this.lineBuffer += args.join('');
                }
            };
            BaseWriter.prototype.writeln = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                if(args.length > 0) {
                    this.flushLine(this.lineBuffer + args.join(''));
                } else {
                    this.flushLine(this.lineBuffer);
                }
                this.lineBuffer = '';
            };
            BaseWriter.prototype.flushLine = function (str) {
            };
            BaseWriter.prototype.flushLineBuffer = function () {
                if(this.lineBuffer.length > 0) {
                    this.writeln(this.lineBuffer);
                    this.lineBuffer = '';
                }
            };
            BaseWriter.prototype.finish = function () {
                this.flushLineBuffer();
            };
            return BaseWriter;
        })();
        writer.BaseWriter = BaseWriter;        
        var ConsoleLineWriter = (function (_super) {
            __extends(ConsoleLineWriter, _super);
            function ConsoleLineWriter() {
                _super.apply(this, arguments);

            }
            ConsoleLineWriter.prototype.flushLine = function (str) {
                console.log(str);
            };
            return ConsoleLineWriter;
        })(BaseWriter);
        writer.ConsoleLineWriter = ConsoleLineWriter;        
        var ConsoleBulkWriter = (function (_super) {
            __extends(ConsoleBulkWriter, _super);
            function ConsoleBulkWriter() {
                _super.apply(this, arguments);

                this.buffer = [];
            }
            ConsoleBulkWriter.prototype.flushLine = function (str) {
                this.buffer.push(str);
            };
            ConsoleBulkWriter.prototype.finish = function () {
                console.log(this.buffer.join('\n'));
                this.buffer = [];
            };
            return ConsoleBulkWriter;
        })(BaseWriter);
        writer.ConsoleBulkWriter = ConsoleBulkWriter;        
    })(unfunk.writer || (unfunk.writer = {}));
    var writer = unfunk.writer;
})(unfunk || (unfunk = {}));
var unfunk;
(function (unfunk) {
    (function (styler) {
        var NullStyler = (function () {
            function NullStyler() { }
            NullStyler.prototype.error = function (str) {
                return str;
            };
            NullStyler.prototype.warning = function (str) {
                return str;
            };
            NullStyler.prototype.success = function (str) {
                return str;
            };
            NullStyler.prototype.suite = function (str) {
                return str;
            };
            NullStyler.prototype.test = function (str) {
                return str;
            };
            return NullStyler;
        })();
        styler.NullStyler = NullStyler;        
        var WrapStyler = (function () {
            function WrapStyler() {
                this.styles = {
                };
            }
            WrapStyler.prototype.error = function (str) {
                return this.wrap(str, 'red');
            };
            WrapStyler.prototype.warning = function (str) {
                return this.wrap(str, 'yellow');
            };
            WrapStyler.prototype.success = function (str) {
                return this.wrap(str, 'green');
            };
            WrapStyler.prototype.suite = function (str) {
                return this.wrap(str, 'cyan');
            };
            WrapStyler.prototype.test = function (str) {
                return str;
            };
            WrapStyler.prototype.wrap = function (str, style) {
                if(!this.styles.hasOwnProperty(style)) {
                    return str;
                }
                var tmp = this.styles[style];
                return tmp[0] + str + tmp[1];
            };
            return WrapStyler;
        })();
        styler.WrapStyler = WrapStyler;        
        var AnsiStyler = (function (_super) {
            __extends(AnsiStyler, _super);
            function AnsiStyler() {
                        _super.call(this);
                this.styles = {
                    'bold': [
                        '\033[1m', 
                        '\033[22m'
                    ],
                    'italic': [
                        '\033[3m', 
                        '\033[23m'
                    ],
                    'underline': [
                        '\033[4m', 
                        '\033[24m'
                    ],
                    'inverse': [
                        '\033[7m', 
                        '\033[27m'
                    ],
                    'white': [
                        '\033[37m', 
                        '\033[39m'
                    ],
                    'grey': [
                        '\033[90m', 
                        '\033[39m'
                    ],
                    'black': [
                        '\033[30m', 
                        '\033[39m'
                    ],
                    'blue': [
                        '\033[34m', 
                        '\033[39m'
                    ],
                    'cyan': [
                        '\033[36m', 
                        '\033[39m'
                    ],
                    'green': [
                        '\033[32m', 
                        '\033[39m'
                    ],
                    'magenta': [
                        '\033[35m', 
                        '\033[39m'
                    ],
                    'red': [
                        '\033[31m', 
                        '\033[39m'
                    ],
                    'yellow': [
                        '\033[33m', 
                        '\033[39m'
                    ]
                };
            }
            return AnsiStyler;
        })(WrapStyler);
        styler.AnsiStyler = AnsiStyler;        
        var HtmlStyler = (function (_super) {
            __extends(HtmlStyler, _super);
            function HtmlStyler() {
                        _super.call(this);
                this.styles = {
                    'bold': [
                        '<b>', 
                        '</b>'
                    ],
                    'italic': [
                        '<i>', 
                        '</i>'
                    ],
                    'underline': [
                        '<u>', 
                        '</u>'
                    ],
                    'inverse': [
                        '<span style="background-color:black;color:white;">', 
                        '</span>'
                    ],
                    'white': [
                        '<span style="color:white;">', 
                        '</span>'
                    ],
                    'grey': [
                        '<span style="color:grey;">', 
                        '</span>'
                    ],
                    'black': [
                        '<span style="color:black;">', 
                        '</span>'
                    ],
                    'blue': [
                        '<span style="color:blue;">', 
                        '</span>'
                    ],
                    'cyan': [
                        '<span style="color:cyan;">', 
                        '</span>'
                    ],
                    'green': [
                        '<span style="color:green;">', 
                        '</span>'
                    ],
                    'magenta': [
                        '<span style="color:magenta;">', 
                        '</span>'
                    ],
                    'red': [
                        '<span style="color:red;">', 
                        '</span>'
                    ],
                    'yellow': [
                        '<span style="color:yellow;">', 
                        '</span>'
                    ]
                };
            }
            return HtmlStyler;
        })(WrapStyler);
        styler.HtmlStyler = HtmlStyler;        
    })(unfunk.styler || (unfunk.styler = {}));
    var styler = unfunk.styler;
})(unfunk || (unfunk = {}));
var unfunk;
(function (unfunk) {
    var Stats = (function () {
        function Stats() {
            this.suites = 0;
            this.tests = 0;
            this.passes = 0;
            this.pending = 0;
            this.failures = 0;
        }
        return Stats;
    })();
    unfunk.Stats = Stats;    
    var util = require('util');
    var Unfunk = (function () {
        function Unfunk(runner) {
            this.options = {
            };
            this.init(runner);
        }
        Unfunk.prototype.getStyler = function (runner) {
            if(this.stringTrue(this.options.color)) {
                return new unfunk.styler.AnsiStyler();
            }
            return new unfunk.styler.NullStyler();
        };
        Unfunk.prototype.getWriter = function (runner) {
            return new unfunk.writer.ConsoleLineWriter();
        };
        Unfunk.prototype.init = function (runner) {
            this.importOptions();
            var stats = new Stats();
            var out = this.getWriter(runner);
            var style = this.getStyler(runner);
            var indenter = '  ';
            var indents = 0;
            var failures = [];
            var indent = function (add) {
                if (typeof add === "undefined") { add = 0; }
                return Array(indents + add).join(indenter);
            };
            var pluralize = function (word, amount, plurl) {
                if (typeof plurl === "undefined") { plurl = 's'; }
                return amount + ' ' + (1 == amount ? word : word + plurl);
            };
            var start;
            var counter = 0;
            runner.on('start', function () {
                start = Date.now();
                out.start();
                out.writeln();
            });
            runner.on('suite', function (suite) {
                if(indents === 0) {
                    out.writeln(style.suite('->') + ' running ' + style.suite(pluralize('suite', suite.suites.length)));
                    out.writeln();
                }
                stats.suites++;
                indents++;
                if(!suite.root) {
                    out.writeln(indent() + style.suite(suite.title));
                }
            });
            runner.on('suite end', function (suite) {
                indents--;
                if(1 == indents && !suite.root) {
                    out.writeln();
                }
            });
            runner.on('test', function (test) {
                stats.tests++;
                out.write(indent(1) + style.test(test.title + '.. '));
            });
            runner.on('pending', function (test) {
                stats.pending++;
                out.writeln(indent(1) + test.title + '.. ' + style.warning('pending'));
            });
            runner.on('pass', function (test) {
                stats.passes++;
                var medium = test.slow() / 2;
                test.speed = test.duration > test.slow() ? 'slow' : (test.duration > medium ? 'medium' : 'fast');
                out.write(style.success('pass'));
                if(test.speed == 'slow') {
                    out.writeln(' ' + style.error('pass') + ' (' + test.duration + 'ms)');
                } else if(test.speed == 'medium') {
                    out.writeln(' ' + style.warning('(' + test.duration + 'ms)'));
                } else {
                    out.writeln();
                }
            });
            runner.on('fail', function (test, err) {
                stats.failures++;
                out.writeln(style.error('fail'));
                counter++;
                if(err.message) {
                    out.writeln(style.error(counter + ': ') + indent(1) + '' + style.warning(err.message));
                }
                test.err = err;
                failures.push(test);
            });
            runner.on('end', function () {
                var test;
                if(stats.tests > 0) {
                    test = style.suite(pluralize('test', stats.tests));
                } else {
                    test = style.warning(pluralize('test', stats.tests));
                }
                var passes;
                if(stats.tests > 0) {
                    passes = style.success(pluralize('pass', stats.passes, 'es'));
                } else {
                    passes = style.success(pluralize('pass', stats.passes, 'es'));
                }
                var fail;
                if(stats.failures > 0) {
                    fail = style.error(pluralize('failure', stats.failures));
                } else {
                    fail = style.success(pluralize('failure', stats.failures));
                }
                var pending = '';
                if(stats.pending > 0) {
                    pending = ' and ' + style.warning(stats.pending + ' pending');
                }
                indents += 1;
                if(failures.length > 0) {
                    out.writeln(style.suite('->') + ' reporting ' + fail);
                    out.writeln();
                    failures.forEach(function (test, i) {
                        var title = test.fullTitle();
                        var pre = title.lastIndexOf(test.title);
                        var err = test.err;
                        var message = err.message || '';
                        var stack = err.stack || message;
                        var index = stack.indexOf(message) + message.length;
                        var msg = stack.slice(0, index);
                        out.writeln(indent() + style.error((i + 1) + ': ') + style.test(title.substr(0, pre)) + style.suite(title.substr(pre)));
                        out.writeln(indent(3) + style.warning(msg));
                        stack = stack.slice(index ? index + 1 : index);
                        if(stack) {
                            out.writeln(stack.replace(/^[ \t]*/gm, indent(4)));
                        }
                        out.writeln();
                    });
                }
                out.writeln(style.suite('->') + ' executed ' + test + ' with ' + passes + (stats.pending > 0 ? ', ' : ' and ') + fail + pending + ' (' + (Date.now() - start) + 'ms)');
                out.writeln();
                out.finish();
            });
        };
        Unfunk.prototype.stringTrue = function (str) {
            str = ('' + str).toLowerCase();
            return str != '' && str != 'false' && str != '0' && str != 'null' && str != 'undefined';
        };
        Unfunk.prototype.importOptions = function () {
            var pattern = /^mocha-unfunk-([\w][\w_-]*[\w])/g;
            var obj;
            if(typeof process !== 'undefined' && process.env) {
                obj = process.env;
            }
            if(obj) {
                for(var name in obj) {
                    if(Object.prototype.hasOwnProperty.call(obj, name)) {
                        var match = pattern.exec(name);
                        if(match && match.length > 1) {
                            this.options[match[1]] = obj[name];
                        }
                    }
                }
            }
        };
        return Unfunk;
    })();
    unfunk.Unfunk = Unfunk;    
})(unfunk || (unfunk = {}));
exports = (module).exports = unfunk.Unfunk;
