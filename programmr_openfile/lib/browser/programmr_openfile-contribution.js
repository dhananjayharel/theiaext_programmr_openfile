"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var frontend_application_state_1 = require("@theia/core/lib/browser/frontend-application-state");
var quick_file_open_1 = require("@theia/file-search/lib/browser/quick-file-open");
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/workspace/lib/browser");
var filesystem_watcher_1 = require("@theia/filesystem/lib/browser/filesystem-watcher");
var common_1 = require("@theia/filesystem/lib/common");
var uri_1 = require("@theia/core/lib/common/uri");
var file_resource_1 = require("@theia/filesystem/lib/browser/file-resource");
var editor_command_1 = require("@theia/editor/lib/browser/editor-command");
var terminal_service_1 = require("@theia/terminal/lib/browser/base/terminal-service");
var application_shell_1 = require("@theia/core/lib/browser/shell/application-shell");
exports.Programmr_openfileCommand = {
    id: 'Programmr_openfile.command',
    label: "Shows a message"
};
var Programmr_openfileCommandContribution = /** @class */ (function () {
    function Programmr_openfileCommandContribution(fileSystem, watcher, terminalService, shell) {
        this.fileSystem = fileSystem;
        this.watcher = watcher;
        this.terminalService = terminalService;
        this.shell = shell;
    }
    Programmr_openfileCommandContribution.prototype.onStart = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log("onstartup2");
                this.shell.expandPanel('left');
                this.stateService.reachedState('ready').then(function (a) {
                    console.log("reachedState2");
                    //set autosave on
                    _this.shell.expandPanel('left');
                    _this.preferencesService.set(editor_command_1.EditorCommandContribution.AUTOSAVE_PREFERENCE, 'on');
                    var current = _this.workspaceService.workspace;
                    //get the current workspace project path and open the default file
                    console.log("workspaceURI" + current.uri);
                    console.log("hdei now");
                    try {
                        //console.log("menu"+document.querySelectorAll(".p-MenuBar-item"));
                        var node = document.querySelectorAll(".p-MenuBar-item");
                        var el = node[node.length - 1];
                        el.style.display = "none";
                    }
                    catch (e) {
                        console.log(e);
                    }
                    // try{
                    //this.quickFileOpenService.openFile(new URI(current.uri+"/src/app/app.component.ts"));
                    // }catch(e){
                    //  console.log("open err"+e); 
                    //}
                    _this.openDefaultFile(current.uri);
                });
                return [2 /*return*/];
            });
        });
    };
    Programmr_openfileCommandContribution.prototype.openDefaultFile = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, resource, contents, configObj, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = new uri_1.default(path + "/.pmainfile");
                        resource = new file_resource_1.FileResource(uri, this.fileSystem, this.watcher);
                        return [4 /*yield*/, resource.readContents()];
                    case 1:
                        contents = _a.sent();
                        console.log("|" + contents + "|");
                        contents = contents.replace(/\n/g, '');
                        contents = contents.replace(/\r/g, '');
                        configObj = JSON.parse(contents);
                        console.log("after parse" + configObj);
                        console.log("after parse" + JSON.stringify(configObj));
                        if ("mainfile" in configObj) {
                            console.log("default file");
                            this.quickFileOpenService.openFile(new uri_1.default(path + "/" + configObj.mainfile));
                        }
                        if ("terminalcommand" in configObj) {
                            console.log("cmd entry");
                            this.runTerminalCommand(configObj.terminalcommand);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        //console.log(e);
                        console.log("exceptio .. no config open default index.html file");
                        this.quickFileOpenService.openFile(new uri_1.default(path + "/src/index.html"));
                        this.runTerminalCommand("npm install && npm start");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Programmr_openfileCommandContribution.prototype.runTerminalCommand = function (command) {
        return __awaiter(this, void 0, void 0, function () {
            var terminal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        terminal = this.terminalService.currentTerminal;
                        if (!!terminal) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.terminalService.newTerminal({ created: new Date().toString() })];
                    case 1:
                        terminal = (_a.sent());
                        return [4 /*yield*/, terminal.start()];
                    case 2:
                        _a.sent();
                        this.terminalService.activateTerminal(terminal);
                        _a.label = 3;
                    case 3:
                        terminal.sendText(command + "\n");
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        inversify_1.inject(frontend_application_state_1.FrontendApplicationStateService),
        __metadata("design:type", frontend_application_state_1.FrontendApplicationStateService)
    ], Programmr_openfileCommandContribution.prototype, "stateService", void 0);
    __decorate([
        inversify_1.inject(quick_file_open_1.QuickFileOpenService),
        __metadata("design:type", quick_file_open_1.QuickFileOpenService)
    ], Programmr_openfileCommandContribution.prototype, "quickFileOpenService", void 0);
    __decorate([
        inversify_1.inject(browser_2.WorkspaceService),
        __metadata("design:type", browser_2.WorkspaceService)
    ], Programmr_openfileCommandContribution.prototype, "workspaceService", void 0);
    __decorate([
        inversify_1.inject(browser_1.PreferenceService),
        __metadata("design:type", Object)
    ], Programmr_openfileCommandContribution.prototype, "preferencesService", void 0);
    Programmr_openfileCommandContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.FileSystem)),
        __param(1, inversify_1.inject(filesystem_watcher_1.FileSystemWatcher)),
        __param(2, inversify_1.inject(terminal_service_1.TerminalService)),
        __param(3, inversify_1.inject(application_shell_1.ApplicationShell)),
        __metadata("design:paramtypes", [Object, filesystem_watcher_1.FileSystemWatcher, Object, application_shell_1.ApplicationShell])
    ], Programmr_openfileCommandContribution);
    return Programmr_openfileCommandContribution;
}());
exports.Programmr_openfileCommandContribution = Programmr_openfileCommandContribution;
//# sourceMappingURL=programmr_openfile-contribution.js.map