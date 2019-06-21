import { injectable, inject } from "inversify";
import { FrontendApplicationStateService } from '@theia/core/lib/browser/frontend-application-state';
import { QuickFileOpenService } from '@theia/file-search/lib/browser/quick-file-open';
import { FrontendApplicationContribution,FrontendApplication,PreferenceService} from "@theia/core/lib/browser";
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { FileSystemWatcher } from '@theia/filesystem/lib/browser/filesystem-watcher';
import { FileSystem } from '@theia/filesystem/lib/common';
import URI from '@theia/core/lib/common/uri';
import {FileResource } from '@theia/filesystem/lib/browser/file-resource';
import { EditorCommandContribution } from '@theia/editor/lib/browser/editor-command';
import { TerminalService } from '@theia/terminal/lib/browser/base/terminal-service';
import { TerminalWidget } from '@theia/terminal/lib/browser/base/terminal-widget';
import { TerminalWidgetFactoryOptions } from '@theia/terminal/lib/browser/terminal-widget-impl';
import {ApplicationShell} from '@theia/core/lib/browser/shell/application-shell';

export const Programmr_openfileCommand = {
    id: 'Programmr_openfile.command',
    label: "Shows a message"
};

@injectable()
export class Programmr_openfileCommandContribution implements FrontendApplicationContribution {

  @inject(FrontendApplicationStateService)
    protected readonly stateService: FrontendApplicationStateService;
	
 @inject(QuickFileOpenService)
    protected readonly quickFileOpenService: QuickFileOpenService;
 @inject(WorkspaceService)
    protected readonly workspaceService: WorkspaceService;	
  @inject(PreferenceService)
    protected readonly preferencesService: PreferenceService;	
    constructor(
	@inject(FileSystem) protected readonly fileSystem: FileSystem,
    @inject(FileSystemWatcher) protected readonly watcher: FileSystemWatcher,
	@inject(TerminalService) protected readonly terminalService: TerminalService,
	@inject(ApplicationShell) protected readonly shell: ApplicationShell,		
    ) { }

   
	
	    async onStart(app: FrontendApplication): Promise<void> {
          console.log("onstartup2");
		   this.shell.expandPanel('left');	
            this.stateService.reachedState('ready').then(
                a => {
				    	console.log("reachedState2");
						//set autosave on
						 this.shell.expandPanel('left');
						this.preferencesService.set(EditorCommandContribution.AUTOSAVE_PREFERENCE,'on');						
						const current = this.workspaceService.workspace;
                       //get the current workspace project path and open the default file
					   console.log("workspaceURI"+current.uri);
					   console.log("hdei now")
					   	try{
								//console.log("menu"+document.querySelectorAll(".p-MenuBar-item"));
								let node : NodeListOf<Element> = document.querySelectorAll(".p-MenuBar-item");
								let el = node[node.length - 1] as HTMLElement;
								 el.style.display="none";
					  	}catch(e){
							console.log(e);
						} 
					  // try{
					   //this.quickFileOpenService.openFile(new URI(current.uri+"/src/app/app.component.ts"));
					  // }catch(e){
					   //  console.log("open err"+e); 
					   //}
					   this.openDefaultFile(current.uri);
					  	 
				}
            );
       
    }
	
	async openDefaultFile(path: string): Promise<void>{
			try{
			const uri = new URI(path+"/.pmainfile");
				 const resource = new FileResource(uri, this.fileSystem, this.watcher);
				let contents = await resource.readContents();
				console.log("|"+contents+"|");
				contents = contents.replace(/\n/g,'');
				contents = contents.replace(/\r/g,'');
				//contents  = JSON.stringify(contents);
				//console.log("After stringgify"+contents);
				let configObj = JSON.parse(contents);
				console.log("after parse"+configObj);
				console.log("after parse"+ JSON.stringify(configObj));
				 if("mainfile" in configObj){
					console.log("default file");
					this.quickFileOpenService.openFile(new URI(path+"/"+configObj.mainfile));
				 }
				 if("terminalcommand" in configObj){
					console.log("cmd entry");
					this.runTerminalCommand(configObj.terminalcommand);
				 }
				 
			}catch(e){
			 //console.log(e);
			 console.log("exceptio .. no config open default index.js file")
			 this.quickFileOpenService.openFile(new URI(path+"/src/index.js"));
			 this.runTerminalCommand("npm install && npm start");			 			 
			}	 
	}
	
	async runTerminalCommand(command: string): Promise<void> {
					    let terminal = this.terminalService.currentTerminal;
				if (!terminal) {
					terminal = <TerminalWidget>await this.terminalService.newTerminal(<TerminalWidgetFactoryOptions>{ created: new Date().toString() });
					await terminal.start();
					this.terminalService.activateTerminal(terminal);
				}
				terminal.sendText(command+"\n");  
		 
	 }	
}

